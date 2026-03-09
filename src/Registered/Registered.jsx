import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --navy:       #0f172a;
    --navy-mid:   #1e293b;
    --navy-soft:  #334155;
    --emerald:    #10b981;
    --emerald-dk: #059669;
    --emerald-lt: #d1fae5;
    --emerald-xs: #ecfdf5;
    --gold:       #f59e0b;
    --gold-lt:    #fef3c7;
    --slate:      #64748b;
    --border:     #e2e8f0;
    --bg:         #f8fafc;
    --white:      #ffffff;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    color: var(--navy-soft);
    background: var(--bg);
    min-height: 100vh;
  }

  /* ─── TOPBAR ─── */
  .topbar {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 1px 8px rgba(15,23,42,.06);
  }
  .tb-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .tb-logo {
    width: 36px; height: 36px; border-radius: 8px;
    background: var(--navy);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: .85rem; font-weight: 800; color: var(--emerald);
  }
  .tb-name { font-family: 'Playfair Display', serif; font-size: .95rem; font-weight: 700; color: var(--navy); }
  .tb-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--emerald-xs); border: 1px solid var(--emerald-lt);
    color: var(--emerald-dk); font-size: .7rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: .12em;
    padding: .3rem .8rem; border-radius: 50px;
  }
  .tb-dot { width: 6px; height: 6px; background: var(--emerald); border-radius: 50%; animation: pulse 1.8s ease-in-out infinite; }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: .5; transform: scale(.7); }
  }

  /* ─── MAIN LAYOUT ─── */
  .page {
    max-width: 860px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  /* ─── HERO BANNER ─── */
  .conf-hero {
    background: var(--navy);
    border-radius: 20px;
    padding: 3.5rem 3rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeUp .55s ease both;
  }
  .conf-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(16,185,129,.18) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 30%, rgba(245,158,11,.1) 0%, transparent 50%);
    pointer-events: none;
  }
  .conf-hero-dots {
    position: absolute; inset: 0; z-index: 0;
    background-image: radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .conf-hero > * { position: relative; z-index: 1; }

  .check-ring {
    width: 88px; height: 88px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--emerald) 0%, #34d399 100%);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.75rem;
    box-shadow: 0 0 0 16px rgba(16,185,129,.12), 0 12px 40px rgba(16,185,129,.35);
    animation: popIn .6s .2s cubic-bezier(.175,.885,.32,1.275) both;
  }
  .check-ring svg { width: 40px; height: 40px; stroke: #fff; stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }

  @keyframes popIn {
    from { opacity: 0; transform: scale(.5); }
    to   { opacity: 1; transform: scale(1); }
  }

  .conf-tag {
    display: inline-block;
    background: rgba(16,185,129,.15); border: 1px solid rgba(16,185,129,.3);
    color: #6ee7b7; font-size: .7rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: .18em;
    padding: .35rem .9rem; border-radius: 50px; margin-bottom: 1.2rem;
    animation: fadeUp .5s .3s ease both;
  }
  .conf-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 800; color: #fff; line-height: 1.2;
    margin-bottom: .75rem;
    animation: fadeUp .5s .35s ease both;
  }
  .conf-subtitle {
    font-size: 1rem; color: rgba(255,255,255,.55);
    line-height: 1.7; max-width: 520px; margin: 0 auto;
    animation: fadeUp .5s .4s ease both;
  }
  .conf-subtitle strong { color: #6ee7b7; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: none; }
  }

  /* ─── REF NUMBER ─── */
  .ref-strip {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.25rem 1.75rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;
    animation: fadeUp .5s .45s ease both;
  }
  .ref-left { display: flex; align-items: center; gap: 12px; }
  .ref-ico {
    width: 40px; height: 40px; border-radius: 8px;
    background: var(--gold-lt); border: 1px solid #fcd34d;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; flex-shrink: 0;
  }
  .ref-label { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: var(--slate); margin-bottom: .2rem; }
  .ref-num { font-family: 'DM Sans', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--navy); letter-spacing: .08em; }
  .copy-btn {
    display: flex; align-items: center; gap: 6px;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 7px; padding: .45rem .9rem;
    font-family: 'DM Sans', sans-serif; font-size: .78rem; font-weight: 600;
    color: var(--navy-soft); cursor: pointer; transition: all .18s;
  }
  .copy-btn:hover { background: var(--emerald-xs); border-color: var(--emerald-lt); color: var(--emerald-dk); }
  .copy-btn.copied { background: var(--emerald-xs); border-color: var(--emerald-lt); color: var(--emerald-dk); }

  /* ─── CARD GRID ─── */
  .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 2rem; }
  @media(max-width:600px){ .cards { grid-template-columns: 1fr; } }

  .info-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.6rem 1.75rem;
    animation: fadeUp .5s ease both;
  }
  .ic-header {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 1.25rem; padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }
  .ic-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: var(--emerald-xs); border: 1px solid var(--emerald-lt);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }
  .ic-title { font-family: 'Playfair Display', serif; font-size: .95rem; font-weight: 700; color: var(--navy); }

  .detail-row { display: flex; flex-direction: column; gap: .15rem; margin-bottom: .9rem; }
  .detail-row:last-child { margin-bottom: 0; }
  .dr-label { font-size: .67rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: var(--slate); }
  .dr-val   { font-size: .93rem; color: var(--navy); font-weight: 500; }

  /* ─── TIMELINE ─── */
  .timeline-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.6rem 1.75rem;
    margin-bottom: 1.25rem;
    animation: fadeUp .5s .1s ease both;
  }
  .tl-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem; }
  .tl-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: var(--navy); display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
  }
  .tl-title { font-family: 'Playfair Display', serif; font-size: .95rem; font-weight: 700; color: var(--navy); }

  .tl-steps { display: flex; flex-direction: column; gap: 0; }
  .tl-step { display: flex; gap: 1rem; padding-bottom: 1.5rem; position: relative; }
  .tl-step:last-child { padding-bottom: 0; }
  .tl-step-left { display: flex; flex-direction: column; align-items: center; width: 32px; flex-shrink: 0; }
  .tl-node {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: .75rem; font-weight: 700; z-index: 1;
  }
  .tl-node.done  { background: var(--emerald); color: #fff; box-shadow: 0 0 0 4px var(--emerald-lt); }
  .tl-node.now   { background: var(--navy); color: #fff; box-shadow: 0 0 0 4px rgba(15,23,42,.1); }
  .tl-node.soon  { background: var(--bg); border: 2px solid var(--border); color: var(--slate); }
  .tl-line { flex: 1; width: 2px; background: var(--border); margin: 4px 0; }
  .tl-step:last-child .tl-line { display: none; }
  .tl-content { flex: 1; padding-top: 4px; }
  .tl-step-label { font-size: .88rem; font-weight: 600; color: var(--navy); line-height: 1.3; margin-bottom: .2rem; }
  .tl-step-sub   { font-size: .78rem; color: var(--slate); }
  .tl-step-tag {
    display: inline-block; margin-top: .35rem;
    font-size: .65rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em;
    padding: .2rem .6rem; border-radius: 50px;
  }
  .tl-step-tag.done { background: var(--emerald-xs); color: var(--emerald-dk); border: 1px solid var(--emerald-lt); }
  .tl-step-tag.now  { background: var(--navy); color: #fff; }
  .tl-step-tag.soon { background: var(--gold-lt); color: #92400e; border: 1px solid #fcd34d; }

  /* ─── NEXT STEPS ─── */
  .next-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.6rem 1.75rem;
    margin-bottom: 1.25rem;
    animation: fadeUp .5s .15s ease both;
  }
  .ns-list { display: flex; flex-direction: column; gap: .75rem; }
  .ns-item { display: flex; align-items: flex-start; gap: 12px; padding: .85rem 1rem; background: var(--bg); border-radius: 9px; }
  .ns-num {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--navy); color: #fff;
    font-size: .75rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ns-text strong { font-size: .88rem; font-weight: 600; color: var(--navy); display: block; margin-bottom: .1rem; }
  .ns-text span   { font-size: .8rem; color: var(--slate); line-height: 1.5; }

  /* ─── ADD TO CALENDAR ─── */
  .cal-card {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
    border-radius: 14px; padding: 1.75rem;
    margin-bottom: 1.25rem; position: relative; overflow: hidden;
    animation: fadeUp .5s .2s ease both;
  }
  .cal-card::before {
    content: '';
    position: absolute; top: -40px; right: -40px;
    width: 160px; height: 160px;
    background: radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .cal-inner { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
  .cal-text h4 { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: .35rem; }
  .cal-text p  { font-size: .83rem; color: rgba(255,255,255,.48); line-height: 1.6; margin: 0; }
  .cal-btns { display: flex; gap: .65rem; flex-wrap: wrap; }
  .cal-btn {
    display: flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15);
    color: rgba(255,255,255,.85); font-family: 'DM Sans', sans-serif;
    font-size: .78rem; font-weight: 600;
    padding: .5rem 1rem; border-radius: 7px; cursor: pointer;
    transition: all .18s; text-decoration: none;
  }
  .cal-btn:hover { background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.3); color: #fff; }

  /* ─── CONTACT ROW ─── */
  .contact-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;
    margin-bottom: 1.25rem;
    animation: fadeUp .5s .25s ease both;
  }
  @media(max-width:600px){ .contact-row { grid-template-columns: 1fr; } }

  .contact-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.4rem 1.6rem;
    display: flex; align-items: flex-start; gap: 12px;
  }
  .cc-ico {
    width: 40px; height: 40px; border-radius: 9px;
    background: var(--emerald-xs); border: 1px solid var(--emerald-lt);
    display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;
  }
  .cc-label { font-size: .67rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: var(--slate); margin-bottom: .2rem; }
  .cc-val   { font-size: .88rem; color: var(--navy); font-weight: 500; line-height: 1.5; }
  .cc-link  { color: var(--emerald-dk); text-decoration: none; }
  .cc-link:hover { text-decoration: underline; }

  /* ─── BACK BTN ─── */
  .back-row {
    display: flex; align-items: center; gap: 1rem; margin-top: .5rem;
    animation: fadeUp .5s .3s ease both;
    flex-wrap: wrap;
  }
  .btn-back {
    display: flex; align-items: center; gap: 7px;
    background: var(--white); border: 1px solid var(--border);
    color: var(--navy-soft); font-family: 'DM Sans', sans-serif;
    font-size: .83rem; font-weight: 600;
    padding: .65rem 1.2rem; border-radius: 8px; cursor: pointer;
    transition: all .18s; text-decoration: none;
  }
  .btn-back:hover { background: var(--bg); border-color: var(--navy-soft); color: var(--navy); }
  .btn-print {
    display: flex; align-items: center; gap: 7px;
    background: var(--navy); border: 1px solid var(--navy);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: .83rem; font-weight: 600;
    padding: .65rem 1.2rem; border-radius: 8px; cursor: pointer;
    transition: all .18s; text-decoration: none;
  }
  .btn-print:hover { background: var(--navy-mid); }

  /* print styles */
  @media print {
    .topbar, .back-row, .cal-card, .copy-btn, .nb-toggle { display: none !important; }
    .conf-hero { background: #0f172a !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { background: #fff; }
  }

  @media(max-width:640px) {
    .page { padding: 1.5rem 1rem 3rem; }
    .conf-hero { padding: 2.5rem 1.5rem; }
    .ref-strip { flex-direction: column; align-items: flex-start; }
  }
`;

function genRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let r = "BM-";
  for (let i = 0; i < 8; i++) r += chars[Math.floor(Math.random() * chars.length)];
  return r;
}

const REGISTRANT = {
  name:        "Prof. Rajiv Sharma",
  email:       "rajiv.sharma@university.ac.in",
  designation: "Professor",
  department:  "Electrical Engineering",
  institution: "National Institute of Technology",
};

export default function Registered() {
  const [refNo]   = useState(genRef);
  const [copied,  setCopied]  = useState(false);
  const [regTime] = useState(() => {
    const d = new Date();
    return d.toLocaleString("en-IN", { day:"2-digit", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit", hour12:true });
  });

  const handleCopy = () => {
    navigator.clipboard?.writeText(refNo).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <style>{styles}</style>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="tb-brand">
          <div className="tb-logo">BM</div>
          <span className="tb-name">BIT Mesra</span>
        </div>
        <div className="tb-badge">
          <span className="tb-dot" />
          Registration Confirmed
        </div>
      </div>

      <div className="page">

        {/* HERO BANNER */}
        <div className="conf-hero">
          <div className="conf-hero-dots" />
          <div className="check-ring">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <div className="conf-tag">Registration Successful</div>
          <h1 className="conf-title">You're Registered!</h1>
          <p className="conf-subtitle">
            Welcome, <strong>{REGISTRANT.name}</strong>. Your seat has been reserved for the Faculty Seminar on <strong>Advanced Control Schemes for Green Energy</strong> at BIT Mesra.
          </p>
        </div>

        {/* REF NUMBER */}
        <div className="ref-strip">
          <div className="ref-left">
            <div className="ref-ico">🎫</div>
            <div>
              <div className="ref-label">Registration Reference</div>
              <div className="ref-num">{refNo}</div>
            </div>
          </div>
          <button className={`copy-btn${copied ? " copied" : ""}`} onClick={handleCopy}>
            {copied ? "✓ Copied" : "⎘ Copy ID"}
          </button>
        </div>

        {/* REGISTRANT + EVENT DETAILS CARDS */}
        <div className="cards">
          {/* registrant */}
          <div className="info-card" style={{animationDelay:".05s"}}>
            <div className="ic-header">
              <div className="ic-icon">👤</div>
              <div className="ic-title">Registrant Details</div>
            </div>
            <div className="detail-row"><div className="dr-label">Full Name</div><div className="dr-val">{REGISTRANT.name}</div></div>
            <div className="detail-row"><div className="dr-label">Email Address</div><div className="dr-val">{REGISTRANT.email}</div></div>
            <div className="detail-row"><div className="dr-label">Designation</div><div className="dr-val">{REGISTRANT.designation}</div></div>
            <div className="detail-row"><div className="dr-label">Department</div><div className="dr-val">{REGISTRANT.department}</div></div>
            <div className="detail-row"><div className="dr-label">Institution</div><div className="dr-val">{REGISTRANT.institution}</div></div>
            <div className="detail-row"><div className="dr-label">Registered On</div><div className="dr-val">{regTime}</div></div>
          </div>

          {/* event */}
          <div className="info-card" style={{animationDelay:".1s"}}>
            <div className="ic-header">
              <div className="ic-icon">📋</div>
              <div className="ic-title">Event Details</div>
            </div>
            <div className="detail-row"><div className="dr-label">Event</div><div className="dr-val">Faculty Seminar on Advanced Control Schemes for Green Energy</div></div>
            <div className="detail-row"><div className="dr-label">Organizer</div><div className="dr-val">Dept. of Electrical & Electronics Engineering, BIT Mesra</div></div>
            <div className="detail-row"><div className="dr-label">Date</div><div className="dr-val">April 18 – 19, 2025</div></div>
            <div className="detail-row"><div className="dr-label">Time</div><div className="dr-val">9:00 AM – 5:30 PM (both days)</div></div>
            <div className="detail-row"><div className="dr-label">Venue</div><div className="dr-val">Seminar Hall, Block III, BIT Mesra, Ranchi – 835215</div></div>
            <div className="detail-row"><div className="dr-label">Certification</div><div className="dr-val">AICTE CEP / STTP Accredited</div></div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="timeline-card">
          <div className="tl-header">
            <div className="tl-icon">📅</div>
            <div className="tl-title">What Happens Next</div>
          </div>
          <div className="tl-steps">
            {[
              { node:"✓", cls:"done", label:"Registration Submitted",         sub:"Your form has been received and verified.",            tag:"done",  tagLabel:"Completed" },
              { node:"✓", cls:"done", label:"Confirmation Email Dispatched",  sub:`Sent to ${REGISTRANT.email}`,                          tag:"done",  tagLabel:"Sent" },
              { node:"2", cls:"now",  label:"Pre-Seminar Pack",               sub:"Reading list, schedule & logistics sent 7 days before.", tag:"now",   tagLabel:"In ~7 days" },
              { node:"3", cls:"soon", label:"Entry Pass / QR Code",           sub:"Digital pass emailed 48 hrs before the event.",          tag:"soon",  tagLabel:"2 days before" },
              { node:"4", cls:"soon", label:"Seminar Day — April 18, 2025",   sub:"Registration desk opens at 8:30 AM at Block III.",        tag:"soon",  tagLabel:"Apr 18" },
              { node:"5", cls:"soon", label:"Certificate Dispatch",           sub:"AICTE certificate issued within 10 working days.",        tag:"soon",  tagLabel:"Post-event" },
            ].map((s, i) => (
              <div className="tl-step" key={i}>
                <div className="tl-step-left">
                  <div className={`tl-node ${s.cls}`}>{s.node}</div>
                  <div className="tl-line" />
                </div>
                <div className="tl-content">
                  <div className="tl-step-label">{s.label}</div>
                  <div className="tl-step-sub">{s.sub}</div>
                  <span className={`tl-step-tag ${s.tag}`}>{s.tagLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEXT STEPS */}
        <div className="next-card">
          <div className="ic-header" style={{marginBottom:"1.25rem",paddingBottom:"1rem",borderBottom:"1px solid var(--border)"}}>
            <div className="ic-icon">💡</div>
            <div className="ic-title">To Prepare for the Seminar</div>
          </div>
          <div className="ns-list">
            {[
              { n:"1", title:"Save your Reference ID",       desc:`Note down your ID — ${refNo} — for all future correspondence with the organizing committee.` },
              { n:"2", title:"Check your inbox",             desc:`A detailed confirmation email has been sent to ${REGISTRANT.email}. Check your spam folder if you don't see it.` },
              { n:"3", title:"Download the brochure",        desc:"The full schedule, speaker bios, and venue map are available in the seminar brochure on the BIT Mesra EEE department website." },
              { n:"4", title:"Plan your travel",             desc:"BIT Mesra is located in Mesra, ~16 km from Ranchi city. On-campus accommodation is available on a first-come basis — contact the organizing committee." },
              { n:"5", title:"Prepare your abstract (opt.)", desc:"If you wish to present a paper, submit a 250-word abstract to seminar.eee@bitmesra.ac.in before March 30, 2025." },
            ].map(s => (
              <div className="ns-item" key={s.n}>
                <div className="ns-num">{s.n}</div>
                <div className="ns-text"><strong>{s.title}</strong><span>{s.desc}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD TO CALENDAR */}
        <div className="cal-card">
          <div className="cal-inner">
            <div className="cal-text">
              <h4>📅 Add to Your Calendar</h4>
              <p>Don't miss the seminar — add it to your calendar now and get a reminder.</p>
            </div>
            <div className="cal-btns">
              <a className="cal-btn" href="#">🍎 Apple</a>
              <a className="cal-btn" href="#">📆 Google</a>
              <a className="cal-btn" href="#">🪟 Outlook</a>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div className="contact-row">
          <div className="contact-card">
            <div className="cc-ico">📧</div>
            <div>
              <div className="cc-label">Email</div>
              <a className="cc-val cc-link" href="mailto:seminar.eee@bitmesra.ac.in">seminar.eee@bitmesra.ac.in</a>
            </div>
          </div>
          <div className="contact-card">
            <div className="cc-ico">📞</div>
            <div>
              <div className="cc-label">Phone</div>
              <div className="cc-val">+91-651-229-6024<br /><span style={{fontSize:".78rem",color:"var(--slate)"}}>Mon–Sat, 9 AM – 5 PM</span></div>
            </div>
          </div>
          <div className="contact-card">
            <div className="cc-ico">📍</div>
            <div>
              <div className="cc-label">Venue</div>
              <div className="cc-val">Seminar Hall, Block III<br /><span style={{fontSize:".78rem",color:"var(--slate)"}}>BIT Mesra, Ranchi – 835215</span></div>
            </div>
          </div>
          <div className="contact-card">
            <div className="cc-ico">🌐</div>
            <div>
              <div className="cc-label">Website</div>
              <a className="cc-val cc-link" href="https://www.bitmesra.ac.in" target="_blank" rel="noreferrer">www.bitmesra.ac.in</a>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="back-row">
          <a href="#" className="btn-back">← Back to Seminar Page</a>
          <button className="btn-print" onClick={() => window.print()}>🖨 Print / Save PDF</button>
        </div>

      </div>
    </>
  );
}