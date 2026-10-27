// Génère public/cv/CV_Georges-Miguel-MOUKOKO_{FR,EN}.pdf à partir des données du portfolio.
// Usage : npm run cv   (nécessite Microsoft Edge ou Google Chrome installé)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PROFILE, EXPERIENCES, EDUCATION, CERTIFICATIONS, LANGUAGES } from "../src/data/profile.js";
import { CV } from "../src/data/cv.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = join(ROOT, "public");
const BUILD = join(ROOT, "node_modules", ".cv-build");

const BROWSERS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

const tr = (v, lang) => (v && typeof v === "object" ? v[lang] : v) ?? "";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(^|[\s(])k-(moyennes|means)/g, "$1k&#8209;$2");
const asset = (p) => pathToFileURL(join(PUB, p)).href;
const inlineSvg = (p) => readFileSync(join(PUB, p), "utf8").replace(/<\?xml[^>]*>/, "");

const UI = {
  cv: { fr: "Curriculum vitae", en: "Curriculum vitae" },
  contact: { fr: "Contact", en: "Contact" },
  languages: { fr: "Langues", en: "Languages" },
  certifications: { fr: "Certifications", en: "Certifications" },
  involvement: { fr: "Engagement & intérêts", en: "Involvement & interests" },
  skills: { fr: "Compétences", en: "Skills" },
  scan: { fr: "Scannez-moi", en: "Scan me" },
  experience: { fr: "Expérience", en: "Experience" },
  education: { fr: "Formation", en: "Education" },
  projects: { fr: "Projets phares", en: "Key projects" },
  footer: { fr: "Tous mes projets en détail :", en: "All my projects in detail:" },
  location: { fr: "Douala, Cameroun", en: "Douala, Cameroon" },
};

function sideTitle(text) {
  return `<h3 class="side-title">${esc(text)}</h3>`;
}

function mainTitle(num, text) {
  return `<h2 class="main-title"><span class="num">${num}</span>${esc(text)}<span class="rule"></span></h2>`;
}

function experience(e, lang) {
  const points = tr(e.points, lang).map((p) => `<li>${esc(p)}</li>`).join("");
  return `<article class="job">
    <div class="job-head"><h4>${esc(tr(e.role, lang).split(" · ")[0])}</h4><span class="date">${esc(tr(e.when, lang))}</span></div>
    <div class="org">${esc(tr(e.org, lang))}${tr(e.role, lang).includes(" · ") ? ` · ${esc(tr(e.role, lang).split(" · ").slice(1).join(" · "))}` : ""}</div>
    <ul>${points}</ul>
  </article>`;
}

function sidebarPage1(lang) {
  const linkedin = PROFILE.socials.find((s) => s.label === "LinkedIn").url.replace("https://www.", "");
  const github = PROFILE.socials.find((s) => s.label === "GitHub").url.replace("https://", "");
  return `
    <div class="brand"><img src="${asset("logo-mko-192.png")}" alt=""><span>MKO · Data · IA · Software</span></div>
    <img class="photo" src="${asset("img/miguel.webp")}" alt="">
    ${sideTitle(tr(UI.contact, lang))}
    <ul class="contact">
      <li><b>@</b>${esc(PROFILE.email)}</li>
      <li><b>☏</b>${esc(PROFILE.whatsapp.display)} (WhatsApp)</li>
      <li><b>⌂</b>${esc(tr(UI.location, lang))}</li>
      <li><b>in</b>${esc(linkedin)}</li>
      <li><b>gh</b>${esc(github)} · github.com/GOGIVAM</li>
      <li><b>↗</b>dr-mko.vercel.app</li>
    </ul>
    ${sideTitle(tr(UI.languages, lang))}
    <ul class="plain">${LANGUAGES.map((l) => `<li><strong>${esc(l.name)}</strong> · ${esc(tr(l.level, lang))}</li>`).join("")}</ul>
    ${sideTitle(tr(UI.certifications, lang))}
    <ul class="plain">${CERTIFICATIONS.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    ${sideTitle(tr(UI.involvement, lang))}
    <ul class="plain">${CV.involvement.map((i) => `<li><strong>${esc(tr(i.label, lang))}</strong> · ${esc(tr(i.value, lang))}</li>`).join("")}</ul>`;
}

function sidebarPage2(lang) {
  const qrs = [["portfolio.svg", "Portfolio"], ["linkedin.svg", "LinkedIn"], ["github.svg", "GitHub"]];
  return `
    <div class="brand"><img src="${asset("logo-mko-192.png")}" alt=""><span>MKO · Data · IA · Software</span></div>
    ${sideTitle(tr(UI.skills, lang))}
    ${CV.skills.map((s) => `<div class="skill"><strong>${esc(tr(s.title, lang))}</strong><p>${esc(tr(s.items, lang))}</p></div>`).join("")}
    <div class="qr-block">
      ${sideTitle(tr(UI.scan, lang))}
      <div class="qrs">${qrs.map(([f, l]) => `<figure><div class="qr">${inlineSvg("qr/" + f)}</div><figcaption>${l}</figcaption></figure>`).join("")}</div>
    </div>`;
}

