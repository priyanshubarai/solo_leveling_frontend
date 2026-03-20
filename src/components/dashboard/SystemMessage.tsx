import { motion } from "framer-motion";
import { MessageCircle, Lightbulb } from "lucide-react";
import { fadeUp } from "./dashboardAnimations";

const SystemMessage = () => (
    <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
        <div className="glass-panel neon-border p-4 space-y-1.5">
            <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="font-body text-sm text-foreground">
                        <span className="text-accent font-semibold">System Message:</span> You're making great progress! Keep
                        completing quests to reach higher ranks and unlock powerful titles.
                    </p>
                    <p className="font-body text-sm text-primary flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        Tip: Spend your 6 stat points to boost your hunter abilities!
                    </p>
                </div>
            </div>
        </div>
    </motion.div>
);

export default SystemMessage;
