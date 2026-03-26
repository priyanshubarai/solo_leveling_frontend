import { useState } from "react";
import { Zap, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SystemNotice = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-panel p-5">
      <div className="flex items-start gap-3">
        <Zap className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <div>
          <h4 className="font-display text-sm font-bold text-primary">System Notice</h4>
          <p className="text-muted-foreground text-sm font-body mt-1">
            Daily Quests work like Jin-Woo's training system! Each completion gives you +10 XP and +1 stat point based
            on the quest category. Unlike regular quests, Daily Quests don't affect your streak but provide consistent
            growth.
          </p>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 text-accent text-xs font-body mt-2 hover:underline"
          >
            Learn more about Daily Quests
            <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-muted-foreground text-xs font-body mt-3 leading-relaxed">
                  Daily Quests reset each day and help you build consistent habits. Check off each quest for the current
                  day to earn XP. Track your monthly progress with the grid above and watch your completion rate improve
                  over time. The more consistent you are, the faster you level up!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SystemNotice;
