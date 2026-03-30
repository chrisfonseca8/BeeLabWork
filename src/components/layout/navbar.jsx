import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["home", "about", "topics", "schedule", "speakers", "committee", "register"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (id) => { 
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); 
    setMenuOpen(false); 
  };

  return (
    <nav className={`nb ${scrolled ? "scrolled" : ""}`}>
      <div className="nb-inner">
        <a className="nb-brand" href="#home" onClick={e => { e.preventDefault(); go("home"); }}>
          <div className="nb-logo">
            <img src="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" alt="BIT Mesra" />
          </div>
          <div>
            <div className="nb-name">BIT Mesra</div>
            <div className="nb-sub">Dept. of EEE</div>
          </div>
        </a>

        <button className="nb-toggle" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>

        <ul className={`nb-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map(id => (
            <li key={id}>
              <a href={`#${id}`} className={id === "register" ? "cta" : ""}
                onClick={e => { e.preventDefault(); go(id); }}>
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}