import { useState, useEffect, useRef, useCallback } from "react";

/* ── Professor photo imports (unchanged) ── */
import imgRajeshGupta from "./assets/images/rajesh_gupta.png";
import imgAjayKumar from "./assets/images/ajay_kumar.png";
import imgKalyanChatterjee from "./assets/images/kalyan_chatterjee.png";
import imgRiteshKeshri from "./assets/images/ritesh_keshri.png";
import imgSumantKadwane from "./assets/images/sumant_kadwane.png";
import imgKBMohanty from "./assets/images/kb_mohanty.png";
import imgArghyaMitra from "./assets/images/arghya_mitra.png";
import imgLaliteshKumar from "./assets/images/lalitesh_kumar.png";
import imgSubhojitGhosh from "./assets/images/subhojit_ghosh.png";
import imgJayaReddy from "./assets/images/jaya_reddy.png";
import imgBidyadharSubudhi from "./assets/images/bidyadhar_subudhi.png";
import imgSKMishra from "./assets/images/sk_mishra.png";
import imgSoumyaChatterjee from "./assets/images/soumya_chatterjee.png";
import imgAdityaGautam from "./assets/images/aditya_gautam.png";
import imgPratyushAnand from "./assets/images/pratyush_anand.png";
import imgDeepakKumar from "./assets/images/deepak_kumar.png";
import imgLesediMasisi from "./assets/images/lesedi_masisi.png";
import imgGruosso from "./assets/images/gruosso.png";
import whiteBg from "./assets/images/white bg.png";  /* hero background — unchanged */

/* ─────────────────────────────────────────────────────────────────────
   PROFESSIONAL SVG ICON COMPONENTS  (replaces all childish emoji icons)
───────────────────────────────────────────────────────────────────── */
const Ico = ({ size = 22, color = "#059669", sw = 1.75, children }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}>
    {children}
  </svg>
);

