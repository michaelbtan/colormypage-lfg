// generate_images.js  ─────────────────────────────────────────────
//  Generate images with GPT-Image-1, save each as <prompt>.png
//  • Defaults: portrait 1024×1536, high quality, 1 image
//  • Adds COLORING_PROMPT env-prefix to each prompt
//  • Filenames are slugified prompts (spaces→underscores, lower-cased)

const OpenAI = require("openai");
const fs      = require("fs");
const path    = require("path");
const https   = require("https");
const dotenv  = require("dotenv");

dotenv.config();

// ── read & parse config ──────────────────────────────────────────
const CONFIG_PATH = process.env.CONFIG_PATH ?? "./config.json";
const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));

const {
  prompt,
  batchSize = 1,
  outDir   = "images",
  model    = "gpt-image-1",
  size     = "1024x1536",   // aspect ≈ 1 : 1.5 (good for 8½×11 in.)
  quality  = "high"
} = cfg;
// ─────────────────────────────────────────────────────────────────

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// helper ─────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")        // spaces → underscores
    .replace(/[^\w\-]+/g, "");   // drop non-alphanumerics/underscores
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

async function generateImages() {
  const fullPrompt = (process.env.COLORING_PROMPT || "") + prompt;
  console.log(`\n• Requesting ${batchSize} image(s) with model “${model}”…`);
  console.log(`  prompt: "${fullPrompt}"`);

  const { data } = await openai.images.generate({
    model,
    prompt: fullPrompt,
    n: batchSize,
    size,
    quality
  });

  fs.mkdirSync(outDir, { recursive: true });
  const base = slugify(prompt);

  for (const [i, img] of data.entries()) {
    // “-1”, “-2”, … if generating multiples
    const suffix = batchSize > 1 ? `-${i + 1}` : "";
    const file   = path.join(outDir, `${base}${suffix}.png`);

    if (img.b64_json) {
      fs.writeFileSync(file, Buffer.from(img.b64_json, "base64"));
    } else if (img.url) {
      await downloadTo(file, img.url);
    } else {
      console.error("❗ Unrecognized image payload:", img);
      continue;
    }
    console.log(`✓ Saved ${file}`);
  }

  console.log(`\nAll done – ${batchSize} image(s) in “${outDir}”.\n`);
}

generateImages().catch((err) => {
  console.error("\n🚫 Image generation failed:");
  console.error(err);
});
