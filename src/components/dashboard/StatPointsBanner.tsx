import { motion } from "framer-motion";
import { Trophy, ArrowRight } from "lucide-react";
import { fadeUp } from "./dashboardAnimations";

const StatPointsBanner = () => (
    <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
        <div className="glass-panel neon-border-blue p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-accent" />
                </div>
                <div>
                    <div className="font-display text-sm font-bold text-foreground tracking-wider">Stat Points Available</div>
                    <div className="font-display text-xs text-accent tracking-wider">6 points ready to allocate</div>
                </div>
            </div>
            <button className="btn-primary-glow text-xs py-2 px-5 flex items-center gap-1.5 !bg-accent">
                <ArrowRight className="w-3.5 h-3.5" />
                Allocate
            </button>
        </div>
    </motion.div>
);

export default StatPointsBanner;
