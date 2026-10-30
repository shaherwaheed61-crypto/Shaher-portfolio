import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { projects, projectCollections } from "../data/portfolio.ts";

const root = new URL("../", import.meta.url);
const json = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));
const seconds = (stamp) => stamp.split(":").reduce((total, part) => total * 60 + Number(part), 0);

test("keeps the three NHC scopes together and presents the shared Marsa drawing once", () => {
  const slugs = ["marsa-khuzam", "sedayem-jeddah-streetscape", "jeddah-park"];
  assert.deepEqual(projectCollections.find(group => group.id === "nhc").projectSlugs, slugs);
  for (const slug of slugs) assert.equal(projects.find(project => project.slug === slug).client, "National Housing Company (NHC)");
  const marsa = projects.find(project => project.slug === "marsa-khuzam");
  assert.equal(marsa.gallery.length, 1);
  assert.match(marsa.gallery[0].caption, /Zones 8 & 9/);
});

test("publishes a complete Full HD silent 90-second film and contiguous chapter/caption timing", async () => {
  const file = new URL("public/media/shaher-portfolio-film.mp4", root);
  const info = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", file.pathname], { encoding: "utf8" }));
  const video = info.streams.find((stream) => stream.codec_type === "video");
  assert.equal(Number(info.format.duration), 90);
  assert.equal(Number(video.duration), 90);
  assert.equal(video.width, 1920);
  assert.equal(video.height, 1080);
  assert.equal(video.avg_frame_rate, "57/1");
  assert.equal(info.streams.some((stream) => stream.codec_type === "audio"), false);
  const timeline = await json("data/portfolio-film-timeline.json");
  assert.equal(timeline.chapters[0].start, 0);
  assert.equal(timeline.chapters.at(-1).end, 90);
  timeline.chapters.forEach((chapter, i) => {
    assert.ok(chapter.end > chapter.start);
    if (i) assert.equal(chapter.start, timeline.chapters[i - 1].end);
  });
  const captions = await readFile(new URL("public/media/shaher-portfolio-film.vtt", root), "utf8");
  const intervals = [...captions.matchAll(/(\d\d:\d\d:\d\d\.\d+) --> (\d\d:\d\d:\d\d\.\d+)/g)].map(([, start, end]) => [seconds(start), seconds(end)]);
  assert.equal(intervals.length, 58);
  assert.equal(intervals[0][0], 0);
  assert.equal(intervals.at(-1)[1], 90);
  intervals.forEach(([start, end], i) => {
    assert.ok(end > start);
    if (i) assert.equal(start, intervals[i - 1][1]);
  });
  for (const name of ["Dar Al-Handasah", "Aldarh Engineering", "Parsons", "Zuhair Fayez", "Khatib & Alami", "Al Saif Engineering Consultants", "Niqat Project", "IFC-derived", "Complete landscape shop drawing sheet", "Saudi Council of Engineers", "Certified BIM Coordinator", "Revit Coordinates Workshop"]) assert.ok(captions.includes(name), name);
  assert.match(captions, /My scope: design/);
});

test("removes only the confirmed duplicate drawing and keeps NHC scopes and seven certificates", async () => {
  const edit = await json("data/portfolio-film-edit.json");
  const ranges = edit.scenes.filter((scene) => scene.sourceStart !== undefined).sort((a, b) => a.sourceStart - b.sourceStart);
  assert.equal(ranges.length, 51);
  assert.equal(ranges[0].sourceStart, 0);
  assert.equal(ranges.at(-1).sourceEnd, 90);
  const gaps = ranges.slice(1).flatMap((range, i) => range.sourceStart === ranges[i].sourceEnd ? [] : [[ranges[i].sourceEnd, range.sourceStart]]);
  assert.deepEqual(gaps, [[34.25, 36]]);
  assert.equal(edit.removedDuplicateScenes.length, 1);
  assert.equal(edit.scenes.find(scene => scene.chapter === "selected-work").card, "selected-work-design-scope.png");
  const marsaSheet = ranges.find(s => s.chapter === "mkz" && s.sourceStart === 32.5);
  assert.equal(marsaSheet.card, "marsa-zones-8-9-full-sheet.png");
  assert.equal(marsaSheet.asset, "/images/safwa-shopdrawing/al-khuzama-gardens-zone-8.jpg");
  assert.deepEqual(edit.scenes.filter(s => s.chapter === "niq").map(s => s.card), ["card-niqat-project.png", "niqat-model-overview.png", "niqat-model-side.png", "niqat-model-reverse.png"]);
  assert.equal(edit.scenes.filter(s => s.chapter === "niq" && s.asset?.startsWith("/images/niqat-project/")).length, 3);
  assert.ok(ranges.filter(s => s.chapter !== "intro" && s.chapter !== "contact").every(s => s.frames === s.sourceFrames));
  assert.equal(edit.certificateImageCount, 7);
  assert.equal(edit.scenes.filter((scene) => scene.chapter === "credentials").length, 3);
  const timeline = await json("data/portfolio-film-timeline.json");
  assert.deepEqual(timeline.chapters.filter((chapter) => chapter.collectionId === "housing").map((chapter) => chapter.slug), ["housing-projects-parks", "alula-housing"]);
  assert.deepEqual(timeline.chapters.filter((chapter) => chapter.collectionId === "nhc").map((chapter) => chapter.slug), ["marsa-khuzam", "sedayem-jeddah-streetscape", "jeddah-park"]);
  assert.deepEqual(timeline.chapters.filter((chapter) => chapter.collectionId === "selected" && chapter.slug).map((chapter) => chapter.slug), ["blue-development", "niqat-project", "zad-engineering"]);
  assert.ok(timeline.chapters.some((chapter) => chapter.id === "credentials" && chapter.start < 80 && chapter.end === timeline.chapters.at(-1).start));
});

