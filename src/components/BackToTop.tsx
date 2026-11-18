interface BackToTopProps {
  show: boolean;
}

export default function BackToTop({ show }: BackToTopProps) {
  const handleClick = () => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      id="top"
      className={show ? 'show' : undefined}
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
    >
      ↑
    </button>
  );
}