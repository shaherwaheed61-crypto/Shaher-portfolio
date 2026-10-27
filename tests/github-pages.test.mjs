import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const base = "/Shaher-portfolio";
const output = new URL("../out/", import.meta.url);
const html = async (route = "") => readFile(new URL(`${route}${route ? "/" : ""}index.html`, output), "utf8");

test("exports every case study, both maps, and all main pages under the repository path", async () => {
  const index = await html("projects");
  assert.match(index, /Egypt, 2 projects/);
  assert.match(index, /Saudi Arabia, 7 projects/);
  assert.match(index, /Riyadh, 4 public case studies/);
  const covers = [...index.matchAll(/<a\b[^>]*class="project-cover-card"[^>]*>/g)];
  assert.equal(covers.length, 10);
  const routes = covers.map(([tag]) => tag.match(/href="([^"]+)"/)[1]);
  assert.equal(new Set(routes).size, 10);
  for (const href of routes) {
    assert.ok(href.startsWith(`${base}/projects/`), href);
    assert.match(await html(href.slice(base.length + 1).replace(/\/$/, "")), /Explore the project gallery|Contribution highlights/);
  }
  for (const route of ["", "contact", "quick-review", "digital-practice"]) {
    const page = await html(route);
    assert.doesNotMatch(page, /chatgpt\.site|src="\/(?:images|media|models|fonts)\//);
    assert.match(page, /Shaher Wahid Rushdi/);
  }
  assert.match(await html("digital-practice"), /Gypsum|Apartment|Raised/);
});

test("keeps the silent 90-second film, drawings and two distinct public models", async () => {
  const film = await html("quick-review");
  assert.match(film, /90-second|90 seconds|01:30/);
  assert.match(film, /\/Shaher-portfolio\/media\/shaher-portfolio-film\.mp4/);
  assert.match(film, /\/Shaher-portfolio\/media\/shaher-portfolio-film-chapters\.vtt/);
  const kaig = await html("projects/king-abdullah-international-gardens");
  assert.match(kaig, /Drawings &amp; Details/);
  assert.match(kaig, /\/Shaher-portfolio\/images\/gardens-project\//);
  const blue = await html("projects/blue-development");
  const niqat = await html("projects/niqat-project");
  assert.match(blue, /Interactive 3D architectural model of Blue Development/);
  assert.match(niqat, /Interactive 3D architectural model of Niqat Project in Cairo, Egypt/);
  for (const file of ["niqat-team-architecture.glb", "niqat-project.glb"]) {
    const bytes = await readFile(new URL(`models/${file}`, output));
    assert.equal(bytes.toString("ascii", 0, 4), "glTF");
    assert.equal(bytes.readUInt32LE(8), bytes.length);
  }
  const data = JSON.parse(await readFile(new URL("portfolio-data.json", output), "utf8"));
  assert.equal(data.projects.length, 10);
  assert.equal(data.portfolio.website, "https://shaherwaheed61-crypto.github.io/Shaher-portfolio");
  assert.equal(new Set(data.projects.filter(p => p.interactiveModel).map(p => p.modelSrc)).size, 2);
});

test("resolves every local HTML asset and preserves all approved media byte for byte", async () => {
  async function* files(directory) {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, item.name);
      if (item.isDirectory()) yield* files(filename); else yield filename;
    }
  }
  for await (const file of files(fileURLToPath(output))) {
    if (!file.endsWith(".html")) continue;
    const source = await readFile(file, "utf8");
    for (const [, url] of source.matchAll(/\b(?:src|href|poster)="([^"]+)"/g)) {
      if (!url.startsWith(`${base}/`)) continue;
      const pathname = url.split(/[?#]/)[0].slice(base.length + 1);
      const target = new URL(pathname, output);
      const info = await stat(target).catch(() => null);
      assert.ok(info, `${file}: missing ${url}`);
      if (info.isDirectory()) assert.ok(await stat(new URL(`${pathname ? `${pathname.replace(/\/$/, "")}/` : ""}index.html`, output)));
    }
  }
  const manifest = JSON.parse(await readFile(new URL("../data/github-pages-assets.json", import.meta.url), "utf8"));
  for (const asset of manifest.files) {
    const bytes = await readFile(new URL(asset.path, output));
    assert.equal(bytes.length, asset.size, asset.path);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256, asset.path);
    assert.doesNotMatch(asset.path, /\.ifc$/i);
  }
});
