import { motion } from "framer-motion";

const logs = [
  {
    timestamp: "2025-12-14 03:42:07",
    rank: "S",
    name: "Hunter_Kira",
    text: "Hit S-Rank after 90 days. The quest system rewired my discipline completely. I don't recognize my old self.",
  },
  {
    timestamp: "2025-11-28 18:15:33",
    rank: "A",
    name: "PhantomAce",
    text: "From skipping workouts to a 60-day streak. The XP system makes it impossible to quit.",
  },
  {
    timestamp: "2025-11-01 09:08:51",
    rank: "B",
    name: "NovaStar",
    text: "The rank progression keeps me hooked. Every level-up feels like a real achievement.",
  },
  {
    timestamp: "2025-10-19 22:37:14",
    rank: "A",
    name: "Zenith_X",
    text: "Best habit tracker I've ever used. The gamification isn't gimmicky — it's motivating.",
  },
];

const rankColors: Record<string, string> = {
  S: "text-neon-purple text-glow",
  A: "text-accent text-glow-blue",
  B: "text-foreground",
};

const TestimonialsSection = () => (
  <section id="testimonials" className="relative py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 glass-panel neon-border px-4 py-2 mb-6">
          <span className="font-display text-xs tracking-[0.2em] text-neon-purple uppercase">System Logs</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          Success <span className="text-primary text-glow">Logs</span>
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel neon-border p-5 scanline relative overflow-hidden group hover:neon-glow transition-shadow duration-500"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-[11px] text-muted-foreground">{log.timestamp}</span>
              <span className={`font-display text-sm font-bold ${rankColors[log.rank]}`}>
                [{log.rank}-RANK]
              </span>
              <span className="font-display text-sm text-foreground/80 tracking-wider">{log.name}</span>
            </div>
            <p className="font-body text-sm text-secondary-foreground/80 leading-relaxed">
              &gt; {log.text}
            </p>
            {/* Scanline sweep on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-b from-neon-blue/[0.02] to-transparent" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
