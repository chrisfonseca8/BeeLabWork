export default function SpeakerModal({ speaker, onClose }) {
  if (!speaker) return null;

  const initials = (name) => 
    name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/gi, "")
        .split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="m-overlay" onClick={onClose}>
      <div className="m-box" onClick={e => e.stopPropagation()}>
        <button className="m-close" onClick={onClose}>×</button>
        
        <div className="m-left">
          <div className="m-photo">
            {speaker.image ? (
              <img src={speaker.image} alt={speaker.name} onError={e => { e.target.style.display = "none"; }} />
            ) : (
              <span className="m-pi">{initials(speaker.name)}</span>
            )}
          </div>
          <div className="m-left-name">{speaker.name}</div>
          <div className="m-left-inst">{speaker.inst}</div>
          <div className="m-left-badge">{speaker.badge}</div>
        </div>
        
        <div className="m-right">
          <div className="m-name">{speaker.name}</div>
          <div className="m-role">{speaker.role}</div>
          <div className="m-inst">{speaker.inst}</div>
          
          {speaker.topic && (
            <div className="m-topic-box">
              <div className="m-topic-lbl">🎤 Keynote / Talk Topic</div>
              <div className="m-topic-txt">{speaker.topic}</div>
            </div>
          )}
          
          <div className="m-bio-lbl">Biography &amp; Expertise</div>
          <p className="m-bio-txt">{speaker.bio}</p>
        </div>
      </div>
    </div>
  );
}