import { useState, useEffect, useRef } from "react";

export default function Navbar({ onOpenSchedule, onOpenTeam, onNavigate, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Curriculum", id: "topics" },
    { name: "Schedule", id: "schedule" },
    { name: "Speakers", id: "speakers" },
    { name: "Team", id: "committee" }
  ];

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.id).filter(id => id !== "schedule" && id !== "committee");
    const observers = [];

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect, {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const go = (id) => {
    if (id === "schedule") {
      onOpenSchedule?.();
      setMenuOpen(false);
      return;
    }
    if (id === "committee") {
      onOpenTeam?.();
      setMenuOpen(false);
      return;
    }
    
    if (currentPage !== "home") {
      onNavigate?.(id);
      setMenuOpen(false);
      return;
    }

    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); 
    setMenuOpen(false); 
  };

  const googleFormLink = "https://forms.gle/YXM16hAbYpxbFv1o7";

  /* Inline keyframes for the underline expand animation */
  const underlineStyle = `
    @keyframes navUnderlineExpand {
      0% { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }
  `;

  return (
    <>
      <style>{underlineStyle}</style>
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/60 shadow-sm py-3" 
          : "bg-white/20 backdrop-blur-md border-b border-white/30 py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand */}
          <a href="#home" onClick={e => { e.preventDefault(); go("home"); }} className="flex items-center gap-3 group !no-underline">
            <img src="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" alt="BIT Mesra" className="h-9 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col justify-center">
              <span className="font-serif font-black leading-none text-lg tracking-wide" style={{ color: "#022c22" }}>BIT Mesra</span>
              <span className="text-[0.6rem] font-black uppercase tracking-widest mt-1" style={{ color: "#047857" }}>Dept. of EEE</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center gap-7 m-0 p-0 list-none">
              {navLinks.map(link => {
                const isActive = (currentPage === "schedule" && link.id === "schedule") || 
                                 (currentPage === "team" && link.id === "committee") || 
                                 (currentPage === "home" && activeSection === link.id);
                return (
                  <li key={link.id}>
                    <a 
                      href={`#${link.id}`} 
                      onClick={e => { e.preventDefault(); go(link.id); }}
                      className="text-[0.7rem] font-black uppercase tracking-widest transition-opacity !no-underline relative pb-1"
                      style={{ 
                        color: "#022c22",
                        opacity: isActive ? 1 : 0.7,
                      }}
                    >
                      {link.name}
                      {/* Animated underline - expands from center */}
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2.5px",
                          backgroundColor: "#047857",
                          borderRadius: "2px",
                          transformOrigin: "center",
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                          animation: isActive ? "navUnderlineExpand 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "none",
                        }}
                      />
                    </a>
                  </li>
                );
              })}
              
              {/* Green Register Button */}
              <li className="ml-3">
                <a 
                  href={googleFormLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="!no-underline"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#047857",
                    color: "#ffffff",
                    fontSize: "0.7rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "8px 20px",
                    borderRadius: "6px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(4,120,87,0.25)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = "#065f46";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(4,120,87,0.35)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = "#047857";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(4,120,87,0.25)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Register <span style={{ fontSize: "0.85rem", fontWeight: 700, lineHeight: 1 }}>→</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden flex flex-col gap-1.5 p-2 border-0 bg-transparent" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`w-5 h-0.5 bg-[#022c22] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-[#022c22] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-[#022c22] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-emerald-100 shadow-xl p-6 flex flex-col gap-5">
            {navLinks.map(link => {
              const isActive = (currentPage === "schedule" && link.id === "schedule") || 
                               (currentPage === "team" && link.id === "committee") || 
                               (currentPage === "home" && activeSection === link.id);
              return (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  onClick={e => { e.preventDefault(); go(link.id); }}
                  className="text-sm font-black uppercase tracking-widest !no-underline"
                  style={{ 
                    color: "#022c22",
                    opacity: isActive ? 1 : 0.65,
                    borderLeft: isActive ? "3px solid #047857" : "3px solid transparent",
                    paddingLeft: "10px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {link.name}
                </a>
              );
            })}
            <a 
              href={googleFormLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="!no-underline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                backgroundColor: "#047857",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "12px 24px",
                borderRadius: "8px",
                marginTop: "8px",
              }}
            >
              Register <span style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1 }}>→</span>
            </a>
          </div>
        )}
      </nav>
    </>
  );
}