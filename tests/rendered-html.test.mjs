import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("omits development-only preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.doesNotMatch(await response.text(), developmentPreviewMeta);
});

test("keeps country maps and shows each project once with its own model and media", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const getHtml = async (path) => {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), env, ctx);
    assert.equal(response.status, 200, path);
    return response.text();
  };

  const index = await getHtml("/projects");
  assert.match(index, /Saudi Arabia country outline with highlighted project cities/);
  assert.match(index, /AlUla, 1 public case studies|AlUla, 1 public case study/);
  assert.match(index, /Riyadh, 4 public case studies/);
  assert.match(index, /Jeddah, 2 public case studies/);
  assert.match(index, /aria-label="Egypt, 2 projects"/);
  assert.match(index, /aria-label="Saudi Arabia, 7 projects"/);
  assert.doesNotMatch(index, /maps\.google\.com\/maps\?q=/);
  assert.match(index, />About Me<\/a>/);
  assert.match(index, />Portfolio Film<\/a>/);
  assert.doesNotMatch(index, /class="nav-pair"/);
  assert.match(index, /Open full project details for King Abdullah International Gardens/);
  const covers = [...index.matchAll(/<a\b[^>]*class="project-cover-card"[^>]*>/g)].map((match) => match[0]);
  assert.equal(covers.length, 10);
  assert.equal(new Set(covers.map((cover) => cover.match(/href="([^"]+)"/)?.[1])).size, 10);
  const modelAnchors = covers.map((cover) => cover.match(/\bid="([^"]+)"/)?.[1]).filter(Boolean);
  assert.equal(modelAnchors.length, 2);
  assert.equal(new Set(modelAnchors).size, 2);
  const housingGroup = index.match(/<section class="project-collection-group" aria-labelledby="collection-housing">[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(housingGroup, /Ministry of Municipalities and Housing/);
  for (const slug of ["housing-projects-parks", "alula-housing"]) assert.match(housingGroup, new RegExp(`href="/projects/${slug}"`));
  assert.doesNotMatch(housingGroup, /href="\/projects\/marsa-khuzam"/);
  assert.doesNotMatch(housingGroup, /href="\/projects\/sedayem-jeddah-streetscape"/);
  const nhcGroup = index.match(/<section class="project-collection-group" aria-labelledby="collection-nhc">[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(nhcGroup, /href="\/projects\/sedayem-jeddah-streetscape"/);
  assert.match(nhcGroup, /href="\/projects\/jeddah-park"/);
  assert.match(nhcGroup, /href="\/projects\/marsa-khuzam"/);
  assert.doesNotMatch(index, /<video|niqat-viewer-canvas|proof-study-tabs/);
  assert.match(index, /href="\/projects\/blue-development"/);

  const gardens = await getHtml("/projects/king-abdullah-international-gardens");
  assert.match(gardens, /href="#project-details"/);
  assert.match(gardens, /href="#site-photos"/);
  assert.match(gardens, /href="#drawings"/);
  assert.match(gardens, /Site Photos/);
  assert.match(gardens, /Drawings &amp; Details/);
  assert.match(gardens, /id="project-gallery"/);
  assert.match(gardens, /src="\/images\/gardens-project\/aerial-main-dome.jpg"/);
  assert.doesNotMatch(gardens, /<img[^>]*src="\/images\/gardens-project\/shop-drawings\//);

  const blue = await getHtml("/projects/blue-development");
  assert.match(blue, /Blue Development/);
  assert.match(blue, /Fifth Settlement, Egypt/);
  assert.match(blue, /3D Model/);
  assert.match(blue, /niqat-viewer/);
  assert.match(blue, /Interactive 3D architectural model of Blue Development/);

  const niqat = await getHtml("/projects/niqat-project");
  assert.match(niqat, /Niqat Project/);
  assert.match(niqat, /Cairo, Egypt/);
  assert.match(niqat, /3D Model/);
  assert.match(niqat, /Interactive 3D architectural model of Niqat Project in Cairo, Egypt/);
  assert.match(niqat, /src="\/images\/niqat-project\/model-overview.jpg"/);
  assert.doesNotMatch(niqat, /Interactive 3D architectural model of Blue Development/);

  const aviation = await getHtml("/projects/security-aviation-leadership-building");
  assert.match(aviation, /src="\/images\/security-aviation-leadership-building\/approved-exterior-visualization.webp"/);
  assert.match(aviation, /id="project-gallery"/);
  assert.match(aviation, /Design &amp; Visualization/);
  assert.doesNotMatch(aviation, /No project imagery/);

  const about = await getHtml("/");
  assert.match(about, /Zad Engineering Consulting Office<\/p><\/div><span class="career-location">Egypt<\/span>/);
});
