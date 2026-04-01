import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { schedule, speakers } from "../../data/content";

/* ─────────────────────────────────────────────────────────────
   Schedule Page — Full page with light theme
   Renders as a regular page section (navbar + footer present)
   ───────────────────────────────────────────────────────────── */

export default function SchedulePage({ onSelectSpeaker }) {
  const [activeDay, setActiveDay] = useState(0);

  const findSpeaker = (spk) =>
    speakers.find((s) => s.name.includes(spk.split(" ").slice(-1)[0])) || null;

  const initials = (name) =>
    name
      .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/gi, "")
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const day = schedule[activeDay];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(170deg, #f8fafc 0%, #f0fdf4 40%, #dcfce7 100%)",
        position: "relative",
      }}
    >
      {/* ── Subtle background dots ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23047857'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* ━━━━━━━━━ HERO HEADER ━━━━━━━━━ */}
      <div
        style={{
          position: "relative",
          padding: "7rem 2rem 3rem",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Green accent bar */}
        <div
          style={{
            position: "absolute",
            left: "2rem",
            top: "6.5rem",
            width: 4,
            height: 90,
            background: "linear-gradient(to bottom, #047857, #10b981)",
            borderRadius: 2,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ paddingLeft: "1.5rem" }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              color: "#022c22",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: "0.6rem",
            }}
          >
            SCHEDULE.
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#047857",
            }}
          >
            MAY 18 — 22, 2026 · BIT MESRA, RANCHI
          </p>
        </motion.div>
      </div>

      {/* ━━━━━━━━━ DAY TABS ━━━━━━━━━ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {schedule.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              style={{
                padding: "0.55rem 1.3rem",
                borderRadius: 8,
                fontSize: "0.75rem",
                fontWeight: 900,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border:
                  i === activeDay
                    ? "1.5px solid #047857"
                    : "1.5px solid rgba(4,120,87,0.2)",
                background:
                  i === activeDay
                    ? "#047857"
                    : "white",
                color:
                  i === activeDay ? "white" : "#047857",
                cursor: "pointer",
                transition: "all 0.25s",
                outline: "none",
                boxShadow: i === activeDay ? "0 4px 12px rgba(4,120,87,0.25)" : "none",
              }}
              onMouseEnter={(e) => {
                if (i !== activeDay) {
                  e.currentTarget.style.borderColor = "rgba(4,120,87,0.5)";
                  e.currentTarget.style.color = "#022c22";
                }
              }}
              onMouseLeave={(e) => {
                if (i !== activeDay) {
                  e.currentTarget.style.borderColor = "rgba(4,120,87,0.2)";
                  e.currentTarget.style.color = "#047857";
                }
              }}
            >
              {d.day} · {d.date}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ━━━━━━━━━ DAY CONTENT ━━━━━━━━━ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* ── Left: Day Info Card ── */}
            <div
              style={{
                background: "white",
                border: "1px solid rgba(4,120,87,0.15)",
                boxShadow: "0 10px 30px rgba(4,120,87,0.05)",
                borderRadius: 16,
                padding: "2rem 1.5rem",
                position: "sticky",
                top: 80,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.6rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#059669",
                  marginBottom: "0.5rem",
                }}
              >
                {day.day}
              </span>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  fontWeight: 900,
                  color: "#022c22",
                  lineHeight: 1.25,
                  marginBottom: "0.3rem",
                }}
              >
                {day.date}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#475569",
                  lineHeight: 1.5,
                  marginBottom: "1.5rem",
                }}
              >
                {day.subtitle}
              </p>

              {/* Session count */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0.8rem 1rem",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  marginBottom: "0.75rem",
                }}
              >
                <Clock size={14} style={{ color: "#059669", flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#334155",
                    fontWeight: 700,
                  }}
                >
                  {day.items.length} Sessions
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0.8rem 1rem",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                }}
              >
                <MapPin size={14} style={{ color: "#059669", flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#334155",
                    fontWeight: 700,
                  }}
                >
                  EEE Dept., BIT Mesra
                </span>
              </div>

              {/* Decorative gradient line */}
              <div
                style={{
                  width: "100%",
                  height: 2,
                  background:
                    "linear-gradient(to right, #047857, #10b981, transparent)",
                  borderRadius: 1,
                  marginTop: "1.5rem",
                  opacity: 0.6,
                }}
              />
            </div>

            {/* ── Right: Session List ── */}
            <div>
              {/* Day title bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: "1.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid rgba(4,120,87,0.2)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#059669",
                  }}
                >
                  {day.day}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(4,120,87,0.15)",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#64748b",
                    letterSpacing: "0.04em",
                  }}
                >
                  {day.subtitle}
                </span>
              </div>

              {/* Session rows */}
              {day.items.map((item, ji) => {
                const sp = item.spk ? findSpeaker(item.spk) : null;
                const isClickable = !!sp;

                return (
                  <motion.div
                    key={ji}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: ji * 0.06 }}
                    onClick={isClickable ? () => onSelectSpeaker(sp) : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1.25rem",
                      marginBottom: "0.5rem",
                      background: "white",
                      border: "1px solid rgba(4,120,87,0.15)",
                      borderLeft: item.hl
                        ? "4px solid #047857"
                        : "4px solid transparent",
                      borderRadius: 10,
                      cursor: isClickable ? "pointer" : "default",
                      transition: "all 0.25s",
                      boxShadow: "0 4px 12px rgba(4,120,87,0.03)",
                    }}
                    onMouseEnter={(e) => {
                      if (isClickable) {
                        e.currentTarget.style.background = "#f0fdf4";
                        e.currentTarget.style.borderColor = "rgba(4,120,87,0.4)";
                        e.currentTarget.style.transform = "translateX(5px)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(4,120,87,0.08)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isClickable) {
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.borderColor = "rgba(4,120,87,0.15)";
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(4,120,87,0.03)";
                      }
                    }}
                  >
                    {/* Speaker Avatar */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        border: "2px solid rgba(4,120,87,0.2)",
                        background: "#ecfdf5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {sp && sp.image ? (
                        <img
                          src={sp.image}
                          alt={sp.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top center",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "0.85rem",
                            fontWeight: 900,
                            color: "#047857",
                          }}
                        >
                          {sp ? initials(sp.name) : item.ico}
                        </span>
                      )}
                    </div>

                    {/* Event Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 900,
                          color: "#022c22",
                          lineHeight: 1.35,
                          marginBottom: 4,
                        }}
                      >
                        {item.event}
                      </div>
                      {sp ? (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: "#059669",
                          }}
                        >
                          🎙️ {sp.name} <span style={{color: "#94a3b8"}}>· {item.inst}</span>
                        </div>
                      ) : (
                        item.ico && (
                           <div
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "#64748b",
                              }}
                            >
                              {item.ico === "☕" || item.ico === "🍛" ? "Break" : "Session"}
                            </div>
                        )
                      )}
                    </div>

                    {/* Time & Badge */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 900,
                          color: "#059669",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.time}
                      </div>
                      {item.hl && (
                        <div
                          style={{
                            fontSize: "0.6rem",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#64748b",
                            marginTop: 4,
                          }}
                        >
                          INVITED
                        </div>
                      )}
                    </div>

                    {/* Arrow for clickable */}
                    {isClickable && (
                      <ChevronRight
                        size={16}
                        style={{
                          color: "#94a3b8",
                          flexShrink: 0,
                          marginLeft: 12,
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Mobile: single column override ── */}
      <style>{`
        @media (max-width: 768px) {
          .sched-grid-override { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
