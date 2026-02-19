import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import heroCharacter from "@/assets/hero-character.png";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const panelVariants = {
    hidden: { opacity: 0, x: 80, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1, x: 0, filter: "blur(0px)",
      transition: { delay: 1.2 + i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(270_80%_60%_/_0.08)_0%,_transparent_60%)]" />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 glass-panel neon-border px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse-glow" />
              <span className="font-display text-xs tracking-[0.2em] text-neon-purple uppercase">System Online</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[0.95] mb-6"
          >
            <span className="text-glow text-foreground">ARISE.</span>
            <br />
            <span className="text-primary">LEVEL UP.</span>
            <br />
            <span className="text-glow-blue text-accent">DOMINATE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 font-body font-light leading-relaxed"
          >
            Turn your life into a leveling system — quests, ranks, and rewards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button onClick={() => navigate("/dashboard")} className="btn-primary-glow text-base">Start Your Quest</button>
            <button className="btn-outline-glow text-base">View Demo</button>
          </motion.div>
        </div>

        {/* Right: Hero Card */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="relative glass-panel neon-border rounded-2xl p-6 sm:p-8 w-full max-w-md lg:max-w-lg overflow-visible">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,_hsl(270_80%_60%_/_0.1)_0%,_transparent_70%)]" />
            <motion.img
              src={heroCharacter}
              alt="Shadow Monarch"
              className="w-full h-auto relative z-10 drop-shadow-[0_0_40px_hsl(270,80%,60%,0.6)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* System notification panels */}
            {[
              { label: "RANK", value: "S", top: "-8%", right: "-12%" },
              { label: "LEVEL", value: "47", bottom: "20%", left: "-18%" },
              { label: "XP", value: "+250", bottom: "5%", right: "-10%" },
            ].map((panel, i) => (
              <motion.div
                key={panel.label}
                custom={i}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                className="absolute glass-panel neon-border px-4 py-3 hidden lg:block z-20"
                style={{ top: panel.top, right: panel.right, bottom: panel.bottom, left: panel.left }}
              >
                <div className="font-display text-[10px] tracking-[0.2em] text-muted-foreground mb-1">{panel.label}</div>
                <div className="font-display text-2xl font-bold text-primary text-glow">{panel.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-neon-purple/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
