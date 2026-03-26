interface CompletionDonutProps {
  completionPct: number;
}

const RADIUS = 60;
const STROKE = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CompletionDonut = ({ completionPct }: CompletionDonutProps) => {
  const offset = CIRCUMFERENCE - (completionPct / 100) * CIRCUMFERENCE;

  return (
    <div className="glass-panel p-6 flex flex-col items-center">
      <h3 className="font-display text-lg font-bold text-foreground mb-6 self-start">Overall Completion</h3>
      <svg width="160" height="160" className="mb-4">
        <circle
          cx="80" cy="80" r={RADIUS}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={STROKE}
        />
        <circle
          cx="80" cy="80" r={RADIUS}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
          className="transition-all duration-700"
        />
        <text x="80" y="75" textAnchor="middle" className="fill-foreground font-display text-3xl font-bold" fontSize="28">
          {completionPct}%
        </text>
        <text x="80" y="95" textAnchor="middle" className="fill-muted-foreground font-body" fontSize="12">
          Completion
        </text>
      </svg>
      <div className="flex items-center gap-6 text-xs font-body text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Done
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Remaining
        </span>
      </div>
    </div>
  );
};

export default CompletionDonut;
