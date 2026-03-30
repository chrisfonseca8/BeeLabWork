import { topics } from "../../data/content";
import { getIconComponent } from "../icons";

export default function About() {
  return (
    <>
      {/* ── ABOUT WORKSHOP ── */}
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
    </>
  );
}