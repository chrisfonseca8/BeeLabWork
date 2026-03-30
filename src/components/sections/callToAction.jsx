import { 
  IcoMail, 
  IcoPhone, 
  IcoBuilding, 
  IcoCalendar, 
  IcoLink, 
  IcoLightbulb 
} from "../icons";

export default function CallToAction() {
  return (
    <section id="register" className="sec-white">
      <div className="sec">
        <div style={{ maxWidth: 500, marginBottom: "3rem" }}>
          <div className="tag">Join Us</div>
          <h2 className="sec-h">Register for the Workshop</h2>
          <div className="rule" />
          <p style={{ color: "#64748b", fontSize: ".95rem", lineHeight: 1.75 }}>
            200 Seats available. Book fast to capture your place.
            Last date: <strong>15 May 2026</strong>.
          </p>
        </div>
        
        <div className="reg-grid">
          <ul className="info-list">
            {[
              { IcoC: IcoMail, lbl: "Coordinators", val: "gaurishankergupta@bitmesra.ac.in\nsourabh_paitandi@bitmesra.ac.in" },
              { IcoC: IcoPhone, lbl: "Phone", val: "+91-9471301045" },
              { IcoC: IcoBuilding, lbl: "Department", val: "Electrical & Electronics Engineering\nBIT Mesra, Ranchi – 835215" },
              { IcoC: IcoCalendar, lbl: "Last Date", val: "15 May 2026 · Confirmation by 17 May 2026" },
              { IcoC: IcoLink, lbl: "Registration Link", val: "https://forms.gle/YXM16hAbYpxbFv1o7" },
              { IcoC: IcoLightbulb, lbl: "Who Should Attend", val: "Faculty (AICTE approved), PhD Scholars, PG Scholars, Industry Professionals" },
            ].map(r => (
              <li className="info-row" key={r.lbl}>
                <div className="info-ico"><r.IcoC size={18} color="#14834a" /></div>
                <div>
                  <div className="info-lbl">{r.lbl}</div>
                  <div className="info-val">{r.val}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="reg-box" style={{ padding: 0, overflow: "hidden" }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSf5R6lHD-kxdSfxkFJyJsOmmPi9h9TdJ1HeP0twJ60hZcRInw/viewform?embedded=true"
              width="100%"
              height="860"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Workshop Registration Form"
              style={{ display: "block", border: "none" }}
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}