import { HERO_DETAILS } from '../data/heroContent';

interface StageDetailProps {
  /** Index of the hero stage this detail block belongs to */
  index: number;
  /**
   * Compact mode shows only the proof numbers. Use it on the first stage,
   * where the headline and paragraph already explain the company.
   */
  compact?: boolean;
}

/**
 * Renders purpose, three pillars and proof numbers for one hero stage.
 * Drop it inside each stage's `.hc` block, under the paragraph:
 *
 *   <p>{stage.body}</p>
 *   <StageDetail index={i} />
 */
export default function StageDetail({ index, compact = false }: StageDetailProps) {
  const d = HERO_DETAILS[index];
  if (!d) return null;

  const showPurpose = !compact && d.purpose.length > 0;
  const showPoints = !compact && d.points.length > 0;
  const showStats = d.stats.length > 0;

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