import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../.gh-pages/", import.meta.url);
const clientDirectory = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", `${Date.now()}`);

const repository = process.env.GITHUB_REPOSITORY ?? "GorillaDevq/snekko-v1";
const [owner, repositoryName] = repository.split("/");

if (!owner || !repositoryName) {
  throw new Error(`Invalid GITHUB_REPOSITORY value: ${repository}`);
}

const basePath = `/${repositoryName}/`;
const origin = `https://${owner.toLowerCase()}.github.io`;
const pageUrl = new URL(basePath, origin);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request(origin, {
    headers: {
      accept: "text/html",
      host: pageUrl.host,
      "x-forwarded-host": pageUrl.host,
      "x-forwarded-proto": "https",
    },
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

if (!response.ok) {
  throw new Error(`Unable to render the landing page: HTTP ${response.status}`);
}

const renderedHtml = await response.text();
const socialImageWithoutBasePath = new URL("/og.png", origin).toString();
const socialImage = new URL(`${basePath}og.png`, origin).toString();
const html = renderedHtml
  .replaceAll(socialImageWithoutBasePath, socialImage)
  .replaceAll(`content="${origin}"`, `content="${pageUrl.toString()}"`);

if (!html.includes("Запускаем цех.")) {
  throw new Error("Static export does not contain the landing page content.");
}

if (!html.includes(`${basePath}_next/`)) {
  throw new Error(`Static assets are not configured for ${basePath}.`);
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
await Promise.all([
  writeFile(new URL("index.html", outputDirectory), html),
  writeFile(new URL("404.html", outputDirectory), html),
  writeFile(new URL(".nojekyll", outputDirectory), ""),
]);

process.stdout.write(`GitHub Pages export created for ${pageUrl.toString()}\n`);
