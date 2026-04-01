import { Calendar, MapPin, Users, MonitorSmartphone } from "lucide-react";
import whiteBg from "../../assets/images/white bg.png";

export default function Hero({ onOpenSchedule }) {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── HERO — Clean, Minimal, Impactful ── */}
      <section id="home" className="hero-wrap">
        <img src={whiteBg} alt="" className="hero-bg-img" />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            padding: "0 2rem",
            paddingTop: 140,
            paddingBottom: 80,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{ marginBottom: "2rem" }}>
            <span className="pulse" />
            Five Day Faculty Development Programme · BIT Mesra · 2026
          </div>

          {/* Title */}
          <h1 className="hero-title" style={{ maxWidth: 840 }}>
            Emerging Control &amp;<br />
            Digital Technologies for<br />
            <em>Sustainable Green Energy Systems</em>
          </h1>

          {/* Subtitle — One clean line */}
          <p
            style={{
              fontSize: "1.05rem",
              color: "#475569",
              lineHeight: 1.8,
              maxWidth: 620,
              marginBottom: "2.5rem",
              fontWeight: 500,
            }}
          >
            <strong style={{ color: "#022c22" }}>18 distinguished speakers</strong> from IITs, NITs,
            Politecnico di Milano, Microsoft & global universities.
            Five days of hands-on training in EV systems, smart grids, AI & renewable energy.
          </p>

          {/* Info chips — compact row */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "0.8rem", marginBottom: "2rem" }}>
            {[
              { text: "18–22 May 2026", Icon: Calendar },
              { text: "BIT Mesra, Ranchi", Icon: MapPin },
              { text: "18 Speakers", Icon: Users },
              { text: "Hybrid · Hands-on", Icon: MonitorSmartphone },
            ].map((chip, idx) => {
              const { Icon, text } = chip;
              return (
                <span
                  key={idx}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255,255,255,0.65)",
                    border: "1.5px solid #c3e8d0",
                    color: "#022c22",
                    fontSize: "0.78rem",
                    padding: "0.5rem 1rem",
                    borderRadius: 50,
                    fontWeight: 700,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Icon size={14} color="#047857" strokeWidth={2.5} />
                  {text}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── JOIN THE PROGRAMME — Dark CTA Bar + Slow Ticker ── */}
      <section
        style={{
          background: "linear-gradient(165deg, #022c22 0%, #064e3b 40%, #022c22 100%)",
          position: "relative",
          overflow: "hidden",
          padding: 0,
        }}
      >
        {/* ── SLOW TICKER BACKGROUND ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            width: "100%",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div className="join-ticker">
            <span className="join-ticker-text">
              ENGINEERING · INNOVATION · SUSTAINABILITY · CONTROL · ENERGY · DIGITAL · RESEARCH · ENGINEERING · INNOVATION · SUSTAINABILITY · CONTROL · ENERGY · DIGITAL · RESEARCH ·&nbsp;
            </span>
            <span className="join-ticker-text" aria-hidden="true">
              ENGINEERING · INNOVATION · SUSTAINABILITY · CONTROL · ENERGY · DIGITAL · RESEARCH · ENGINEERING · INNOVATION · SUSTAINABILITY · CONTROL · ENERGY · DIGITAL · RESEARCH ·&nbsp;
            </span>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "72px 2rem",
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="join-grid"
        >
          {/* Left: Big Heading */}
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: "#ffffff",
                margin: 0,
              }}
            >
              JOIN THE<br />
              <span style={{ color: "#34d399" }}>PROGRAMME.</span>
            </h2>

            <div style={{ marginTop: "1.75rem", borderLeft: "3px solid #34d399", paddingLeft: "1.25rem" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 900,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                MAY 18TH — 22ND, 2026
              </p>
              <p
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  margin: "0.3rem 0 0 0",
                  lineHeight: 1.55,
                  maxWidth: 360,
                }}
              >
                Dept. of EEE, BIT Mesra, Ranchi.
                Faculty, PhD scholars & industry professionals.
              </p>
            </div>

            <p
              style={{
                fontSize: "0.58rem",
                fontWeight: 900,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                marginTop: "1.25rem",
              }}
            >
              OPEN TO AICTE-APPROVED FACULTY & RESEARCHERS
            </p>
          </div>

          {/* Right: CTA Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", alignItems: "flex-start" }}>
            <a
              href="#register"
              onClick={(e) => { e.preventDefault(); go("register"); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#34d399",
                color: "#022c22",
                border: "none",
                padding: "0.95rem 2.2rem",
                borderRadius: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.22s",
                boxShadow: "0 6px 24px rgba(52,211,153,0.25)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(52,211,153,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(52,211,153,0.25)"; }}
            >
              REGISTER NOW <span style={{ fontSize: "1rem" }}>→</span>
            </a>

            <a
              href="#speakers"
              onClick={(e) => { e.preventDefault(); go("speakers"); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.2)",
                padding: "0.85rem 2.2rem",
                borderRadius: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.22s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "none"; }}
            >
              VIEW SPEAKERS <span style={{ fontSize: "1rem" }}>→</span>
            </a>
          </div>
        </div>

        {/* Ticker + Responsive CSS */}
        <style>{`
          .join-ticker {
            display: flex;
            width: max-content;
            animation: join-ticker-slide 120s linear infinite;
          }
          .join-ticker-text {
            font-family: 'Playfair Display', serif;
            font-size: clamp(5rem, 12vw, 9rem);
            font-weight: 900;
            text-transform: uppercase;
            color: rgba(255,255,255,0.03);
            letter-spacing: 0.04em;
            line-height: 1;
            white-space: nowrap;
            flex-shrink: 0;
          }
          @keyframes join-ticker-slide {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (max-width: 860px) {
            .join-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              padding: 56px 2rem !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}