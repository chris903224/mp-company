const ITEMS = [
  'Network Cabling',
  'CCTV & Security Systems',
  'IT Hardware Supply',
  'Santa Mesa, Manila',
];

export default function Ticker() {
  return (
    <div className="tick" aria-hidden="true">
      <div className="tt">
        {ITEMS.map((label) => (
          <span key={label}>{label}</span>
        ))}
        {ITEMS.map((label) => (
          <span key={`dup-${label}`} className="d">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}