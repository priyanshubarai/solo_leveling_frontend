import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import GoalCard from "./GoalCard";
import { Goal, GoalType } from "@/types/goals";

interface GoalColumnProps {
  type: GoalType;
  label: string;
  goals: Goal[];
  onToggleComplete: (colType: GoalType, goalId: number) => void;
  onAddGoal: (colType: GoalType) => void;
  index: number;
}

const GoalColumn = ({ type, label, goals, onToggleComplete, onAddGoal, index }: GoalColumnProps) => {
  const [filter, setFilter] = useState<"current" | "complete">("current");

  const filteredGoals = goals.filter((g) => (filter === "current" ? !g.completed : g.completed));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-panel rounded-xl border border-border/30 p-5"
    >
      {/* Column Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🔥</span>
        <h2 className="font-display text-lg font-bold text-foreground tracking-wider">{label}</h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={() => setFilter("current")}
          className={`font-display text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border transition-all ${
            filter === "current"
              ? "bg-accent/20 text-accent border-accent/40"
              : "text-muted-foreground border-border/30 hover:text-foreground"
          }`}
        >
          ◦ Current
        </button>
        <button
          onClick={() => setFilter("complete")}
          className={`font-display text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border transition-all ${
            filter === "complete"
              ? "bg-accent/20 text-accent border-accent/40"
              : "text-muted-foreground border-border/30 hover:text-foreground"
          }`}
        >
          • Complete
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredGoals.map((goal) => (
            <GoalCard 
              key={goal.goalid} 
              goal={goal} 
              onToggleComplete={(id) => onToggleComplete(type, id)} 
            />
          ))}
        </AnimatePresence>

        {filteredGoals.length === 0 && (
          <p className="text-muted-foreground text-xs text-center py-4 font-display tracking-wider">
            {filter === "current" ? "No current goals" : "No completed goals"}
          </p>
        )}
      </div>

      {/* Add Goal */}
      <button
        onClick={() => onAddGoal(type)}
        className="w-full mt-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-xs font-display tracking-wider py-2 rounded-lg border border-dashed border-border/30 hover:border-primary/30 transition-all"
      >
        <Plus className="w-3.5 h-3.5" />
        New goal
      </button>
    </motion.div>
  );
};

export default GoalColumn;
