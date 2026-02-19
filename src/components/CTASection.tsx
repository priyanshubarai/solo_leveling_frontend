import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      {/* Portal glow background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(270 80% 60% / 0.12) 0%, hsl(200 100% 55% / 0.06) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* System notification popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 glass-panel neon-border px-6 py-3 mb-10"
        >
          <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse-glow" />
          <span className="font-display text-xs tracking-[0.2em] text-foreground uppercase">
            ! System Notification: Your awakening is ready
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6"
        >
          Your system is <span className="text-primary text-glow">ready.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl text-muted-foreground font-body font-light mb-12 max-w-md mx-auto"
        >
          Start leveling today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button className="btn-primary-glow text-lg px-12 py-5 tracking-[0.15em]">
            Begin Ascension
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
