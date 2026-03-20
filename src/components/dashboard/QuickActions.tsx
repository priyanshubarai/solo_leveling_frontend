import { motion } from "framer-motion";
import { fadeUp } from "./dashboardAnimations";
import { quickActions } from "./dashboardData";

const QuickActions = () => (
    <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
    >
        {quickActions.map((action) => (
            <button
                key={action.label}
                className="glass-panel neon-border p-5 flex flex-col items-center gap-3 hover:bg-secondary/50 transition-all duration-300 group"
            >
                <action.icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="font-display text-xs tracking-wider text-foreground uppercase">{action.label}</span>
            </button>
        ))}
    </motion.div>
);

export default QuickActions;
