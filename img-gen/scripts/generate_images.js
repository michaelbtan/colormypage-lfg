// generate_images.js  ─────────────────────────────────────────────
//  Generate images with GPT-Image-1, respecting a rate-limit
//  (default: 5 images per 60 s window).

const OpenAI = require("openai");
const fs      = require("fs");
const path    = require("path");
const https   = require("https");
const dotenv  = require("dotenv");

dotenv.config();

// ── read & parse config ──────────────────────────────────────────
const CONFIG_PATH = process.env.CONFIG_PATH ?? "./config.json";
const cfg         = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));

const {
  prompt,
  prompts,
  batchSize      = 20,
  outDir         = "images",
  model          = "gpt-image-1",
  size           = "1024x1536",
  quality        = "high",
  // ‣ optional overrides for rate-limit
  maxPerWindow   = 5,           // images allowed per window
  windowMs       = 60_000       // 60 s
} = cfg;

// Normalise into an array so the rest of the script is uniform
const promptList = Array.isArray(prompts)
  ? prompts.map(p => ({ 
      prompt: typeof p === 'string' ? p : p.description || p.title || p, 
      original: p 
    }))
  : (prompt ? [{ prompt, original: prompt }] : []);

if (promptList.length === 0) {
  console.error("🚫  No prompt(s) found. Add `prompt` or `prompts` to config.json.");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// helpers ─────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function slugify(str, maxLength = 100) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")        // spaces → underscores
    .replace(/[^\w\-]+/g, "")    // drop non-alphanumerics/underscores
    .slice(0, maxLength);
}

function downloadTo(filePath, url) {
  return new Promise((resolve, reject) => {
    https.get(url, (stream) => {
      const out = fs.createWriteStream(filePath);
      stream.pipe(out);
      out.on("finish", () => out.close(resolve));
    }).on("error", reject);
  });
}
// ─────────────────────────────────────────────────────────────────

let imagesInWindow = 0;
let windowStart    = Date.now();

async function generateImages(forPrompt, originalPrompt) {
  const fullPrompt = (process.env.COLORING_PROMPT || "") + forPrompt;
  console.log(`\n• Requesting ${batchSize} image(s)…`);
  console.log(`  prompt: "${fullPrompt}"`);

  const { data } = await openai.images.generate({
    model,
    prompt: fullPrompt,
    n:     batchSize,
    size,
    quality
  });

  fs.mkdirSync(outDir, { recursive: true });
  const base = slugify(originalPrompt && originalPrompt.title ? originalPrompt.title : forPrompt);

  for (const [i, img] of data.entries()) {
    const suffix = batchSize > 1 ? `-${i + 1}` : "";
    const file   = path.join(outDir, `${base}${suffix}.png`);

    try {
      if (img.b64_json) {
        fs.writeFileSync(file, Buffer.from(img.b64_json, "base64"));
      } else if (img.url) {
        await downloadTo(file, img.url);
      } else {
        console.error("❗ Unrecognised image payload:", img);
        continue;
      }
      console.log(`✓ Saved ${file}`);
    } catch (err) {
      console.error(`❗ Failed saving “${file}”:`, err);
    }
  }

  // ── rate-limit bookkeeping ────────────────────────────────────
  imagesInWindow += batchSize;
  if (imagesInWindow >= maxPerWindow) {
    const elapsed = Date.now() - windowStart;
    const remaining = windowMs - elapsed;
    if (remaining > 0) {
      console.log(`⏳ Rate-limit reached (${imagesInWindow}/${maxPerWindow}). Waiting ${Math.ceil(remaining / 1000)} s…`);
      await sleep(remaining);
    }
    // reset for next window
    imagesInWindow = 0;
    windowStart    = Date.now();
  }
}
// ─────────────────────────────────────────────────────────────────

(async () => {
  for (const p of promptList) {
    await generateImages(p.prompt, p.original);
  }
  console.log(`\nAll done – generated ${promptList.length} prompt(s).\n`);
})().catch((err) => {
  console.error("\n🚫 Image generation failed:");
  console.error(err);
});
