import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { speakers } from "../../data/content";

/* ───────────────────────────────────────────────────────────
   Coverflow-style 3D Carousel — Speakers Section (Light Theme)
   ─────────────────────────────────────────────────────────── */

const SPRING = { type: "spring", stiffness: 28, damping: 18, mass: 2 };

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
      x: offset < 0 ? "-68%" : "68%",
      scale: 0.78,
      zIndex: 30,
      opacity: 0.6,
      filter: "grayscale(100%) opacity(70%)",
      rotateY: offset < 0 ? 18 : -18,
    };
  }

  if (absOffset === 2) {
    // ── OUTER (visible) ──
    return {
      x: offset < 0 ? "-125%" : "125%",
      scale: 0.55,
      zIndex: 20,
      opacity: 0.35,
      filter: "grayscale(100%) opacity(50%)",
      rotateY: offset < 0 ? 28 : -28,
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
        background:
          "linear-gradient(175deg, #064e3b 0%, #047857 50%, #064e3b 100%)",
      }}
    >
      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23ffffff'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Radial glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <div className="tag light flex justify-center w-full" style={{ justifyContent: "center" }}>
            Resource Persons
          </div>
          <h2
            className="sec-h light"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              marginBottom: "0.6rem",
              color: "#ffffff",
            }}
          >
            Distinguished Speakers
          </h2>
          <div
            style={{
              width: 52,
              height: 3,
              margin: "0 auto 1.2rem",
              background: "linear-gradient(to right, #34d399, #10b981)",
              borderRadius: 2,
            }}
          />
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: ".88rem",
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            18 experts from IITs, NITs, Politecnico di Milano, Microsoft &
            global universities.
            <br />
            <strong style={{ color: "#34d399" }}>Tap the center card</strong> for
            full profile & bio.
          </p>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            COVERFLOW CAROUSEL
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div
          className="relative mx-auto"
          style={{
            height: 420,
            maxWidth: 900,
            perspective: "1200px",
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
                  width: 280,
                  height: 380,
                  marginLeft: -140,
                  transformStyle: "preserve-3d",
                  cursor: isActive ? "pointer" : "default",
                  pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                }}
                whileHover={isActive ? { scale: 1.05 } : {}}
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
        <div className="mt-10" style={{ minHeight: 150, textAlign: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Badge */}
              <span
                className="inline-block mb-2"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#059669",
                  background: "rgba(4,120,87,0.08)",
                  padding: "4px 12px",
                  borderRadius: "50px",
                }}
              >
                {activeSpeaker.badge}
              </span>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  marginBottom: "0.35rem",
                }}
              >
                {activeSpeaker.name}
              </h3>

              {/* Role */}
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {activeSpeaker.role}
              </p>

              {/* Institution */}
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.5,
                  marginTop: 2,
                }}
              >
                {activeSpeaker.inst}
              </p>

              {/* Topic */}
              {activeSpeaker.topic && (
                <p
                  className="mt-2"
                  style={{
                    fontSize: "0.8rem",
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.65)",
                    maxWidth: 440,
                    lineHeight: 1.55,
                  }}
                >
                  🎤 {activeSpeaker.topic}
                </p>
              )}
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
  return (
    <div
      className="w-full h-full relative overflow-hidden bg-white"
      style={{
        borderRadius: 14,
        border: isActive
          ? "3px solid #047857"
          : "2px solid rgba(4,120,87,0.15)",
        boxShadow: isActive
          ? "0 0 40px rgba(4,120,87,0.15), 0 25px 50px rgba(4,120,87,0.25)"
          : "0 10px 30px rgba(4,120,87,0.1)",
        transition: "border 0.35s ease, box-shadow 0.35s ease",
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
              fontSize: "3.8rem",
              fontWeight: 900,
              color: "#047857",
            }}
          >
            {initials}
          </span>
        </div>
      )}

      {/* Bottom gradient fade (white gradient instead of dark) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.25) 60%, transparent 100%)",
        }}
      />

      {/* Active-only: badge + green glow overlay */}
      {isActive && (
        <>
          {/* Subtle green halo on hover */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(4,120,87,0.06) 0%, transparent 60%)",
            }}
          />

          {/* Badge chip */}
          <div className="absolute bottom-3 left-3" style={{ zIndex: 5 }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.58rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#047857",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                padding: "4px 10px",
                borderRadius: 5,
                border: "1px solid rgba(4,120,87,0.3)",
                boxShadow: "0 2px 8px rgba(4,120,87,0.15)",
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