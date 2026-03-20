import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { fadeUp } from "./dashboardAnimations";

const WelcomeHeader = ({ username }: { username: string }) => (
    <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <div className="inline-flex items-center gap-2 glass-panel neon-border px-3 py-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="font-display text-xs tracking-[0.15em] text-accent uppercase">Hunter Dashboard</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-accent text-glow-blue mb-1">
            Welcome Back, {username}
        </h1>
        <p className="text-muted-foreground font-body text-sm">Continue your journey to greatness</p>
    </motion.div>
);

export default WelcomeHeader;
