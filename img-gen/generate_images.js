// generate_images.js
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// ---- read & parse the config file -----------------
const CONFIG_PATH = process.env.CONFIG_PATH ?? "./config.json";
const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));

const {
  prompt,
  batchSize = 1,
  outDir = "images",
  model = "gpt-image-1",
  size
} = cfg;
// ----------------------------------------------------

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateImages() {
  console.log(`Requesting ${batchSize} images with model ${model}…`);

  const { data } = await openai.images.generate({
    model,
    prompt,
    n: batchSize,
    response_format: "b64_json",
    ...(size ? { size } : {})   // only include if defined
  });

  data.forEach(({ b64_json }, i) => {
    const file = path.join(outDir, `image_${i + 1}.png`);
    fs.writeFileSync(file, Buffer.from(b64_json, "base64"));
    console.log(`✓ Saved ${file}`);
  });

  console.log(`All done – ${batchSize} images in “${outDir}”.`);
}

generateImages().catch(console.error);
