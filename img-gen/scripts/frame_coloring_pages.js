// make_coloring_pages.js
//
// Convert every portrait image in ./images into a framed coloring page
// and save each result in ./coloring_pages.
//
// Prerequisites:
//   npm install sharp
//
// Layout reference (all at 300 DPI):
//   ┌────────────────────────────── 8 in ───────────────────────────────┐
//   │  ↙ 0.5 in (150 px) margin                                         │
//   │  ┌────────────────────────────────────────────────────────────┐    │
//   │  │ 10 px black border (drawn in frame PNG itself)             │    │
//   │  │                                                            │    │
//   │  │  ← 2080 px →  (INNER_W)                                    │    │
//   │  │  ↑                                                       ↑ │    │
//   │  │  2830 px             (photo area / INNER_H)              │ │    │
//   │  │  ↓                                                       ↓ │    │
//   │  │                                                            │    │
//   │  └────────────────────────────────────────────────────────────┘    │
//   │                                                                    │
//   └────────────────────────── 10.5 in ─────────────────────────────────┘

const fs   = require("fs");
const path = require("path");
const sharp = require("sharp");

// -----------------------------------------------------------------------------
// CONFIGURATION – adjust these paths/numbers if your frame PNG changes
// -----------------------------------------------------------------------------

// ⚠️ Use the frame that already contains the watermark & solid centre –
// we will cut the window out programmatically so you don't have to edit
// the artwork by hand.
const FRAME_PATH = path.resolve(__dirname, "frame.png");
// If you prefer the quarter‑watermark version, change to: "frame_quarterwatermark.png"

const INPUT_DIR  = path.resolve(__dirname, "..", "images");
const OUTPUT_DIR = path.resolve(__dirname, "..", "coloring_pages");

const DPI     = 300;
const FRAME_W = 8   * DPI;  // 2400 px
const FRAME_H = 10.5 * DPI; // 3150 px
const MARGIN  = 0.5 * DPI;  // 150 px
const BORDER  = 10;         // border thickness in the PNG

const INNER_LEFT = MARGIN + BORDER;                  // 160 px
const INNER_TOP  = MARGIN + BORDER;                  // 160 px
const INNER_W    = FRAME_W - 2 * (MARGIN + BORDER);  // 2080 px
const INNER_H    = FRAME_H - 2 * (MARGIN + BORDER);  // 2830 px

// Regex for acceptable input extensions
const IMG_EXT_RE = /\.(png|jpe?g|webp)$/i;

// -----------------------------------------------------------------------------
// Ensure output folder exists
// -----------------------------------------------------------------------------

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// -----------------------------------------------------------------------------
// Helper – build an in‑memory frame with a transparent window so the
// watermark/border sit *on top* of the photo instead of being covered by it.
// -----------------------------------------------------------------------------
async function buildWindowedFrame() {
  // Draw a rectangle the exact size of the photo area and use the
  // "dest-out" blend mode to punch that area to transparency.
  const windowSVG = Buffer.from(`
    <svg width=\"${FRAME_W}\" height=\"${FRAME_H}\" xmlns=\"http://www.w3.org/2000/svg\">
      <rect x=\"${INNER_LEFT}\" y=\"${INNER_TOP}\" width=\"${INNER_W}\" height=\"${INNER_H}\" fill=\"#ffffff\" />
    </svg>`);

  return sharp(FRAME_PATH)
    .ensureAlpha()
    .composite([{ input: windowSVG, blend: "dest-out" }])
    .png()
    .toBuffer();
}

// -----------------------------------------------------------------------------
// Main processing loop
// -----------------------------------------------------------------------------

(async () => {
  // Build the windowed frame **once** so we can reuse the buffer for every file
  const FRAME_BUFFER = await buildWindowedFrame();

  const files = fs.readdirSync(INPUT_DIR).filter(f => IMG_EXT_RE.test(f));

  if (files.length === 0) {
    console.warn("No images found in ./images – nothing to do.");
    return;
  }

  for (const name of files) {
    const inputPath  = path.join(INPUT_DIR, name);
    const outputName = `${path.parse(name).name}_coloring.png`;
    const outputPath = path.join(OUTPUT_DIR, outputName);

    console.log(`▶︎ ${name} → ${outputName}`);

    // Resize **and crop** so the photo completely covers the inner area.
    // This guarantees zero white margin; outer edges are trimmed if aspect
    // ratios don't match.
    const photoBuffer = await sharp(inputPath)
      .resize(INNER_W, INNER_H, { fit: "cover", position: "centre" })
      .png()
      .toBuffer();

    // Build a blank canvas the full page size, then paint the photo and
    // finally the frame (with its transparent window) on top.
    await sharp({
      create: {
        width: FRAME_W,
        height: FRAME_H,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 } // solid white page
      }
    })
      .composite([
        { input: photoBuffer,  left: INNER_LEFT, top: INNER_TOP },
        { input: FRAME_BUFFER, left: 0,          top: 0 } // border + watermark on top
      ])
      .png({ compressionLevel: 9 })
      .toFile(outputPath);
  }

  console.log("✔︎ All done! Check the ./coloring_pages folder.");
})();
