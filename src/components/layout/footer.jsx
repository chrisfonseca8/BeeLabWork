export default function Footer() {
  const navLinks = ["home", "about", "topics", "schedule", "speakers", "committee", "register"];
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer>
      <div className="ft-inner">
        <div className="ft-grid">
          <div>
            <div className="ft-brand">Birla Institute of Technology, Mesra</div>
            <div className="ft-sub">Knowledge is Power — Est. 1955</div>
            <p className="ft-about">The Dept. of EEE is dedicated to advancing energy systems research integrating AI, IoT, and renewable energy control into a world-class curriculum. BIT Mesra is a deemed university of national distinction.</p>
            <div className="ft-badge" style={{ marginTop: "1rem" }}><span className="dot" />Registration Open</div>
          </div>
          <div>
            <div className="ft-h">Contact</div>
            <ul className="ft-list">
              <li><strong>Dept. of EEE, BIT Mesra</strong></li>
              <li>Mesra, Ranchi – 835215, Jharkhand</li>
              <li style={{ marginTop: ".5rem" }}>📞 +91-9471301045</li>
              <li>📧 gaurishankergupta@bitmesra.ac.in</li>
              <li>🌐 www.bitmesra.ac.in</li>
            </ul>
          </div>
          <div>
            <div className="ft-h">Workshop</div>
            <ul className="ft-list">
              {navLinks.map(l => (
                <li key={l}><a href={`#${l}`} onClick={e => { e.preventDefault(); go(l); }}>{l[0].toUpperCase() + l.slice(1)}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <p>© 2026 BIT Mesra · Dept. of Electrical &amp; Electronics Engineering</p>
          <p>Workshop on Emerging Control &amp; Digital Technologies for Sustainable Green Energy Systems</p>
        </div>
      </div>
    </footer>
  );
}
