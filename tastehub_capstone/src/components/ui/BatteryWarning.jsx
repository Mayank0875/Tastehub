const BatteryWarning = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 7h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
    <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <line x1="22" y1="11" x2="22" y2="13" />
    <line x1="10" y1="7" x2="14" y2="7" />
    <line x1="10" y1="17" x2="14" y2="17" />
    <path d="M10 12h4" />
  </svg>
);

export default BatteryWarning;

