export default function Ticker() {
  const tickerItems = [
    { e: "📅", l: "Dates", v: "18–22 May 2026" },
    { e: "🏛", l: "Format", v: "Five Day Workshop · Hands-on Training" },
    { e: "⚡", l: "Theme", v: "Emerging Control & Digital Technologies" },
    { e: "📍", l: "Venue", v: "Dept. of EEE, BIT Mesra, Ranchi" },
    { e: "🎓", l: "Mode", v: "Hybrid" },
    { e: "📋", l: "Seats", v: "Limited No. Of Seats. Hurry Up to fix yours." },
  ];

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {[0, 1].map(c => (
          <div className="ticker-content" key={c} aria-hidden={c === 1}>
            {tickerItems.map((t, i) => (
              <div className="ticker-item" key={i}><em>{t.l}:</em> {t.v}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}