const IcoCalendar = (p) => <Ico {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Ico>;
const IcoPin = (p) => <Ico {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Ico>;
const IcoClock = (p) => <Ico {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Ico>;
const IcoUser = (p) => <Ico {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Ico>;
const IcoUsers = (p) => <Ico {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Ico>;
const IcoCurrency = (p) => <Ico {...p}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></Ico>;
const IcoAward = (p) => <Ico {...p}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></Ico>;
const IcoMonitor = (p) => <Ico {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></Ico>;
const IcoPlug = (p) => <Ico {...p}><path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><rect x="6" y="8" width="12" height="9" rx="2" /></Ico>;
const IcoGlobe = (p) => <Ico {...p}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></Ico>;
const IcoBrain = (p) => <Ico {...p}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.99-3 2.5 2.5 0 0 1-1.13-4.28A3 3 0 0 1 8 3.34" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.99-3 2.5 2.5 0 0 0 1.13-4.28A3 3 0 0 0 16 3.34" /></Ico>;
const IcoSun = (p) => <Ico {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></Ico>;
const IcoMail = (p) => <Ico {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2 4 12 13 22 4" /></Ico>;
const IcoPhone = (p) => <Ico {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.23 19.79 19.79 0 0 1 1.61 2.6 2 2 0 0 1 3.6.42h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z" /></Ico>;
const IcoBuilding = (p) => <Ico {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" /></Ico>;
const IcoLink = (p) => <Ico {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></Ico>;
const IcoClipboard = (p) => <Ico {...p}><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M14 2H9a1 1 0 0 0-1 1v2h8V3a1 1 0 0 0-1-1z" /><rect x="3" y="6" width="18" height="16" rx="2" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="15" y2="15" /></Ico>;
const IcoLightbulb = (p) => <Ico {...p}><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.3 18 9.2 18 8A6 6 0 0 0 6 8c0 1.2.3 2.3 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></Ico>;

/* ─────────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:       #0b3d22;
    --navy-mid:   #145c33;
    --navy-soft:  #1e7a45;
    --emerald:    #24a158;
    --emerald-dk: #14834a;
    --gold:       #e8980a;
    --sky:        #0e7fc0;
    --slate:      #3d6055;
    --border:     #c3e8d0;
    --bg:         #f0fdf6;
  }

  html, body { scroll-behavior: smooth; font-family: 'DM Sans', sans-serif; color: #0b3d22; overflow-x: hidden; }

  /* ── TICKER ── */
  .ticker-wrap {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1001;
    background-color: var(--navy);
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='44' viewBox='0 0 80 44' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='3' width='35' height='17' rx='1' fill='none' stroke='rgba(255%2C210%2C80%2C0.12)' stroke-width='0.8'/%3E%3Crect x='43' y='3' width='35' height='17' rx='1' fill='none' stroke='rgba(255%2C210%2C80%2C0.12)' stroke-width='0.8'/%3E%3Crect x='2' y='24' width='35' height='17' rx='1' fill='none' stroke='rgba(255%2C210%2C80%2C0.12)' stroke-width='0.8'/%3E%3Crect x='43' y='24' width='35' height='17' rx='1' fill='none' stroke='rgba(255%2C210%2C80%2C0.12)' stroke-width='0.8'/%3E%3C/svg%3E");
    background-size: 80px 44px;
    border-bottom: 1px solid rgba(24,163,82,.25);
    color: #fff; height: 44px;
    display: flex; align-items: center; overflow: hidden;
  }
  .ticker { display: flex; width: max-content; animation: ticker-slide 34s linear infinite; }
  .ticker:hover { animation-play-state: paused; }
  .ticker-content { display: flex; flex-shrink: 0; }
  .ticker-item {
    font-size: .82rem; font-weight: 900; text-transform: uppercase;
    letter-spacing: .07em; padding: 0 2.5rem; white-space: nowrap;
    display: flex; align-items: center; gap: 8px;
  }
  .ticker-item em { color: #7edfa8; font-style: normal; }
  @keyframes ticker-slide { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  /* ── NAVBAR ── */
  .nb {
    position: fixed; top: 44px; left: 0; right: 0; z-index: 1000;
    background: rgba(255,255,255,.97); backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border); transition: box-shadow .3s;
  }
  .nb.scrolled { box-shadow: 0 4px 28px rgba(11,61,34,.1); }
  .nb-inner {
    max-width: 1280px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 70px;
  }
  .nb-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit; }
  .nb-logo { height: 44px; display: flex; align-items: center; }
  .nb-logo img { height: 100%; width: auto; object-fit: contain; }
  .nb-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 1200; color: var(--navy); line-height: 1.1; }
  .nb-sub  { font-size: 0.85rem; font-weight: 1200; color: rgba(6, 70, 0, 0.95); text-transform: uppercase; letter-spacing: .12em; }
  .nb-links { display: flex; align-items: center; gap: .2rem; list-style: none; }
  .nb-links a {
    font-size: .83rem; font-weight: 900; color: var(--slate);
    text-decoration: none; padding: .45rem .9rem; border-radius: 6px;
    transition: all .18s; text-transform: uppercase; letter-spacing: .08em;
  }
  .nb-links a:hover { color: var(--navy); background: var(--bg); }
  .nb-links .cta { background: var(--navy); color: #fff !important; margin-left: .4rem; border-radius: 6px; }
  .nb-links .cta:hover { background: var(--navy-mid) !important; }
  .nb-toggle {
    display: none; flex-direction: column; gap: 5px;
    border: none; background: none; cursor: pointer; padding: 4px;
  }
  .nb-toggle span { display: block; width: 24px; height: 2px; background: var(--navy); border-radius: 2px; }
  @media(max-width:860px){
    .nb-toggle { display: flex; }
    .nb-links { display: none; position: absolute; top: 70px; left: 0; right: 0; background: #fff; flex-direction: column; padding: 1rem 1.5rem 1.5rem; border-bottom: 1px solid var(--border); gap: .1rem; }
    .nb-links.open { display: flex; }
    .nb-links .cta { margin-left: 0; margin-top: .3rem; text-align: center; }
  }

  /* ── HERO ──
     whiteBg PNG is the background image (unchanged).
     A semi-transparent dark-green overlay sits on top so all white text
     remains legible no matter what the PNG shows.                       */
  .hero-wrap {
    min-height: 100vh;
    position: relative; display: flex; align-items: center;
  }
  .hero-bg-img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: contain; object-position: top center;
    transform: scale(1.4); transform-origin: top center;
    z-index: 0;
  }
  /* ★ FIX 1 — richer overlay so white text is always readable on the PNG */
  .hero-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(
      135deg,
      rgba(5, 22, 12, 0.78) 0%,
      rgba(8, 38, 18, 0.70) 45%,
      rgba(6, 28, 14, 0.80) 100%
    );
  }
  .hero-dots {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='75' viewBox='0 0 100 75' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='44' height='32' rx='2' fill='none' stroke='rgba(255%2C210%2C80%2C0.06)' stroke-width='0.8'/%3E%3Crect x='54' y='2' width='44' height='32' rx='2' fill='none' stroke='rgba(255%2C210%2C80%2C0.06)' stroke-width='0.8'/%3E%3Crect x='2' y='41' width='44' height='32' rx='2' fill='none' stroke='rgba(255%2C210%2C80%2C0.06)' stroke-width='0.8'/%3E%3Crect x='54' y='41' width='44' height='32' rx='2' fill='none' stroke='rgba(255%2C210%2C80%2C0.06)' stroke-width='0.8'/%3E%3C/svg%3E");
    background-size: 100px 75px;
  }
  .hero-glow   { position: absolute; top: -60px; right: -40px; width: 750px; height: 750px; background: radial-gradient(circle, rgba(255,200,50,.10) 0%, rgba(232,152,10,.05) 35%, transparent 65%); pointer-events: none; z-index: 1; }
  .hero-glow-2 { position: absolute; bottom: -60px; left: -40px; width: 650px; height: 650px; background: radial-gradient(circle, rgba(24,200,100,.28) 0%, rgba(24,163,82,.12) 45%, transparent 70%); pointer-events: none; z-index: 1; }
  .hero-body {
    position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; width: 100%;
    padding: 0 2rem; padding-top: 114px;
    display: grid; grid-template-columns: 1fr 400px; gap: 4rem; align-items: center;
  }
  @media(max-width:960px){ .hero-body { grid-template-columns: 1fr; } .hero-aside { display: none !important; } }

  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(232,152,10,.15); border: 1px solid rgba(10,63,38,.4);
    color: #7edfa8; font-size: .8rem; font-weight: 900; text-transform: uppercase;
    letter-spacing: .18em; padding: .38rem .9rem; border-radius: 50px; margin-bottom: 1.4rem;
  }
  .hero-eyebrow .pulse { width: 7px; height: 7px; background: #e8980a; border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }

  /* ★ FIX 1 — title & sub are now white for readability on dark overlay */
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
    font-weight: 900; color: yellow; line-height: 1.1; margin-bottom: 1.5rem;
    text-shadow: 0 2px 16px rgba(220, 220, 220, 0.4);
  }
  .hero-title em {
    font-style: normal; color: #ffff00;
    text-shadow: 0 0 24px rgba(126,223,168,.55);
  }
  /* ★ FIX 1 — sub-text white 85% (was dark forest green — unreadable) */
  .hero-sub {
    font-size: 1.05rem; color: rgba(255,255,255,.85);
    line-height: 1.8; max-width: 560px; margin-bottom: 2.5rem; font-weight: 800;
  }
  .hero-sub strong { color: #7edfa8; font-weight: 900; }

  /* ★ FIX 1 — chips are glassy white on dark overlay */
  .hero-chips { display: flex; flex-wrap: wrap; gap: .65rem; margin-bottom: 2.5rem; }
  .hero-chip {
    display: flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,.09); border: 1.5px solid rgba(255,255,255,.18);
    color: rgb(255, 255, 255); font-size: .8rem; padding: .4rem .9rem;
    border-radius: 50px; font-weight: 900; backdrop-filter: blur(4px);
  }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-em {
    background: rgba(6, 70, 0, 0.95); color: #fff; border: none; padding: .85rem 2rem; border-radius: 15px;
    font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 900;
    text-transform: uppercase; letter-spacing: .1em; cursor: pointer; text-decoration: none;
    display: inline-block; transition: all .22s; box-shadow: 0 8px 24px rgba(24,163,82,.35);
  }
  .btn-em:hover { background: #14834a; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(24,163,82,.5); }
  /* ★ FIX 1 — ghost button visible on dark overlay */
  .btn-ghost {
    background: rgba(6, 70, 0, 0.95); color: #fff; border: none; padding: .85rem 2rem; border-radius: 15px;
    font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 900;
    text-transform: uppercase; letter-spacing: .1em; cursor: pointer; text-decoration: none;
    display: inline-block; transition: all .22s; box-shadow: 0 8px 24px rgba(24,163,82,.35);
  }
  .btn-ghost:hover { border-color: rgba(6, 70, 0, 0.95); background: rgba(255,255,255,.1); }

  /* ★ FIX 1 — glance card: darker glass + white text values */
  .hero-aside {
    background: rgba(6, 70, 0, 0.95); border: 1px solid rgba(255,255,255,.14);
    border-radius: 16px; padding: 2rem; backdrop-filter: blur(14px);
    box-shadow: 0 20px 48px rgba(0,0,0,.3);
  }
  .hc-title {
    display: flex; align-items: center; gap: 9px;
    font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 900;
    color: #ffffff; margin-bottom: 1.5rem; padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,.12);
  }
  .hc-row { display: flex; align-items: flex-start; gap: 12px; padding: .75rem 0; border-bottom: 1px solid rgba(255,255,255,.07); }
  .hc-row:last-child { border-bottom: none; padding-bottom: 0; }
  .hc-ico {
    width: 34px; height: 34px; border-radius: 8px;
    background: rgba(24,163,82,.2); border: 1px solid rgba(24,163,82,.35);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .hc-lbl { font-size: .63rem; font-weight: 900; text-transform: uppercase; letter-spacing: .12em; color: #7edfa8; margin-bottom: .12rem; }
  /* ★ FIX 1 — hc-val was dark green; now white/light */
  .hc-val { font-size: .84rem; color: rgba(255,255,255,.82); line-height: 1.45; white-space: pre-line; font-weight: 800; }

  /* ── SHARED ── */
  .sec { padding: 96px 2rem; max-width: 1280px; margin: 0 auto; }
  .sec-dark {
    background-image:
      linear-gradient(160deg, rgba(11,61,34,.91) 0%, rgba(14,70,35,.87) 60%, rgba(8,45,24,.93) 100%),
      url("https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80");
    background-size: auto, cover; background-position: 0 0, center; background-repeat: no-repeat, no-repeat;
  }
  .sec-light {
    background-image:
      linear-gradient(160deg, rgba(240,253,246,.94) 0%, rgba(236,252,242,.92) 100%),
      url("https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1920&q=80");
    background-size: auto, cover; background-position: 0 0, center; background-repeat: no-repeat, no-repeat;
  }
  /* ── WHITE SECTIONS (About, Speakers, Register) ──
     Smart power grid — high-voltage transmission lines at dusk, warm orange sky.
     Near-white overlay preserves legibility of all dark body text on cards.     */
  .sec-white {
    background-image:
      linear-gradient(160deg, rgba(255,255,255,.95) 0%, rgba(248,255,251,.94) 100%),
      url("https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80");
    background-size: auto, cover;
    background-position: 0 0, center;
    background-repeat: no-repeat, no-repeat;
  }
  .sec-white { background:#fff; }
  .inner { max-width:1280px; margin:0 auto; padding:0 2rem; }
  .tag { display:inline-flex; align-items:center; gap:7px; font-size:.69rem; font-weight:900; text-transform:uppercase; letter-spacing:.18em; color:var(--emerald); margin-bottom:.55rem; }
  .tag::before { content:''; display:block; width:20px; height:2px; background:var(--emerald); border-radius:1px; }
  .tag.light { color:#7edfa8; }
  .tag.light::before { background:#7edfa8; }
  .sec-h { font-family:'Playfair Display',serif; font-size:clamp(1.4rem,2vw,1.9rem); font-weight:900; color:var(--navy); line-height:1.3; margin-bottom:.7rem; word-wrap:break-word; }
  .sec-h.light { color:#fff; }
  .rule { width:52px; height:3px; background:linear-gradient(to right,var(--emerald),var(--gold)); border-radius:2px; margin-bottom:2rem; }

  /* ── ABOUT ──
     Stats panel: deep forest green with a solar-ray sunburst — radiating lines
     like sunlight, representing solar energy generation potential.               */
  .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:start; }
  .about-grid > div { min-width:0; }
  @media(max-width:768px){ .about-grid{grid-template-columns:1fr;gap:2.5rem;} }
  .about-text p { font-size:.98rem; line-height:1.85; color:var(--slate); margin-bottom:.9rem; }
  .about-text strong { color:var(--navy); font-weight:900; }
  .stats-panel {
    background-image:
      linear-gradient(145deg, rgba(11,61,34,.93) 0%, rgba(20,92,51,.90) 100%),
      url("https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=80");
    background-size: auto, cover; background-position: 0 0, center; background-repeat: no-repeat, no-repeat;
    border-radius: 16px; padding: 2.5rem; position: relative; overflow: hidden;
  }
  .stats-panel h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 900; color: #fff; margin-bottom: 1.75rem; }
  .s-item { padding: .9rem 0; border-bottom: 1px solid rgba(255,255,255,.07); display: flex; align-items: center; gap: 1rem; }
  .s-item:last-child { border-bottom: none; padding-bottom: 0; }
  .s-num { font-family: 'Playfair Display', serif; font-size: 1.9rem; font-weight: 900; color: #7edfa8; line-height: 1; min-width: 70px; }
  .s-num.gold { color: #fcd34d; }
  .s-lbl { font-size: .76rem; color: rgba(255,255,255,.65); text-transform: uppercase; letter-spacing: .07em; line-height: 1.4; }
  .s-bar { height: 3px; background: rgba(255,255,255,.08); border-radius: 2px; overflow: hidden; margin-top: .4rem; }
  .s-fill      { height: 100%; background: linear-gradient(to right,#18a352,#e8980a); border-radius: 2px; }
  .s-fill-gold { height: 100%; background: linear-gradient(to right,#e8980a,#fcd34d); border-radius: 2px; }

  /* ── FOCUS AREAS ── */
  .obj-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; }
  @media(max-width:900px){ .obj-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:520px){ .obj-grid { grid-template-columns: 1fr; } }
  .obj-card { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 2rem 1.75rem; transition: all .28s; position: relative; overflow: hidden; }
  .obj-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(to right,var(--emerald),var(--gold)); transform: scaleX(0); transform-origin: left; transition: transform .28s; }
  .obj-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(11,61,34,.09); }
  .obj-card:hover::after { transform: scaleX(1); }
  /* ★ FIX 3 — professional SVG icon container (no emoji stickers) */
  .obj-ico {
    width: 52px; height: 52px; border-radius: 12px;
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    border: 1.5px solid #a7f3d0;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem;
  }
  .obj-card h4 { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 900; margin-bottom: .5rem; color: var(--navy); }
  .obj-card p  { font-size: .87rem; color: var(--slate); line-height: 1.65; }

  /* ── TOPICS ── */
  .topics-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; align-items: start; }
  @media(max-width:860px){ .topics-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
  .topics-aside { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem; }
  .topics-aside p { font-size: .8rem; color: #d4f0e0; line-height: 1.65; }
  .topics-aside strong { color: #fdd47a; font-weight: 900; }
  .topic-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
  @media(max-width:600px){ .topic-cols { grid-template-columns: 1fr; } }
  .topic-cat { font-size: .66rem; font-weight: 900; text-transform: uppercase; letter-spacing: .14em; color: #7edfa8; margin-bottom: .75rem; border-left: 2px solid #7edfa8; padding-left: .6rem; }
  .topic-item { display: flex; align-items: flex-start; gap: 10px; padding: .65rem 0; border-bottom: 1px solid rgba(255,255,255,.07); }
  .topic-item:last-child { border-bottom: none; }
  .topic-dot { width: 6px; height: 6px; background: #e8980a; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
  .topic-item span { font-size: .88rem; color: #d4f0e0; line-height: 1.55; }

  /* ── SCHEDULE ── */
  /* ★ FIX 4 — full day-tab + day-panel CSS (was missing entirely) */
  .day-tabs {
    display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 2rem;
  }
  .day-tab {
    padding: .52rem 1.15rem; border-radius: 8px;
    font-size: .78rem; font-weight: 900; letter-spacing: .04em;
    border: 1.5px solid #c3e8d0;
    background: #ffffff; color: #3d6055;
    cursor: pointer; transition: all .18s;
    font-family: 'DM Sans', sans-serif; outline: none;
  }
  .day-tab:hover { border-color: var(--emerald); color: var(--emerald); background: #f0fdf6; }
  .day-tab.active {
    background: var(--navy); color: #ffffff;
    border-color: var(--navy);
    box-shadow: 0 4px 14px rgba(11,61,34,.28);
  }
  .day-panel { display: none; }
  .day-panel.active { display: block; }
  .day-title {
    font-size: .75rem; font-weight: 900; text-transform: uppercase;
    letter-spacing: .14em; color: var(--emerald-dk);
    margin-bottom: 1.25rem; display: flex; align-items: center; gap: 10px;
  }
  .day-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .day-date { font-weight: 800; color: var(--slate); letter-spacing: .04em; }

  /* schedule rows */
  .sched-row { display: flex; align-items: center; gap: 1.2rem; padding: 1.1rem 1.4rem; background: #fff; border: 1px solid var(--border); border-radius: 12px; margin-bottom: .75rem; transition: all .22s; }
  .sched-row.clickable { cursor: pointer; }
  .sched-row.clickable:hover { border-color: var(--emerald); transform: translateX(6px); box-shadow: 0 4px 20px rgba(24,163,82,.12); }
  .sched-row.hl { border-left: 3px solid var(--emerald); background: linear-gradient(to right,rgba(24,163,82,.04),#fff 40%); }
  .sched-time { flex-shrink: 0; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: .38rem .65rem; font-size: .72rem; font-weight: 900; color: var(--slate); text-align: center; min-width: 90px; line-height: 1.35; }
  .sched-avatar { width: 56px; height: 56px; border-radius: 50%; overflow: hidden; flex-shrink: 0; border: 2.5px solid var(--emerald); box-shadow: 0 0 0 3px rgba(24,163,82,.15); background: linear-gradient(135deg,var(--navy),var(--emerald-dk)); display: flex; align-items: center; justify-content: center; }
  .sched-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
  .sched-avatar-initials { font-family: 'Playfair Display', serif; font-size: .9rem; font-weight: 900; color: #fff; letter-spacing: .02em; }
  .sched-body { flex: 1; min-width: 0; }
  .sched-title { font-size: .95rem; font-weight: 900; color: var(--navy); line-height: 1.4; }
  .sched-spk { font-size: .8rem; color: var(--emerald-dk); font-weight: 900; margin-top: .2rem; }
  .sched-hint { font-size: .7rem; color: var(--emerald); margin-top: .12rem; opacity: .75; }
  .sched-arrow { font-size: 1.2rem; color: var(--emerald); opacity: .65; flex-shrink: 0; }

  /* ── CAROUSEL ── */
  .car-outer    { position: relative; padding: 0 36px; }
  .car-viewport { overflow: hidden; width: 100%; }
  .car-track    { display: flex; transition: transform .44s cubic-bezier(.25,.46,.45,.94); will-change: transform; }
  .car-slide            { flex-shrink: 0; padding-right: 20px; box-sizing: border-box; }
  .car-slide:last-child { padding-right: 0; }
  .car-btn { position: absolute; top: 38%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; background: #fff; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.6rem; z-index: 10; line-height: 1; box-shadow: 0 4px 20px rgba(11,61,34,.1); transition: background .18s,color .18s,border-color .18s,box-shadow .18s; color: var(--navy); user-select: none; outline: none; }
  .car-btn:hover:not(:disabled) { background: var(--navy); color: #fff; border-color: var(--navy); box-shadow: 0 8px 28px rgba(11,61,34,.22); }
  .car-btn:disabled { opacity: .25; cursor: not-allowed; }
  .car-prev { left: -24px; }
  .car-next { right: -24px; }
  .car-dots { display: flex; justify-content: center; gap: .5rem; margin-top: 2rem; }
  .car-dot  { width: 8px; height: 8px; border-radius: 50%; background: var(--border); cursor: pointer; transition: all .22s; }
  .car-dot.on { background: var(--emerald); transform: scale(1.35); }

  /* ── SPEAKER CARD ── */
  .sp-card { background: #fff; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; cursor: pointer; transition: all .28s; height: 100%; display: flex; flex-direction: column; }
  .sp-card:hover { transform: translateY(-8px); border-color: var(--emerald); box-shadow: 0 16px 40px rgba(11,61,34,.13); }
  .sp-photo { background: linear-gradient(135deg,#0b3d22 0%,#145c33 60%,#0e5a80 100%); padding: 2rem 1rem 1.25rem; display: flex; flex-direction: column; align-items: center; gap: .75rem; position: relative; overflow: hidden; }
  .sp-photo::after { content: ''; position: absolute; bottom: -15px; right: -15px; width: 90px; height: 90px; background: radial-gradient(circle,rgba(232,152,10,.2) 0%,transparent 70%); }
  .sp-circle { width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,.12); border: 3px solid rgba(255,255,255,.3); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; }
  .sp-circle img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .sp-initials { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 900; color: #fff; }
  .sp-photo-name { font-family: 'Playfair Display', serif; font-size: .92rem; font-weight: 900; color: #fff; text-align: center; line-height: 1.3; }
  .sp-body { padding: 1.1rem 1.25rem 1.4rem; flex: 1; display: flex; flex-direction: column; }
  .sp-role { font-size: .77rem; color: var(--emerald-dk); font-weight: 900; margin-bottom: .12rem; }
  .sp-inst { font-size: .75rem; color: var(--slate); line-height: 1.4; }
  .sp-topic { font-size: .74rem; color: #3d6055; margin-top: .6rem; font-style: italic; line-height: 1.45; flex: 1; }
  .sp-badge { display: inline-block; margin-top: .75rem; font-size: .65rem; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; padding: .25rem .65rem; border-radius: 50px; background: #ecfdf5; color: #14834a; border: 1px solid var(--emerald); }

  /* ── COMMITTEE ── */
  .cm-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; }
  @media(max-width:900px){ .cm-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:520px){ .cm-grid { grid-template-columns: 1fr; } }
  .cm-card { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.13); border-radius: 12px; padding: 1.75rem 1.5rem; text-align: center; transition: all .28s; }
  .cm-card:hover { background: rgba(255,255,255,.12); border-color: rgba(126,223,168,.4); transform: translateY(-4px); }
  .cm-av { width: 76px; height: 76px; border-radius: 50%; margin: 0 auto 1rem; background: linear-gradient(135deg,#18a352,#0e7fc0); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 900; color: #fff; border: 2px solid rgba(126,223,168,.4); }
  .cm-role    { font-size: .63rem; font-weight: 900; text-transform: uppercase; letter-spacing: .14em; color: #7edfa8; margin-bottom: .3rem; }
  .cm-name    { font-family: 'Playfair Display', serif; font-size: .95rem; font-weight: 900; color: #fff; margin-bottom: .25rem; line-height: 1.3; }
  .cm-title   { font-size: .76rem; color: rgba(255,255,255,.52); line-height: 1.5; white-space: pre-line; }
  .cm-contact { margin-top: .75rem; font-size: .72rem; color: #7edfa8; line-height: 1.8; }
  .cm-contact a { color: #7edfa8; text-decoration: none; }

  /* ── EVENT DETAILS ── */
  .ev-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; }
  @media(max-width:900px){ .ev-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:560px){ .ev-grid { grid-template-columns: 1fr; } }
  .ev-card { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 2rem; text-align: center; position: relative; overflow: hidden; transition: all .25s; }
  .ev-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(11,61,34,.08); }
  .ev-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(to right,var(--emerald),var(--gold)); }
  /* ★ FIX 5 — professional SVG icon container for event cards */
  .ev-ico {
    width: 46px; height: 46px; margin: 0 auto .85rem;
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    border: 1.5px solid #a7f3d0; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }
  .ev-label { font-size: .65rem; font-weight: 900; text-transform: uppercase; letter-spacing: .14em; color: var(--slate); margin-bottom: .35rem; }
  .ev-val { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 900; color: var(--navy); line-height: 1.3; }
  .ev-sub { font-size: .78rem; color: var(--slate); margin-top: .25rem; }
  .cert-banner { margin-top: 1.5rem; background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem 2rem; display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; }
  /* ★ FIX 5 — cert icon is now SVG-friendly */
  .cert-ico { width: 48px; height: 48px; background: linear-gradient(135deg,#fffbeb,#fef3c7); border: 1.5px solid #fcd34d; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .cert-lbl { font-size: .68rem; font-weight: 900; text-transform: uppercase; letter-spacing: .12em; color: var(--emerald); margin-bottom: .2rem; }
  .cert-txt { font-size: .87rem; color: var(--slate); line-height: 1.6; }

  /* ── REGISTER ── */
  .reg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  @media(max-width:800px){ .reg-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
  .reg-box { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 2.5rem; box-shadow: 0 24px 48px rgba(11,61,34,.07); }
  .reg-box h3 { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 900; color: var(--navy); margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media(max-width:520px){ .form-row { grid-template-columns: 1fr; } }
  .f-grp { margin-bottom: 1rem; }
  .f-lbl { display: block; font-size: .7rem; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; color: var(--slate); margin-bottom: .4rem; }
  .f-inp { width: 100%; background: #fff; border: 1.5px solid var(--border); border-radius: 8px; padding: .7rem 1rem; font-family: 'DM Sans', sans-serif; font-size: .9rem; color: var(--navy); outline: none; transition: all .18s; box-sizing: border-box; }
  .f-inp::placeholder { color: #9ca3af; }
  .f-inp:focus { border-color: var(--emerald); box-shadow: 0 0 0 3px rgba(24,163,82,.12); }
  .btn-sub { width: 100%; background: var(--navy); color: #fff; border: none; border-radius: 8px; padding: .95rem; font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; cursor: pointer; transition: all .22s; margin-top: .4rem; }
  .btn-sub:hover { background: var(--navy-mid); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(11,61,34,.2); }
  .ok-box { text-align: center; padding: 3rem 2rem; }
  .ok-check { width: 68px; height: 68px; border-radius: 50%; background: rgba(24,163,82,.1); border: 2px solid rgba(24,163,82,.3); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; margin: 0 auto 1.5rem; }
  .ok-box h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: .6rem; color: var(--navy); }
  .ok-box p { color: var(--slate); font-size: .93rem; line-height: 1.7; }
  .info-list { list-style: none; display: flex; flex-direction: column; gap: .9rem; margin-top: 1.5rem; padding: 0; }
  .info-row { display: flex; align-items: flex-start; gap: 12px; padding: .95rem 1rem; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; }
  .info-ico { width: 36px; height: 36px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .info-lbl { font-size: .65rem; font-weight: 900; text-transform: uppercase; letter-spacing: .12em; color: var(--emerald); margin-bottom: .15rem; }
  .info-val { font-size: .86rem; color: var(--navy); line-height: 1.55; white-space: pre-line; }

  /* ── MODAL (split layout) ── */
  .m-overlay { position: fixed; inset: 0; background: rgba(11,61,34,.6); backdrop-filter: blur(10px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
  .m-box { background: #fff; border-radius: 24px; max-width: 900px; width: 100%; max-height: 90vh; overflow: hidden; display: grid; grid-template-columns: 350px 1fr; position: relative; box-shadow: 0 32px 64px rgba(0,0,0,.22); animation: mIn .32s cubic-bezier(.34,1.56,.64,1) both; }
  @keyframes mIn { from{opacity:0;transform:scale(.94) translateY(14px)} to{opacity:1;transform:none} }
  @media(max-width:700px){ .m-box { grid-template-columns: 1fr; } .m-left { display: none !important; } }
  .m-left {
    background-image:
      linear-gradient(160deg, rgba(11,61,34,.92) 0%, rgba(14,70,38,.88) 60%, rgba(12,77,112,.85) 100%),
      url("https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&q=80");
    background-size: auto, cover; background-position: 0 0, center; background-repeat: no-repeat, no-repeat;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 2.5rem 1.5rem; gap: 1.25rem; position: relative; overflow: hidden;
  }
  .m-photo { width: 130px; height: 130px; border-radius: 50%; border: 4px solid rgba(255,255,255,.25); overflow: hidden; background: rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; }
  .m-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .m-pi { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900; color: #fff; }
  .m-left-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 900; color: #fff; text-align: center; line-height: 1.35; position: relative; z-index: 1; }
  .m-left-inst { font-size: .78rem; color: rgba(255,255,255,.65); text-align: center; line-height: 1.5; position: relative; z-index: 1; }
  .m-left-badge { background: rgba(24,163,82,.2); border: 1px solid rgba(24,163,82,.4); color: #7edfa8; font-size: .65rem; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; padding: .3rem .8rem; border-radius: 50px; position: relative; z-index: 1; }
  .m-right { padding: 3rem 2.5rem; overflow-y: auto; max-height: 90vh; }
  .m-close { position: absolute; top: 1.25rem; right: 1.25rem; background: rgba(11,61,34,.07); border: none; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.4rem; color: var(--navy); transition: background .2s; z-index: 10; }
  .m-close:hover { background: rgba(11,61,34,.14); }
  .m-name { font-family: 'Playfair Display', serif; font-size: 2.1rem; font-weight: 900; color: var(--navy); margin-bottom: .3rem; padding-right: 2.5rem; line-height: 1.2; }
  .m-role { font-size: .85rem; color: var(--emerald-dk); font-weight: 900; margin-bottom: .15rem; }
  .m-inst { font-size: .82rem; color: var(--slate); margin-bottom: 1.5rem; }
  .m-topic-box { background: #f0fdf4; border: 1px solid #c3e8d0; border-radius: 12px; padding: 1.25rem; margin-bottom: 2rem; }
  .m-topic-lbl { font-size: .68rem; font-weight: 900; text-transform: uppercase; letter-spacing: .12em; color: #14834a; margin-bottom: .35rem; }
  .m-topic-txt { font-weight: 900; color: var(--navy); font-size: .95rem; line-height: 1.45; }
  .m-bio-lbl { font-size: .72rem; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; color: var(--slate); margin-bottom: .7rem; }
  .m-bio-txt { font-size: .95rem; color: #2a4a34; line-height: 1.8; }

  /* ── FOOTER ── */
  footer {
    color: #fff; padding: 4rem 2rem 1.75rem;
    background-image:
      linear-gradient(170deg, rgba(11,61,34,.95) 0%, rgba(8,42,22,.97) 100%),
      url("https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80");
    background-size: auto, cover; background-position: 0 0, center; background-repeat: no-repeat, no-repeat;
    border-top: 1px solid rgba(24,163,82,.25);
  }
  .ft-inner { max-width: 1280px; margin: 0 auto; }
  .ft-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem; }
  @media(max-width:700px){ .ft-grid { grid-template-columns: 1fr; gap: 2rem; } }
  .ft-brand { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 900; color: #fff; margin-bottom: .35rem; }
  .ft-sub   { font-size: .75rem; color: rgba(255,255,255,.5); text-transform: uppercase; letter-spacing: .12em; margin-bottom: .9rem; }
  .ft-about { font-size: .85rem; color: rgba(255,255,255,.65); line-height: 1.7; max-width: 360px; }
  .ft-h     { font-size: .72rem; font-weight: 900; text-transform: uppercase; letter-spacing: .14em; color: #7edfa8; margin-bottom: .9rem; }
  .ft-list  { list-style: none; padding: 0; }
  .ft-list li { font-size: .85rem; color: rgba(255,255,255,.65); margin-bottom: .4rem; line-height: 1.55; }
  .ft-list li strong { color: #fff; font-weight: 900; }
  .ft-list a { color: rgba(255,255,255,.65); text-decoration: none; transition: color .18s; }
  .ft-list a:hover { color: #7edfa8; }
  .ft-bottom { border-top: 1px solid rgba(255,255,255,.12); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; }
  .ft-bottom p { font-size: .77rem; color: rgba(255,255,255,.5); }
  .ft-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(24,163,82,.12); border: 1px solid rgba(24,163,82,.28); color: #7edfa8; font-size: .68rem; font-weight: 900; text-transform: uppercase; letter-spacing: .12em; padding: .3rem .75rem; border-radius: 50px; }
  .ft-badge .dot { width: 6px; height: 6px; background: #18a352; border-radius: 50%; }
`;

/* ─────────────────────────────────────────────────────────────────────
   ICON MAPPING HELPER (maps labels/titles to proper SVG icons)
───────────────────────────────────────────────────────────────────── */
const getIconComponent = (label) => {
  const map = {
    "Dates": IcoCalendar,
    "Venue": IcoPin,
    "Duration": IcoClock,
    "Eligible": IcoUser,
    "Cert.": IcoAward,
    "Contact": IcoMail,
    "EV & Power Electronics": IcoPlug,
    "Smart Grid & Microgrids": IcoGlobe,
    "AI & Control Systems": IcoBrain,
    "Renewable Energy Systems": IcoSun,
    "Format": IcoClock,
    "Capacity": IcoUsers,
    "Fee": IcoCurrency,
  };
  return map[label] || IcoAward;
};

/* ─────────────────────────────────────────────────────────────────────
   DATA  (unchanged from original)
───────────────────────────────────────────── */
const topics = {
  Robotics: [
    "Industrial Robotic Manipulation (Model → Control → Execution)",
    "Robot Manipulator Hardware Design",
    "Robot Kinematics & Commissioning",
    "Pick-and-Place Automation for 6 DoF Robotic Arm using Inverse Kinematics",
  ],
  Vision: [
    "Machine Vision for Industrial Automation",
    "Vision-Guided Robotic Control",
    "Vision-Enabled Robotics & Industrial IoT Pipelines",
  ],
  AI: [
    "AI-Based Predictive Maintenance",
    "AI Model Training for EV Motor Anomaly Detection",
    "Motor Health Monitoring",
  ],
  IoT: [
    "Industrial IoT Architecture",
    "Embedded Sensing & Motor Control",
    "Live Monitoring of BLDC Motor for E-Bike",
  ],
};

const schedule = [
  {
    day: "Day 1", subtitle: "Invited Talks", date: "18 May 2026",
    items: [
      { ico: "🎙️", time: "12:00 – 1:30 PM", event: "Emerging Control, AI, and Cybersecurity Technologies for Sustainable Green Energy Systems", spk: "Dr. Kalyan Chatterjee", inst: "IIT (ISM) Dhanbad", hl: true },
      { ico: "⚡", time: "2:30 – 5:30 PM", event: "Digital Controllers in Power Converters for Renewable Energy Systems", spk: "Dr. Rajesh Gupta", inst: "NIT Allahabad", hl: true },
    ],
  },
  {
    day: "Day 2", subtitle: "EV Charging & Microgrid", date: "19 May 2026",
    items: [
      { ico: "🔌", time: "9:30 – 10:30 AM", event: "Design and Control of Z-Source Inverter-Based Bidirectional EV Charger for V2G Applications", spk: "Dr. Sumant G. Kadwane", inst: "Yeshwantrao Chavan College of Engineering.", hl: true },
      { ico: "🚗", time: "10:30 – 11:30 AM", event: "EV Charging and Grid Interactions", spk: "Dr. Ritesh Kumar Keshri", inst: "VNIT Nagpur", hl: true },
      { ico: "🏘️", time: "11:45 AM – 1:00 PM", event: "Energy Management for Sustainable Microgrid", spk: "Dr. Arghya Mitra", inst: "VNIT Nagpur", hl: true },
      { ico: "⚗️", time: "2:30 – 4:00 PM", event: "Enhancing Stability and Performance of PEM Fuel Cells through Port-Hamiltonian Control Framework", spk: "Dr. Lalitesh Kumar", inst: "SUSTECH, Shenzhen, China", hl: true },
      { ico: "🛡️", time: "4:15 – 5:45 PM", event: "Cyber Resiliency of Legacy Power Networks under Resource-Constrained Settings", spk: "Dr. Subhojit Ghosh", inst: "NIT Raipur", hl: true },
    ],
  },
  {
    day: "Day 3", subtitle: "Smart Systems & Solar PV", date: "20 May 2026",
    items: [
      { ico: "🔧", time: "9:30 – 10:30 AM", event: "Session — Topic TBA", spk: "Shrinivas Bhaskar Karanki", inst: "", hl: true },
      { ico: "💻", time: "10:30 – 11:30 AM", event: "Writing Software/Firmware for Energy Efficient Systems", spk: "Pratyush Anand", inst: "Microsoft", hl: true },
      { ico: "🚀", time: "11:45 AM – 1:00 PM", event: "Shaping the Future of EV Charging: Impacts and Integration with Power, Communication, and ICT Systems", spk: "Dr. Giambattista Gruosso", inst: "Politecnico di Milano, Italy", hl: true },
      { ico: "🌍", time: "2:30 – 4:00 PM", event: "Session — Topic TBA", spk: "Dr. Lesedi Masisi", inst: "Univ. of Witwatersrand, Johannesburg", hl: true },
      { ico: "☀️", time: "4:15 – 5:30 PM", event: "Control Strategies for Grid-Connected Solar PV Systems", spk: "Dr. Ajay Kumar", inst: "Punjab Engineering College", hl: true },
    ],
  },
  {
    day: "Day 4", subtitle: "Smart Grid, Wind & AI", date: "21 May 2026",
    items: [
      { ico: "📡", time: "9:30 – 10:30 AM", event: "PMU Application to Smart Grid", spk: "Dr. M. Jaya Bharata Reddy", inst: "NIT Tiruchirappalli", hl: true },
      { ico: "🌬️", time: "10:30 – 11:30 AM", event: "Advanced Control for High-Performance Wind Electrical Systems", spk: "Prof. K.B. Mohanty", inst: "NIT Rourkela", hl: true },
      { ico: "🧠", time: "11:45 AM – 1:00 PM", event: "Session — Topic TBA", spk: "Prof. Bidyadhar Subudhi", inst: "IIT Goa (Former Director, NIT Warangal)", hl: true },
      { ico: "🔬", time: "2:30 – 3:30 PM", event: "Session — Topic TBA", spk: "Dr. Deepak Kumar", inst: "BIT Mesra", hl: true },
      { ico: "⚙️", time: "4:15 – 5:30 PM", event: "Session — Topic TBA", spk: "Dr. S.K. Mishra", inst: "BIT Mesra", hl: true },
    ],
  },
  {
    day: "Day 5", subtitle: "HV Systems & Closing", date: "22 May 2026",
    items: [
      { ico: "⚡", time: "10:00 – 11:30 AM", event: "Condition Monitoring of High Voltage Systems in the Presence of Renewable Energy Integration", spk: "Dr. Soumya Chatterjee", inst: "NIT Durgapur", hl: true },
      { ico: "♻️", time: "11:45 AM – 1:30 PM", event: "Control Techniques for Renewable Energy Applications", spk: "Dr. Aditya R. Gautam", inst: "BITS Pilani", hl: true },
    ],
  },
];

const speakers = [
  {
    name: "Dr. Kalyan Chatterjee",
    role: "Professor, Electrical Engineering",
    inst: "IIT (ISM) Dhanbad",
    topic: "Emerging Control, AI & Cybersecurity for Sustainable Energy",
    badge: "Keynote",
    image: imgKalyanChatterjee,
    bio: "Prof. Chatterjee (Member, IEEE) has over 27 years of research experience in power systems, renewable energy systems, soft computing applications, small-signal stability analysis, and cyber–physical systems. He has guided 19 Ph.D. scholars (6 ongoing) and 40+ postgraduate students, with numerous publications in high-impact journals and conferences.",
  },
  {
    name: "Dr. Rajesh Gupta",
    role: "Professor, Electrical Engineering",
    inst: "MNNIT Allahabad, Prayagraj",
    topic: "Digital Controllers in Power Converters for Renewable Energy",
    badge: "Invited",
    image: imgRajeshGupta,
    bio: "Dr. Gupta received his M.Tech in Control Systems from BIT Mesra and Ph.D. from IIT Kanpur in Power Electronics. He has guided 14 Ph.D. and 65 Masters students, published 200 papers, holds 4 patents, and was PI for projects from DST, SERB, CSIR, MNRE. Listed among Stanford's top 2% scientists globally (2020–2024).",
  },
  {
    name: "Dr. Ritesh Kumar Keshri",
    role: "Associate Professor, Electrical Engineering",
    inst: "VNIT Nagpur",
    topic: "EV Charging and Grid Interactions",
    badge: "Invited",
    image: imgRiteshKeshri,
    bio: "Dr. Keshri received his Ph.D. in Energy Engineering from University of Padova, Italy (2014). Previously faculty at BIT Mesra (2006–2015). Recipient of the 2016 Best Paper Award of IEEE Transactions on Industrial Electronics and the Visvesvaraya Young Faculty Research Fellowship (2017). Associate Editor of IEEE OJIES, IEEE TEC, and IEEE JESTIE.",
  },
  {
    name: "Dr. Sumant G. Kadwane",
    role: "Professor, Electrical Engineering",
    inst: "Yeshwantrao Chavan College of Engineering.",
    topic: "Z-Source Inverter Bidirectional EV Charger for V2G Applications",
    badge: "Invited",
    image: imgSumantKadwane,
    bio: "Dr. Kadwane completed his Ph.D. from BIT Mesra (2010) and served as faculty there for 7 years. He has guided 25+ PG students and 6 Ph.D. scholars, published 30 international journal papers and 50+ conference papers. Senior Member of IEEE and Fellow IE(I). Holds 4 granted patents. Has chaired IEEE conferences in the USA, Italy, and Singapore.",
  },
  {
    name: "Dr. Arghya Mitra",
    role: "Assistant Professor, Electrical Engineering",
    inst: "VNIT Nagpur",
    topic: "Energy Management for Sustainable Microgrid",
    badge: "Invited",
    image: imgArghyaMitra,
    bio: "Dr. Mitra received his Ph.D. from IIT Kharagpur (2015) and won the POSOCO Power System Award 2016. He has 80+ research publications including IEEE Transactions and holds a national patent. PI of an MoE-SPARC project and Co-PI in EU-India Horizon 2020 RE-EMPOWERED (Rs. 9.15 Cr) and MeitY-MHI wireless EV charger project (Rs. 5.28 Cr).",
  },
  {
    name: "Dr. Lalitesh Kumar",
    role: "Research Assistant, PI Lab",
    inst: "SUSTECH, Shenzhen, China",
    topic: "PEM Fuel Cell Stability via Port-Hamiltonian Control",
    badge: "International",
    image: imgLaliteshKumar,
    bio: "Dr. Kumar's research focuses on Fuel Cell/Sustainable Energy, Optimal and Nonlinear Control, port-Hamiltonian Systems, and Fractional Order Control. His work bridges advanced mathematical control theory with clean energy applications for next-generation hydrogen fuel cell systems.",
  },
  {
    name: "Dr. Subhojit Ghosh",
    role: "Professor, Electrical Engineering",
    inst: "NIT Raipur",
    topic: "Cyber Resiliency of Legacy Power Networks",
    badge: "Invited",
    image: imgSubhojitGhosh,
    bio: "Dr. Ghosh's research spans Optimization, System Modeling and Control, Renewable Energy, and Cyber Physical Systems. His work on cyber resiliency addresses the challenge of securing legacy power infrastructure against cyber threats under resource-constrained operational settings — a growing concern in modern smart grid deployments.",
  },
  {
    name: "Pratyush Anand",
    role: "Software Engineer",
    inst: "Microsoft",
    topic: "Writing Software/Firmware for Energy Efficient Systems",
    badge: "Industry",
    image: imgPratyushAnand,
    bio: "Pratyush Anand is an engineer at Microsoft with deep expertise in embedded systems, operating systems, and firmware development. He brings an industry perspective on how firmware design choices directly impact energy efficiency in modern computing and industrial systems.",
  },
  {
    name: "Dr. Giambattista Gruosso",
    role: "Associate Professor",
    inst: "Politecnico di Milano, Italy",
    topic:
      "Shaping the Future of EV Charging: Power, Communication & ICT Integration",
    badge: "International",
    image: imgGruosso,
    bio: "Dr. Gruosso is an international expert in EV charging infrastructure, focusing on holistic integration of power systems, communication networks, and ICT for next-generation EV ecosystems. His work addresses the complex interdependencies between charging stations and urban power and communication grids.",
  },
  {
    name: "Dr. Lesedi Masisi",
    role: "Senior Lecturer, School of EIE",
    inst: "Univ. of Witwatersrand, Johannesburg",
    topic: "Electrical Machines and Drives for Sustainable Development",
    badge: "International",
    image: imgLesediMasisi,
    bio: "Dr. Masisi received his Ph.D. from Concordia University. His research focuses on electrical energy conversion, rotating machines, and renewable energy systems development — bringing a global perspective on sustainable electrical engineering and drives for modern power applications.",
  },
  {
    name: "Dr. Ajay Kumar",
    role: "Assistant Professor, Electrical Engineering",
    inst: "Punjab Engineering College, Chandigarh",
    topic: "Control Strategies for Grid-Connected Solar PV Systems",
    badge: "Invited",
    image: imgAjayKumar,
    bio: "Dr. Ajay Kumar (MIEEE, MIE) specialises in distributed generation, renewable energy integration, and power quality assessment. His research emphasises control structure development, hardware testing, and experimental result analysis for grid-connected solar PV systems.",
  },
  {
    name: "Dr. M. Jaya Bharata Reddy",
    role: "Professor, Electrical & Electronics Engineering",
    inst: "NIT Tiruchirappalli",
    topic: "PMU Application to Smart Grid",
    badge: "Invited",
    image: imgJayaReddy,
    bio: "Dr. Reddy received his Ph.D. from BIT Ranchi (2008), won the IEI Young Engineer's Award (2010) and DST SERC Fast Track Young Scientist Award (2013). Senior Member of IEEE. Holds 3 patents and 110+ publications. Has received 4 DST-funded projects worth ~Rs. 177 Lakhs. Research: smart grid, substation automation, and wide-area protection.",
  },
  {
    name: "Prof. K.B. Mohanty",
    role: "Professor, Electrical Engineering",
    inst: "NIT Rourkela",
    topic: "Advanced Control for High-Performance Wind Electrical Systems",
    badge: "Invited",
    image: imgKBMohanty,
    bio: "Prof. Mohanty received his Ph.D. from IIT Kharagpur. He is a recipient of the Global Research Excellence Award, IEI Excellence Awards, and IETE J.C. Bose Memorial Award. Fellow of IE(I) and IETE, Senior Member IEEE. He has guided 15 Ph.D. students and published 70+ journals and 130+ conference papers.",
  },
  {
    name: "Prof. Bidyadhar Subudhi",
    role: "Professor, School of Electrical Sciences",
    inst: "IIT Goa (Former Director, NIT Warangal)",
    topic: "Robust & Adaptive Control for PV and Microgrid Systems",
    badge: "Keynote",
    image: imgBidyadharSubudhi,
    bio: "Prof. Subudhi is Dean (R&D) at IIT Goa. His specializations include System & Control Theory, Robust and Adaptive Control, Control of PV systems and Microgrids, Active Power Filtering, Wide Area Control, Blockchain Technology, Microgrid planning, and AI techniques in Power Systems.",
  },
  {
    name: "Dr. Soumya Chatterjee",
    role: "Associate Proffessor, Electrical Engineering",
    inst: "NIT Durgapur",
    topic:
      "Condition Monitoring of HEV Systems with Renewable Energy Integration",
    badge: "Invited",
    image: imgSoumyaChatterjee,
    bio: "Dr. Chatterjee holds a B.E. from Jadavpur University (2009), M.Sc. in Electrical Power Engineering from TU Darmstadt, Germany (2014), and Ph.D. from Jadavpur University (2019). His research focuses on condition monitoring and diagnostic techniques for high voltage electrical systems.",
  },
  {
    name: "Dr. Aditya R. Gautam",
    role: "Assistant Professor, EEE",
    inst: "BITS Pilani",
    topic: "Control Techniques for Renewable Energy Applications",
    badge: "Invited",
    image: imgAdityaGautam,
    bio: "Dr. Gautam received his Ph.D. from IIT Jodhpur (2019). He joined BITS Pilani in July 2019. Research interests: control of power electronic converters, microgrids, electric vehicles, and renewable energy technology — bridging theoretical control design with practical implementation.",
  },
  {
    name: "Dr. Deepak Kumar",
    role: "Assistant Professor, EEE",
    inst: "BIT Mesra, Ranchi",
    topic: "Smart Controllers for PV Inverter & Demand Side Management",
    badge: "Faculty",
    image: imgDeepakKumar,
    bio: "Dr. Deepak Kumar's research spans Blockchain technology for energy systems, microgrid planning, demand side management, design of smart controllers for PV inverter operation, hybrid energy storage systems with EV integration, and AI techniques in power systems.",
  },
  {
    name: "Dr. S.K. Mishra",
    role: "Head, Department of EEE",
    inst: "BIT Mesra, Ranchi",
    topic: "AI in Autonomous Vehicles & Smart Agriculture",
    badge: "Faculty",
    image: imgSKMishra,
    bio: "Dr. Mishra specialises in Signal, Image and Video Processing, Control Systems, Bio-Medical Image Processing, Soft and Evolutionary Computing, AI-based Visual Control of Autonomous Ground Vehicles, AI in Smart Agriculture, and AI in Healthcare.",
  },
];

const committee = [
  {
    role: "Patron",
    name: "Prof. Indranil Manna",
    title: "Vice Chancellor\nBIT Mesra, Ranchi",
    initials: "IM",
    contact: null,
  },
  {
    role: "Chairman",
    name: "Dr. Sudhansu Kumar Mishra",
    title: "Head, EEE Department\nBIT Mesra, Ranchi",
    initials: "SKM",
    contact: null,
  },
  {
    role: "Coordinator",
    name: "Dr. Gauri Shanker Gupta",
    title: "EEE Dept., BIT Mesra, Ranchi",
    initials: "DG",
    contact: {
      phone: "+91-9471301045",
      email: "gaurishankergupta@bitmesra.ac.in",
    },
  },
  {
    role: "Coordinator",
    name: "Dr. Sourabh Paitandi",
    title: "EEE Dept., BIT Mesra, Ranchi",
    initials: "SP",
    contact: { email: "sourabh_paitandi@bitmesra.ac.in" },
  },
];

/* ─────────────────────────────────────────────────────────────────────
   CAROUSEL COMPONENT  (unchanged from original)
───────────────────────────────────────────────────────────────────── */
const CAR_GAP = 20;
function getVis(w) { if (w < 540) return 1; if (w < 860) return 2; return 3; }

function SpeakerCarousel({ items, onSelect }) {
  const vpRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [slideW, setSlideW] = useState(320);

  const measure = () => {
    requestAnimationFrame(() => {
      if (!vpRef.current) return;
      const vw = vpRef.current.clientWidth;
      const vis = getVis(vw);
      const contentW = (vw - CAR_GAP * (vis - 1)) / vis;
      setSlideW(contentW + CAR_GAP);
    });
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []); // eslint-disable-line

  const vis = vpRef.current ? getVis(vpRef.current.clientWidth) : 3;
  const maxIdx = Math.max(0, items.length - vis);
  const safeIdx = Math.min(idx, maxIdx);
  const offset = safeIdx * slideW;

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(maxIdx, i + 1));
  const goTo = (i) => setIdx(Math.min(i, maxIdx));

  const initials = (name) =>
    name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/gi, "")
      .split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="car-outer">
      <div className="car-viewport" ref={vpRef}>
        <div className="car-track" style={{ transform: `translateX(-${offset}px)` }}>
          {items.map((s, i) => {
            const isLast = i === items.length - 1;
            const cardPx = isLast ? slideW - CAR_GAP : slideW;
            return (
              <div key={i} className="car-slide" style={{ width: `${cardPx}px` }}>
                <div className="sp-card" onClick={() => onSelect(s)}>
                  <div className="sp-photo">
                    <div className="sp-circle">
                      {s.image ? (
                        <img src={s.image} alt={s.name} onError={e => { e.target.style.display = "none"; }} />
                      ) : (
                        <span className="sp-initials">{initials(s.name)}</span>
                      )}
                    </div>
                    <div className="sp-photo-name">{s.name}</div>
                  </div>
                  <div className="sp-body">
                    <div className="sp-role">{s.role}</div>
                    <div className="sp-inst">{s.inst}</div>
                    {s.topic && <div className="sp-topic">🎤 {s.topic}</div>}
                    <span className="sp-badge">{s.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className="car-btn car-prev" onClick={prev} disabled={safeIdx === 0} aria-label="Previous">&#8249;</button>
      <button className="car-btn car-next" onClick={next} disabled={safeIdx === maxIdx} aria-label="Next">&#8250;</button>
      <div className="car-dots">
        {Array.from({ length: maxIdx + 1 }).map((_, i) => (
          <div key={i} className={`car-dot${i === safeIdx ? " on" : ""}`} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", dept: "", inst: "", role: "" });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const sub = (e) => { e.preventDefault(); if (form.name && form.email && form.inst) setSubmitted(true); };

  const findSpeaker = (spk) =>
    speakers.find(s => s.name.includes(spk.split(" ").slice(-1)[0])) || null;

  const initials = (name) =>
    name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/gi, "")
      .split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const navLinks = ["home", "about", "topics", "schedule", "speakers", "committee", "register"];

  const tickerItems = [
    { e: "📅", l: "Dates", v: "18–22 May 2026" },
    { e: "🏛", l: "Format", v: "Five Day Workshop · Hands-on Training" },
    {
      e: "⚡",
      l: "Theme",
      v: "Emerging Control & Digital Technologies for Sustainable Green Energy",
    },
    { e: "📍", l: "Venue", v: "Dept. of EEE, BIT Mesra, Ranchi" },
    { e: "🎓", l: "Mode", v: "Online" },
    { e: "📋", l: "Seats", v: "Limited No. Of Seats. Hurry Up to fix yours." },
  ];

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <style>{styles}</style>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[0, 1].map(c => (
            <div className="ticker-content" key={c} aria-hidden={c === 1}>
              {tickerItems.map((t, i) => (
                <div className="ticker-item" key={i}><em>{t.l}:</em> {t.v}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`nb${scrolled ? " scrolled" : ""}`}>
        <div className="nb-inner">
          <a className="nb-brand" href="#home" onClick={e => { e.preventDefault(); go("home"); }}>
            <div className="nb-logo">
              <img src="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" alt="BIT Mesra" />
            </div>
            <div>
              <div className="nb-name">BIT Mesra</div>
              <div className="nb-sub">Dept. of EEE</div>
            </div>
          </a>
          <button className="nb-toggle" onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
          <ul className={`nb-links${menuOpen ? " open" : ""}`}>
            {navLinks.map(id => (
              <li key={id}>
                <a href={`#${id}`} className={id === "register" ? "cta" : ""}
                  onClick={e => { e.preventDefault(); go(id); }}>
                  {id[0].toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── HERO ──
          whiteBg PNG is kept as the background image, completely unchanged.
          The .hero-overlay provides a richer dark-green scrim so all white
          text reads clearly regardless of what the PNG contains.           */}
      <section id="home" className="hero-wrap">
        <img src={whiteBg} alt="" className="hero-bg-img" />
        <div className="hero-overlay" />
        <div className="hero-dots" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />

        <div className="hero-body">
          {/* Left column */}
          <div>
            <div className="hero-eyebrow">
              <span className="pulse" />
              Five Day Faculty Development Programme · BIT Mesra · 2026
            </div>

            <h1 className="hero-title">
              Emerging Control &amp;<br />
              Digital Technologies for<br />
              <em>Sustainable Green Energy</em>
            </h1>

            {/* ★ FIX 1 — sub-text now white/light (was dark green #0b3d22) */}
            <p className="hero-sub">
              A comprehensive faculty development programme featuring{" "}
              <strong>18 distinguished speakers</strong>{" "}
              from IITs, NITs, Politecnico di Milano, Microsoft, and global
              universities — covering EV systems, smart grids, AI, and
              renewable energy control.
            </p>

            {/* ★ FIX 1 — chips: glassy white border on dark overlay */}
            <div className="hero-chips">
              {["📅 18–22 May 2026", "📍 EEE Dept., BIT Mesra", "🎙️ 18 Expert Speakers", "🤝 Offline · Hands-on"].map(t => (
                <div className="hero-chip" key={t}>{t}</div>
              ))}
            </div>

            <div className="hero-btns" style={{ marginTop: "-1.5rem" }}>
              <a href="#register" className="btn-em" onClick={e => { e.preventDefault(); go("register"); }}>Register Now →</a>
              <a href="#schedule" className="btn-ghost" onClick={e => { e.preventDefault(); go("schedule"); }}>View Schedule</a>
            </div>
          </div>

          {/* ★ FIX 1 — glance card: darker glass + white text values */}
          <div className="hero-aside">
            <div className="hc-title">
              <IcoCalendar size={17} color="#7edfa8" />
              Workshop at a Glance
            </div>
            {[
              { ico: "📅", lbl: "Dates", val: "18 – 22 May 2026" },
              {
                ico: "📍",
                lbl: "Venue",
                val: "Dept. of EEE, BIT Mesra\nRanchi, Jharkhand – 835215",
              },
              { ico: "⏱", lbl: "Duration", val: "5 Days · Hands-on Training" },
              {
                ico: "🎓",
                lbl: "Eligible",
                val: "Faculty · PhD · PG · Industry",
              },
              {
                ico: "🏅",
                lbl: "Cert.",
                val: "80% Attendance + 70% Assessment",
              },
              {
                ico: "📧",
                lbl: "Contact",
                val: "gaurishankergupta@bitmesra.ac.in",
              },
            ].map((r) => {
              const IconComponent = getIconComponent(r.lbl);
              return (
                <div className="hc-row" key={r.lbl}>
                  <div className="hc-ico"><IconComponent size={16} color="#7edfa8" /></div>
                  <div>
                    <div className="hc-lbl">{r.lbl}</div>
                    <div className="hc-val">{r.val}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="sec-white">
        <div className="sec">
          {/* ★ FIX 2 — about-grid uses align-items:start, reduced gap → text never clips */}
          <div className="about-grid">
            <div>
              <div className="tag">About the Workshop</div>
              <h2 className="sec-h">Bridging Theory with Industrial Practice</h2>
              <div className="rule" />
              <div className="about-text">
                <p>
                  This{" "}
                  <strong>
                    Five-Day Online Faculty Development Programme
                  </strong>{" "}
                  brings together 18 distinguished speakers from IITs, NITs,
                  international universities, and industry to deliver a rigorous
                  exploration of emerging control and digital technologies for
                  green energy systems.
                </p>
                <p>
                  The programme covers the full spectrum — from{" "}
                  <strong>
                    EV charging infrastructure and bidirectional grid
                    interactions
                  </strong>{" "}
                  to AI-driven predictive maintenance, port-Hamiltonian control,
                  and cyber-resilience of legacy power networks.
                </p>
                <p>
                  Designed for{" "}
                  <strong>
                    faculty, PhD scholars, and industry professionals
                  </strong>
                  . Certificates awarded on meeting attendance and assessment
                  criteria. All participants receive welcome kits and high tea
                  at inauguration and valedictory.
                </p>
              </div>
            </div>
            <div className="stats-panel">
              <h3>Workshop Highlights</h3>
              {[
                {
                  num: "18",
                  lbl: "Distinguished Speakers from IITs, NITs, International Universities",
                  w: "95%",
                },
                {
                  num: "5",
                  lbl: "Days of Intensive Hands-on Training",
                  w: "100%",
                },
                { num: "200", lbl: "Maximum Participant Capacity", w: "60%" },
                { num: "118", lbl: "Registration Fee(Including GST)", w: "5%" },
                { num: "3", lbl: "International Speakers", w: "50%" },
              ].map((s) => (
                <div className="s-item" key={s.num}>
                  <div className={`s-num${s.gold ? " gold" : ""}`}>{s.num}</div>
                  <div style={{ flex: 1 }}>
                    <div className="s-lbl">{s.lbl}</div>
                    <div className="s-bar">
                      <div className={s.gold ? "s-fill-gold" : "s-fill"} style={{ width: s.w }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOCUS AREAS ── */}
      <section className="sec-light">
        <div className="sec">
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 3rem" }}>
            <div className="tag" style={{ justifyContent: "center" }}>Key Focus Areas</div>
            <h2 className="sec-h">Four Pillars of the Programme</h2>
            <div className="rule" style={{ margin: "0 auto" }} />
          </div>
          {/* ★ FIX 3 — all emoji stickers replaced with professional SVG icons */}
          <div className="obj-grid">
            {[
              {
                ico: "🔌",
                h: "EV & Power Electronics",
                d: "Bidirectional EV chargers, V2G technology, Z-source inverters, and digital controllers for power converters.",
              },
              {
                ico: "🌐",
                h: "Smart Grid & Microgrids",
                d: "PMU applications, microgrid energy management, cyber resiliency of legacy networks, and wide-area control.",
              },
              {
                ico: "🧠",
                h: "AI & Control Systems",
                d: "AI-based predictive maintenance, robust adaptive control for PV, port-Hamiltonian frameworks, and windmill control.",
              },
              {
                ico: "☀️",
                h: "Renewable Energy Systems",
                d: "Solar PV grid integration, HEV condition monitoring, sustainable energy applications, and Renewable Energy control techniques.",
              },
            ].map((o, i) => {
              const IconComponent = getIconComponent(o.h);
              return (
                <div className="obj-card" key={i}>
                  <div className="obj-ico"><IconComponent size={26} color="#14834a" /></div>
                  <h4>{o.h}</h4>
                  <p>{o.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section className="sec-dark" id="topics">
        <div className="sec">
          <div className="topics-grid">
            <div>
              <div className="tag light">Curriculum</div>
              <h2 className="sec-h light">Topics Covered</h2>
              <div className="rule" />
              <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".95rem", lineHeight: 1.75, marginBottom: "1.5rem", fontWeight: 300 }}>
                Curated to reflect current state-of-the-art across Robotics, Vision, AI, and Industrial IoT — aligned with global Industry 4.0 standards.
              </p>
              <div className="topics-aside">
                <p><strong>📋 Resource Materials:</strong> Lab manuals, reading lists, and presentation slides distributed to all registered participants before the programme.</p>
              </div>
            </div>
            <div className="topic-cols">
              {Object.entries(topics).map(([cat, items]) => (
                <div key={cat}>
                  <div className="topic-cat">{cat}</div>
                  {items.map((t, i) => (
                    <div className="topic-item" key={i}>
                      <div className="topic-dot" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section className="sec-light" id="schedule">
        <div className="sec">
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 3rem" }}>
            <div className="tag" style={{ justifyContent: "center" }}>Programme</div>
            <h2 className="sec-h">Workshop Schedule</h2>
            <div className="rule" style={{ margin: "0 auto" }} />
            <p
              style={{ color: "#64748b", fontSize: ".95rem", lineHeight: 1.75 }}
            >
              Five days of expert talks.&nbsp;
              <strong style={{ color: "#18a352" }}>
                Click any session row
              </strong>{" "}
              to view the speaker's full profile and bio.
            </p>
          </div>

          {/* ★ FIX 4 — day-tabs fully styled (.day-tab, .day-tab.active) */}
          <div className="day-tabs">
            {schedule.map((d, i) => (
              <button
                key={i}
                className={`day-tab${i === activeDay ? " active" : ""}`}
                onClick={() => setActiveDay(i)}
              >
                {d.day} · {d.date}
              </button>
            ))}
          </div>

          {/* Day panels */}
          {schedule.map((d, di) => (
            <div key={di} className={`day-panel${di === activeDay ? " active" : ""}`}>
              <div className="day-title">
                {d.day}: {d.subtitle}
                <span className="day-date">{d.date}</span>
              </div>
              {d.items.map((item, ji) => {
                const sp = item.spk ? findSpeaker(item.spk) : null;
                return (
                  <div
                    key={ji}
                    className={`sched-row${item.hl ? " hl" : ""}${sp ? " clickable" : ""}`}
                    onClick={sp ? () => setSelectedSpeaker(sp) : undefined}
                  >
                    <div className="sched-time">{item.time}</div>
                    <div className="sched-avatar">
                      {sp && sp.image ? (
                        <img src={sp.image} alt={sp.name} />
                      ) : (
                        <span className="sched-avatar-initials">
                          {sp ? initials(sp.name) : item.ico}
                        </span>
                      )}
                    </div>
                    <div className="sched-body">
                      <div className="sched-title">{item.event}</div>
                      {sp && <div className="sched-spk">🎙️ {sp.name} · {item.inst}</div>}
                      {sp && <div className="sched-hint">Click to view bio →</div>}
                    </div>
                    {sp && <div className="sched-arrow">›</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ── SPEAKERS ── */}
      <section id="speakers" className="sec-white">
        <div className="sec">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="tag">Resource Persons</div>
              <h2 className="sec-h" style={{ marginBottom: 0 }}>Distinguished Speakers</h2>
              <div className="rule" style={{ marginBottom: 0 }} />
            </div>
            <p style={{ color: "#64748b", fontSize: ".88rem", maxWidth: 380, textAlign: "right", lineHeight: 1.6 }}>
              Experts from IITs, NITs, Politecnico di Milano, Microsoft &amp; global universities.<br />
              <strong style={{ color: "#18a352" }}>Click any card</strong> for full profile &amp; bio.
            </p>
          </div>
          <SpeakerCarousel items={speakers} onSelect={setSelectedSpeaker} />
        </div>
      </section>

      {/* ── COMMITTEE ── */}
      <section id="committee" className="sec-dark">
        <div className="sec">
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 3rem" }}>
            <div className="tag light" style={{ justifyContent: "center" }}>Organisation</div>
            <h2 className="sec-h light">Organizing Committee</h2>
            <div className="rule" style={{ margin: "0 auto" }} />
          </div>
          <div className="cm-grid">
            {committee.map((m, i) => (
              <div className="cm-card" key={i}>
                <div className="cm-av">{m.initials}</div>
                <div className="cm-role">{m.role}</div>
                <div className="cm-name">{m.name}</div>
                <div className="cm-title">{m.title}</div>
                {m.contact && (
                  <div className="cm-contact">
                    {m.contact.phone && <div>📞 {m.contact.phone}</div>}
                    {m.contact.email && <div>✉️ <a href={`mailto:${m.contact.email}`}>{m.contact.email}</a></div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT DETAILS ── */}
      {/* ★ FIX 5 — all emoji stickers replaced with professional SVG icons,
                     capacity → 200, fee → ₹150                            */}
      <section id="details" className="sec-light">
        <div className="sec">
          <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 3rem" }}>
            <div className="tag" style={{ justifyContent: "center" }}>Logistics</div>
            <h2 className="sec-h">Event Details</h2>
            <div className="rule" style={{ margin: "0 auto" }} />
          </div>
          <div className="ev-grid">
            {[
              {
                ico: "📅",
                lbl: "Dates",
                val: "18 – 22 May 2026",
                sub: "Five consecutive days",
              },
              {
                ico: "📍",
                lbl: "Venue",
                val: "EEE Dept., BIT Mesra",
                sub: "Birla Institute of Technology, Ranchi – 835215",
              },
              {
                ico: "⏱",
                lbl: "Format",
                val: "Five Day Workshop",
                sub: "Online · Hands-on Training",
              },
              {
                ico: "🎓",
                lbl: "Eligible",
                val: "Faculty · PhD · PG · Industry",
                sub: "AICTE-approved institutions & industry professionals",
              },
              {
                ico: "👥",
                lbl: "Capacity",
                val: "Maximum 200 Seats",
                sub: "Book you seat now.",
              },
              {
                ico: "💰",
                lbl: "Fee",
                val: "100 + 18(GST) = 118 rs.",
                sub: "Free for all eligible participants",
              },
            ].map((e) => {
              const IconComponent = getIconComponent(e.lbl);
              return (
                <div className="ev-card" key={e.lbl}>
                  <div className="ev-ico"><IconComponent size={22} color="#14834a" /></div>
                  <div className="ev-label">{e.lbl}</div>
                  <div className="ev-val">{e.val}</div>
                  <div className="ev-sub">{e.sub}</div>
                </div>
              );
            })}
          </div>

          <div className="cert-banner">
            <div className="cert-ico">
              <IcoAward size={22} color="#d97706" />
            </div>
            <div>
              <div className="cert-lbl">Certificate of Participation</div>
              <p className="cert-txt">
                Certificates are awarded to participants with more than 80% attendance who secure more than 70% in the assessment. All participants receive a welcome kit, with high tea provided after Inauguration and Valedictory sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTER ── */}
      <section id="register" className="sec-white">
        <div className="sec">
          <div style={{ maxWidth: 500, marginBottom: "3rem" }}>
            <div className="tag">Join Us</div>
            <h2 className="sec-h">Register for the Workshop</h2>
            <div className="rule" />
            <p
              style={{ color: "#64748b", fontSize: ".95rem", lineHeight: 1.75 }}
            >
              200 Seats available. Book fast to capture your place.
              Last date: <strong>15 May 2026</strong>.
            </p>
          </div>
          <div className="reg-grid">
            <ul className="info-list">
              {[
                { IcoC: IcoMail, lbl: "Coordinators", val: "gaurishankergupta@bitmesra.ac.in\nsourabh_paitandi@bitmesra.ac.in" },
                { IcoC: IcoPhone, lbl: "Phone", val: "+91-9471301045" },
                { IcoC: IcoBuilding, lbl: "Department", val: "Electrical & Electronics Engineering\nBIT Mesra, Ranchi – 835215" },
                { IcoC: IcoCalendar, lbl: "Last Date", val: "15 May 2026 · Confirmation by 17 May 2026" },
                { IcoC: IcoLink, lbl: "Registration Link", val: "https://forms.gle/YXM16hAbYpxbFv1o7" },
                { IcoC: IcoLightbulb, lbl: "Who Should Attend", val: "Faculty (AICTE approved), PhD Scholars, PG Scholars, Industry Professionals" },
              ].map(r => (
                <li className="info-row" key={r.lbl}>
                  <div className="info-ico"><r.IcoC size={18} color="#14834a" /></div>
                  <div>
                    <div className="info-lbl">{r.lbl}</div>
                    <div className="info-val">{r.val}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="reg-box" style={{ padding: 0, overflow: "hidden" }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf5R6lHD-kxdSfxkFJyJsOmmPi9h9TdJ1HeP0twJ60hZcRInw/viewform?embedded=true"
                width="100%"
                height="860"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="Workshop Registration Form"
                style={{ display: "block", border: "none" }}
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div >
      </section >

      {/* ── FOOTER ── */}
      < footer >
        <div className="ft-inner">
          <div className="ft-grid">
            <div>
              <div className="ft-brand">Birla Institute of Technology, Mesra</div>
              <div className="ft-sub">Knowledge is Power — Est. 1955</div>
              <p className="ft-about">The Dept. of EEE is dedicated to advancing energy systems research integrating AI, IoT, and renewable energy control into a world-class curriculum. BIT Mesra is a deemed university of national distinction.</p>
              <div className="ft-badge" style={{ marginTop: "1rem" }}><span className="dot" />Registration Open</div>
            </div>
            <div>
              <div className="ft-h">Contact</div>
              <ul className="ft-list">
                <li><strong>Dept. of EEE, BIT Mesra</strong></li>
                <li>Mesra, Ranchi – 835215, Jharkhand</li>
                <li style={{ marginTop: ".5rem" }}>📞 +91-9471301045</li>
                <li>📧 gaurishankergupta@bitmesra.ac.in</li>
                <li>🌐 www.bitmesra.ac.in</li>
              </ul>
            </div>
            <div>
              <div className="ft-h">Workshop</div>
              <ul className="ft-list">
                {navLinks.map(l => (
                  <li key={l}><a href={`#${l}`} onClick={e => { e.preventDefault(); go(l); }}>{l[0].toUpperCase() + l.slice(1)}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="ft-bottom">
            <p>© 2026 BIT Mesra · Dept. of Electrical &amp; Electronics Engineering</p>
            <p>Workshop on Emerging Control &amp; Digital Technologies for Sustainable Green Energy Systems</p>
          </div>
        </div>
      </footer >

      {/* ── SPEAKER MODAL (split layout) ── */}
      {
        selectedSpeaker && (
          <div className="m-overlay" onClick={() => setSelectedSpeaker(null)}>
            <div className="m-box" onClick={e => e.stopPropagation()}>
              <button className="m-close" onClick={() => setSelectedSpeaker(null)}>×</button>
              <div className="m-left">
                <div className="m-photo">
                  {selectedSpeaker.image ? (
                    <img src={selectedSpeaker.image} alt={selectedSpeaker.name} onError={e => { e.target.style.display = "none"; }} />
                  ) : (
                    <span className="m-pi">{initials(selectedSpeaker.name)}</span>
                  )}
                </div>
                <div className="m-left-name">{selectedSpeaker.name}</div>
                <div className="m-left-inst">{selectedSpeaker.inst}</div>
                <div className="m-left-badge">{selectedSpeaker.badge}</div>
              </div>
              <div className="m-right">
                <div className="m-name">{selectedSpeaker.name}</div>
                <div className="m-role">{selectedSpeaker.role}</div>
                <div className="m-inst">{selectedSpeaker.inst}</div>
                {selectedSpeaker.topic && (
                  <div className="m-topic-box">
                    <div className="m-topic-lbl">🎤 Keynote / Talk Topic</div>
                    <div className="m-topic-txt">{selectedSpeaker.topic}</div>
                  </div>
                )}
                <div className="m-bio-lbl">Biography &amp; Expertise</div>
                <p className="m-bio-txt">{selectedSpeaker.bio}</p>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

