/* ── Professor photo imports (unchanged) ── */
import imgRajeshGupta from "./assets/images/rajesh_gupta.png";
import imgAjayKumar from "./assets/images/ajay_kumar.png";
import imgKalyanChatterjee from "./assets/images/kalyan_chatterjee.png";
import imgRiteshKeshri from "./assets/images/ritesh_keshri.png";
import imgSumantKadwane from "./assets/images/sumant_kadwane.png";
import imgKBMohanty from "./assets/images/kb_mohanty.png";
import imgArghyaMitra from "./assets/images/arghya_mitra.png";
import imgLaliteshKumar from "./assets/images/lalitesh_kumar.png";
import imgSubhojitGhosh from "./assets/images/subhojit_ghosh.png";
import imgJayaReddy from "./assets/images/jaya_reddy.png";
import imgBidyadharSubudhi from "./assets/images/bidyadhar_subudhi.png";
import imgSKMishra from "./assets/images/sk_mishra.png";
import imgSoumyaChatterjee from "./assets/images/soumya_chatterjee.png";
import imgAdityaGautam from "./assets/images/aditya_gautam.png";
import imgPratyushAnand from "./assets/images/pratyush_anand.png";
import imgDeepakKumar from "./assets/images/deepak_kumar.png";
import imgTGhosh from "./assets/images/tghosh.jpeg";
import imgGruosso from "./assets/images/gruosso.png";

export const topics = {
  Robotics: [
    "Industrial Robotic Manipulation (Model → Control → Execution)",
    "Robot Manipulator Hardware Design",
    "Robot Kinematics & Commissioning",
    "Pick-and-Place Automation for 6 DoF Robotic Arm using Inverse Kinematics",
  ],
  Vision: [
    "Machine Vision for Industrial Automation",
    "Vision-Guided Robotic Control",
    "Vision-Enabled Robotics & Industrial IoT Pipelines",
  ],
  AI: [
    "AI-Based Predictive Maintenance",
    "AI Model Training for EV Motor Anomaly Detection",
    "Motor Health Monitoring",
  ],
  IoT: [
    "Industrial IoT Architecture",
    "Embedded Sensing & Motor Control",
    "Live Monitoring of BLDC Motor for E-Bike",
  ],
};

export const schedule = [
  {
    day: "Day 1", subtitle: "Invited Talks", date: "18 May 2026",
    items: [
      { ico: "🎙️", time: "12:00 – 1:30 PM", event: "Emerging Control, AI, and Cybersecurity Technologies for Sustainable Green Energy Systems", spk: "Dr. Kalyan Chatterjee", inst: "IIT (ISM) Dhanbad", hl: true },
      { ico: "⚡", time: "2:30 – 5:30 PM", event: "Digital Controllers in Power Converters for Renewable Energy Systems", spk: "Dr. Rajesh Gupta", inst: "NIT Allahabad", hl: true },
    ],
  },
  {
    day: "Day 2", subtitle: "EV Charging & Microgrid", date: "19 May 2026",
    items: [
      { ico: "🔌", time: "9:30 – 10:30 AM", event: "Design and Control of Z-Source Inverter-Based Bidirectional EV Charger for V2G Applications", spk: "Dr. Sumant G. Kadwane", inst: "Yeshwantrao Chavan College of Engineering.", hl: true },
      { ico: "🚗", time: "10:30 – 11:30 AM", event: "EV Charging and Grid Interactions", spk: "Dr. Ritesh Kumar Keshri", inst: "VNIT Nagpur", hl: true },
      { ico: "🏘️", time: "11:45 AM – 1:00 PM", event: "Energy Management for Sustainable Microgrid", spk: "Dr. Arghya Mitra", inst: "VNIT Nagpur", hl: true },
      { ico: "⚗️", time: "2:30 – 4:00 PM", event: "Enhancing Stability and Performance of PEM Fuel Cells through Port-Hamiltonian Control Framework", spk: "Dr. Lalitesh Kumar", inst: "SUSTECH, Shenzhen, China", hl: true },
      { ico: "🛡️", time: "4:15 – 5:45 PM", event: "Cyber Resiliency of Legacy Power Networks under Resource-Constrained Settings", spk: "Dr. Subhojit Ghosh", inst: "NIT Raipur", hl: true },
    ],
  },
  {
    day: "Day 3", subtitle: "Smart Systems & Solar PV", date: "20 May 2026",
    items: [
      { ico: "🔧", time: "9:30 – 10:30 AM", event: "Session — Topic TBA", spk: "Shrinivas Bhaskar Karanki", inst: "", hl: true },
      { ico: "💻", time: "10:30 – 11:30 AM", event: "Writing Software/Firmware for Energy Efficient Systems", spk: "Pratyush Anand", inst: "Microsoft", hl: true },
      { ico: "🚀", time: "11:45 AM – 1:00 PM", event: "Shaping the Future of EV Charging: Impacts and Integration with Power, Communication, and ICT Systems", spk: "Dr. Giambattista Gruosso", inst: "Politecnico di Milano, Italy", hl: true },
      { ico: "☀️", time: "2:30 – 4:00 PM", event: "Control of Solar PV systems integrated with grid", spk: "Dr. T. Ghose", inst: "BIT Mesra", hl: true },
      { ico: "☀️", time: "4:15 – 5:30 PM", event: "Control Strategies for Grid-Connected Solar PV Systems", spk: "Dr. Ajay Kumar", inst: "Punjab Engineering College", hl: true },
    ],
  },
  {
    day: "Day 4", subtitle: "Smart Grid, Wind & AI", date: "21 May 2026",
    items: [
      { ico: "📡", time: "9:30 – 10:30 AM", event: "PMU Application to Smart Grid", spk: "Dr. M. Jaya Bharata Reddy", inst: "NIT Tiruchirappalli", hl: true },
      { ico: "🌬️", time: "10:30 – 11:30 AM", event: "Advanced Control for High-Performance Wind Electrical Systems", spk: "Prof. K.B. Mohanty", inst: "NIT Rourkela", hl: true },
      { ico: "🧠", time: "11:45 AM – 1:00 PM", event: "Session — Topic TBA", spk: "Prof. Bidyadhar Subudhi", inst: "IIT Goa (Former Director, NIT Warangal)", hl: true },
      { ico: "🔬", time: "2:30 – 3:30 PM", event: "Session — Topic TBA", spk: "Dr. Deepak Kumar", inst: "BIT Mesra", hl: true },
      { ico: "⚙️", time: "4:15 – 5:30 PM", event: "Session — Topic TBA", spk: "Dr. S.K. Mishra", inst: "BIT Mesra", hl: true },
    ],
  },
  {
    day: "Day 5", subtitle: "HV Systems & Closing", date: "22 May 2026",
    items: [
      { ico: "⚡", time: "10:00 – 11:30 AM", event: "Condition Monitoring of High Voltage Systems in the Presence of Renewable Energy Integration", spk: "Dr. Soumya Chatterjee", inst: "NIT Durgapur", hl: true },
      { ico: "♻️", time: "11:45 AM – 1:30 PM", event: "Control Techniques for Renewable Energy Applications", spk: "Dr. Aditya R. Gautam", inst: "BITS Pilani", hl: true },
    ],
  },
];

