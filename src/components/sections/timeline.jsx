import { useState } from "react";
import { schedule, speakers } from "../../data/content";

export default function Timeline({ onSelectSpeaker }) {
  const [activeDay, setActiveDay] = useState(0);

  // Helper functions to match speakers to the schedule
  const findSpeaker = (spk) => speakers.find(s => s.name.includes(spk.split(" ").slice(-1)[0])) || null;
  
  const initials = (name) => name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/gi, "").split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <section className="sec-light" id="schedule">
      <div className="sec">
        <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 3rem" }}>
          <div className="tag" style={{ justifyContent: "center" }}>Programme</div>
          <h2 className="sec-h">Workshop Schedule</h2>
          <div className="rule" style={{ margin: "0 auto" }} />
          <p style={{ color: "#64748b", fontSize: ".95rem", lineHeight: 1.75 }}>
            Five days of expert talks.&nbsp;
            <strong style={{ color: "#18a352" }}>
              Click any session row
            </strong>{" "}
            to view the speaker's full profile and bio.
          </p>
        </div>

        {/* ── DAY TABS ── */}
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

        {/* ── DAY PANELS ── */}
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
                  onClick={sp ? () => onSelectSpeaker(sp) : undefined}
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
  );
}