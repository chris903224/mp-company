import { HERO_DETAILS } from '../data/heroContent';

interface StageDetailProps {
  index: number;
  compact?: boolean;
}

export default function StageDetail({ index, compact = false }: StageDetailProps) {
  const d = HERO_DETAILS[index];
  if (!d) return null;

  // ✅ HUWAG MAG-RENDER NG STATS SA UNANG STAGE (Hero)
  const isFirstStage = index === 0;

  const showPurpose = !compact && !isFirstStage && d.purpose.length > 0;
  const showPoints = !compact && !isFirstStage && d.points.length > 0;
  const showStats = !isFirstStage && d.stats.length > 0;

  if (!showPurpose && !showPoints && !showStats) return null;

  return (
    <div className={compact ? 'hd hd--compact' : 'hd'}>
      {showPurpose && <p className="hd-purpose">{d.purpose}</p>}

      {showPoints && (
        <ul className="hd-points">
          {d.points.map((p) => (
            <li key={p.label}>
              <strong>{p.label}</strong>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      )}

      {showStats && (
        <dl className="hd-stats">
          {d.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}