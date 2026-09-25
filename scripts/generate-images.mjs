/**
 * Generates the brand assets and the illustrated featured images used by the
 * sample articles. Run with `npm run images`. Output is committed, so this only
 * needs to run when you change an illustration.
 *
 * For real articles, drop your own image into public/images/articles/ and
 * reference it from the article's front matter instead.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const out = (...p) => path.join(root, ...p);

const W = 1600;
const H = 900;

const palette = {
  amber: { bg: "#fbf0dc", mid: "#f3d9a8", ink: "#9a5b00" },
  blue: { bg: "#e5edfd", mid: "#bccffa", ink: "#1d4ed8" },
  violet: { bg: "#efe8fc", mid: "#d3c2f6", ink: "#6d28d9" },
  emerald: { bg: "#def5ec", mid: "#afe3cf", ink: "#047857" },
  rose: { bg: "#fde6eb", mid: "#f7bccb", ink: "#be123c" },
};

function frame(color, inner) {
  const c = palette[color];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${c.bg}"/>
  <circle cx="1380" cy="140" r="260" fill="${c.mid}" opacity="0.55"/>
  <circle cx="180" cy="820" r="220" fill="${c.mid}" opacity="0.45"/>
  <g fill="none" stroke="${c.ink}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">${inner(c)}</g>
</svg>`;
}

const dots = (points, r, fill, opacity = 0.8) =>
  points.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${r + (i % 3)}" fill="${fill}" stroke="none" opacity="${opacity}"/>`).join("");

const illustrations = {
  "why-is-my-house-so-dusty": frame("amber", (c) => `
    <path d="M520 470 L800 250 L1080 470"/>
    <path d="M580 430 V720 H1020 V430"/>
    <rect x="740" y="560" width="120" height="160" rx="10"/>
    <rect x="620" y="480" width="90" height="80" rx="8"/>
    <rect x="890" y="480" width="90" height="80" rx="8"/>
    <path d="M300 180 L700 520" stroke="${c.mid}" stroke-width="70" opacity="0.6"/>
    ${dots([[380,260],[430,330],[500,300],[470,390],[560,380],[610,450],[330,340],[640,520],[520,460],[410,420],[1180,300],[1230,380],[1150,420],[1260,520],[1200,580]], 8, c.ink, 0.55)}
  `),
  "how-to-clean-a-dusty-house": frame("amber", (c) => `
    <rect x="430" y="330" width="170" height="300" rx="28"/>
    <path d="M460 330 V270 H560 V330"/>
    <path d="M560 270 H640 L660 300"/>
    <path d="M660 300 L720 270 M660 300 L730 310 M660 300 L720 345" stroke-width="10"/>
    <path d="M760 560 C820 520 900 600 960 560 C1020 520 1080 600 1140 560 L1160 660 C1100 700 1020 620 960 660 C900 700 820 620 780 660 Z" fill="${c.mid}"/>
    <path d="M1180 250 V560"/>
    <rect x="1120" y="560" width="160" height="70" rx="20"/>
    <circle cx="1150" cy="660" r="22"/>
    <circle cx="1250" cy="660" r="22"/>
    <path d="M400 700 H1320" stroke-width="8" opacity="0.4"/>
  `),
  "why-does-my-room-smell-musty": frame("amber", (c) => `
    <rect x="400" y="200" width="420" height="440" rx="18"/>
    <path d="M610 200 V640 M400 420 H820"/>
    ${dots([[470,300],[520,360],[700,280],[760,350],[480,500],[560,560],[690,520],[750,590],[640,470]], 9, c.ink, 0.45)}
    <path d="M470 700 C500 670 530 730 560 700 C590 670 620 730 650 700" stroke-width="10" opacity="0.7"/>
    <rect x="960" y="360" width="240" height="320" rx="30"/>
    <path d="M1000 420 H1160 M1000 460 H1160 M1000 500 H1160" stroke-width="10"/>
    <circle cx="1080" cy="600" r="36"/>
    <path d="M1010 300 C1040 270 1070 330 1100 300 C1130 270 1160 330 1190 300" stroke-width="10" opacity="0.7"/>
  `),
  "iphone-not-charging": frame("blue", (c) => `
    <rect x="600" y="140" width="330" height="620" rx="54"/>
    <path d="M720 190 H810"/>
    <path d="M790 330 L700 470 H780 L740 600 L850 430 H770 L810 330 Z" fill="${c.mid}" stroke-width="12"/>
    <path d="M765 760 V810 C765 860 820 860 900 860 H1200" />
    <rect x="1200" y="820" width="120" height="80" rx="14"/>
    <path d="M1060 250 L1160 350 M1160 250 L1060 350" stroke-width="12" opacity="0.8"/>
  `),
  "why-is-my-wifi-not-working": frame("violet", (c) => `
    <rect x="520" y="560" width="560" height="170" rx="36"/>
    <circle cx="620" cy="645" r="14" fill="${c.ink}"/>
    <circle cx="680" cy="645" r="14" fill="${c.ink}"/>
    <circle cx="740" cy="645" r="14" fill="${c.mid}"/>
    <path d="M620 560 L580 420 M980 560 L1020 420"/>
    <path d="M640 360 A230 230 0 0 1 960 360"/>
    <path d="M690 420 A150 150 0 0 1 910 420"/>
    <path d="M745 475 A70 70 0 0 1 855 475"/>
    <circle cx="1180" cy="300" r="70" fill="${c.bg}"/>
    <path d="M1180 260 V310"/>
    <circle cx="1180" cy="342" r="4" fill="${c.ink}"/>
  `),
  "how-to-get-rid-of-fruit-flies": frame("emerald", (c) => `
    <path d="M380 560 H860 C860 690 760 750 620 750 C480 750 380 690 380 560 Z"/>
    <circle cx="520" cy="500" r="70" fill="${c.mid}"/>
    <circle cx="660" cy="470" r="80" fill="${c.mid}"/>
    <path d="M740 520 C780 420 860 410 880 450 C850 520 790 550 740 520 Z" fill="${c.mid}"/>
    <path d="M660 390 C670 360 690 350 710 345" stroke-width="10"/>
    <rect x="1020" y="440" width="220" height="310" rx="30"/>
    <path d="M1010 440 H1250" />
    <path d="M1030 620 H1230" stroke-width="10" opacity="0.6"/>
    ${[[1080,330],[1170,300],[930,380],[1250,360],[880,300]].map(([x,y]) => `<g stroke-width="6"><ellipse cx="${x}" cy="${y}" rx="12" ry="8" fill="${c.ink}" stroke="none"/><path d="M${x-6} ${y-6} C${x-24} ${y-28} ${x-4} ${y-30} ${x} ${y-8} M${x+6} ${y-6} C${x+24} ${y-28} ${x+4} ${y-30} ${x} ${y-8}"/></g>`).join("")}
  `),
  "how-to-calculate-percentage-change": frame("rose", (c) => `
    <circle cx="520" cy="340" r="70"/>
    <circle cx="760" cy="600" r="70"/>
    <path d="M800 260 L480 700" stroke-width="18"/>
    <path d="M960 720 V560 M1080 720 V470 M1200 720 V360" stroke-width="54" stroke="${c.mid}"/>
    <path d="M900 720 H1280" />
    <path d="M940 520 L1070 410 L1150 440 L1260 300"/>
    <path d="M1200 300 H1260 V360"/>
  `),
};

const logoSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="${size >= 256 ? 7 : 0}" fill="#0d6b5e"/>
  <path d="M9 10.5h14M16 10.5V23" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="22.5" cy="21.5" r="2.2" fill="#fff"/>
</svg>`;

await fs.mkdir(out("public/images/articles"), { recursive: true });

for (const [slug, svg] of Object.entries(illustrations)) {
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(out("public/images/articles", `${slug}.webp`));
  console.log(`✓ public/images/articles/${slug}.webp`);
}

await sharp(Buffer.from(logoSvg(512))).png().toFile(out("public/logo.png"));
console.log("✓ public/logo.png");
await sharp(Buffer.from(logoSvg(180))).png().toFile(out("src/app/apple-icon.png"));
console.log("✓ src/app/apple-icon.png");
