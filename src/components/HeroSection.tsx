import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

// Load all frames via Vite glob — sorted so they play in order
const frameModules = import.meta.glob<{ default: string }>(
  "@/assets/hero-anime/frame_*.webp",
  { eager: true }
);
const FRAME_URLS: string[] = Object.keys(frameModules)
  .sort()
  .map((k) => frameModules[k].default);

const FRAME_DELAY_MS = 42; // ~41-42 ms per frame as named in files

// Canvas-based sprite animator
const HeroAnimCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const readyRef = useRef(false);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !readyRef.current) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const elapsed = timestamp - lastTimeRef.current;
    if (elapsed >= FRAME_DELAY_MS) {
      lastTimeRef.current = timestamp - (elapsed % FRAME_DELAY_MS);
      frameIndexRef.current = (frameIndexRef.current + 1) % imagesRef.current.length;

      const img = imagesRef.current[frameIndexRef.current];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Subtle purple vignette overlay to blend with dark theme
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.25,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.9
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(10,4,30,0.72)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bottom fade-out so it blends into the card background
      const fadeBottom = ctx.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height);
      fadeBottom.addColorStop(0, "rgba(10,4,30,0)");
      fadeBottom.addColorStop(1, "rgba(10,4,30,0.95)");
      ctx.fillStyle = fadeBottom;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = FRAME_URLS.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === FRAME_URLS.length) {
          imagesRef.current = images;
          readyRef.current = true;
          // Draw first frame immediately
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
          }
        }
      };
      return img;
    });

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={550}
      className="w-full h-auto relative z-10"
      style={{
        filter: "drop-shadow(0 0 32px hsl(270 80% 60% / 0.55)) drop-shadow(0 0 80px hsl(200 100% 55% / 0.2))",
      }}
    />
  );
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

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

        {/* Right: Hero Animated Character */}
        <motion.div
          className="flex-1 relative flex items-center justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Wrapper: relative so panels are positioned relative to the card size, not the flex parent */}
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Card with overflow-hidden for the canvas */}
            <div className="relative glass-panel neon-border rounded-2xl overflow-hidden w-full">
              {/* Inner purple glow overlay */}
              <div className="absolute inset-0 z-20 rounded-2xl pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,_hsl(270_80%_60%_/_0.18)_0%,_transparent_65%)]" />
              {/* Blue eye glow accent — top-left where the glowing eye is */}
              <div className="absolute top-[28%] left-[42%] w-16 h-6 z-20 pointer-events-none rounded-full bg-[hsl(200_100%_55%_/_0.25)] blur-xl" />

              {/* The animated canvas */}
              <HeroAnimCanvas />
            </div>

            {/* System notification panels — outside overflow-hidden so they aren't clipped */}
            {[
              { label: "RANK", value: "S", top: "5%", right: "-20%" },
              { label: "LEVEL", value: "47", top: "35%", left: "-18%" },
              { label: "XP", value: "+250", bottom: "20%", right: "-12%" },
            ].map((panel, i) => (
              <motion.div
                key={panel.label}
                custom={i}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                className="absolute glass-panel neon-border px-4 py-3 hidden lg:block z-30"
                style={{ top: panel.top, right: panel.right, bottom: panel.bottom, left: panel.left }}
              >
                <div className="font-display text-[10px] tracking-[0.2em] text-muted-foreground mb-1">{panel.label}</div>
                <div className="font-display text-2xl font-bold text-primary text-glow">{panel.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
