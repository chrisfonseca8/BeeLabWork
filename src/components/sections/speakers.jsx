import { useState, useEffect, useRef } from "react";
import { speakers } from "../../data/content";

const CAR_GAP = 20;
function getVis(w) { if (w < 540) return 1; if (w < 860) return 2; return 3; }

// The Carousel Sub-Component
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
  }, []);

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

// The Main Speakers Section Component
export default function Speakers({ onSelectSpeaker }) {
  return (
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
        
        <SpeakerCarousel items={speakers} onSelect={onSelectSpeaker} />
        
      </div>
    </section>
  );
}