import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { speakers } from "../../data/content";

/* ───────────────────────────────────────────────────────────
   Coverflow-style 3D Carousel — Speakers (rich contrast + pop)
   ─────────────────────────────────────────────────────────── */

const CARD_W = 360;
const CARD_H = 480;

const SPRING = { type: "spring", stiffness: 32, damping: 20, mass: 1.8 };

/**
 * Returns position config for each visible slot relative to activeIndex.
 * offset: -2  -1  0  +1  +2
 */
function getCardVariant(offset) {
  const absOffset = Math.abs(offset);

  if (offset === 0) {
    // ── ACTIVE / CENTER ──
    return {
      x: "0%",
      scale: 1,
      zIndex: 40,
      opacity: 1,
      filter: "grayscale(0%)",
      rotateY: 0,
    };
  }

  if (absOffset === 1) {
    // ── ADJACENT (left / right) ──
    return {
      x: offset < 0 ? "-66%" : "66%",
      scale: 0.76,
      zIndex: 30,
      opacity: 0.62,
      filter: "grayscale(55%) brightness(1) opacity(0.88)",
      rotateY: offset < 0 ? 16 : -16,
    };
  }

  if (absOffset === 2) {
    // ── OUTER (visible) ──
    return {
      x: offset < 0 ? "-118%" : "118%",
      scale: 0.52,
      zIndex: 20,
      opacity: 0.42,
      filter: "grayscale(65%) brightness(0.98) opacity(0.72)",
      rotateY: offset < 0 ? 26 : -26,
    };
  }

  // ── HIDDEN (offscreen, for smooth entry/exit) ──
  return {
    x: offset < 0 ? "-160%" : "160%",
    scale: 0.4,
    zIndex: 10,
    opacity: 0,
    filter: "grayscale(100%) opacity(0%)",
    rotateY: offset < 0 ? 35 : -35,
  };
}

