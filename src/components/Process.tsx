import { useReveal } from '../hooks/useReveal';
import { STEPS } from '../data/content';

function StepItem({ num, title, body }: { num: string; title: string; body: string }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li className="fd" ref={ref}>
      <b>{num}</b>
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  );
}

export default function Process() {
  return (
    <section className="pr" id="process">
      <div className="wrap">
        <p className="eb">Process</p>
        <h2>How We Work</h2>
        <ol className="steps">
          {STEPS.map((s) => (
            <StepItem key={s.num} num={s.num} title={s.title} body={s.body} />
          ))}
        </ol>
      </div>
    </section>
  );
}