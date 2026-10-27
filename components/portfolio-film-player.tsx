"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

type Chapter = { id: string; title: string; role: string; start: number; end: number; slug: string | null; collectionId?: string; collectionTitle?: string; collectionContext?: string };
type Film = { duration: number; video: string; poster: string; captions: string; chapterTrack: string; chapters: Chapter[] };
const stamp = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;

export function PortfolioFilmPlayer({ film }: { film: Film }) {
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState("intro");
  const groups = film.chapters.reduce<Array<{ id: string; title: string; context: string; chapters: Chapter[] }>>((result, chapter) => {
    const id = chapter.collectionId ?? chapter.id;
    let group = result.find((item) => item.id === id);
    if (!group) {
      group = { id, title: chapter.collectionTitle ?? chapter.title, context: chapter.collectionContext ?? "", chapters: [] };
      result.push(group);
    }
    group.chapters.push(chapter);
    return result;
  }, []);
  const updateChapter = () => {
    const seconds = video.current?.currentTime ?? 0;
    const chapter = film.chapters.find((item) => seconds >= item.start && seconds < item.end);
    if (chapter) setActive(chapter.id);
  };
  const seek = (chapter: Chapter) => {
    const player = video.current;
    if (!player) return;
    const play = () => {
      player.currentTime = chapter.start;
      setActive(chapter.id);
      void player.play().catch(() => {});
      player.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    };
    if (player.readyState >= 1) play();
    else {
      player.addEventListener("loadedmetadata", play, { once: true });
      player.load();
    }
  };

  return <>
    <div className="review-film-player">
      <video ref={video} controls playsInline preload="metadata" poster={film.poster} width={1920} height={1080}
        aria-label="Shaher Wahid Rushdi portfolio film: project introductions, roles and work evidence" aria-describedby="review-film-description"
        onTimeUpdate={updateChapter} onSeeked={updateChapter} onPause={updateChapter}>
        <source src={film.video} type="video/mp4" />
        <track kind="captions" src={film.captions} srcLang="en" label="English captions" />
        <track kind="chapters" src={film.chapterTrack} srcLang="en" label="Project chapters" />
        Your browser does not support embedded video. <a href={film.video}>Download the film.</a>
      </video>
    </div>
    <p className="review-film-description" id="review-film-description">{stamp(film.duration)} · Full HD · Silent · Nine project stories · English on-screen text</p>
    <div className="film-chapter-heading"><p className="mono-label">Jump to a chapter</p><span>Project → My role → Work evidence</span></div>
    <nav className="film-collections" aria-label="Portfolio film chapters">
      {groups.map((group) => <section className="film-collection" key={group.id} aria-label={group.title}>
      {group.context && <header className="film-collection-heading"><h3 id={`film-group-${group.id}`}>{group.title}</h3><p>{group.context}</p></header>}
      <div className="film-chapters">
      {group.chapters.map((chapter) => <button key={chapter.id} type="button" data-start={chapter.start}
        onClick={() => seek(chapter)} className={active === chapter.id ? "active" : undefined}
        aria-current={active === chapter.id ? "true" : undefined} aria-label={`Play ${chapter.title} at ${stamp(chapter.start)}`}>
        <span className="film-chapter-time">{stamp(chapter.start)} <Play size={12} aria-hidden="true" /></span>
        <strong>{chapter.title}</strong><small>{chapter.role}</small>
      </button>)}</div></section>)}
    </nav>
  </>;
}
