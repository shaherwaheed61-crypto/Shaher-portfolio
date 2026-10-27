import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Recover exactly the already-approved, publicly served media from the last
// verified Site revision. Every download is checked against its source hash.
// No credentials or original IFC files are needed or published.
const manifest = JSON.parse(await readFile("data/github-pages-assets.json", "utf8"));
let restored = 0;
for (const asset of manifest.files) {
  if (asset.path.startsWith("/") || asset.path.split("/").includes("..")) throw new Error("Unsafe asset path");
  const filename = path.join("public", asset.path);
  const matches = (bytes) => bytes.length === asset.size && createHash("sha256").update(bytes).digest("hex") === asset.sha256;
  try { if (matches(await readFile(filename))) continue; } catch (error) { if (error.code !== "ENOENT") throw error; }
  const url = new URL(asset.path.split("/").map(encodeURIComponent).join("/"), `${manifest.sourceSite}/`);
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Unable to recover ${asset.path}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!matches(bytes)) throw new Error(`Media integrity check failed: ${asset.path}`);
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, bytes);
  restored += 1;
}
console.log(`Verified ${manifest.files.length} public assets; restored ${restored}.`);
