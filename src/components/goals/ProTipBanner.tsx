import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ProTipBanner = () => {
  const [proTipOpen, setProTipOpen] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel neon-border p-5 rounded-xl mb-8"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div className="flex-1">
          <h3 className="font-display text-sm font-bold text-primary tracking-wider mb-1">Pro Tip</h3>
          <p className="text-muted-foreground text-sm">
            Use "Parse with AI" to break big goals into subtasks. Weekly goals keep you focused, monthly goals build momentum!
          </p>
          <button
            onClick={() => setProTipOpen(!proTipOpen)}
            className="flex items-center gap-1 text-primary text-xs font-display tracking-wider mt-2 hover:text-primary/80 transition-colors"
          >
            Learn more about this page
            <ChevronDown className={`w-3 h-3 transition-transform ${proTipOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {proTipOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <ul className="text-muted-foreground text-xs mt-2 space-y-1 list-disc list-inside">
                  <li>Weekly goals reset every week — keep them small and actionable</li>
                  <li>Monthly goals track bigger milestones over 30 days</li>
                  <li>Annual goals are your long-term vision — break them down with AI</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProTipBanner;
