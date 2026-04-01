import { committee } from "../../data/content";
import vc from "../../assets/images/vc.jpg";
import imgSKMishra from "../../assets/images/sk_mishra.png";
import gssir2 from "../../assets/images/gssir2.png";
import sourabh from "../../assets/images/sourabh.jpg";

export default function Committee() {
  return (
    <section 
      id="committee" 
      className="sec-white" 
      style={{ 
        minHeight: "100vh", 
        paddingTop: "140px", 
        background: "linear-gradient(170deg, #f8fafc 0%, #f0fdf4 40%, #dcfce7 100%)",
        paddingBottom: "80px"
      }}
    >
      <div className="sec">
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 3.5rem" }}>
          <div className="tag" style={{ justifyContent: "center" }}>Organisation</div>
          <h2 className="sec-h">Organizing Committee</h2>
          <div className="rule" style={{ margin: "0 auto" }} />
        </div>
        <div className="cm-grid">
          {committee.map((m, i) => (
            <div className="cm-card" key={i}>
              <div className="cm-av">
                {i === 0 ? <img src={vc} alt={m.name} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                : i === 1 ? <img src={imgSKMishra} alt={m.name} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                : i === 2 ? <img src={gssir2} alt={m.name} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                : i === committee.length - 1 ? <img src={sourabh} alt={m.name} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                : m.initials}
              </div>
              <div className="cm-role">{m.role}</div>
              <div className="cm-name">{m.name}</div>
              <div className="cm-title">{m.title}</div>
              {m.contact && (
                <div className="cm-contact">
                  {m.contact.phone && <div>📞 {m.contact.phone}</div>}
                  {m.contact.email && <div>✉️ <a href={`mailto:${m.contact.email}`}>{m.contact.email}</a></div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}