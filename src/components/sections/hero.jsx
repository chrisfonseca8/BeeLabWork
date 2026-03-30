import whiteBg from "../../assets/images/white bg.png";
import { IcoCalendar, getIconComponent } from "../icons";

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── HERO ── */}
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

            <p className="hero-sub">
              A comprehensive faculty development programme featuring{" "}
              <strong>18 distinguished speakers</strong>{" "}
              from IITs, NITs, Politecnico di Milano, Microsoft, and global
              universities — covering EV systems, smart grids, AI, and
              renewable energy control.
            </p>

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

          {/* Right Column: Glance Card */}
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
    </>
  );
}