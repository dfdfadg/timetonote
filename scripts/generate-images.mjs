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
  "why-is-my-smoke-detector-chirping": frame("rose", (c) => `
    <path d="M400 200 H1200"/>
    <path d="M620 200 V250 H980 V200"/>
    <ellipse cx="800" cy="300" rx="220" ry="70" fill="${c.mid}"/>
    <circle cx="800" cy="300" r="14" fill="${c.ink}"/>
    <path d="M1060 380 C1100 420 1100 480 1060 520 M1130 350 C1190 410 1190 490 1130 550" stroke-width="10" opacity="0.7"/>
    <path d="M540 380 C500 420 500 480 540 520 M470 350 C410 410 410 490 470 550" stroke-width="10" opacity="0.7"/>
    <rect x="720" y="520" width="160" height="220" rx="18"/>
    <path d="M770 505 H830" stroke-width="16"/>
    <rect x="745" y="660" width="110" height="55" rx="8" fill="${c.mid}"/>
  `),
  "why-is-my-furnace-blowing-cold-air": frame("amber", (c) => `
    <rect x="460" y="200" width="320" height="520" rx="24"/>
    <path d="M460 330 H780"/>
    <path d="M530 400 H710 M530 460 H710 M530 520 H710" stroke-width="8" opacity="0.6"/>
    <rect x="560" y="600" width="120" height="60" rx="10" fill="${c.mid}"/>
    <rect x="900" y="240" width="160" height="200" rx="24"/>
    <circle cx="980" cy="330" r="46" fill="${c.mid}"/>
    <path d="M900 560 H1260 V720 H900 Z" fill="${c.bg}"/>
    <path d="M940 600 H1220 M940 640 H1220 M940 680 H1220" stroke-width="8"/>
    <path d="M1080 520 V470 M1055 485 L1105 505 M1105 485 L1055 505" stroke-width="10" opacity="0.8"/>
  `),
  "why-is-there-condensation-on-my-windows": frame("blue", (c) => `
    <rect x="460" y="170" width="520" height="600" rx="16"/>
    <path d="M720 170 V770 M460 470 H980"/>
    ${[[540,260],[620,330],[820,250],[900,340],[560,560],[860,600],[640,660],[900,700]].map(([x,y]) => `<path d="M${x} ${y-24} C${x+16} ${y} ${x+16} ${y+16} ${x} ${y+16} C${x-16} ${y+16} ${x-16} ${y} ${x} ${y-24} Z" fill="${c.mid}" stroke-width="6"/>`).join("")}
    <circle cx="1170" cy="420" r="110"/>
    <path d="M1100 470 A80 80 0 0 1 1240 470" stroke-width="10" opacity="0.6"/>
    <path d="M1170 420 L1230 370" stroke-width="14"/>
    <circle cx="1170" cy="420" r="14" fill="${c.ink}"/>
  `),
  "why-is-my-water-heater-making-noise": frame("amber", (c) => `
    <rect x="600" y="180" width="300" height="560" rx="60"/>
    <path d="M680 180 V120 M820 180 V120" stroke-width="16"/>
    <rect x="690" y="420" width="120" height="70" rx="10" fill="${c.mid}"/>
    <path d="M620 690 H880" stroke-width="10" opacity="0.6"/>
    <path d="M960 500 C1000 540 1000 600 960 640 M1030 470 C1090 530 1090 610 1030 670 M1100 440 C1180 520 1180 620 1100 700" stroke-width="10" opacity="0.7"/>
    <circle cx="700" cy="660" r="10" fill="${c.ink}"/>
    <circle cx="760" cy="645" r="8" fill="${c.ink}"/>
    <circle cx="820" cy="665" r="10" fill="${c.ink}"/>
  `),
  "how-to-get-rid-of-stink-bugs": frame("emerald", (c) => `
    <path d="M360 640 H1240"/>
    <path d="M620 300 L720 260 H820 L920 300 L880 520 L770 580 L660 520 Z" fill="${c.mid}"/>
    <path d="M770 300 V560" stroke-width="8"/>
    <path d="M700 250 L660 180 M840 250 L880 180" stroke-width="8"/>
    <path d="M640 380 L560 350 M630 460 L550 480 M900 380 L980 350 M910 460 L990 480" stroke-width="8"/>
    <rect x="1040" y="420" width="160" height="220" rx="22"/>
    <path d="M1040 500 H1200" stroke-width="8" opacity="0.6"/>
    <circle cx="1090" cy="560" r="12" fill="${c.mid}"/>
    <circle cx="1140" cy="590" r="10" fill="${c.mid}"/>
  `),
  "how-to-view-saved-reels-on-facebook": frame("blue", (c) => `
    <rect x="600" y="160" width="320" height="600" rx="52"/>
    <path d="M720 210 H800"/>
    <rect x="630" y="240" width="260" height="460" rx="20" fill="${c.mid}"/>
    <path d="M730 400 L830 460 L730 520 Z" fill="${c.ink}" stroke="none"/>
    <path d="M1080 300 H1200 V520 L1140 470 L1080 520 Z" fill="${c.mid}"/>
  `),
  "delete-youtube-search-history-on-your-phone": frame("rose", (c) => `
    <rect x="560" y="160" width="320" height="600" rx="52"/>
    <path d="M680 210 H760"/>
    <rect x="600" y="260" width="240" height="60" rx="30"/>
    <circle cx="640" cy="290" r="14"/>
    <rect x="600" y="380" width="240" height="160" rx="24" fill="${c.mid}"/>
    <path d="M700 420 L760 460 L700 500 Z" fill="${c.ink}" stroke="none"/>
    <path d="M1030 330 H1230 M1070 330 V300 H1190 V330 M1060 330 L1080 560 H1180 L1200 330" />
    <path d="M1110 380 V510 M1150 380 V510" stroke-width="8"/>
  `),
  "how-to-sign-up-for-walmart-plus": frame("blue", (c) => `
    <rect x="460" y="160" width="320" height="600" rx="52"/>
    <path d="M580 210 H660"/>
    <path d="M510 360 H560 L590 500 H710 L740 400 H575" />
    <circle cx="605" cy="545" r="16" fill="${c.ink}"/>
    <circle cx="695" cy="545" r="16" fill="${c.ink}"/>
    <path d="M930 380 H1210 V620 H930 Z" fill="${c.mid}"/>
    <path d="M930 380 L1070 300 L1210 380 M1070 380 V620" />
    <path d="M1070 160 V260 M1020 210 H1120" stroke-width="16"/>
  `),
  "taco-bell-app-not-working": frame("violet", (c) => `
    <rect x="560" y="160" width="320" height="600" rx="52"/>
    <path d="M680 210 H760"/>
    <circle cx="720" cy="460" r="90" fill="${c.mid}"/>
    <path d="M720 410 V470 M720 505 V510" stroke-width="16"/>
    <path d="M980 560 A150 150 0 0 1 1280 560 Z" fill="${c.mid}"/>
    <path d="M1030 520 H1060 M1100 490 H1130 M1170 510 H1200" stroke-width="10"/>
  `),
  "amazon-package-says-delivered-but-not-here": frame("amber", (c) => `
    <rect x="480" y="200" width="300" height="540" rx="10"/>
    <circle cx="740" cy="480" r="12" fill="${c.ink}"/>
    <path d="M400 740 H1240"/>
    <path d="M900 520 H1140 V740 H900 Z" fill="${c.bg}" stroke-dasharray="24 18"/>
    <path d="M980 590 C980 550 1060 550 1060 590 C1060 620 1020 625 1020 660 M1020 690 V695" stroke-width="12"/>
  `),
  "how-to-cancel-costco-membership": frame("rose", (c) => `
    <rect x="440" y="300" width="480" height="300" rx="28" fill="${c.mid}"/>
    <path d="M440 380 H920" stroke-width="18"/>
    <path d="M490 480 H660 M490 530 H600" stroke-width="10"/>
    <path d="M760 450 L860 550 M860 450 L760 550" stroke-width="14"/>
    <circle cx="1130" cy="450" r="110"/>
    <path d="M1130 390 V510 M1095 420 C1095 395 1165 395 1165 420 C1165 450 1095 450 1095 480 C1095 505 1165 505 1165 480" stroke-width="10"/>
  `),
  "how-to-delete-ebay-account": frame("blue", (c) => `
    <rect x="440" y="220" width="560" height="360" rx="24"/>
    <path d="M380 640 H1060 L1020 580 H420 Z" fill="${c.mid}"/>
    <circle cx="720" cy="360" r="60" fill="${c.mid}"/>
    <path d="M620 520 C640 460 800 460 820 520" />
    <path d="M1080 330 H1260 M1120 330 V300 H1220 V330 M1110 330 L1125 520 H1215 L1230 330" />
  `),
  "is-costco-membership-worth-it": frame("emerald", (c) => `
    <path d="M400 330 H470 L520 560 H720 L760 400 H495" />
    <circle cx="550" cy="620" r="22" fill="${c.ink}"/>
    <circle cx="690" cy="620" r="22" fill="${c.ink}"/>
    <path d="M1060 250 V660 M920 660 H1200"/>
    <path d="M900 330 H1220" />
    <path d="M900 330 L850 480 H950 Z M1220 330 L1170 480 H1270 Z" fill="${c.mid}"/>
    <circle cx="900" cy="440" r="26"/>
    <rect x="1190" y="410" width="60" height="50" rx="6"/>
  `),
  "wall-cracks-worry": frame("amber", (c) => `
    <rect x="420" y="170" width="760" height="580" rx="12"/>
    <rect x="560" y="280" width="220" height="200" rx="8" fill="${c.mid}"/>
    <path d="M780 480 L840 530 L820 580 L900 640 L880 700 L950 750" stroke-width="10"/>
    <rect x="980" y="300" width="60" height="360" rx="8" fill="${c.mid}"/>
    <path d="M980 360 H1010 M980 420 H1020 M980 480 H1010 M980 540 H1020 M980 600 H1010" stroke-width="6"/>
  `),
  "hidden-water-leaks": frame("blue", (c) => `
    <rect x="420" y="170" width="760" height="580" rx="12"/>
    <path d="M420 300 H1180" stroke-width="18"/>
    <ellipse cx="760" cy="420" rx="150" ry="80" fill="${c.mid}"/>
    ${[[760,330],[700,540],[820,600],[760,690]].map(([x,y]) => `<path d="M${x} ${y-24} C${x+16} ${y} ${x+16} ${y+16} ${x} ${y+16} C${x-16} ${y+16} ${x-16} ${y} ${x} ${y-24} Z" fill="${c.mid}" stroke-width="6"/>`).join("")}
  `),
  "house-humid-with-ac": frame("emerald", (c) => `
    <rect x="420" y="220" width="520" height="220" rx="24"/>
    <path d="M470 380 H890 M470 410 H890" stroke-width="8"/>
    <circle cx="880" cy="280" r="14" fill="${c.ink}"/>
    ${[[520,520],[640,580],[760,520],[880,590]].map(([x,y]) => `<path d="M${x} ${y-24} C${x+16} ${y} ${x+16} ${y+16} ${x} ${y+16} C${x-16} ${y+16} ${x-16} ${y} ${x} ${y-24} Z" fill="${c.mid}" stroke-width="6"/>`).join("")}
    <circle cx="1120" cy="440" r="110"/>
    <path d="M1050 490 A80 80 0 0 1 1190 490" stroke-width="10" opacity="0.6"/>
    <path d="M1120 440 L1180 390" stroke-width="14"/>
    <circle cx="1120" cy="440" r="14" fill="${c.ink}"/>
  `),
  "how-to-install-a-water-filtration-system": frame("blue", (c) => `
    <path d="M380 220 H620 V300"/>
    <path d="M540 300 H700 L690 350 H550 Z" fill="${c.mid}"/>
    <path d="M360 460 H1180"/>
    <path d="M620 460 V560 H760"/>
    <rect x="760" y="480" width="140" height="280" rx="30" fill="${c.mid}"/>
    <path d="M780 540 H880 M780 600 H880 M780 660 H880" stroke-width="8" opacity="0.6"/>
    <path d="M900 560 H1040 V380 H1120 V300" />
    <path d="M1090 300 H1150" stroke-width="16"/>
    <path d="M1120 340 V360" stroke-width="10" opacity="0.7"/>
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
  "fridge-not-cooling-but-freezer-is": frame("blue", (c) => `
    <rect x="560" y="140" width="360" height="640" rx="28"/>
    <path d="M560 360 H920"/>
    <path d="M880 230 V300 M880 420 V520" stroke-width="12"/>
    <rect x="570" y="150" width="340" height="200" rx="20" fill="${c.mid}" stroke="none"/>
    <path d="M700 230 L760 290 M760 230 L700 290 M730 220 V300 M690 260 H770" stroke-width="8"/>
    <path d="M1080 360 C1050 320 1110 290 1080 250 M1150 380 C1120 340 1180 310 1150 270" stroke-width="10" opacity="0.7"/>
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

