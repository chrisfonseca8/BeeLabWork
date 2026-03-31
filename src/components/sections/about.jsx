import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { topics } from "../../data/content";
import { getIconComponent } from "../icons";

/* ───────────────────────────────────────────────────────────
   COMBINED ABOUT + CURRICULUM
   Bitotsav layout structure · White/Green theme
   Professional language throughout
   ─────────────────────────────────────────────────────────── */

const chapters = [
  {
    num: "I",
    title: "EV & Power\nElectronics",
    subtitle: "Power Systems Track",
    ico: "🔌",
    desc: "Bidirectional EV chargers, V2G technology, Z-source inverters, and digital controllers for power converters.",
    topics: [
      "Design & Control of Z-Source Inverter-Based Bidirectional EV Charger",
      "EV Charging and Grid Interactions",
      "Digital Controllers in Power Converters",
      "Shaping the Future of EV Charging Infrastructure",
    ],
  },
  {
    num: "II",
    title: "Smart Grid\n& Microgrids",
    subtitle: "Grid Systems Track",
    ico: "🌐",
    desc: "PMU applications, microgrid energy management, cyber resiliency of legacy networks, and wide-area control.",
    topics: [
      "PMU Application to Smart Grid",
      "Energy Management for Sustainable Microgrids",
      "Cyber Resiliency of Legacy Power Networks",
      "Wide-Area Monitoring & Control Systems",
    ],
  },
  {
    num: "III",
    title: "AI & Control\nSystems",
    subtitle: "Intelligence Track",
    ico: "🧠",
    desc: "AI-based predictive maintenance, robust adaptive control for PV, port-Hamiltonian frameworks, and windmill control.",
    topics: [
      "AI-Based Predictive Maintenance",
      "Port-Hamiltonian Control Framework for Fuel Cells",
      "Advanced Control for Wind Electrical Systems",
      "Writing Software/Firmware for Energy Efficient Systems",
    ],
  },
  {
    num: "IV",
    title: "Renewable\nEnergy Systems",
    subtitle: "Sustainability Track",
    ico: "☀️",
    desc: "Solar PV grid integration, HEV condition monitoring, sustainable energy applications, and control techniques.",
    topics: [
      "Control of Solar PV Systems Integrated with Grid",
      "Condition Monitoring of High Voltage Systems",
      "Control Techniques for Renewable Energy Applications",
      "Robust Adaptive Control for PV Integration",
    ],
  },
];

