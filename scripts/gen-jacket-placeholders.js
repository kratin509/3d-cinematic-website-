/**
 * Generates three jacket placeholder PNGs using sharp.
 * Each image: 600×780px, transparent background, jacket silhouette
 * matching the Adidas track-jacket profile from the reference images.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "..", "public");

// ─── SVG jacket templates ────────────────────────────────────────────────────
// clipPath mimics a track-jacket silhouette: collar, body, two hem notches.
// Each variant swaps body fill, stripe color, and shadow tint.

function jacketSVG({ bodyColor, stripeColor, collarColor, shadowColor, label }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 780" width="600" height="780">
  <defs>
    <!-- Jacket silhouette clip -->
    <clipPath id="jacket-clip">
      <path d="
        M 200 60
        C 200 60 240 30 300 28 C 360 30 400 60 400 60
        L 460 100
        C 500 120 540 160 555 210
        L 580 340
        L 550 360
        L 520 260
        L 520 720
        L 395 720 L 395 680 L 205 680 L 205 720 L 80 720
        L 80 260
        L 50 360
        L 20 340
        L 45 210
        C 60 160 100 120 140 100
        Z
      "/>
    </clipPath>
    <!-- Gloss highlight gradient -->
    <linearGradient id="gloss" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="white" stop-opacity="0.18"/>
      <stop offset="40%"  stop-color="white" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="black" stop-opacity="0.22"/>
    </linearGradient>
    <!-- Diagonal stripe pattern -->
    <pattern id="diag-stripes" patternUnits="userSpaceOnUse" width="28" height="28" patternTransform="rotate(-45)">
      <rect width="28" height="28" fill="transparent"/>
      <rect width="5" height="28" fill="${stripeColor}" opacity="0.10"/>
    </pattern>
    <!-- Drop shadow filter -->
    <filter id="drop-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="18" flood-color="${shadowColor}" flood-opacity="0.55"/>
    </filter>
  </defs>

  <!-- Jacket body, clipped to silhouette -->
  <g clip-path="url(#jacket-clip)" filter="url(#drop-glow)">
    <!-- Base fill -->
    <path d="
      M 200 60
      C 200 60 240 30 300 28 C 360 30 400 60 400 60
      L 460 100 C 500 120 540 160 555 210 L 580 340 L 550 360 L 520 260
      L 520 720 L 395 720 L 395 680 L 205 680 L 205 720 L 80 720
      L 80 260 L 50 360 L 20 340 L 45 210
      C 60 160 100 120 140 100 Z
    " fill="${bodyColor}"/>

    <!-- Diagonal texture overlay -->
    <rect x="0" y="0" width="600" height="780" fill="url(#diag-stripes)"/>

    <!-- Gloss overlay -->
    <rect x="0" y="0" width="600" height="780" fill="url(#gloss)"/>

    <!-- ── Sleeve 3-stripe bands (left sleeve) ── -->
    <rect x="85"  y="120" width="45" height="12" rx="2" fill="${stripeColor}" opacity="0.85"/>
    <rect x="85"  y="138" width="45" height="12" rx="2" fill="${stripeColor}" opacity="0.85"/>
    <rect x="85"  y="156" width="45" height="12" rx="2" fill="${stripeColor}" opacity="0.85"/>
    <!-- White outline on stripes -->
    <rect x="84"  y="119" width="47" height="14" rx="2" fill="none" stroke="white" stroke-width="0.8" opacity="0.25"/>
    <rect x="84"  y="137" width="47" height="14" rx="2" fill="none" stroke="white" stroke-width="0.8" opacity="0.25"/>
    <rect x="84"  y="155" width="47" height="14" rx="2" fill="none" stroke="white" stroke-width="0.8" opacity="0.25"/>

    <!-- ── Sleeve 3-stripe bands (right sleeve) ── -->
    <rect x="470" y="120" width="45" height="12" rx="2" fill="${stripeColor}" opacity="0.85"/>
    <rect x="470" y="138" width="45" height="12" rx="2" fill="${stripeColor}" opacity="0.85"/>
    <rect x="470" y="156" width="45" height="12" rx="2" fill="${stripeColor}" opacity="0.85"/>
    <rect x="469" y="119" width="47" height="14" rx="2" fill="none" stroke="white" stroke-width="0.8" opacity="0.25"/>
    <rect x="469" y="137" width="47" height="14" rx="2" fill="none" stroke="white" stroke-width="0.8" opacity="0.25"/>
    <rect x="469" y="155" width="47" height="14" rx="2" fill="none" stroke="white" stroke-width="0.8" opacity="0.25"/>

    <!-- Center zip line -->
    <line x1="300" y1="55" x2="300" y2="720" stroke="white" stroke-width="1.5" opacity="0.20"/>
    <!-- Zip pull tab -->
    <rect x="293" y="110" width="14" height="20" rx="3" fill="white" opacity="0.30"/>

    <!-- Collar seam -->
    <path d="M 230 68 Q 300 38 370 68" fill="none" stroke="white" stroke-width="2.5" opacity="0.30"/>

    <!-- Left chest: "ADIDAS ORIGINALS" text block -->
    <text x="148" y="295" font-family="Arial, sans-serif" font-weight="900" font-size="18"
          letter-spacing="1" fill="white" opacity="0.70" text-anchor="middle"
          transform="rotate(-2, 148, 295)">ADIDAS</text>
    <text x="148" y="316" font-family="Arial, sans-serif" font-weight="900" font-size="14"
          letter-spacing="2" fill="white" opacity="0.60" text-anchor="middle"
          transform="rotate(-2, 148, 316)">ORIGINALS</text>
    <!-- Underline rule -->
    <line x1="105" y1="323" x2="192" y2="320" stroke="white" stroke-width="1" opacity="0.35"/>

    <!-- Right chest: adidas trefoil substitute (three overlapping circles) -->
    <circle cx="430" cy="292" r="16" fill="none" stroke="white" stroke-width="3" opacity="0.55"/>
    <circle cx="420" cy="308" r="16" fill="none" stroke="white" stroke-width="3" opacity="0.55"/>
    <circle cx="440" cy="308" r="16" fill="none" stroke="white" stroke-width="3" opacity="0.55"/>
    <text x="430" y="336" font-family="Arial, sans-serif" font-weight="900" font-size="11"
          letter-spacing="1" fill="white" opacity="0.50" text-anchor="middle">adidas</text>

    <!-- Side pocket openings -->
    <line x1="115" y1="490" x2="115" y2="570" stroke="white" stroke-width="1.5" opacity="0.25"/>
    <line x1="485" y1="490" x2="485" y2="570" stroke="white" stroke-width="1.5" opacity="0.25"/>

    <!-- Hem ribbing lines -->
    <line x1="82"  y1="690" x2="390" y2="690" stroke="white" stroke-width="1" opacity="0.15"/>
    <line x1="82"  y1="700" x2="390" y2="700" stroke="white" stroke-width="1" opacity="0.10"/>
    <line x1="210" y1="690" x2="390" y2="690" stroke="white" stroke-width="1" opacity="0.15"/>
    <line x1="210" y1="700" x2="390" y2="700" stroke="white" stroke-width="1" opacity="0.10"/>
  </g>
</svg>`;
}

const jackets = [
  {
    file: "jacket-black.png",
    bodyColor: "#111111",
    stripeColor: "#FF0033",
    collarColor: "#1a1a1a",
    shadowColor: "#FF0033",
    label: "BLACK",
  },
  {
    file: "jacket-red.png",
    bodyColor: "#CC0022",
    stripeColor: "#FFFFFF",
    collarColor: "#aa001a",
    shadowColor: "#FF0033",
    label: "RED",
  },
  {
    file: "jacket-white.png",
    bodyColor: "#E8E8E8",
    stripeColor: "#FF0033",
    collarColor: "#d5d5d5",
    shadowColor: "#CCCCCC",
    label: "WHITE",
  },
];

(async () => {
  for (const j of jackets) {
    const svg = Buffer.from(jacketSVG(j));
    const outPath = path.join(OUT, j.file);
    await sharp(svg)
      .png({ compressionLevel: 8 })
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`✓ ${j.file}  (${(stat.size / 1024).toFixed(1)} KB)`);
  }
  console.log("\nAll jacket PNGs written to /public");
})();
