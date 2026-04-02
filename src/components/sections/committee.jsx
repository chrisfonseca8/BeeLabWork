import { committee } from "../../data/content";
import vc from "../../assets/images/vc.jpg";
import imgSKMishra from "../../assets/images/sk_mishra.png";
import gssir2 from "../../assets/images/gssir2.png";

const COMMITTEE_PHOTOS = {
  "Prof. Indranil Manna": vc,
  "Dr. Sudhansu Kumar Mishra": imgSKMishra,
  "Dr. Gauri Shanker Gupta": gssir2,
};

export default function Committee() {
  return (
    <section 
      id="committee" 
      className="sec-white" 
      style={{ 
        minHeight: "100vh", 
        paddingTop: "114px",
        background: "linear-gradient(170deg, #f8fafc 0%, #f0fdf4 40%, #dcfce7 100%)",
        paddingBottom: "56px"
      }}
    >
      <div className="sec" style={{ paddingTop: "1.25rem", paddingBottom: "2.5rem" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 1.75rem" }}>
          <div className="tag" style={{ justifyContent: "center" }}>Organisation</div>
          <h2 className="sec-h">Organizing Committee</h2>
          <div className="rule" style={{ margin: "0 auto" }} />
        </div>
        <div className="cm-grid">
          {committee.map((m, i) => {
            const isCoCoordinator = m.role === "Co-Coordinator";
            return (
              <div 
                className="cm-card" 
                key={i}
              >
                <div 
                  className="cm-av"
                >
                  {COMMITTEE_PHOTOS[m.name] ? (
                    <img
                      src={COMMITTEE_PHOTOS[m.name]}
                      alt={m.name}
                      style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    m.initials
                  )}
                </div>
                <div 
                  className="cm-role"
                  style={isCoCoordinator ? { color: "#6b7280" } : {}}
                >
                  {m.role}
                </div>
                <div className="cm-name">
                  {m.name}
                </div>
                <div className="cm-title">
                  {m.title}
                </div>
                {m.contact && (
                  <div className="cm-contact">
                    {m.contact.phone && <div>📞 {m.contact.phone}</div>}
                    {m.contact.email && <div>✉️ <a href={`mailto:${m.contact.email}`}>{m.contact.email}</a></div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}