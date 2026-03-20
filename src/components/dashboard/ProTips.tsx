import { motion } from "framer-motion";
import { Lightbulb, ChevronDown } from "lucide-react";
import { useState } from "react";
import { fadeUp } from "./dashboardAnimations";

const ProTips = () => {
    const [tipsOpen, setTipsOpen] = useState(false);

    return (
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
            <button
                onClick={() => setTipsOpen(!tipsOpen)}
                className="w-full glass-panel neon-border p-4 flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                        <div className="font-display text-sm font-bold text-foreground tracking-wider">Dashboard Pro Tips</div>
                        <div className="font-body text-xs text-muted-foreground">Get the most out of your hunter dashboard</div>
                    </div>
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${tipsOpen ? "rotate-180" : ""}`}
                />
            </button>
            {tipsOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="glass-panel border border-border/30 border-t-0 rounded-t-none p-4 space-y-2"
                >
                    <p className="font-body text-sm text-muted-foreground">• Complete daily quests for consistent XP gains</p>
                    <p className="font-body text-sm text-muted-foreground">• Allocate stat points to match your growth path</p>
                    <p className="font-body text-sm text-muted-foreground">• Maintain day streaks for bonus XP multipliers</p>
                    <p className="font-body text-sm text-muted-foreground">• Check the leaderboard to track your ranking</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ProTips;
