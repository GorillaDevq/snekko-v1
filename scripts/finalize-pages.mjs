import { copyFile, readFile, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../.gh-pages/", import.meta.url);
const indexFile = new URL("index.html", outputDirectory);
const html = await readFile(indexFile, "utf8");

if (!html.includes('<div id="root"></div>')) {
  throw new Error("GitHub Pages build does not contain the React root.");
}

if (html.includes("vinext.navigationRuntime") || html.includes("initialCacheKind")) {
  throw new Error("GitHub Pages build contains a Vinext RSC bootstrap.");
}

await Promise.all([
  copyFile(indexFile, new URL("404.html", outputDirectory)),
  writeFile(new URL(".nojekyll", outputDirectory), ""),
]);

process.stdout.write("Static GitHub Pages build is ready.\n");
