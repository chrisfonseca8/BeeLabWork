import { IcoAward, getIconComponent } from "../icons";

export default function Details() {
  return (
    <section id="details" className="sec-light">
      <div className="sec">
        <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 3rem" }}>
          <div className="tag" style={{ justifyContent: "center" }}>Logistics</div>
          <h2 className="sec-h">Event Details</h2>
          <div className="rule" style={{ margin: "0 auto" }} />
        </div>
        <div className="ev-grid">
          {[
            { ico: "📅", lbl: "Dates", val: "18 – 22 May 2026", sub: "Five consecutive days" },
            { ico: "📍", lbl: "Venue", val: "EEE Dept., BIT Mesra", sub: "Birla Institute of Technology, Ranchi – 835215" },
            { ico: "⏱", lbl: "Format", val: "Five Day Workshop", sub: "Online · Hands-on Training" },
            { ico: "🎓", lbl: "Eligible", val: "Faculty · PhD · PG · Industry", sub: "AICTE-approved institutions & industry professionals" },
            { ico: "👥", lbl: "Capacity", val: "Maximum 200 Seats", sub: "Book you seat now." },
            { ico: "💰", lbl: "Fee", val: "100 + 18(GST) = 118 rs.", sub: "Free for all eligible participants" },
          ].map((e) => {
            const IconComponent = getIconComponent(e.lbl);
            return (
              <div className="ev-card" key={e.lbl}>
                <div className="ev-ico"><IconComponent size={22} color="#14834a" /></div>
                <div className="ev-label">{e.lbl}</div>
                <div className="ev-val">{e.val}</div>
                <div className="ev-sub">{e.sub}</div>
              </div>
            );
          })}
        </div>

        <div className="cert-banner">
          <div className="cert-ico">
            <IcoAward size={22} color="#d97706" />
          </div>
          <div>
            <div className="cert-lbl">Certificate of Participation</div>
            <p className="cert-txt">
              Certificates are awarded to participants with more than 80% attendance who secure more than 70% in the assessment. All participants receive a welcome kit, with high tea provided after Inauguration and Valedictory sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}