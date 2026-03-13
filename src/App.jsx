import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --navy:       #0f172a;
    --navy-bg:    rgba(15, 23, 42, 0.15);
    --navy-mid:   #1e293b;
    --navy-soft:  #334155;
    --emerald:    #10b981;
    --emerald-dk: #059669;
    --emerald-lt: rgba(209, 250, 229, 0.20);
    --emerald-xs: rgba(236, 253, 245, 0.25);
    --gold:       #f59e0b;
    --gold-lt:    rgba(254, 243, 199, 0.20);
    --slate:      #29313dff;
    --border:     rgba(64, 66, 69, 0.15);
    --bg:         rgba(248, 250, 252, 0.15);
    --white:      rgba(255, 255, 255, 0.15);
  }

  html, body, #root { scroll-behavior: smooth; width: 100%; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }
  
  #root {
     background: transparent;
  }

  /* ─── TICKER ─── */
  .ticker-wrap {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1001;
    background: var(--navy-bg); backdrop-filter: blur(8px); color: #fff;
    height: 36px; display: flex; align-items: center; overflow: hidden;
  }
  .ticker {
    display: flex; width: max-content;
    animation: ticker-slide 30s linear infinite;
  }
  .ticker:hover { animation-play-state: paused; }
  .ticker-content {
    display: flex; flex-shrink: 0;
  }
  .ticker-item {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; padding: 0 2rem; display: flex; align-items: center; gap: 8px;
  }
  .ticker-item em { color: var(--emerald); font-style: normal; }
  @keyframes ticker-slide {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ─── NAVBAR ─── */
  .nb {
    position: fixed; top: 36px; left: 0; right: 0; z-index: 1000;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    transition: box-shadow .3s;
  }
  .nb.scrolled { box-shadow: 0 4px 24px rgba(15,23,42,.08); }
  .nb-inner {
    max-width: 1280px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 68px;
  }
  .nb-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .nb-logo {
    height: 42px; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .nb-logo img { height: 100%; width: auto; object-fit: contain; }
  .nb-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: #ffffff; line-height: 1.1; }
  .nb-sub  { font-size: 0.65rem; color: rgba(255,255,255,.55); text-transform: uppercase; letter-spacing: .12em; }

  .nb-links { display: flex; align-items: center; gap: .2rem; list-style: none; }
  .nb-links a {
    font-size: .83rem; font-weight: 600; color: rgba(255,255,255,.85);
    text-decoration: none; padding: .45rem .9rem; border-radius: 6px;
    transition: all .18s; text-transform: uppercase; letter-spacing: .08em;
  }
  .nb-links a:hover { color: #ffffff; background: rgba(255,255,255,.1); }
  .nb-links .cta {
    background: var(--navy); color: #fff !important;
    margin-left: .4rem; border-radius: 6px;
  }
  .nb-links .cta:hover { background: var(--navy-mid); }

  .nb-toggle {
    display: none; flex-direction: column; gap: 5px;
    border: none; background: none; cursor: pointer; padding: 4px;
  }
  .nb-toggle span { display: block; width: 24px; height: 2px; background: #ffffff; border-radius: 2px; }

  @media(max-width:860px){
    .nb-toggle { display: flex; }
    .nb-links {
      display: none; position: absolute; top: 68px; left: 0; right: 0;
      background: #fff; flex-direction: column; padding: 1rem 1.5rem 1.5rem;
      border-bottom: 1px solid var(--border); gap: .1rem;
    }
    .nb-links.open { display: flex; }
    .nb-links a { padding: .6rem .5rem; }
    .nb-links .cta { margin-left: 0; margin-top: .25rem; text-align: center; }
  }

  /* ─── HERO ─── */
  .hero {
    min-height: 100vh;
    position: relative;
    display: flex; align-items: center;
    overflow: hidden;
    background: transparent;
  }
  .hero-img {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(18, 35, 74, 0.05) 0%, rgba(15,23,42,.05) 55%, rgba(5,150,105,.0) 100%);
    z-index: 0;
    backdrop-filter: blur(0px);
  }
  /* subtle dot-grid */
  .hero-dots {
    position: absolute; inset: 0; z-index: 1;
    background-image: radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px);
    background-size: 32px 32px;
  }
  .hero-body {
    position: relative; z-index: 2;
    max-width: 1400px; margin: 0 auto; width: 100%;
    padding: 0 2rem; padding-top: 104px;
    display: grid; grid-template-columns: 1fr 420px; gap: 4rem; align-items: center;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(16,185,129,.15); border: 1px solid rgba(16,185,129,.35);
    color: #6ee7b7; font-size: .72rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: .18em;
    padding: .4rem 1rem; border-radius: 50px; margin-bottom: 1.5rem;
    animation: fup .6s ease both;
  }
  .hero-eyebrow .dot { width: 6px; height: 6px; background: var(--emerald); border-radius: 50%; }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4.5vw, 3.8rem);
    font-weight: 800; color: #316463ff; line-height: 1.12;
    margin-bottom: 1.5rem;
    animation: fup .6s .12s ease both;
  }
  .hero-title em { font-style: normal; color: var(--emerald); }
  .hero-sub {
    font-size: 1.05rem; color: var(--navy-soft);
    line-height: 1.75; font-weight: 300;
    max-width: 560px; margin-bottom: 2.5rem;
    animation: fup .6s .24s ease both;
  }
  .hero-chips {
    display: flex; flex-wrap: wrap; gap: .75rem; margin-bottom: 2.5rem;
    animation: fup .6s .32s ease both;
  }
  .hero-chip {
    display: flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
    color: rgba(255,255,255,.78); font-size: .82rem;
    padding: .45rem .9rem; border-radius: 50px;
  }
  .hero-chip .ci { color: var(--emerald); font-size: .95rem; }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; animation: fup .6s .4s ease both; }
  .btn-primary-hero {
    background: var(--emerald); color: #fff; border: none;
    padding: .85rem 2rem; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: .1em;
    cursor: pointer; text-decoration: none; display: inline-block;
    transition: all .22s; box-shadow: 0 8px 24px rgba(16,185,129,.3);
  }
  .btn-primary-hero:hover { background: var(--emerald-dk); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(16,185,129,.4); }
  .btn-ghost-hero {
    background: transparent; color: #fff;
    border: 1.5px solid rgba(255,255,255,.3);
    padding: .85rem 2rem; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: .1em;
    cursor: pointer; text-decoration: none; display: inline-block;
    transition: all .22s;
  }
  .btn-ghost-hero:hover { border-color: rgba(255,255,255,.7); background: rgba(255,255,255,.06); }

  .hero-card {
    background: #4c728eff;
    border: 1px solid var(--border);
    border-radius: 16px; padding: 2rem;
    backdrop-filter: blur(8px);
    animation: fup .6s .5s ease both;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  .hero-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 2rem; font-weight: 700; color: var(--navy);
    margin-bottom: 1.25rem; padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }
  .hc-row {
    display: flex; align-items: flex-start; gap: 12px;
    padding: .85rem 0; border-bottom: 1px solid rgba(255,255,255,.07);
  }
  .hc-row:last-child { border-bottom: none; padding-bottom: 0; }
  .hc-ico {
    width: 36px; height: 36px; border-radius: 8px;
    background: rgba(16,185,129,.15); border: 1px solid rgba(16,185,129,.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }
  .hc-label { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: #6ee7b7; margin-bottom: .18rem; }
  .hc-val   { font-size: .88rem; color: rgba(255,255,255,.78); line-height: 1.45; }

  @keyframes fup { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

  @media(max-width:900px){
    .hero-body { grid-template-columns: 1fr; gap: 2.5rem; }
    .hero-card { display: none; }
  }

  /* ─── SHARED ─── */
  .sec { padding: 96px 2rem; max-width: 1280px; margin: 0 auto; }
  .sec-full { padding: 96px 0; }
  .sec-inner { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
  .tag {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: .71rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: .18em; color: var(--emerald); margin-bottom: .6rem;
  }
  .tag::before { content: ''; display: block; width: 20px; height: 2px; background: var(--emerald); border-radius: 1px; }
  .sec-h {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 700; color: var(--navy); line-height: 1.2; margin-bottom: .75rem;
  }
  .rule { width: 52px; height: 3px; background: linear-gradient(to right, var(--emerald), #6ee7b7); border-radius: 2px; margin-bottom: 2rem; }
  .muted { color: #cbd5e1; font-size: 1rem; line-height: 1.75; font-weight: 300; }

  /* ─── ABOUT ─── */
  .about-wrap { background: var(--bg); backdrop-filter: blur(12px); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  @media(max-width:768px){ .about-grid { grid-template-columns: 1fr; gap: 2.5rem; } }

  .about-text p { font-size: 1rem; line-height: 1.82; color: #000000ff; margin-bottom: .9rem; font-weight: 300; }
  .about-text p:last-child { margin-bottom: 0; }
  .about-text strong { font-weight: 600; }

  .stats-panel {
    background: var(--navy-bg);
    border-radius: 16px; padding: 2.5rem;
    position: relative; overflow: hidden;
  }
  .stats-panel::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(16,185,129,.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .stats-panel h3 { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--navy); margin-bottom: 1.75rem; }
  .s-item { padding: 1rem 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 1rem; }
  .s-item:last-child { border-bottom: none; padding-bottom: 0; }
  .s-num { font-family: 'Playfair Display', serif; font-size: 1.9rem; font-weight: 700; color: var(--emerald); line-height: 1; white-space: nowrap; }
  .s-lbl { font-size: .78rem; color: var(--navy-soft); text-transform: uppercase; letter-spacing: .08em; line-height: 1.4; }
  .s-bar { flex: 1; height: 3px; background: var(--bg); border-radius: 2px; overflow: hidden; }
  .s-bar-fill { height: 100%; background: linear-gradient(to right, var(--emerald), #6ee7b7); border-radius: 2px; }

  /* ─── OBJECTIVES ─── */
  .obj-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; }
  @media(max-width:900px){ .obj-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:520px){ .obj-grid { grid-template-columns: 1fr; } }

  .obj-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; padding: 2rem 1.75rem;
    transition: all .28s; position: relative; overflow: hidden;
    cursor: default;
  }
  .obj-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(to right, var(--emerald), #6ee7b7);
    transform: scaleX(0); transform-origin: left; transition: transform .28s;
  }
  .obj-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(15,23,42,.08); border-color: transparent; }
  .obj-card:hover::after { transform: scaleX(1); }
  .obj-ico {
    width: 52px; height: 52px; border-radius: 12px;
    background: var(--emerald-xs); border: 1.5px solid var(--emerald-lt);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; margin-bottom: 1.25rem;
  }
  .obj-card h4 { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; margin-bottom: .5rem; }
  .obj-card p  { font-size: .88rem; color: #cbd5e1; line-height: 1.65; margin: 0; }

  /* ─── TOPICS ─── */
  .topics-wrap { background: #0f1f2e; backdrop-filter: blur(12px); }
  .topics-wrap .tag   { color: #6ee7b7; }
  .topics-wrap .tag::before { background: #6ee7b7; }
  .topics-wrap .sec-h { color: #fff; }
  .topics-wrap .muted { color: rgba(255,255,255,.48); }
  .topics-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; align-items: start; }
  @media(max-width:860px){ .topics-grid { grid-template-columns: 1fr; gap: 2.5rem; } }

  .topic-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
  @media(max-width:600px){ .topic-cols { grid-template-columns: 1fr; } }

  .topic-cat { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; color: var(--emerald); margin-bottom: .75rem; border-left: 2px solid var(--emerald); padding-left: .6rem; }
  .topic-item { display: flex; align-items: flex-start; gap: 10px; padding: .7rem 0; border-bottom: 1px solid rgba(255,255,255,.07); transition: padding .18s; }
  .topic-item:last-child { border-bottom: none; }
  .topic-item:hover { padding-left: 6px; }
  .topic-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
  .topic-item span { font-size: .9rem; color: #ffffff; line-height: 1.55; }

  .topics-aside {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 12px; padding: 1.75rem; margin-top: 2rem;
  }
  .topics-aside p { font-size: .82rem; color: #e2e8f0; line-height: 1.65; margin: 0; }
  .topics-aside strong { color: var(--gold); font-weight: 600; }

  /* ─── SPEAKERS ─── */
  .speakers-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; }
  @media(max-width:900px){ .speakers-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:480px){ .speakers-grid { grid-template-columns: 1fr; } }

  .sp-card {
    background: #ffffff;
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 12px; overflow: hidden; transition: all .28s;
  }
  .sp-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(15,23,42,.15); border-color: #10b981; }
  .sp-avatar {
    aspect-ratio: 16/9; background: linear-gradient(135deg, var(--navy) 0%, var(--emerald-dk) 100%);
    display: flex; align-items: center; justify-content: center; text-align: center;
    font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700;
    color: var(--white); overflow: hidden; padding: 1rem;
    line-height: 1.2; box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
  }
  .sp-avatar span {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .sp-body { padding: 1.4rem; }
  .sp-name  { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: .2rem; }
  .sp-role  { font-size: .8rem; color: #059669; font-weight: 600; margin-bottom: .15rem; }
  .sp-inst  { font-size: .78rem; color: #475569; }
  .sp-badge { display: inline-block; margin-top: .75rem; font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; padding: .28rem .65rem; border-radius: 50px; background: #ecfdf5; color: #059669; border: 1px solid #10b981; }

  /* ─── EVENT DETAILS ─── */
  .ev-wrap { background: var(--bg); backdrop-filter: blur(12px); }
  .ev-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; }
  @media(max-width:700px){ .ev-grid { grid-template-columns: 1fr; } }

  .ev-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; padding: 2rem; text-align: center;
    position: relative; overflow: hidden; transition: all .25s;
  }
  .ev-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(15,23,42,.07); }
  .ev-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(to right, var(--emerald), #6ee7b7); }
  .ev-ico   { font-size: 1.75rem; margin-bottom: .6rem; }
  .ev-label { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; color: #cbd5e1; margin-bottom: .35rem; }
  .ev-val   { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: var(--navy); line-height: 1.3; }
  .ev-sub   { font-size: .8rem; color: #cbd5e1; margin-top: .25rem; }

  .cert-banner {
    margin-top: 1.5rem; background: var(--white);
    border: 1px solid var(--border); border-radius: 12px;
    padding: 1.5rem 2rem; display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;
  }
  .cert-ico {
    width: 48px; height: 48px; background: var(--gold-lt);
    border: 1px solid #fcd34d; border-radius: 10px;
    display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0;
  }
  .cert-lbl { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: #10b981; margin-bottom: .2rem; }
  .cert-txt { font-size: .88rem; color: #cbd5e1; line-height: 1.6; margin: 0; }

  /* ─── REGISTER ─── */
  .reg-wrap { background: var(--white); backdrop-filter: blur(12px); }
  .reg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  @media(max-width:800px){ .reg-grid { grid-template-columns: 1fr; gap: 2.5rem; } }

  .reg-box {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 16px; padding: 2.5rem;
    box-shadow: 0 24px 48px rgba(15,23,42,.07);
  }
  .reg-box h3 { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media(max-width:520px){ .form-row { grid-template-columns: 1fr; } }
  .f-group { margin-bottom: 1.1rem; }
  .f-label { display: block; font-size: .73rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--navy-soft); margin-bottom: .4rem; }
  .f-input {
    width: 100%; background: #ffffff;
    border: 1px solid var(--border); border-radius: 8px;
    padding: .72rem 1rem; font-family: 'DM Sans', sans-serif;
    font-size: .93rem; color: var(--navy); outline: none; transition: all .18s;
  }
  .f-input::placeholder { color: var(--slate); opacity: .7; }
  .f-input:focus { border-color: var(--emerald); background: var(--emerald-xs); box-shadow: 0 0 0 3px rgba(16,185,129,.12); }
  .f-input option { background: #fff; }
  .btn-submit {
    width: 100%; background: var(--navy); color: #fff; border: none;
    border-radius: 8px; padding: .95rem;
    font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: .1em;
    cursor: pointer; transition: all .22s; margin-top: .4rem;
  }
  .btn-submit:hover { background: var(--navy-mid); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(15,23,42,.2); }

  .success-box { text-align: center; padding: 3rem 2rem; }
  .success-check {
    width: 68px; height: 68px; border-radius: 50%;
    background: var(--emerald-xs); border: 2px solid var(--emerald-lt);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.75rem; margin: 0 auto 1.5rem;
    box-shadow: 0 0 0 10px rgba(16,185,129,.07);
  }
  .success-box h3 { font-family: 'Playfair Display', serif; font-size: 1.45rem; margin-bottom: .6rem; }
  .success-box p { color: #cbd5e1; font-size: .95rem; line-height: 1.7; }
  .success-box strong { color: #10b981; }

  .info-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
  .info-row { display: flex; align-items: flex-start; gap: 12px; padding: 1rem; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; }
  .info-ico { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }
  .info-lbl { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: #10b981; margin-bottom: .15rem; }
  .info-val { font-size: .88rem; color: #f1f5f9; line-height: 1.5; }

  /* ─── MODAL ─── */
  .modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15,23,42,.8); backdrop-filter: blur(8px);
    z-index: 2000; display: flex; align-items: center; justify-content: center;
    padding: 2rem;
  }
  .modal-content {
    background: var(--white); border-radius: 16px;
    padding: 2.5rem; max-width: 440px; width: 100%;
    position: relative; box-shadow: 0 24px 48px rgba(0,0,0,.2);
    animation: modalfade .3s ease both;
  }
  @keyframes modalfade { from{opacity:0;transform:scale(0.95) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
  .modal-close {
    position: absolute; top: 1.2rem; right: 1.2rem;
    background: rgba(15,23,42,.05); border: none;
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 1.2rem; transition: background .2s;
  }
  .modal-close:hover { background: rgba(15,23,42,.1); }
  .modal-avatar {
    width: 100%; height: 120px; border-radius: 12px;
    margin: 0 auto 1.5rem; background: linear-gradient(135deg, var(--navy) 0%, var(--emerald-dk) 100%);
    display: flex; align-items: center; justify-content: center; text-align: center;
    font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: var(--white);
    box-shadow: 0 10px 20px rgba(15,23,42,.15); overflow: hidden; padding: 1rem;
  }
  .modal-avatar span {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .modal-name { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: var(--navy); text-align: center; margin-bottom: .25rem; }
  .modal-role { font-size: .95rem; color: var(--emerald-dk); font-weight: 600; text-align: center; margin-bottom: .2rem; }
  .modal-inst { font-size: .85rem; color: var(--navy-soft); text-align: center; margin-bottom: 1.5rem; }

  /* ─── FOOTER ─── */
  footer { background: #24242dff; backdrop-filter: blur(12px); padding: 4rem 2rem 1.75rem; color: #e2e8f0; }
  .ft-inner { max-width: 1280px; margin: 0 auto; }
  .ft-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem; }
  @media(max-width:700px){ .ft-grid { grid-template-columns: 1fr; gap: 2rem; } }

  .ft-brand { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: .35rem; }
  .ft-sub { font-size: .75rem; color: rgba(255,255,255,.5); text-transform: uppercase; letter-spacing: .12em; margin-bottom: .9rem; }
  .ft-about { font-size: .85rem; color: rgba(255,255,255,.65); line-height: 1.7; max-width: 360px; }
  .ft-h { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; color: #6ee7b7; margin-bottom: .9rem; }
  .ft-list { list-style: none; }
  .ft-list li { font-size: .85rem; color: rgba(255,255,255,.65); margin-bottom: .4rem; line-height: 1.55; }
  .ft-list li strong { color: #ffffff; font-weight: 500; }
  .ft-bottom { border-top: 1px solid rgba(255,255,255,.12); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; }
  .ft-bottom p { font-size: .77rem; color: rgba(255,255,255,.5); }
  .ft-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.2); color: #6ee7b7; font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; padding: .3rem .75rem; border-radius: 50px; }
  .ft-badge .dot { width: 6px; height: 6px; background: var(--emerald); border-radius: 50%; }
`;

const topics = {
  "Control Systems": [
    "Advanced Model Predictive Control (MPC) for Renewable Sources",
    "Sliding Mode Control for Wind Energy Conversion Systems",
    "Fractional-Order PID Controllers in Solar PV Systems",
    "Adaptive Control Strategies for Hybrid Energy Systems",
  ],
  "Smart Grid & AI": [
    "AI/ML-Based Energy Forecasting and Demand Response",
    "Deep Reinforcement Learning for Smart Grid Optimization",
    "IoT-Enabled Distributed Energy Management Systems",
    "Cybersecurity in Smart Grid Infrastructures",
  ],
  "Energy Storage & Power": [
    "Battery Energy Storage System (BESS) Management",
    "Power Electronics Converters for Grid Integration",
    "FACTS Devices and Reactive Power Compensation",
    "Microgrid Control: Islanded vs. Grid-Connected Modes",
  ],
};

const speakers = [
  { name: "Prof. Rajiv Sharma", role: "Professor & HOD, EEE", inst: "BIT Mesra, Ranchi", badge: "Keynote", init: "RS" },
  { name: "Dr. Ananya Singh", role: "Associate Professor", inst: "IIT Kharagpur", badge: "Invited", init: "AS" },
  { name: "Dr. Manoj Kumar", role: "Senior Scientist", inst: "CPRI Bangalore", badge: "Industry", init: "MK" },
  { name: "Prof. Sunita Rao", role: "Professor, ECE", inst: "NIT Rourkela", badge: "Invited", init: "SR" },
];

export default function SeminarPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", dept: "", inst: "", role: "" });
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.inst) setSubmitted(true);
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <style>{styles}</style>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-content">
            <div className="ticker-item">📅 <em>Date:</em> April 18 – 19, 2025</div>
            <div className="ticker-item">🎙️ <em>Speakers:</em> {speakers.map(s => s.name).join(", ")}</div>
            <div className="ticker-item">📍 <em>Venue:</em> Seminar Hall, Block III, BIT Mesra</div>
            <div className="ticker-item">📅 <em>Date:</em> April 18 – 19, 2025</div>
            <div className="ticker-item">🎙️ <em>Speakers:</em> {speakers.map(s => s.name).join(", ")}</div>
            <div className="ticker-item">📍 <em>Venue:</em> Seminar Hall, Block III, BIT Mesra</div>
          </div>
          <div className="ticker-content" aria-hidden="true">
            <div className="ticker-item">📅 <em>Date:</em> April 18 – 19, 2025</div>
            <div className="ticker-item">🎙️ <em>Speakers:</em> {speakers.map(s => s.name).join(", ")}</div>
            <div className="ticker-item">📍 <em>Venue:</em> Seminar Hall, Block III, BIT Mesra</div>
            <div className="ticker-item">📅 <em>Date:</em> April 18 – 19, 2025</div>
            <div className="ticker-item">🎙️ <em>Speakers:</em> {speakers.map(s => s.name).join(", ")}</div>
            <div className="ticker-item">📍 <em>Venue:</em> Seminar Hall, Block III, BIT Mesra</div>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`nb${scrolled ? " scrolled" : ""}`}>
        <div className="nb-inner">
          <a className="nb-brand" href="#home" onClick={e => { e.preventDefault(); go("home"); }}>
            <div className="nb-logo">
              <img src="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" alt="BIT Mesra Logo" />
            </div>
            <div>
              <div className="nb-name">BIT Mesra</div>
              <div className="nb-sub">Birla Institute of Technology</div>
            </div>
          </a>
          <button className="nb-toggle" onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
          <ul className={`nb-links${menuOpen ? " open" : ""}`}>
            {["home", "about", "topics", "speakers", "register"].map(id => (
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

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", background: "var(--navy)", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="hero-img" />
        <div className="hero-dots" />
        <div className="hero-body">
          <div>
            <div className="hero-eyebrow"><span className="dot" />Faculty Seminar · BIT Mesra · 2025</div>
            <h1 className="hero-title">
              Advanced Control Schemes<br />for <em>Green Energy</em> &amp;<br />Sustainable Development
            </h1>
            <p className="hero-sub">
              A premier academic forum bringing together faculty, researchers, and industry experts to explore cutting-edge control methodologies for next-generation renewable energy systems.
            </p>
            <div className="hero-chips">
              {["📅 April 18–19, 2025", "📍 BIT Mesra, Ranchi", "👥 Faculty & Researchers", "🏅 AICTE Certified"].map(t => (
                <div className="hero-chip" key={t}><span className="ci">{t.slice(0, 2)}</span>{t.slice(2)}</div>
              ))}
            </div>
            <div className="hero-btns">
              <a href="#register" className="btn-primary-hero" onClick={e => { e.preventDefault(); go("register"); }}>Register Now →</a>
              <a href="#about" className="btn-ghost-hero" onClick={e => { e.preventDefault(); go("about"); }}>Learn More</a>
            </div>
          </div>

          {/* sidebar card */}
          <div className="hero-card">
            <div className="hero-card-title">📋 Event at a Glance</div>
            {[
              { ico: "📅", lbl: "Date", val: "April 18 – 19, 2025" },
              { ico: "📍", lbl: "Venue", val: "Seminar Hall, Block III\nBIT Mesra, Ranchi" },
              { ico: "⏱", lbl: "Duration", val: "2 Days · 9 AM – 5:30 PM" },
              { ico: "🎓", lbl: "Audience", val: "Professors & PhD Scholars" },
              { ico: "🏅", lbl: "Certificate", val: "AICTE CEP Accredited" },
              { ico: "📧", lbl: "Contact", val: "seminar.eee@bitmesra.ac.in" },
            ].map(r => (
              <div className="hc-row" key={r.lbl}>
                <div className="hc-ico">{r.ico}</div>
                <div><div className="hc-label">{r.lbl}</div><div className="hc-val" style={{ whiteSpace: "pre-line" }}>{r.val}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <div className="about-wrap" id="about">
        <div className="sec">
          <div className="about-grid">
            <div>
              <div className="tag">About the Seminar</div>
              <h2 className="sec-h">Advancing the Frontier of Renewable Energy Control</h2>
              <div className="rule" />
              <div className="about-text">
                <p>This seminar is a <strong>premier academic forum</strong> dedicated to exploring advanced control strategies in the context of green energy systems. Hosted by BIT Mesra, it unites leading professors, researchers, and industry professionals for two days of intensive knowledge exchange.</p>
                <p>The seminar addresses the growing need for sophisticated control algorithms to manage the inherent intermittency of renewable sources — from <strong>photovoltaic arrays and wind turbines</strong> to hybrid microgrids and BESS-integrated networks.</p>
                <p>Participants engage with the latest developments in <strong>model predictive control, AI-driven optimization, power electronics</strong>, and smart grid architectures, with a focus on bridging theory with real-world applicability.</p>
                <p>Open to <strong>faculty members, PhD scholars, and postdoctoral researchers</strong>. Certificates of participation will be issued. Selected abstracts may be invited for a special journal issue.</p>
              </div>
            </div>
            <div className="stats-panel">
              <h3>Seminar Highlights</h3>
              {[
                { num: "12+", lbl: "Expert Speakers & Panelists", w: "70%" },
                { num: "18", lbl: "Technical Sessions & Workshops", w: "60%" },
                { num: "200+", lbl: "Expected Faculty Participants", w: "85%" },
                { num: "2", lbl: "Days of Intensive Learning", w: "40%" },
                { num: "3", lbl: "Topic Tracks Covered", w: "50%" },
              ].map(s => (
                <div className="s-item" key={s.num}>
                  <div style={{ minWidth: 70 }}><div className="s-num">{s.num}</div></div>
                  <div style={{ flex: 1 }}><div className="s-lbl">{s.lbl}</div><div className="s-bar"><div className="s-bar-fill" style={{ width: s.w }} /></div></div>
                </div>
              ))}
              <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,.07)" }}>
                <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.3)", lineHeight: 1.65, margin: 0 }}>Accredited by AICTE · Supported by DST, Govt. of India · CEP Credits Issued</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── OBJECTIVES ── */}
      <div style={{ padding: "96px 2rem", background: "var(--bg)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 3rem" }}>
            <div className="tag" style={{ justifyContent: "center" }}>Key Objectives</div>
            <h2 className="sec-h">Four Pillars of the Seminar</h2>
            <div className="rule" style={{ margin: "0 auto" }} />
          </div>
          <div className="obj-grid">
            {[
              { ico: "⚡", title: "Smart Grid Control", desc: "Decentralized & hierarchical control architectures for modern smart power networks with real-time adaptability." },
              { ico: "☀️", title: "Renewable Optimization", desc: "Advanced optimization techniques for maximizing energy yield from solar PV, wind, and tidal energy resources." },
              { ico: "🔋", title: "Energy Storage Systems", desc: "Battery management, supercapacitor control, and hybrid storage integration for grid stability and peak shaving." },
              { ico: "🤖", title: "AI in Energy Systems", desc: "Machine learning, deep neural networks, and reinforcement learning for predictive energy management." },
            ].map((o, i) => (
              <div className="obj-card" key={i}>
                <div className="obj-ico">{o.ico}</div>
                <h4>{o.title}</h4>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOPICS ── */}
      <div className="topics-wrap sec-full" id="topics">
        <div className="sec-inner" style={{ padding: "96px 2rem" }}>
          <div className="topics-grid">
            <div>
              <div className="tag">Curriculum</div>
              <h2 className="sec-h">Topics Covered</h2>
              <div className="rule" />
              <p className="muted">The seminar spans a broad spectrum of cutting-edge topics curated to reflect current state-of-the-art and emerging research frontiers in green energy control.</p>
              <div className="topics-aside">
                <p><strong>📋 Resource Materials:</strong> Reading lists, proceedings, and presentation slides will be distributed to all registered participants prior to the seminar.</p>
              </div>
            </div>
            <div className="topic-cols">
              {Object.entries(topics).map(([cat, items]) => (
                <div key={cat}>
                  <div className="topic-cat">{cat}</div>
                  {items.map((t, i) => (
                    <div className="topic-item" key={i}>
                      <div className="topic-dot" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SPEAKERS ── */}
      <div id="speakers" style={{ padding: "96px 2rem", background: "var(--white)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="tag">Faculty & Experts</div>
              <h2 className="sec-h" style={{ marginBottom: 0 }}>Distinguished Speakers</h2>
              <div className="rule" style={{ marginBottom: 0 }} />
            </div>
            <p className="muted" style={{ maxWidth: 340, textAlign: "right" }}>Our speakers are leading academics and practitioners at the forefront of sustainable energy research.</p>
          </div>
          <div className="speakers-grid">
            {speakers.map((s, i) => (
              <div className="sp-card" key={i} onClick={() => setSelectedSpeaker(s)} style={{ cursor: "pointer" }}>
                <div className="sp-avatar"><span>{s.name}</span></div>
                <div className="sp-body">
                  <div className="sp-name" style={{ display: 'none' }}>{s.name}</div>
                  <div className="sp-role">{s.role}</div>
                  <div className="sp-inst">{s.inst}</div>
                  <span className="sp-badge">{s.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EVENT DETAILS ── */}
      <div className="ev-wrap sec-full">
        <div className="sec-inner" style={{ padding: "96px 2rem" }}>
          <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 3rem" }}>
            <div className="tag" style={{ justifyContent: "center" }}>Logistics</div>
            <h2 className="sec-h">Event Details</h2>
            <div className="rule" style={{ margin: "0 auto" }} />
          </div>
          <div className="ev-grid">
            {[
              { ico: "📅", lbl: "Date", val: "April 18 – 19, 2025", sub: "Saturday & Sunday" },
              { ico: "📍", lbl: "Venue", val: "Seminar Hall, Block III", sub: "BIT Mesra, Ranchi – 835215, Jharkhand" },
              { ico: "⏱", lbl: "Duration", val: "2 Full Days", sub: "9:00 AM – 5:30 PM (each day)" },
            ].map(e => (
              <div className="ev-card" key={e.lbl}>
                <div className="ev-ico">{e.ico}</div>
                <div className="ev-label">{e.lbl}</div>
                <div className="ev-val">{e.val}</div>
                <div className="ev-sub">{e.sub}</div>
              </div>
            ))}
          </div>
          <div className="cert-banner">
            <div className="cert-ico">🏅</div>
            <div>
              <div className="cert-lbl">Certificate of Participation</div>
              <p className="cert-txt">All registered faculty participants will receive a certificate of participation from BIT Mesra, accredited under AICTE CEP/STTP guidelines. Selected presentations may be invited for publication in a special issue of a UGC-listed journal.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── REGISTER ── */}
      <div className="reg-wrap" id="register" style={{ padding: "96px 2rem", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 500, marginBottom: "3rem" }}>
            <div className="tag">Join Us</div>
            <h2 className="sec-h">Register for the Seminar</h2>
            <div className="rule" />
            <p className="muted">Secure your place at this premier academic gathering. Registration is free for faculty and research scholars. Limited seats available.</p>
          </div>
          <div className="reg-grid">
            {/* info side */}
            <div>
              <ul className="info-list">
                {[
                  { ico: "📧", lbl: "Contact Email", val: "seminar.eee@bitmesra.ac.in" },
                  { ico: "📞", lbl: "Phone", val: "+91-651-229-6024\nMon–Sat, 9 AM – 5 PM" },
                  { ico: "🏛", lbl: "Organizing Dept.", val: "Dept. of Electrical & Electronics Engineering\nBIT Mesra, Ranchi" },
                  { ico: "📁", lbl: "Brochure", val: "Download the PDF brochure for full schedule, speaker profiles, and accommodation details." },
                  { ico: "💡", lbl: "Who Should Attend", val: "Professors, Associate/Asst. Professors, PhD Scholars, Postdoctoral Researchers, Industry R&D Professionals" },
                ].map(r => (
                  <li className="info-row" key={r.lbl}>
                    <span className="info-ico">{r.ico}</span>
                    <div>
                      <div className="info-lbl">{r.lbl}</div>
                      <div className="info-val" style={{ whiteSpace: "pre-line" }}>{r.val}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* form side */}
            <div className="reg-box">
              {submitted ? (
                <div className="success-box">
                  <div className="success-check">✓</div>
                  <h3>Registration Received!</h3>
                  <p>Thank you, <strong>{form.name}</strong>. A confirmation has been sent to <strong>{form.email}</strong>. Check your inbox for the pre-seminar reading packet and logistics details.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3>Registration Form</h3>
                  <div className="f-group" style={{ gridColumn: "1/-1" }}>
                    <label className="f-label">Full Name *</label>
                    <input className="f-input" type="text" placeholder="Prof. / Dr. Your Full Name"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-row">
                    <div className="f-group">
                      <label className="f-label">Email Address *</label>
                      <input className="f-input" type="email" placeholder="you@institution.ac.in"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="f-group">
                      <label className="f-label">Designation</label>
                      <select className="f-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                        <option value="">Select role</option>
                        <option>Professor</option>
                        <option>Associate Professor</option>
                        <option>Assistant Professor</option>
                        <option>PhD Scholar</option>
                        <option>Postdoctoral Researcher</option>
                        <option>Industry Professional</option>
                      </select>
                    </div>
                    <div className="f-group">
                      <label className="f-label">Department</label>
                      <input className="f-input" type="text" placeholder="e.g. Electrical Engineering"
                        value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} />
                    </div>
                    <div className="f-group">
                      <label className="f-label">Institution / University *</label>
                      <input className="f-input" type="text" placeholder="Your college or university"
                        value={form.inst} onChange={e => setForm({ ...form, inst: e.target.value })} required />
                    </div>
                  </div>
                  <button type="submit" className="btn-submit">Complete Registration →</button>
                  <p style={{ textAlign: "center", fontSize: ".73rem", color: "var(--slate)", marginTop: ".75rem", opacity: .7 }}>Your information is secure and used only for seminar correspondence.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="ft-inner">
          <div className="ft-grid">
            <div>
              <div className="ft-brand">Birla Institute of Technology, Mesra</div>
              <div className="ft-sub">Knowledge is Power — Est. 1955</div>
              <p className="ft-about">The Department of Electrical & Electronics Engineering is committed to advancing energy systems research for a sustainable future. BIT Mesra is a deemed university of national distinction.</p>
            </div>
            <div>
              <div className="ft-h">Contact</div>
              <ul className="ft-list">
                <li><strong>Dept. of EEE, BIT Mesra</strong></li>
                <li>Mesra, Ranchi – 835215</li>
                <li>Jharkhand, India</li>
                <li style={{ marginTop: ".5rem" }}>📞 +91-651-229-6024</li>
                <li>📧 seminar.eee@bitmesra.ac.in</li>
                <li>🌐 www.bitmesra.ac.in</li>
              </ul>
            </div>
            <div>
              <div className="ft-h">Seminar</div>
              <ul className="ft-list">
                {["Home", "About", "Topics", "Speakers", "Register"].map(l => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} style={{ color: "inherit", textDecoration: "none" }}
                    onClick={e => { e.preventDefault(); go(l.toLowerCase()); }}>{l}</a></li>
                ))}
              </ul>
              <div style={{ marginTop: "1.5rem" }}>
                <div className="ft-badge"><span className="dot" />Registration Open</div>
              </div>
            </div>
          </div>
          <div className="ft-bottom">
            <p>© 2025 BIT Mesra · Dept. of Electrical & Electronics Engineering</p>
            <p>Faculty Seminar on Advanced Control Schemes for Green Energy</p>
          </div>
        </div>
      </footer>

      {/* ── SPEAKER MODAL ── */}
      {selectedSpeaker && (
        <div className="modal-overlay" onClick={() => setSelectedSpeaker(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedSpeaker(null)}>×</button>
            <div className="modal-avatar"><span>{selectedSpeaker.name}</span></div>
            <div className="modal-name" style={{ display: 'none' }}>{selectedSpeaker.name}</div>
            <div className="modal-role">{selectedSpeaker.role}</div>
            <div className="modal-inst">{selectedSpeaker.inst}</div>
            <div style={{ textAlign: "center" }}>
              <span className="sp-badge">{selectedSpeaker.badge}</span>
            </div>
            <p style={{ marginTop: "1.5rem", fontSize: ".9rem", color: "var(--navy-soft)", lineHeight: 1.6, textAlign: "center" }}>
              Join <strong>{selectedSpeaker.name}</strong> at the seminar as they share valuable insights on green energy and sustainable development.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