function footer(lang, n) {
  return `<footer><span>${esc(tr(UI.footer, lang))} <a>dr-mko.vercel.app</a></span><span>${n} / 2</span></footer>`;
}

function render(lang) {
  const exps = EXPERIENCES.filter((e) => !CV.skipExperiences.includes(tr(e.org, "fr")));
  const p1 = exps.slice(0, CV.page1Experiences);
  const p2 = exps.slice(CV.page1Experiences);
  const words = PROFILE.fullName.split(" ");
  const first = words.filter((w) => w !== w.toUpperCase()).join(" ");
  const last = words.filter((w) => w === w.toUpperCase());
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><title>CV</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=block" rel="stylesheet">
<style>
  :root { --ink:#16181b; --char:#2a2e32; --paper:#f3efe8; --paper-2:#f7f4ee; --orange:#cd4918; --muted:#6f747a; --muted-dark:#b4b9bf; --line:rgba(42,46,50,.16); }
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Space Grotesk", Arial, sans-serif; color: var(--char); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; height: 297mm; display: grid; grid-template-columns: 68mm 1fr; overflow: hidden; page-break-after: always; position: relative; }
  .page:last-child { page-break-after: auto; }
  aside { background: var(--char); color: #eceae5; padding: 11mm 7mm 9mm 8mm; display: flex; flex-direction: column; font-size: 8.6pt; line-height: 1.45; }
  main { background: #fff; padding: 12mm 12mm 0 11mm; display: flex; flex-direction: column; position: relative; }
  main::before { content: ""; position: absolute; top: 0; right: 0; width: 34mm; height: 3.2mm; background: var(--orange); }
  .brand { display: flex; align-items: center; gap: 3mm; margin-bottom: 5mm; }
  .brand img { width: 12mm; height: 12mm; border-radius: 50%; }
  .brand span { font-family: "JetBrains Mono", monospace; font-size: 6.8pt; letter-spacing: .14em; text-transform: uppercase; color: var(--muted-dark); }
  .photo { width: 42mm; height: 52mm; object-fit: cover; border-radius: 4mm; border: 1.4mm solid #3a3f45; margin-bottom: 4mm; }
  .side-title { font-family: "JetBrains Mono", monospace; font-weight: 500; font-size: 7.2pt; letter-spacing: .22em; text-transform: uppercase; color: var(--orange); margin: 5.5mm 0 2.4mm; display: flex; align-items: center; gap: 2.2mm; }
  .side-title::before { content: ""; width: 5mm; height: .5mm; background: var(--orange); }
  .contact, .plain { list-style: none; }
  .contact li { display: grid; grid-template-columns: 5.5mm 1fr; margin-bottom: 1.2mm; word-break: break-word; }
  .contact b { color: var(--orange); font-weight: 600; }
  .plain li { margin-bottom: 1.3mm; color: var(--muted-dark); }
  .plain strong { color: #f3efe8; font-weight: 500; }
  .skill { margin-bottom: 2.6mm; }
  .skill strong { display: block; color: #f3efe8; font-weight: 600; font-size: 8.8pt; margin-bottom: .6mm; }
  .skill p { color: var(--muted-dark); }
  .qr-block { margin-top: auto; }
  .qrs { display: flex; gap: 3mm; }
  .qrs figure { text-align: center; }
  .qr { width: 16mm; height: 16mm; background: #fff; border-radius: 2mm; padding: 1mm; }
  .qr svg { width: 100%; height: 100%; display: block; }
  .qrs figcaption { font-family: "JetBrains Mono", monospace; font-size: 6pt; letter-spacing: .12em; text-transform: uppercase; color: var(--muted-dark); margin-top: 1.4mm; }
  .eyebrow { font-family: "JetBrains Mono", monospace; font-size: 7.4pt; letter-spacing: .24em; text-transform: uppercase; color: var(--orange); margin-bottom: 3mm; }
  h1 { font-size: 25pt; line-height: 1.02; font-weight: 700; letter-spacing: -.02em; color: var(--ink); }
  .headline { font-family: "Instrument Serif", Georgia, serif; font-style: italic; font-size: 17pt; color: var(--orange); margin: 1.6mm 0 1.4mm; }
  .tagline { color: var(--muted); font-size: 8.2pt; margin-bottom: 3mm; }
  .summary { background: var(--paper-2); border-left: 1mm solid var(--orange); padding: 2.6mm 3.6mm; font-size: 8.5pt; line-height: 1.5; margin-bottom: 1mm; }
  .main-title { font-family: "JetBrains Mono", monospace; font-weight: 500; font-size: 7.8pt; letter-spacing: .22em; text-transform: uppercase; color: var(--ink); display: flex; align-items: center; gap: 2.5mm; margin: 4mm 0 2.6mm; }
  .main-title .num { color: var(--orange); }
  .main-title .rule { flex: 1; height: .3mm; background: var(--line); }
  .job { margin-bottom: 2.8mm; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
  .job h4 { font-size: 10.4pt; font-weight: 700; color: var(--ink); }
  .date { font-family: "JetBrains Mono", monospace; font-size: 7pt; color: var(--muted); white-space: nowrap; }
  .org { color: var(--orange); font-weight: 600; font-size: 8.6pt; margin: .4mm 0 1.2mm; }
  .job ul, .edu { list-style: none; }
  .job li { position: relative; padding-left: 3.6mm; font-size: 8.3pt; line-height: 1.42; margin-bottom: .6mm; }
  .job li::before { content: ""; position: absolute; left: .4mm; top: 1.9mm; width: 1.4mm; height: 1.4mm; border-radius: 50%; background: var(--orange); }
  .edu li { display: flex; justify-content: space-between; gap: 3mm; margin-bottom: 1.8mm; }
  .edu div span { display: block; line-height: 1.35; }
  .edu strong { display: block; font-size: 9.6pt; color: var(--ink); }
  .edu span { color: var(--muted); font-size: 8.2pt; }
  .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 2.2mm; }
  .card { border: .3mm solid #e4ded3; background: var(--paper-2); border-radius: 3mm; padding: 2.2mm 3mm; }
  .card strong { display: block; font-size: 9.4pt; color: var(--ink); }
  .card .tag { font-family: "JetBrains Mono", monospace; font-size: 6.4pt; color: var(--orange); margin: .6mm 0 1.2mm; }
  .card p { font-size: 7.8pt; line-height: 1.38; }
  footer { margin-top: auto; border-top: .3mm solid var(--line); padding: 2.6mm 0 6mm; display: flex; justify-content: space-between; font-family: "JetBrains Mono", monospace; font-size: 6.6pt; color: var(--muted); }
  footer a { color: var(--orange); }
</style></head>
<body>
  <section class="page">
    <aside>${sidebarPage1(lang)}</aside>
    <main>
      <div class="eyebrow">${esc(tr(UI.cv, lang))}</div>
      <h1>${esc(first)}<br>${esc(last.join(" "))}</h1>
      <div class="headline">${esc(tr(CV.headline, lang))}</div>
      <div class="tagline">${esc(tr(CV.tagline, lang))}</div>
      <div class="summary">${esc(tr(CV.summary, lang))}</div>
      ${mainTitle("01", tr(UI.experience, lang))}
      ${p1.map((e) => experience(e, lang)).join("")}
      ${footer(lang, 1)}
    </main>
  </section>
  <section class="page">
    <aside>${sidebarPage2(lang)}</aside>
    <main>
      ${mainTitle("01", tr(UI.experience, lang))}
      ${p2.map((e) => experience(e, lang)).join("")}
      ${mainTitle("02", tr(UI.education, lang))}
      <ul class="edu">${EDUCATION.map((ed) => `<li><div><strong>${esc(tr(ed.title, lang))}</strong><span>${esc(tr(ed.where, lang))}</span></div><span class="date">${esc(tr(ed.when, lang))}</span></li>`).join("")}</ul>
      ${mainTitle("03", tr(UI.projects, lang))}
      <div class="cards">${CV.projects.map((p) => `<div class="card"><strong>${esc(tr(p.title, lang))}</strong><div class="tag">${esc(tr(p.tag, lang))}</div><p>${esc(tr(p.text, lang))}</p></div>`).join("")}</div>
      ${footer(lang, 2)}
    </main>
  </section>
</body></html>`;
}

const browser = BROWSERS.find(existsSync);
if (!browser) throw new Error("Edge ou Chrome introuvable : impossible d'imprimer le CV en PDF.");
mkdirSync(BUILD, { recursive: true });

for (const lang of ["fr", "en"]) {
  const html = join(BUILD, `cv_${lang}.html`);
  const pdf = join(PUB, "cv", `CV_Georges-Miguel-MOUKOKO_${lang.toUpperCase()}.pdf`);
  writeFileSync(html, render(lang));
  execFileSync(browser, [
    "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=15000", `--print-to-pdf=${pdf}`, pathToFileURL(html).href,
  ], { stdio: "ignore" });
  console.log(`CV ${lang.toUpperCase()} -> ${pdf}`);
}
