import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Swords, BarChart3, Trophy, Gift } from "lucide-react";

const features = [
  {
    icon: Swords,
    title: "Daily Quests",
    desc: "Receive procedurally generated challenges. Each day is a dungeon to conquer.",
    accent: "purple" as const,
  },
  {
    icon: BarChart3,
    title: "Stat Dashboard",
    desc: "Track every attribute — strength, discipline, intellect, endurance. Watch yourself grow.",
    accent: "blue" as const,
  },
  {
    icon: Trophy,
    title: "Rank Progression",
    desc: "Climb from E-Rank to S-Rank. Unlock new tiers as your power grows.",
    accent: "purple" as const,
  },
  {
    icon: Gift,
    title: "Rewards & Titles",
    desc: "Earn exclusive titles, badges, and in-app rewards for your achievements.",
    accent: "blue" as const,
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;
  const isPurple = feature.accent === "purple";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: hovered ? -2 : 0,
          rotateY: hovered ? 3 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`glass-panel ${isPurple ? "neon-border" : "neon-border-blue"} p-8 h-full transition-all duration-500 ${
          hovered ? (isPurple ? "neon-glow" : "neon-glow-blue") : ""
        }`}
      >
        {/* Top accent line */}
        <div className={`h-px w-full mb-6 ${isPurple ? "bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" : "bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"}`} />

        <div className={`inline-flex p-3 rounded-lg mb-5 ${isPurple ? "bg-neon-purple/10" : "bg-neon-blue/10"}`}>
          <Icon className={`w-6 h-6 ${isPurple ? "text-neon-purple" : "text-neon-blue"}`} />
        </div>

        <h3 className="font-display text-xl font-bold text-foreground mb-3 tracking-wide">{feature.title}</h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>

        {/* Bottom shimmer */}
        <div className={`absolute bottom-0 left-0 right-0 h-px shimmer ${hovered ? "opacity-100" : "opacity-0"} transition-opacity duration-500`} />
      </motion.div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-panel neon-border px-4 py-2 mb-6">
            <span className="font-display text-xs tracking-[0.2em] text-neon-purple uppercase">System Features</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Your <span className="text-primary text-glow">Arsenal</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Every tool you need to dominate your self-growth journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
