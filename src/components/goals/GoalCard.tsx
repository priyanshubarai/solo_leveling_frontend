import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Flag, Zap, Heart, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Goal } from "@/types/goals";

interface GoalCardProps {
  goal: Goal;
  onToggleComplete: (goalId: number) => void;
}

const getIconComponent = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "zap": return <Zap className="w-4 h-4 text-primary" />;
    case "heart": return <Heart className="w-4 h-4 text-destructive" />;
    case "sparkles": return <Sparkles className="w-4 h-4 text-accent" />;
    default: return <Flag className="w-4 h-4 text-primary" />;
  }
};

const GoalCard = forwardRef<HTMLDivElement, GoalCardProps>(({ goal, onToggleComplete }, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-panel rounded-lg border border-border/20 p-4 hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <div className="mt-0.5 w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            {/* Using a default icon for now as icon is not in the new Goal interface */}
            {getIconComponent("flag")}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={`font-display text-sm font-semibold tracking-wider ${goal.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {goal.goaltitle}
            </h3>
            {goal.goaldesc && (
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{goal.goaldesc}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Checkbox
            checked={goal.completed}
            onCheckedChange={() => onToggleComplete(goal.goalid)}
            className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <span className="text-muted-foreground text-[10px] font-display tracking-wider">Complete</span>
        </div>
      </div>
    </motion.div>
  );
});

GoalCard.displayName = "GoalCard";

export default GoalCard;
