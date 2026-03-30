/* src/components/Icons.jsx */

export const Ico = ({ size = 22, color = "#059669", sw = 1.75, children }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}>
    {children}
  </svg>
);

export const IcoCalendar = (p) => <Ico {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Ico>;
export const IcoPin = (p) => <Ico {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Ico>;
export const IcoClock = (p) => <Ico {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Ico>;
export const IcoUser = (p) => <Ico {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Ico>;
export const IcoUsers = (p) => <Ico {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Ico>;
export const IcoCurrency = (p) => <Ico {...p}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></Ico>;
export const IcoAward = (p) => <Ico {...p}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></Ico>;
export const IcoMonitor = (p) => <Ico {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></Ico>;
export const IcoPlug = (p) => <Ico {...p}><path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><rect x="6" y="8" width="12" height="9" rx="2" /></Ico>;
export const IcoGlobe = (p) => <Ico {...p}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></Ico>;
export const IcoBrain = (p) => <Ico {...p}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.99-3 2.5 2.5 0 0 1-1.13-4.28A3 3 0 0 1 8 3.34" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.99-3 2.5 2.5 0 0 0 1.13-4.28A3 3 0 0 0 16 3.34" /></Ico>;
export const IcoSun = (p) => <Ico {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></Ico>;
export const IcoMail = (p) => <Ico {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2 4 12 13 22 4" /></Ico>;
export const IcoPhone = (p) => <Ico {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.23 19.79 19.79 0 0 1 1.61 2.6 2 2 0 0 1 3.6.42h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z" /></Ico>;
export const IcoBuilding = (p) => <Ico {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" /></Ico>;
export const IcoLink = (p) => <Ico {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></Ico>;
export const IcoClipboard = (p) => <Ico {...p}><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M14 2H9a1 1 0 0 0-1 1v2h8V3a1 1 0 0 0-1-1z" /><rect x="3" y="6" width="18" height="16" rx="2" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="15" y2="15" /></Ico>;
export const IcoLightbulb = (p) => <Ico {...p}><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.3 18 9.2 18 8A6 6 0 0 0 6 8c0 1.2.3 2.3 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></Ico>;


export const getIconComponent = (label) => {
  const map = {
    "Dates": IcoCalendar,
    "Venue": IcoPin,
    "Duration": IcoClock,
    "Eligible": IcoUser,
    "Cert.": IcoAward,
    "Contact": IcoMail,
    "EV & Power Electronics": IcoPlug,
    "Smart Grid & Microgrids": IcoGlobe,
    "AI & Control Systems": IcoBrain,
    "Renewable Energy Systems": IcoSun,
    "Format": IcoClock,
    "Capacity": IcoUsers,
    "Fee": IcoCurrency,
  };
  return map[label] || IcoAward;
};