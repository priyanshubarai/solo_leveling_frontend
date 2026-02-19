import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ClipboardList, Flame, Zap } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Accept Quests",
    desc: "Choose from daily missions tailored to your goals. Every quest is a step toward your next rank.",
  },
  {
    icon: Flame,
    step: "02",
    title: "Complete Habits",
    desc: "Execute with discipline. Track streaks, log progress, and push through your limits.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Earn XP & Rank Up",
    desc: "Watch your XP fill. Break through rank thresholds and unlock new abilities.",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass-panel neon-border-blue px-4 py-2 mb-6">
            <span className="font-display text-xs tracking-[0.2em] text-accent uppercase">Leveling Flow</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            How You <span className="text-accent text-glow-blue">Level Up</span>
          </h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Progress line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-muted hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-neon-purple via-accent to-neon-purple"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-8 items-start"
                >
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg glass-panel neon-border flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="font-display text-xs tracking-[0.3em] text-neon-purple/60 mb-2">
                      STEP {step.step}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-md">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
