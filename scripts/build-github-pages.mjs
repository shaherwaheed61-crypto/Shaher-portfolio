import { cp, mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

// Build the public portfolio for GitHub's free project-site URL. The Sites
// source stays usable on its existing host; only this isolated export receives
// the repository prefix, public origin, and static-only route configuration.
const root = process.cwd();
const stage = path.join(root, "work/github-pages-source");
const output = path.join(root, "out");
const basePath = "/Shaher-portfolio";
const siteUrl = `https://shaherwaheed61-crypto.github.io${basePath}`;
const oldUrl = "https://shaher-waheed-portfolio.shaherwaheed61.chatgpt.site";
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
for (const directory of ["app", "components", "data", "hooks", "lib", "public", "vendor"]) {
  await cp(path.join(root, directory), path.join(stage, directory), { recursive: true });
}
for (const file of ["package.json", "tsconfig.json", "postcss.config.mjs"]) {
  await cp(path.join(root, file), path.join(stage, file));
}
await symlink(path.join(root, "node_modules"), path.join(stage, "node_modules"), "dir");

async function adapt(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await adapt(filename);
    else if (/\.(?:tsx?|json|css)$/.test(entry.name)) {
      let source = await readFile(filename, "utf8");
      source = source.replaceAll(oldUrl, siteUrl);
      // Next's Link handles route prefixes. Raw public assets (including URLs
      // in client-side model/film data and CSS fonts) need the same prefix.
      source = source.replace(/(["'`])\/(images\/|models\/|media\/|fonts\/|certificates\/|Shaher-[^"'`\n]*\.pdf|favicon\.svg)/g,
        (_, quote, asset) => `${quote}${basePath}/${asset}`);
      await writeFile(filename, source);
    }
  }
}
for (const directory of ["app", "components", "data", "lib"]) await adapt(path.join(stage, directory));
for (const file of ["app/robots.ts", "app/sitemap.ts", "app/portfolio-data.json/route.ts"]) {
  const filename = path.join(stage, file);
  await writeFile(filename, `export const dynamic = "force-static";\n${await readFile(filename, "utf8")}`);
}
for (const [route, anchor] of [["credentials", "credentials"], ["profile", "about"]]) {
  const filename = path.join(stage, "app", route, "page.tsx");
  await writeFile(filename, (await readFile(filename, "utf8")).replace(`redirect("/#${anchor}")`, `redirect("${basePath}/#${anchor}")`));
}
await writeFile(path.join(stage, "next.config.mjs"), `export default ${JSON.stringify({
  output: "export", basePath, trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
}, null, 2)};\n`);
const result = spawnSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"], {
  cwd: stage, stdio: "inherit", env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
});
if (result.status !== 0) process.exit(result.status ?? 1);
await rm(output, { recursive: true, force: true });
await cp(path.join(stage, "out"), output, { recursive: true });
await writeFile(path.join(output, ".nojekyll"), "");
console.log(`GitHub Pages export ready: ${output}`);