export const speakers = [
  {
    name: "Dr. Kalyan Chatterjee",
    role: "Professor, Electrical Engineering",
    inst: "IIT (ISM) Dhanbad",
    topic: "Emerging Control, AI & Cybersecurity for Sustainable Energy",
    badge: "Keynote",
    image: imgKalyanChatterjee,
    bio: "Prof. Chatterjee (Member, IEEE) has over 27 years of research experience in power systems, renewable energy systems, soft computing applications, small-signal stability analysis, and cyber–physical systems. He has guided 19 Ph.D. scholars (6 ongoing) and 40+ postgraduate students, with numerous publications in high-impact journals and conferences.",
  },
  {
    name: "Dr. Rajesh Gupta",
    role: "Professor, Electrical Engineering",
    inst: "MNNIT Allahabad, Prayagraj",
    topic: "Digital Controllers in Power Converters for Renewable Energy",
    badge: "Invited",
    image: imgRajeshGupta,
    bio: "Dr. Gupta received his M.Tech in Control Systems from BIT Mesra and Ph.D. from IIT Kanpur in Power Electronics. He has guided 14 Ph.D. and 65 Masters students, published 200 papers, holds 4 patents, and was PI for projects from DST, SERB, CSIR, MNRE. Listed among Stanford's top 2% scientists globally (2020–2024).",
  },
  {
    name: "Dr. Ritesh Kumar Keshri",
    role: "Associate Professor, Electrical Engineering",
    inst: "VNIT Nagpur",
    topic: "EV Charging and Grid Interactions",
    badge: "Invited",
    image: imgRiteshKeshri,
    bio: "Dr. Keshri received his Ph.D. in Energy Engineering from University of Padova, Italy (2014). Previously faculty at BIT Mesra (2006–2015). Recipient of the 2016 Best Paper Award of IEEE Transactions on Industrial Electronics and the Visvesvaraya Young Faculty Research Fellowship (2017). Associate Editor of IEEE OJIES, IEEE TEC, and IEEE JESTIE.",
  },
  {
    name: "Dr. Sumant G. Kadwane",
    role: "Professor, Electrical Engineering",
    inst: "Yeshwantrao Chavan College of Engineering.",
    topic: "Z-Source Inverter Bidirectional EV Charger for V2G Applications",
    badge: "Invited",
    image: imgSumantKadwane,
    bio: "Dr. Kadwane completed his Ph.D. from BIT Mesra (2010) and served as faculty there for 7 years. He has guided 25+ PG students and 6 Ph.D. scholars, published 30 international journal papers and 50+ conference papers. Senior Member of IEEE and Fellow IE(I). Holds 4 granted patents. Has chaired IEEE conferences in the USA, Italy, and Singapore.",
  },
  {
    name: "Dr. Arghya Mitra",
    role: "Assistant Professor, Electrical Engineering",
    inst: "VNIT Nagpur",
    topic: "Energy Management for Sustainable Microgrid",
    badge: "Invited",
    image: imgArghyaMitra,
    bio: "Dr. Mitra received his Ph.D. from IIT Kharagpur (2015) and won the POSOCO Power System Award 2016. He has 80+ research publications including IEEE Transactions and holds a national patent. PI of an MoE-SPARC project and Co-PI in EU-India Horizon 2020 RE-EMPOWERED (Rs. 9.15 Cr) and MeitY-MHI wireless EV charger project (Rs. 5.28 Cr).",
  },
  {
    name: "Dr. Lalitesh Kumar",
    role: "Research Assistant, PI Lab",
    inst: "SUSTECH, Shenzhen, China",
    topic: "PEM Fuel Cell Stability via Port-Hamiltonian Control",
    badge: "International",
    image: imgLaliteshKumar,
    bio: "Dr. Kumar's research focuses on Fuel Cell/Sustainable Energy, Optimal and Nonlinear Control, port-Hamiltonian Systems, and Fractional Order Control. His work bridges advanced mathematical control theory with clean energy applications for next-generation hydrogen fuel cell systems.",
  },
  {
    name: "Dr. Subhojit Ghosh",
    role: "Professor, Electrical Engineering",
    inst: "NIT Raipur",
    topic: "Cyber Resiliency of Legacy Power Networks",
    badge: "Invited",
    image: imgSubhojitGhosh,
    bio: "Dr. Ghosh's research spans Optimization, System Modeling and Control, Renewable Energy, and Cyber Physical Systems. His work on cyber resiliency addresses the challenge of securing legacy power infrastructure against cyber threats under resource-constrained operational settings — a growing concern in modern smart grid deployments.",
  },
  {
    name: "Pratyush Anand",
    role: "Software Engineer",
    inst: "Microsoft",
    topic: "Writing Software/Firmware for Energy Efficient Systems",
    badge: "Industry",
    image: imgPratyushAnand,
    bio: "Pratyush Anand is an engineer at Microsoft with deep expertise in embedded systems, operating systems, and firmware development. He brings an industry perspective on how firmware design choices directly impact energy efficiency in modern computing and industrial systems.",
  },
  {
    name: "Dr. Giambattista Gruosso",
    role: "Associate Professor",
    inst: "Politecnico di Milano, Italy",
    topic:
      "Shaping the Future of EV Charging: Power, Communication & ICT Integration",
    badge: "International",
    image: imgGruosso,
    bio: "Dr. Gruosso is an international expert in EV charging infrastructure, focusing on holistic integration of power systems, communication networks, and ICT for next-generation EV ecosystems. His work addresses the complex interdependencies between charging stations and urban power and communication grids.",
  },
  {
    name: "Dr. Ajay Kumar",
    role: "Assistant Professor, Electrical Engineering",
    inst: "Punjab Engineering College, Chandigarh",
    topic: "Deveolepement and hardware implementation of Power condtitioning system for SPV system",
    badge: "Invited",
    image: imgAjayKumar,
    bio: "Dr. Ajay Kumar (MIEEE, MIE) specialises in distributed generation, renewable energy integration, and power quality assessment. His research emphasises control structure development, hardware testing, and experimental result analysis for grid-connected solar PV systems.",
  },
  {
    name: "Dr. M. Jaya Bharata Reddy",
    role: "Professor, Electrical & Electronics Engineering",
    inst: "NIT Tiruchirappalli",
    topic: "PMU Application to Smart Grid",
    badge: "Invited",
    image: imgJayaReddy,
    bio: "Dr. Reddy received his Ph.D. from BIT Ranchi (2008), won the IEI Young Engineer's Award (2010) and DST SERC Fast Track Young Scientist Award (2013). Senior Member of IEEE. Holds 3 patents and 110+ publications. Has received 4 DST-funded projects worth ~Rs. 177 Lakhs. Research: smart grid, substation automation, and wide-area protection.",
  },
  {
    name: "Prof. K.B. Mohanty",
    role: "Professor, Electrical Engineering",
    inst: "NIT Rourkela",
    topic: "Advanced Control for High-Performance Wind Electrical Systems",
    badge: "Invited",
    image: imgKBMohanty,
    bio: "Prof. Mohanty received his Ph.D. from IIT Kharagpur. He is a recipient of the Global Research Excellence Award, IEI Excellence Awards, and IETE J.C. Bose Memorial Award. Fellow of IE(I) and IETE, Senior Member IEEE. He has guided 15 Ph.D. students and published 70+ journals and 130+ conference papers.",
  },
  {
    name: "Prof. Bidyadhar Subudhi",
    role: "Professor, School of Electrical Sciences",
    inst: "IIT Goa (Former Director, NIT Warangal)",
    topic: "Robust & Adaptive Control for PV and Microgrid Systems",
    badge: "Keynote",
    image: imgBidyadharSubudhi,
    bio: "Prof. Subudhi is Dean (R&D) at IIT Goa. His specializations include System & Control Theory, Robust and Adaptive Control, Control of PV systems and Microgrids, Active Power Filtering, Wide Area Control, Blockchain Technology, Microgrid planning, and AI techniques in Power Systems.",
  },
  {
    name: "Dr. Soumya Chatterjee",
    role: "Associate Proffessor, Electrical Engineering",
    inst: "NIT Durgapur",
    topic:
      "Condition Monitoring of HEV Systems with Renewable Energy Integration",
    badge: "Invited",
    image: imgSoumyaChatterjee,
    bio: "Dr. Chatterjee holds a B.E. from Jadavpur University (2009), M.Sc. in Electrical Power Engineering from TU Darmstadt, Germany (2014), and Ph.D. from Jadavpur University (2019). His research focuses on condition monitoring and diagnostic techniques for high voltage electrical systems.",
  },
  {
    name: "Dr. Aditya R. Gautam",
    role: "Assistant Professor, EEE",
    inst: "BITS Pilani",
    topic: "Control Techniques for Renewable Energy Applications",
    badge: "Invited",
    image: imgAdityaGautam,
    bio: "Dr. Gautam received his Ph.D. from IIT Jodhpur (2019). He joined BITS Pilani in July 2019. Research interests: control of power electronic converters, microgrids, electric vehicles, and renewable energy technology — bridging theoretical control design with practical implementation.",
  },
  {
    name: "Dr. Deepak Kumar",
    role: "Assistant Professor, EEE",
    inst: "BIT Mesra, Ranchi",
    topic: "Smart Controllers for PV Inverter & Demand Side Management",
    badge: "Faculty",
    image: imgDeepakKumar,
    bio: "Dr. Deepak Kumar's research spans Blockchain technology for energy systems, microgrid planning, demand side management, design of smart controllers for PV inverter operation, hybrid energy storage systems with EV integration, and AI techniques in power systems.",
  },
  {
    name: "Dr. S.K. Mishra",
    role: "Head, Department of EEE",
    inst: "BIT Mesra, Ranchi",
    topic: "AI in Autonomous Vehicles & Smart Agriculture",
    badge: "Faculty",
    image: imgSKMishra,
    bio: "Dr. Mishra specialises in Signal, Image and Video Processing, Control Systems, Bio-Medical Image Processing, Soft and Evolutionary Computing, AI-based Visual Control of Autonomous Ground Vehicles, AI in Smart Agriculture, and AI in Healthcare.",
  },
  {
    name: "Dr. T. Ghose",
    role: "Professor, Department of EEE",
    inst: "BIT Mesra, Ranchi",
    topic: "Control of Solar PV systems integrated with grid",
    badge: "Faculty",
    image: imgTGhosh,
    bio: "Dr. Tirthadip Ghose is a Professor in the Department of Electrical and Electronics Engineering at BIT Mesra. His research interests include microgrid operation and control, demand response, and integration of renewable energy sources. He has extensive experience in power systems analysis and has held several key administrative positions at BIT Mesra.",
  },
];

export const committee = [
  {
    role: "Patron",
    name: "Prof. Indranil Manna",
    title: "Vice Chancellor\nBIT Mesra, Ranchi",
    initials: "IM",
    contact: null,
  },
  {
    role: "Chairman",
    name: "Dr. Sudhansu Kumar Mishra",
    title: "Head, EEE Department\nBIT Mesra, Ranchi",
    initials: "SKM",
    contact: null,
  },
  {
    role: "Coordinator",
    name: "Dr. Gauri Shanker Gupta",
    title: "EEE Dept., BIT Mesra, Ranchi",
    initials: "DG",
    contact: {
      phone: "+91-9471301045",
      email: "gaurishankergupta@bitmesra.ac.in",
    },
  },
  {
    role: "Coordinator",
    name: "Dr. Sourabh Paitandi",
    title: "EEE Dept., BIT Mesra, Ranchi",
    initials: "SP",
    contact: { email: "sourabh_paitandi@bitmesra.ac.in" },
  },
];