import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "glass-panel py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#" className="font-display text-2xl font-bold tracking-[0.2em] text-foreground">
          <span className="text-glow">ASCEND</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Testimonials"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-display text-sm tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
            >
              {item}
            </a>
          ))}
          <button onClick={() => navigate("/dashboard")} className="btn-primary-glow text-sm py-2 px-6">
            Start Quest
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
