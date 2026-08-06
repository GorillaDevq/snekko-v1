import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputDirectory = new URL("../.gh-pages/", import.meta.url);

test("exports a standalone GitHub Pages application without RSC", async () => {
  const html = await readFile(new URL("index.html", outputDirectory), "utf8");

  assert.match(html, /<title>Snekko — оборудование для цехов полуфабрикатов<\/title>/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /\/snekko-v1\/assets\/index-[^"']+\.js/);
  assert.match(html, /\/snekko-v1\/assets\/index-[^"']+\.css/);
  assert.doesNotMatch(html, /vinext\.navigationRuntime|initialCacheKind|\/_next\//);

  await access(new URL("404.html", outputDirectory));
  await access(new URL(".nojekyll", outputDirectory));
  await access(new URL("og.png", outputDirectory));
  await access(new URL("snekko-logo.png", outputDirectory));
});
