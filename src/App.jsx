import { useState, useEffect, useRef, useCallback } from "react";
import { topics, schedule, speakers, committee } from "./data/content";
import { 
  IcoCalendar, 
  getIconComponent, 
  IcoAward, 
  IcoMail, 
  IcoPhone, 
  IcoBuilding, 
  IcoLink, 
  IcoLightbulb 
} from "./components/icons";

import Ticker from "./components/layout/ticker";
import Navbar from "./components/layout/navbar";
import Hero from "./components/sections/hero";
import About from "./components/sections/about";
import Timeline from "./components/sections/timeline";
import Speakers from "./components/sections/speakers";
import CallToAction from "./components/sections/callToAction";
import Footer from "./components/layout/footer";

import vc from "./assets/images/vc.jpg";
import gail from "./assets/images/gail.jpeg";
import crlogo from "./assets/images/crlogo.jpeg";
import gssir2 from "./assets/images/gssir2.png";
import sourabh from "./assets/images/sourabh.jpg";

import whiteBg from "./assets/images/white bg.png";  /* hero background — unchanged */

/* ─────────────────────────────────────────────────────────────────────
   PROFESSIONAL SVG ICON COMPONENTS  (replaces all childish emoji icons)
───────────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────────
   ICON MAPPING HELPER (maps labels/titles to proper SVG icons)
───────────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────────
   DATA  (unchanged from original)
───────────────────────────────────────────── */


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
    { e: "🎓", l: "Mode", v: "Hybrid" },
    { e: "📋", l: "Seats", v: "Limited No. Of Seats. Hurry Up to fix yours." },
  ];

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <style>{styles}</style>


      {/* ── NAVBAR ── */}
      <nav className={`nb${scrolled ? " scrolled" : ""}`}>
        <div className="nb-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a className="nb-brand" href="#home" onClick={e => { e.preventDefault(); go("home"); }}>
              <div className="nb-logo">
                <img src="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" alt="BIT Mesra" />
              </div>
              <div>
                <div className="nb-name">BIT Mesra</div>
                <div className="nb-sub">Dept. of EEE</div>
              </div>
            </a>

            {/* GAIL Sponsor Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "1.5rem", borderLeft: "2px solid rgba(11, 61, 34, 0.15)", height: "44px" }}>
              <div style={{ height: "40px", display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "4px" }}>
                <img src={gail} alt="GAIL Logo" style={{ height: "100%", width: "auto", objectFit: "contain", mixBlendMode: "multiply" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--slate)", lineHeight: 1.2 }}>Sponsored by</span>
                <span style={{ fontSize: "1.1rem", fontFamily: "'Playfair Display', serif", fontWeight: 1000, color: "var(--navy)", lineHeight: 1.1 }}>GAIL</span>
              </div>
            </div>

            {/* Creative Robotics Sponsor Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "1.5rem", borderLeft: "2px solid rgba(11, 61, 34, 0.15)", height: "44px" }}>
              <div style={{ height: "40px", display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "4px" }}>
                <img src={crlogo} alt="Creative Robotics Logo" style={{ height: "100%", width: "auto", objectFit: "contain", mixBlendMode: "multiply" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--slate)", lineHeight: 1.2 }}>Also Sponsored By</span>
                <span style={{ fontSize: "1.1rem", fontFamily: "'Playfair Display', serif", fontWeight: 1000, color: "var(--navy)", lineHeight: 1.1 }}>Creative Robotics</span>
              </div>
            </div>
          </div>
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
              {["📅 18–22 May 2026", "📍 EEE Dept., BIT Mesra", "🎙️ 18 Expert Speakers", "🤝 Hybrid · Hands-on"].map(t => (
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
                { num: "2", lbl: "International Speakers", w: "50%" },
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
                <div className="cm-av">
                  {i === 0 ? (
                    <img
                      src={vc}
                      alt={m.name}
                      style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : i === 1 ? (
                    <img
                      src={imgSKMishra}
                      alt={m.name}
                      style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : i === 2 ? (
                    <img
                      src={gssir2}
                      alt={m.name}
                      style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : i === committee.length - 1 ? (
                    <img
                      src={sourabh}
                      alt={m.name}
                      style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    m.initials
                  )}
                </div>
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

