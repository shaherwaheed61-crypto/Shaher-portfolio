import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import test from "node:test";

const root = new URL("../", import.meta.url);
const json = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));
const seconds = (stamp) => stamp.split(":").reduce((total, part) => total * 60 + Number(part), 0);

test("publishes a complete Full HD silent 90-second film and contiguous chapter/caption timing", async () => {
  const file = new URL("public/media/shaher-portfolio-film.mp4", root);
  const info = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", file.pathname], { encoding: "utf8" }));
  const video = info.streams.find((stream) => stream.codec_type === "video");
  assert.equal(Number(info.format.duration), 90);
  assert.equal(Number(video.duration), 90);
  assert.equal(video.width, 1920);
  assert.equal(video.height, 1080);
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
  assert.equal(intervals.length, 55);
  assert.equal(intervals[0][0], 0);
  assert.equal(intervals.at(-1)[1], 90);
  intervals.forEach(([start, end], i) => {
    assert.ok(end > start);
    if (i) assert.equal(start, intervals[i - 1][1]);
  });
  for (const name of ["Dar Al-Handasah", "Aldarh Engineering", "Parsons", "Zuhair Fayez", "Khatib & Alami", "Saudi Council of Engineers", "Certified BIM Coordinator", "Revit Coordinates Workshop"]) assert.ok(captions.includes(name), name);
});

test("retains all approved source scenes while grouping projects by client agency and adding seven certificates", async () => {
  const edit = await json("data/portfolio-film-edit.json");
  const ranges = edit.scenes.filter((scene) => scene.sourceStart !== undefined).sort((a, b) => a.sourceStart - b.sourceStart);
  assert.equal(ranges.length, 52);
  assert.equal(ranges[0].sourceStart, 0);
  assert.equal(ranges.at(-1).sourceEnd, 90);
  ranges.forEach((range, i) => { if (i) assert.equal(range.sourceStart, ranges[i - 1].sourceEnd); });
  assert.equal(edit.certificateImageCount, 7);
  assert.equal(edit.scenes.filter((scene) => scene.chapter === "credentials").length, 3);
  const timeline = await json("data/portfolio-film-timeline.json");
  assert.deepEqual(timeline.chapters.filter((chapter) => chapter.collectionId === "housing").map((chapter) => chapter.slug), ["housing-projects-parks", "alula-housing"]);
  assert.deepEqual(timeline.chapters.filter((chapter) => chapter.collectionId === "nhc").map((chapter) => chapter.slug), ["marsa-khuzam", "sedayem-jeddah-streetscape", "jeddah-park"]);
  assert.ok(timeline.chapters.some((chapter) => chapter.id === "credentials" && chapter.start < 80 && chapter.end === 88.5));
});
