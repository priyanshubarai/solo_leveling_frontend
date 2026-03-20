import { motion } from "framer-motion";
import { Target, ArrowRight, RefreshCw, CalendarCheck, Shield } from "lucide-react";
import { fadeUp } from "./dashboardAnimations";
import { activeQuests, dailyTraining } from "./dashboardData";

const ActiveQuests = () => (
    <div className="glass-panel neon-border p-5 space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span className="font-display text-sm font-bold tracking-wider text-foreground uppercase">Active Quests</span>
            </div>
            <span className="font-display text-xs text-muted-foreground tracking-wider">3 active</span>
        </div>

        <div className="space-y-3">
            {activeQuests.map((quest) => (
                <div
                    key={quest.title}
                    className={`border-l-2 ${quest.color} pl-4 py-2 flex items-center justify-between bg-secondary/30 rounded-r-md pr-3`}
                >
                    <div>
                        <div className="font-display text-sm font-bold text-foreground tracking-wider">{quest.title}</div>
                        {quest.subtitle && (
                            <div className="text-xs text-muted-foreground font-body">{quest.subtitle}</div>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                            <span className="font-display text-[10px] tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                                {quest.rank}
                            </span>
                            <span className="font-display text-[10px] tracking-wider text-accent">+{quest.xp} XP</span>
                        </div>
                    </div>
                    <RefreshCw className="w-4 h-4 text-accent shrink-0" />
                </div>
            ))}
        </div>

        <button className="w-full text-center font-display text-xs tracking-wider text-muted-foreground hover:text-accent transition-colors flex items-center justify-center gap-1">
            <ArrowRight className="w-3 h-3" /> View All Quests
        </button>
    </div>
);

const DailyTraining = () => (
    <div className="glass-panel neon-border p-5 space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-accent" />
                <span className="font-display text-sm font-bold tracking-wider text-foreground uppercase">Daily Training</span>
            </div>
            <span className="font-display text-xs text-muted-foreground tracking-wider">5 quests</span>
        </div>

        <div className="glass-panel neon-border-blue px-3 py-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="font-display text-xs tracking-wider text-accent">Penalty: None</span>
        </div>

        <div className="space-y-2">
            {dailyTraining.map((item) => (
                <div key={item.title} className="flex items-center gap-3 bg-secondary/30 rounded-md px-3 py-2.5">
                    <div className="w-8 h-8 rounded-md bg-secondary/80 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                        <div className="font-display text-sm font-bold text-foreground tracking-wider">{item.title}</div>
                        <div className="font-display text-[10px] tracking-wider text-accent">+{item.xp} XP</div>
                    </div>
                </div>
            ))}
        </div>

        <button className="w-full text-center font-display text-xs tracking-wider text-muted-foreground hover:text-accent transition-colors flex items-center justify-center gap-1">
            <ArrowRight className="w-3 h-3" /> View All Daily Quests
        </button>
    </div>
);

const QuestsSection = () => (
    <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
        <ActiveQuests />
        <DailyTraining />
    </motion.div>
);

export default QuestsSection;
