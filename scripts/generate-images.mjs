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
  "how-to-calculate-percentage-change": frame("rose", (c) => `
    <circle cx="520" cy="340" r="70"/>
    <circle cx="760" cy="600" r="70"/>
    <path d="M800 260 L480 700" stroke-width="18"/>
    <path d="M960 720 V560 M1080 720 V470 M1200 720 V360" stroke-width="54" stroke="${c.mid}"/>
    <path d="M900 720 H1280" />
    <path d="M940 520 L1070 410 L1150 440 L1260 300"/>
    <path d="M1200 300 H1260 V360"/>
  `),
  "why-does-my-house-smell-like-sewage": frame("amber", (c) => `
    <path d="M420 300 H860 V360 H420 Z" fill="${c.mid}"/>
    <path d="M640 360 V470"/>
    <path d="M640 470 C640 600 800 600 800 470 V420 H900"/>
    <path d="M900 420 H1180"/>
    <path d="M560 250 C530 210 590 180 560 140 M660 240 C630 200 690 170 660 130 M760 250 C730 210 790 180 760 140" stroke-width="10" opacity="0.7"/>
    <path d="M1060 560 L1180 680 M1180 560 L1060 680" stroke-width="12" opacity="0.8"/>
  `),
  "how-to-get-rid-of-gnats": frame("emerald", (c) => `
    <path d="M480 560 H800 L760 760 H520 Z" fill="${c.mid}"/>
    <path d="M640 560 C640 460 560 400 500 380 M640 560 C650 450 720 390 790 370 M640 560 V420"/>
    <ellipse cx="500" cy="380" rx="50" ry="26" fill="${c.mid}"/>
    <ellipse cx="790" cy="370" rx="50" ry="26" fill="${c.mid}"/>
    <rect x="1000" y="360" width="200" height="280" rx="16" fill="#facc15" stroke="${c.ink}" opacity="0.85"/>
    ${[[1060,440],[1130,500],[1080,560],[1150,600]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${c.ink}" stroke="none"/>`).join("")}
    ${[[600,300],[700,260],[860,320],[560,220],[920,250]].map(([x,y]) => `<g stroke-width="5"><ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="${c.ink}" stroke="none"/><path d="M${x-4} ${y-5} C${x-18} ${y-22} ${x-3} ${y-24} ${x} ${y-7} M${x+4} ${y-5} C${x+18} ${y-22} ${x+3} ${y-24} ${x} ${y-7}"/></g>`).join("")}
  `),
  "why-is-my-laptop-so-slow": frame("blue", (c) => `
    <rect x="480" y="220" width="560" height="360" rx="24"/>
    <path d="M400 640 H1120 L1080 580 H440 Z" fill="${c.mid}"/>
    <path d="M760 330 A70 70 0 1 1 690 400" stroke-width="16"/>
    <path d="M1180 660 C1180 600 1260 580 1290 630 C1320 680 1260 700 1230 680 M1150 680 H1330"/>
    <circle cx="1300" cy="600" r="6" fill="${c.ink}"/>
  `),
  "how-to-remove-sticker-residue": frame("emerald", (c) => `
    <rect x="520" y="220" width="320" height="480" rx="40"/>
    <path d="M520 300 H840"/>
    <path d="M560 400 H800 V560 H660 L560 520 Z" fill="${c.mid}"/>
    <path d="M660 560 L800 520" stroke-width="10"/>
    <path d="M960 460 C1040 420 1140 440 1200 500 C1150 560 1040 580 960 540 Z" fill="${c.mid}"/>
    <circle cx="1050" cy="330" r="16" fill="${c.ink}" stroke="none" opacity="0.5"/>
    <circle cx="1120" cy="380" r="10" fill="${c.ink}" stroke="none" opacity="0.5"/>
  `),
  "why-is-my-phone-storage-full": frame("blue", (c) => `
    <rect x="600" y="160" width="320" height="600" rx="52"/>
    <path d="M720 210 H800"/>
    <rect x="650" y="300" width="100" height="100" rx="12" fill="${c.mid}"/>
    <rect x="770" y="300" width="100" height="100" rx="12" fill="${c.mid}"/>
    <rect x="650" y="420" width="100" height="100" rx="12" fill="${c.mid}"/>
    <rect x="770" y="420" width="100" height="100" rx="12" fill="${c.mid}"/>
    <rect x="650" y="600" width="220" height="30" rx="15"/>
    <rect x="650" y="600" width="210" height="30" rx="15" fill="${c.ink}"/>
    <path d="M1080 300 L1180 400 M1180 300 L1080 400" stroke-width="12" opacity="0.8"/>
  `),
  "how-to-calculate-a-tip": frame("rose", (c) => `
    <path d="M520 160 H860 V740 L820 710 L780 740 L740 710 L700 740 L660 710 L620 740 L580 710 L520 740 Z" fill="${c.bg}"/>
    <path d="M580 260 H800 M580 330 H760 M580 400 H800 M580 520 H700" stroke-width="10"/>
    <path d="M740 520 H800" stroke-width="16"/>
    <circle cx="1060" cy="330" r="46"/>
    <circle cx="1220" cy="500" r="46"/>
    <path d="M1250 280 L1030 560" stroke-width="18"/>
    <circle cx="1080" cy="660" r="54" fill="${c.mid}"/>
    <circle cx="1200" cy="690" r="44" fill="${c.mid}"/>
  `),
  "how-to-increase-water-pressure-in-house": frame("blue", (c) => `
    <path d="M420 260 H700 V330"/>
    <path d="M600 330 H800 L780 400 H620 Z" fill="${c.mid}"/>
    <path d="M650 450 V480 M700 450 V500 M750 450 V480" stroke-width="10"/>
    <circle cx="700" cy="560" r="8" fill="${c.ink}" stroke="none"/>
    <circle cx="1100" cy="450" r="170"/>
    <path d="M990 520 A120 120 0 0 1 1210 520" stroke-width="10" opacity="0.6"/>
    <path d="M1100 450 L1010 400" stroke-width="16"/>
    <circle cx="1100" cy="450" r="18" fill="${c.ink}"/>
  `),
  "why-does-my-water-smell-like-rotten-eggs": frame("amber", (c) => `
    <path d="M500 220 H760 V280 H700 V330"/>
    <path d="M700 380 V410 M700 450 V470" stroke-width="10"/>
    <path d="M600 500 H800 L770 760 H630 Z" fill="${c.mid}"/>
    <path d="M620 560 H780" stroke-width="8" opacity="0.6"/>
    <path d="M900 520 C870 480 930 450 900 410 M980 540 C950 500 1010 470 980 430 M1060 520 C1030 480 1090 450 1060 410" stroke-width="10" opacity="0.7"/>
    <ellipse cx="1180" cy="660" rx="60" ry="80"/>
  `),
  "why-does-my-water-taste-like-chlorine": frame("blue", (c) => `
    <path d="M520 360 H700 L680 740 H540 Z" fill="${c.mid}"/>
    <path d="M540 440 H680" stroke-width="8" opacity="0.6"/>
    <path d="M840 300 H1100 L1080 340 V740 H860 V340 Z"/>
    <path d="M860 420 H1080" stroke-width="10"/>
    <rect x="930" y="340" width="80" height="140" rx="16" fill="${c.mid}"/>
    <path d="M1100 380 C1180 380 1180 560 1100 560"/>
  `),
  "fridge-not-cooling-but-freezer-is": frame("blue", (c) => `
    <rect x="560" y="140" width="360" height="640" rx="28"/>
    <path d="M560 360 H920"/>
    <path d="M880 230 V300 M880 420 V520" stroke-width="12"/>
    <rect x="570" y="150" width="340" height="200" rx="20" fill="${c.mid}" stroke="none"/>
    <path d="M700 230 L760 290 M760 230 L700 290 M730 220 V300 M690 260 H770" stroke-width="8"/>
    <path d="M1080 360 C1050 320 1110 290 1080 250 M1150 380 C1120 340 1180 310 1150 270" stroke-width="10" opacity="0.7"/>
  `),
  "why-is-my-dishwasher-not-draining": frame("emerald", (c) => `
    <rect x="520" y="160" width="460" height="600" rx="24"/>
    <path d="M520 260 H980"/>
    <circle cx="590" cy="210" r="14" fill="${c.ink}"/>
    <path d="M560 620 C620 600 680 640 740 620 C800 600 860 640 940 620 V720 H560 Z" fill="${c.mid}"/>
    <circle cx="750" cy="560" r="40"/>
    <path d="M1080 540 H1240 V640" />
    <path d="M1200 600 L1280 680" stroke-width="12" opacity="0.8"/>
  `),
  "why-does-my-washing-machine-smell": frame("emerald", (c) => `
    <rect x="520" y="180" width="440" height="560" rx="30"/>
    <path d="M520 290 H960"/>
    <circle cx="740" cy="510" r="150"/>
    <circle cx="740" cy="510" r="100" fill="${c.mid}"/>
    <rect x="560" y="220" width="120" height="40" rx="10"/>
    <path d="M1060 480 C1030 440 1090 410 1060 370 M1130 500 C1100 460 1160 430 1130 390 M1200 480 C1170 440 1230 410 1200 370" stroke-width="10" opacity="0.7"/>
  `),
  // Guides missing here use designed photos supplied by the editor.
};


await fs.mkdir(out("public/images/articles"), { recursive: true });

for (const [slug, svg] of Object.entries(illustrations)) {
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(out("public/images/articles", `${slug}.webp`));
  console.log(`✓ public/images/articles/${slug}.webp`);
}

