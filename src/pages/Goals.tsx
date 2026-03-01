import { useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, Plus, Zap, Heart, Sparkles, Calendar, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Goal {
  id: string;
  title: string;
  description?: string;
  icon: string;
  completed: boolean;
  dueDate?: string;
  overdue?: boolean;
  hasParseAI?: boolean;
}

interface GoalColumn {
  type: "weekly" | "monthly" | "annual";
  label: string;
  goals: Goal[];
}

const iconOptions = [
  { value: "zap", label: "⚡ Lightning", icon: Zap },
  { value: "heart", label: "❤️ Heart", icon: Heart },
  { value: "sparkles", label: "✨ Sparkles", icon: Sparkles },
  { value: "flag", label: "🚩 Flag", icon: Flag },
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "zap": return <Zap className="w-4 h-4 text-primary" />;
    case "heart": return <Heart className="w-4 h-4 text-destructive" />;
    case "sparkles": return <Sparkles className="w-4 h-4 text-accent" />;
    default: return <Flag className="w-4 h-4 text-primary" />;
  }
};

const Goals = () => {
  const [columns, setColumns] = useState<GoalColumn[]>([
    {
      type: "weekly",
      label: "Weekly Goals",
      goals: [
        { id: "w1", title: "DSA streak", icon: "zap", completed: false, dueDate: "Feb 8, 2026", overdue: true },
        { id: "w2", title: "no fap streak", icon: "heart", completed: false, dueDate: "Feb 8, 2026", overdue: true },
      ],
    },
    {
      type: "monthly",
      label: "Monthly Goals",
      goals: [
        { id: "m1", title: "finish pactumAI project research", description: "do thorough research and keep meeting with mentor", icon: "zap", completed: false, hasParseAI: true },
        { id: "m2", title: "finish soloLeveling project", description: "finish the project that you started of solo leveling", icon: "zap", completed: false, hasParseAI: true },
      ],
    },
    {
      type: "annual",
      label: "Annual Goals",
      goals: [
        { id: "a1", title: "recite Coding", description: "being able to coding basics without any help, just remember all syntax.", icon: "zap", completed: false, hasParseAI: true },
        { id: "a2", title: "Learn Backend", description: "learn all the theory topics of advance backend", icon: "sparkles", completed: false, hasParseAI: true },
      ],
    },
  ]);

  const [filter, setFilter] = useState<Record<string, "current" | "complete">>({
    weekly: "current",
    monthly: "current",
    annual: "current",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newType, setNewType] = useState<"weekly" | "monthly" | "annual">("weekly");
  const [newIcon, setNewIcon] = useState("zap");
  const [proTipOpen, setProTipOpen] = useState(true);

  const toggleComplete = (colType: string, goalId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.type === colType
          ? { ...col, goals: col.goals.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g)) }
          : col
      )
    );
  };

  const addGoalInline = (colType: string) => {
    setNewType(colType as any);
    setDialogOpen(true);
  };

  const handleAddGoal = () => {
    if (!newTitle.trim()) return;
    const goal: Goal = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription || undefined,
      icon: newIcon,
      completed: false,
      hasParseAI: newType !== "weekly",
    };
    setColumns((prev) =>
      prev.map((col) => (col.type === newType ? { ...col, goals: [...col.goals, goal] } : col))
    );
    setNewTitle("");
    setNewDescription("");
    setNewIcon("zap");
    setDialogOpen(false);
  };

  const getFilteredGoals = (col: GoalColumn) => {
    const f = filter[col.type];
    return col.goals.filter((g) => (f === "current" ? !g.completed : g.completed));
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="w-full px-4 md:px-8 xl:px-16 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow">Goals</h1>
            <p className="text-muted-foreground font-display text-sm tracking-wider mt-1">
              Set your goals to get personalized AI quests
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 font-display tracking-wider uppercase text-xs gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </Button>
        </div>

        {/* Pro Tip Banner */}
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

        {/* Goal Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col, ci) => (
            <motion.div
              key={col.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1 }}
              className="glass-panel rounded-xl border border-border/30 p-5"
            >
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🔥</span>
                <h2 className="font-display text-lg font-bold text-foreground tracking-wider">{col.label}</h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mb-5">
                <button
                  onClick={() => setFilter((p) => ({ ...p, [col.type]: "current" }))}
                  className={`font-display text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border transition-all ${
                    filter[col.type] === "current"
                      ? "bg-accent/20 text-accent border-accent/40"
                      : "text-muted-foreground border-border/30 hover:text-foreground"
                  }`}
                >
                  ◦ Current
                </button>
                <button
                  onClick={() => setFilter((p) => ({ ...p, [col.type]: "complete" }))}
                  className={`font-display text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border transition-all ${
                    filter[col.type] === "complete"
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
                  {getFilteredGoals(col).map((goal) => (
                    <motion.div
                      key={goal.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="glass-panel rounded-lg border border-border/20 p-4 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                          <div className="mt-0.5 w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                            {getIconComponent(goal.icon)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className={`font-display text-sm font-semibold tracking-wider ${goal.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                              {goal.title}
                            </h3>
                            {goal.overdue && goal.dueDate && (
                              <div className="flex items-center gap-1 mt-1">
                                <Calendar className="w-3 h-3 text-destructive" />
                                <span className="text-destructive text-[10px] font-display tracking-wider">
                                  Overdue: {goal.dueDate}
                                </span>
                              </div>
                            )}
                            {goal.description && (
                              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{goal.description}</p>
                            )}
                            {goal.hasParseAI && (
                              <button className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-[10px] font-display tracking-widest uppercase hover:bg-accent/20 transition-colors">
                                <Sparkles className="w-3 h-3" />
                                Parse with AI
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Checkbox
                            checked={goal.completed}
                            onCheckedChange={() => toggleComplete(col.type, goal.id)}
                            className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="text-muted-foreground text-[10px] font-display tracking-wider">Complete</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {getFilteredGoals(col).length === 0 && (
                  <p className="text-muted-foreground text-xs text-center py-4 font-display tracking-wider">
                    {filter[col.type] === "current" ? "No current goals" : "No completed goals"}
                  </p>
                )}
              </div>

              {/* Add Goal */}
              <button
                onClick={() => addGoalInline(col.type)}
                className="w-full mt-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-xs font-display tracking-wider py-2 rounded-lg border border-dashed border-border/30 hover:border-primary/30 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                New goal
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Goal Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-panel border-border/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl tracking-wider text-primary text-glow">
              Add New Goal
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs font-display tracking-wider">
              Set a goal and let the system guide your path.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="font-display text-xs tracking-wider text-muted-foreground mb-1.5 block">Title</label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter goal title..."
                className="bg-secondary/30 border-border/30 font-display text-sm"
              />
            </div>
            <div>
              <label className="font-display text-xs tracking-wider text-muted-foreground mb-1.5 block">Description (optional)</label>
              <Textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Describe your goal..."
                className="bg-secondary/30 border-border/30 font-display text-sm min-h-[60px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-display text-xs tracking-wider text-muted-foreground mb-1.5 block">Type</label>
                <Select value={newType} onValueChange={(v) => setNewType(v as any)}>
                  <SelectTrigger className="bg-secondary/30 border-border/30 font-display text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-border/30">
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-display text-xs tracking-wider text-muted-foreground mb-1.5 block">Icon</label>
                <Select value={newIcon} onValueChange={setNewIcon}>
                  <SelectTrigger className="bg-secondary/30 border-border/30 font-display text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-border/30">
                    {iconOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setDialogOpen(false)} className="font-display text-xs tracking-wider">
              Cancel
            </Button>
            <Button onClick={handleAddGoal} className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-display text-xs tracking-wider gap-2">
              <Plus className="w-3.5 h-3.5" />
              Add Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Goals;
