import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sponsors } from "../../data/sponsors";

const SPRING = { type: "spring", stiffness: 28, damping: 18, mass: 2 };

function getCardVariant(offset) {
  const absOffset = Math.abs(offset);

  if (offset === 0) {
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
    return {
      x: offset < 0 ? "-125%" : "125%",
      scale: 0.55,
      zIndex: 20,
      opacity: 0.35,
      filter: "grayscale(100%) opacity(50%)",
      rotateY: offset < 0 ? 28 : -28,
    };
  }

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
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const AUTO_MS = 3000;

export default function SponsorsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = sponsors.length;

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [total]);

  const getOffset = (idx) => {
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const active = sponsors[activeIndex];

  const btnBase = {
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
  };

  return (
    <section
      id="sponsors"
      className="relative overflow-hidden"
      style={{
        paddingTop: "72px",
        paddingBottom: "96px",
        background:
          "linear-gradient(180deg, #f0fdf6 0%, #ffffff 45%, #f8fffb 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23047857'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div
            className="tag flex justify-center w-full"
            style={{ justifyContent: "center", color: "#14834a" }}
          >
            Partners
          </div>
          <h2
            className="sec-h"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              marginBottom: "0.5rem",
            }}
          >
            Our Sponsors
          </h2>
          <div
            style={{
              width: 52,
              height: 3,
              margin: "0 auto 1rem",
              background: "linear-gradient(to right, #34d399, #14834a)",
              borderRadius: 2,
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
            Organisations supporting the Faculty Development Programme and
            sustainable energy education at BIT Mesra.
          </p>
        </div>

        <div
          className="relative mx-auto"
          style={{
            height: 400,
            maxWidth: 900,
            perspective: "1200px",
          }}
        >
          {sponsors.map((sp, idx) => {
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
                onClick={() => setActiveIndex(idx)}
                className="absolute top-0 left-1/2"
                style={{
                  width: 280,
                  height: 360,
                  marginLeft: -140,
                  transformStyle: "preserve-3d",
                  cursor: "pointer",
                  pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                }}
                whileHover={isActive ? { scale: 1.03 } : {}}
              >
                <SponsorCard
                  sponsor={sp}
                  isActive={isActive}
                  initials={getInitials(sp.name)}
                />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8" style={{ minHeight: 120, textAlign: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <span
                className="inline-block mb-2"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#059669",
                  background: "rgba(4,120,87,0.08)",
                  padding: "4px 12px",
                  borderRadius: "50px",
                }}
              >
                {active.tier}
              </span>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  fontWeight: 900,
                  color: "#0b3d22",
                  lineHeight: 1.2,
                  marginBottom: "0.25rem",
                }}
              >
                {active.name}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={prev}
            className="group"
            style={btnBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#047857";
              e.currentTarget.style.borderColor = "#047857";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "rgba(4,120,87,0.2)";
              e.currentTarget.style.color = "#047857";
            }}
            aria-label="Previous sponsor"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "white",
              border: "1px solid rgba(4,120,87,0.2)",
              borderRadius: 50,
              padding: "6px 18px",
            }}
          >
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 900,
                color: "#059669",
                letterSpacing: "0.04em",
              }}
            >
              {activeIndex + 1}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700 }}>
              /
            </span>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>
              {total}
            </span>
          </div>

          <button
            type="button"
            onClick={next}
            className="group"
            style={btnBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#047857";
              e.currentTarget.style.borderColor = "#047857";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "rgba(4,120,87,0.2)";
              e.currentTarget.style.color = "#047857";
            }}
            aria-label="Next sponsor"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

function SponsorCard({ sponsor, isActive, initials }) {
  return (
    <div
      className="w-full h-full relative overflow-hidden bg-white"
      style={{
        borderRadius: 14,
        border: isActive
          ? "3px solid #047857"
          : "2px solid rgba(4,120,87,0.15)",
        boxShadow: isActive
          ? "0 0 40px rgba(4,120,87,0.12), 0 25px 50px rgba(4,120,87,0.18)"
          : "0 10px 30px rgba(4,120,87,0.08)",
        transition: "border 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {sponsor.image ? (
        <img
          src={sponsor.image}
          alt={sponsor.name}
          className="w-full h-full object-contain bg-white p-6"
          draggable={false}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 55%, #ecfdf5 100%)",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.2rem",
              fontWeight: 900,
              color: "#047857",
              letterSpacing: "-0.02em",
            }}
          >
            {initials}
          </span>
          <span
            style={{
              marginTop: "0.75rem",
              fontSize: "0.72rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(11,61,34,0.45)",
            }}
          >
            Sponsor
          </span>
        </div>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "42%",
          background:
            "linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.2) 55%, transparent 100%)",
        }}
      />

      {isActive && (
        <div className="absolute bottom-3 left-3" style={{ zIndex: 5 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.58rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#047857",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(4px)",
              padding: "4px 10px",
              borderRadius: 5,
              border: "1px solid rgba(4,120,87,0.25)",
            }}
          >
            {sponsor.tier}
          </span>
        </div>
      )}
    </div>
  );
}
