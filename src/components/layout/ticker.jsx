export default function Ticker() {
  const items = [
    "18–22 MAY 2026",
    "HANDS-ON TRAINING",
    "HYBRID MODE",
    "BIT MESRA EEE",
    "LIMITED SEATS",
    "INDUSTRY 4.0"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-emerald-950 py-8 border-y-2 border-emerald-800 flex items-center">
      {/* We use the ticker-slide keyframe already in your CSS, 
        but force it to take 40 seconds (super slow and premium) 
      */}
      <div className="flex whitespace-nowrap animate-[ticker-slide_40s_linear_infinite]">
        {/* We map it 4 times so it never runs out of text on ultrawide screens */}
        {[0, 1, 2, 3].map((set) => (
          <div key={set} className="flex items-center shrink-0">
            {items.map((item, i) => (
              <div key={i} className="flex items-center">
                <span 
                  className="text-5xl md:text-7xl font-black uppercase tracking-widest px-8"
                  style={{
                    color: i % 2 === 0 ? "transparent" : "#d1fae5", // Alternates between solid and outlined
                    WebkitTextStroke: i % 2 === 0 ? "2px #6ee7b7" : "none" // Emerald outline
                  }}
                >
                  {item}
                </span>
                <span className="text-gold text-4xl md:text-5xl opacity-80">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}