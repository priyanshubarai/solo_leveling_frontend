import { useEffect, useRef } from "react";

const RuneSymbols = () => {
  const runes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛈ", "ᛇ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛚ", "ᛗ"];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {runes.map((rune, i) => (
        <span
          key={i}
          className="absolute text-neon-purple/5 font-display select-none"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
            fontSize: `${20 + (i % 4) * 10}px`,
            animation: `rune-fade ${5 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {rune}
        </span>
      ))}
    </div>
  );
};

const FogLayer = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-drift opacity-[0.04]"
        style={{
          width: `${400 + i * 200}px`,
          height: `${400 + i * 200}px`,
          left: `${20 + i * 25}%`,
          top: `${10 + i * 30}%`,
          background: i % 2 === 0
            ? `radial-gradient(circle, hsl(270 80% 60% / 0.3), transparent 70%)`
            : `radial-gradient(circle, hsl(200 100% 55% / 0.2), transparent 70%)`,
          animationDelay: `${i * 5}s`,
          animationDuration: `${20 + i * 8}s`,
          filter: "blur(80px)",
        }}
      />
    ))}
  </div>
);

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "168, 85, 247" : "59, 130, 246",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />;
};

const AtmosphericBackground = () => (
  <>
    <div className="noise-overlay" />
    <FogLayer />
    <RuneSymbols />
    <ParticleField />
  </>
);

export default AtmosphericBackground;