export default function About() {
  const [activeChap, setActiveChap] = useState(0);
  const ch = chapters[activeChap];

  return (
    <>
      {/* ══════════════════════════════════════════════════
          SECTION 1 — ABOUT (original light section)
          ══════════════════════════════════════════════════ */}
      <section id="about" className="sec-white">
        <div className="sec">
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
            {/* Right Column: Workshop At a Glance */}
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: "2rem",
                boxShadow: "0 10px 30px rgba(11,61,34,0.04)",
                alignSelf: "start",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  color: "#022c22",
                  marginBottom: "1.2rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid #e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    background: "#047857",
                    borderRadius: "50%",
                  }}
                />
                Workshop at a Glance
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  { lbl: "Dates", val: "18 – 22 May 2026" },
                  { lbl: "Venue", val: "Dept. of EEE, BIT Mesra\nRanchi, Jharkhand – 835215" },
                  { lbl: "Duration", val: "5 Days · Hands-on Training" },
                  { lbl: "Eligible", val: "Faculty · PhD · PG · Industry" },
                  { lbl: "Cert.", val: "80% Attendance + 70% Assessment" },
                  { lbl: "Contact", val: "gaurishankergupta@bitmesra.ac.in" },
                ].map((r) => {
                  const IconComp = getIconComponent(r.lbl);
                  return (
                    <div
                      key={r.lbl}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.85rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "1px solid rgba(11,61,34,0.04)",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "#ecfdf5",
                          border: "1px solid #d1fae5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: "#047857",
                        }}
                      >
                        <IconComp size={16} color="currentColor" />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.6rem",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: "#047857",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {r.lbl}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "#475569",
                            lineHeight: 1.4,
                            whiteSpace: "pre-line",
                            fontWeight: 600,
                          }}
                        >
                          {r.val}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION 2 — CURRICULUM TRACKS (Light Green Theme)
          Bitotsav-inspired 3-column interactive layout
          ══════════════════════════════════════════════════ */}
      <section
        id="topics"
        style={{
          background: "linear-gradient(175deg, #f8fafc 0%, #f0fdf4 35%, #dcfce7 70%, #f0fdf4 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle dot pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23047857'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "96px 2rem 80px", position: "relative", zIndex: 1 }}>

          {/* ── HEADER ROW ── */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "2.5rem", marginBottom: "4rem" }}>
            <div style={{ maxWidth: 620 }}>
              <div className="tag">Curriculum</div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  color: "#022c22",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Four Pillars<br />
                <span style={{ color: "#047857" }}>of the Programme.</span>
              </h2>
              <div className="rule" />
              <div
                style={{
                  borderLeft: "2px solid #c3e8d0",
                  paddingLeft: "1.25rem",
                  marginTop: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "#475569",
                    lineHeight: 1.8,
                    maxWidth: 420,
                    margin: 0,
                  }}
                >
                  Four core tracks define the workshop curriculum, each
                  covering cutting-edge topics in sustainable energy technology.
                </p>
              </div>
            </div>

            {/* Track number pills */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {chapters.map((c, idx) => (
                <button
                  key={c.num}
                  onClick={() => setActiveChap(idx)}
                  style={{
                    width: 68,
                    height: 68,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    border: activeChap === idx ? "2px solid #047857" : "1.5px solid #c3e8d0",
                    borderRadius: 12,
                    background: activeChap === idx ? "#047857" : "white",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    color: activeChap === idx ? "#fff" : "#3d6055",
                    boxShadow: activeChap === idx ? "0 4px 16px rgba(4,120,87,0.25)" : "0 2px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  <span style={{ fontSize: "0.5rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7 }}>
                    TRACK
                  </span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 900, fontStyle: "italic" }}>
                    {c.num}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── THREE COLUMN GRID ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(200px, 280px) 1fr minmax(200px, 300px)",
              gap: "1.25rem",
              minHeight: 500,
            }}
            className="chapters-grid"
          >
            {/* COL 1: Track Nav Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {chapters.map((c, idx) => {
                const isActive = activeChap === idx;
                return (
                  <button
                    key={c.num}
                    onClick={() => setActiveChap(idx)}
                    style={{
                      textAlign: "left",
                      padding: "1.25rem 1.15rem",
                      border: isActive ? "1.5px solid #047857" : "1.5px solid #e5e7eb",
                      borderRadius: 14,
                      background: isActive ? "white" : "rgba(255,255,255,0.6)",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      position: "relative",
                      borderLeft: isActive ? "5px solid #047857" : "5px solid transparent",
                      flex: 1,
                      boxShadow: isActive ? "0 8px 24px rgba(4,120,87,0.1)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                      <span style={{ fontSize: "0.58rem", fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase", color: "#047857" }}>
                        TRACK {c.num}
                      </span>
                      <span style={{ fontSize: "1rem", opacity: isActive ? 1 : 0.35, transition: "opacity 0.3s", filter: isActive ? "none" : "grayscale(100%)" }}>
                        {c.ico}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.05rem",
                        fontWeight: 900,
                        lineHeight: 1.2,
                        color: isActive ? "#022c22" : "#94a3b8",
                        margin: 0,
                        whiteSpace: "pre-line",
                        transition: "color 0.3s",
                      }}
                    >
                      {c.title}
                    </h3>
                    <span style={{ display: "block", marginTop: "0.4rem", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.18em", color: isActive ? "#64748b" : "#cbd5e1", textTransform: "uppercase" }}>
                      {c.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* COL 2: Visual Focus */}
            <div
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: 16,
                background: "white",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(4,120,87,0.06)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChap}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "2.5rem",
                  }}
                >
                  {/* Gradient background */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(150deg, #ecfdf5 0%, #dcfce7 40%, #f0fdf4 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(ellipse at 30% 30%, rgba(4,120,87,0.08) 0%, transparent 50%)",
                    }}
                  />

                  {/* Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1.75rem",
                      left: "1.75rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      border: "1.5px solid rgba(4,120,87,0.2)",
                      background: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(8px)",
                      padding: "7px 14px",
                      borderRadius: 8,
                      zIndex: 2,
                    }}
                  >
                    <span style={{ fontSize: "0.58rem", fontWeight: 900, color: "#047857", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                      ✦ ACTIVE TRACK FOCUS
                    </span>
                  </div>

                  {/* Large watermark numeral */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(10rem, 18vw, 16rem)",
                      fontWeight: 900,
                      fontStyle: "italic",
                      color: "rgba(4,120,87,0.06)",
                      lineHeight: 1,
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  >
                    {ch.num}
                  </div>

                  {/* Bottom typography */}
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <span style={{ display: "block", fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.22em", color: "#059669", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                      {ch.subtitle}
                    </span>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        lineHeight: 0.95,
                        color: "#022c22",
                        margin: 0,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {ch.title}
                    </h2>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* COL 3: Track Details */}
            <div
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: 16,
                background: "white",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(4,120,87,0.04)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChap}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <span style={{ fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.22em", color: "#047857", textTransform: "uppercase", borderBottom: "1.5px solid #e5e7eb", paddingBottom: "0.85rem", marginBottom: "1.25rem", display: "block" }}>
                    TRACK OVERVIEW
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.55rem",
                      fontWeight: 900,
                      lineHeight: 1.1,
                      color: "#022c22",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    {ch.subtitle.replace(" Track", "")}<br />
                    <span style={{ color: "#047857" }}>Track</span>
                  </h3>

                  <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.7, fontWeight: 500, marginBottom: "1.5rem" }}>
                    {ch.desc}
                  </p>

                  {/* Topics */}
                  <div style={{ borderTop: "1.5px solid #e5e7eb", paddingTop: "1rem", flex: 1 }}>
                    <span style={{ fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.18em", color: "#3d6055", textTransform: "uppercase", display: "block", marginBottom: "0.85rem" }}>
                      TOPICS COVERED
                    </span>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                      {ch.topics.map((t, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            fontSize: "0.78rem",
                            color: "#475569",
                            lineHeight: 1.45,
                            fontWeight: 600,
                            cursor: "default",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#022c22")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                        >
                          <span style={{ color: "#047857", marginTop: 2, fontSize: "0.5rem" }}>◼</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom link */}
                  <div style={{ marginTop: "auto", paddingTop: "1.25rem", borderTop: "1.5px solid #e5e7eb" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.6rem",
                        fontWeight: 900,
                        letterSpacing: "0.16em",
                        color: "#047857",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                    >
                      VIEW FULL SYLLABUS <span style={{ fontSize: "0.85rem" }}>↗</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── BOTTOM NAVIGATION BAR ── */}
          <div
            style={{
              marginTop: "2.5rem",
              borderTop: "1.5px solid #e5e7eb",
              paddingTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
              {chapters.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChap(idx)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: activeChap === idx ? "0.75rem" : "0.65rem",
                      fontWeight: 900,
                      color: activeChap === idx ? "#047857" : "#94a3b8",
                      letterSpacing: "0.04em",
                      transition: "all 0.3s",
                    }}
                  >
                    {c.num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: activeChap === idx ? "#3d6055" : "#cbd5e1",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      transition: "all 0.3s",
                    }}
                  >
                    {c.title.split("\n")[0]}
                  </span>
                </button>
              ))}
            </div>
            <span style={{ fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.16em", color: "#047857", textTransform: "uppercase" }}>
              BIT MESRA — EEE DEPT ↗
            </span>
          </div>
        </div>

        {/* Responsive */}
        <style>{`
          @media (max-width: 900px) {
            .chapters-grid {
              grid-template-columns: 1fr !important;
              min-height: auto !important;
            }
            .chapters-grid > div:nth-child(2) {
              min-height: 320px;
            }
          }
        `}</style>
      </section>
    </>
  );
}