function getInitials(name) {
  return name
    .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/gi, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN EXPORT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Speakers({ onSelectSpeaker }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = speakers.length;

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  const activeSpeaker = speakers[activeIndex];

  // Compute circular offset from activeIndex for any speaker index
  const getOffset = (idx) => {
    let diff = idx - activeIndex;
    // Wrap around for circular carousel
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const handleCardClick = (speakerIdx) => {
    if (speakerIdx === activeIndex) {
      onSelectSpeaker(speakers[speakerIdx]);
    } else {
      setActiveIndex(speakerIdx);
    }
  };

  return (
    <section
      id="speakers"
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        paddingTop: "114px",
        background: `
          radial-gradient(ellipse 90% 55% at 50% 0%, rgba(209, 250, 229, 0.65) 0%, transparent 52%),
          radial-gradient(ellipse 70% 50% at 100% 40%, rgba(167, 243, 208, 0.35) 0%, transparent 55%),
          radial-gradient(ellipse 60% 45% at 0% 60%, rgba(220, 252, 231, 0.5) 0%, transparent 50%),
          linear-gradient(180deg, #ffffff 0%, #f8fffb 45%, #f0fdf4 100%)
        `,
      }}
    >
      {/* ── Soft edge vignette (mint, not dark) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(187, 247, 208, 0.35) 100%)",
          opacity: 0.45,
        }}
      />

      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23047857'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Stage spotlight (carousel area) ── */}
      <div
        className="absolute pointer-events-none left-1/2 -translate-x-1/2"
        style={{
          top: "min(28%, 240px)",
          width: "min(95vw, 920px)",
          height: 420,
          background:
            "radial-gradient(ellipse 70% 65% at 50% 45%, rgba(167, 243, 208, 0.35) 0%, rgba(209, 250, 229, 0.12) 45%, transparent 72%)",
          filter: "blur(2px)",
        }}
      />

      {/* ── Header soft glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 720,
          height: 380,
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, transparent 62%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <div className="tag flex justify-center w-full" style={{ justifyContent: "center" }}>
            Resource Persons
          </div>
          <h2
            className="sec-h"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              marginBottom: "0.6rem",
              color: "#0b3d22",
            }}
          >
            Distinguished Speakers
          </h2>
          <div
            style={{
              width: 72,
              height: 4,
              margin: "0 auto 1.2rem",
              background: "linear-gradient(90deg, #34d399, #14834a, #0d9488)",
              borderRadius: 3,
              boxShadow: "0 2px 16px rgba(20, 131, 74, 0.2)",
            }}
          />
          <p
            style={{
              color: "#3d6055",
              fontSize: ".9rem",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            18 experts from IITs, NITs, Politecnico di Milano, Microsoft &
            global universities.
            <br />
            <strong style={{ color: "#14834a" }}>Tap the center card</strong> for
            full profile & bio.
          </p>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            COVERFLOW CAROUSEL
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div
          className="relative mx-auto"
          style={{
            height: 520,
            maxWidth: 1080,
            perspective: "1400px",
          }}
        >
          {speakers.map((speaker, idx) => {
            const offset = getOffset(idx);
            const isActive = offset === 0;
            const variant = getCardVariant(offset);

            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  x: variant.x,
                  scale: variant.scale,
                  zIndex: variant.zIndex,
                  opacity: variant.opacity,
                  rotateY: variant.rotateY,
                  filter: variant.filter,
                }}
                transition={SPRING}
                onClick={() => handleCardClick(idx)}
                className="absolute top-0 left-1/2"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  marginLeft: -CARD_W / 2,
                  transformStyle: "preserve-3d",
                  cursor: isActive ? "pointer" : "default",
                  pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                }}
                whileHover={
                  isActive
                    ? {
                        scale: 1.06,
                        y: -8,
                        transition: { type: "spring", stiffness: 400, damping: 25 },
                      }
                    : undefined
                }
              >
                <CoverflowCard
                  speaker={speaker}
                  isActive={isActive}
                  initials={getInitials(speaker.name)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SPEAKER DETAILS (below carousel)
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-10" style={{ minHeight: 128, textAlign: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="flex flex-col items-center"
              style={{ gap: "0.35rem" }}
            >
              <span
                className="inline-block"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#14834a",
                  background: "rgba(20, 131, 74, 0.08)",
                  border: "1px solid rgba(20, 131, 74, 0.2)",
                  padding: "3px 11px",
                  borderRadius: "50px",
                }}
              >
                {activeSpeaker.badge}
              </span>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                  fontWeight: 900,
                  color: "#0b3d22",
                  lineHeight: 1.12,
                  margin: 0,
                }}
              >
                {activeSpeaker.name}
              </h3>

              <div
                className="flex flex-col items-center"
                style={{ gap: "0.06rem", marginTop: "0.05rem" }}
              >
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "#1e5f45",
                    lineHeight: 1.3,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {activeSpeaker.role}
                </p>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#3d6055",
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {activeSpeaker.inst}
                </p>
                {activeSpeaker.topic && (
                  <p
                    style={{
                      fontSize: "0.78rem",
                      fontStyle: "italic",
                      color: "#4a6b5e",
                      maxWidth: 440,
                      lineHeight: 1.38,
                      margin: "0.2rem 0 0 0",
                    }}
                  >
                    🎤 {activeSpeaker.topic}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            NAVIGATION CONTROLS
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Prev */}
          <button
            onClick={prev}
            className="group"
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "white",
              border: "1.5px solid rgba(4,120,87,0.2)",
              boxShadow: "0 2px 8px rgba(4,120,87,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s",
              color: "#047857",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#047857";
              e.currentTarget.style.borderColor = "#047857";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(4,120,87,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "rgba(4,120,87,0.2)";
              e.currentTarget.style.color = "#047857";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(4,120,87,0.05)";
            }}
            aria-label="Previous speaker"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Pill Indicator */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "white",
              border: "1px solid rgba(4,120,87,0.2)",
              boxShadow: "0 2px 8px rgba(4,120,87,0.05)",
              borderRadius: 50,
              padding: "6px 18px",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 900,
                color: "#059669",
                letterSpacing: "0.04em",
              }}
            >
              {activeIndex + 1}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#94a3b8",
                fontWeight: 700,
              }}
            >
              /
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#64748b",
              }}
            >
              {total}
            </span>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="group"
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "white",
              border: "1.5px solid rgba(4,120,87,0.2)",
              boxShadow: "0 2px 8px rgba(4,120,87,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s",
              color: "#047857",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#047857";
              e.currentTarget.style.borderColor = "#047857";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(4,120,87,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "rgba(4,120,87,0.2)";
              e.currentTarget.style.color = "#047857";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(4,120,87,0.05)";
            }}
            aria-label="Next speaker"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COVERFLOW CARD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CoverflowCard({ speaker, isActive, initials }) {
  const popShadow = isActive
    ? `
        0 0 0 1px rgba(255,255,255,0.8) inset,
        0 2px 4px rgba(11,61,34,0.06) inset,
        0 0 0 3px rgba(52, 211, 153, 0.45),
        0 0 48px rgba(52, 211, 153, 0.28),
        0 0 80px rgba(167, 243, 208, 0.35),
        0 28px 56px rgba(11,61,34,0.12),
        0 12px 28px rgba(11,61,34,0.08)
      `
    : `
        0 10px 28px rgba(11,61,34,0.1),
        0 4px 12px rgba(11,61,34,0.06)
      `;

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-white"
      style={{
        borderRadius: 18,
        border: isActive
          ? "2px solid rgba(52, 211, 153, 0.85)"
          : "2px solid rgba(20, 131, 74, 0.12)",
        boxShadow: popShadow,
        transition: "border 0.35s ease, box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Speaker Image */}
      {speaker.image ? (
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover bg-white"
          style={{ objectPosition: "top center" }}
          draggable={false}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #dcfce7 0%, #ecfdf5 100%)",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "4.25rem",
              fontWeight: 900,
              color: "#047857",
            }}
          >
            {initials}
          </span>
        </div>
      )}

      {/* Bottom fade: light mint vignette for legibility on photos */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "48%",
          background: `
            linear-gradient(
              to top,
              rgba(236, 253, 245, 0.97) 0%,
              rgba(209, 250, 229, 0.55) 38%,
              rgba(167, 243, 208, 0.15) 72%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Active-only: badge + soft mint wash */}
      {isActive && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 88%, rgba(167, 243, 208, 0.22) 0%, transparent 58%)",
            }}
          />

          <div className="absolute bottom-4 left-4" style={{ zIndex: 5 }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.62rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#065f46",
                background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(236, 253, 245, 0.95) 100%)",
                backdropFilter: "blur(8px)",
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid rgba(45, 212, 191, 0.5)",
                boxShadow:
                  "0 4px 14px rgba(0,0,0,0.12), 0 0 20px rgba(45, 212, 191, 0.35)",
              }}
            >
              {speaker.badge}
            </span>
          </div>
        </>
      )}
    </div>
  );
}