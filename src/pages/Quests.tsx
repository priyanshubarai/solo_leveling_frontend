import { useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Plus, Sparkles, Check, ChevronDown, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface Quest {
  id: string;
  title: string;
  description?: string;
  difficulty: "easy" | "medium" | "hard";
  xp: number;
  statBoost: string;
  completed: boolean;
}

const initialQuests: Quest[] = [
  { id: "1", title: "read nextjs docs", difficulty: "easy", xp: 25, statBoost: "+1 INT", completed: false },
  { id: "2", title: "study postgres SQL", difficulty: "medium", xp: 50, statBoost: "+2 INT", completed: false },
  { id: "3", title: "do Research", description: "research for pactumAI", difficulty: "medium", xp: 50, statBoost: "+2 AGI", completed: false },
  { id: "4", title: "30 min workout", difficulty: "easy", xp: 25, statBoost: "+1 STR", completed: true },
  { id: "5", title: "build portfolio site", difficulty: "hard", xp: 100, statBoost: "+3 INT", completed: true },
];

const difficultyConfig = {
  easy: { label: "easy", className: "bg-accent/20 text-accent border-accent/30" },
  medium: { label: "medium", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  hard: { label: "hard", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

const preferenceMap = {
  easy: "+25 XP",
  medium: "+50 XP",
  hard: "+100 XP",
};

const Quests = () => {
  const [quests, setQuests] = useState(initialQuests);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [matchPreference, setMatchPreference] = useState(false);
  const [preference] = useState<"easy" | "medium" | "hard">("medium");
  const [proTipOpen, setProTipOpen] = useState(false);

  const activeQuests = quests.filter((q) => !q.completed);
  const completedQuests = quests.filter((q) => q.completed);

  const displayedQuests = (activeTab === "active" ? activeQuests : completedQuests).filter((q) => {
    if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter) return false;
    if (matchPreference && q.difficulty !== preference) return false;
    return true;
  });

  const handleComplete = (id: string) => {
    setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, completed: true } : q)));
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-primary text-glow">Quest Board</h1>
            <p className="text-muted-foreground font-body text-sm mt-1">Manage and complete your quests</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary font-display uppercase tracking-wider text-xs">
              <Sparkles className="w-4 h-4" />
              AI Generate
            </Button>
            <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-xs">
              <Plus className="w-4 h-4" />
              Create Quest
            </Button>
          </div>
        </div>

        {/* Preference & Filter Bar */}
        <div className="glass-panel p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm font-body">
            <span className="text-accent font-semibold">Your Preference:</span>{" "}
            <span className="text-foreground capitalize">{preference} ({preferenceMap[preference]})</span>
          </p>
          <div className="flex items-center gap-4">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[160px] bg-secondary/60 border-border/40 font-body text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground font-body">
              <Checkbox checked={matchPreference} onCheckedChange={(v) => setMatchPreference(!!v)} />
              Match Preference
            </label>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-5 py-2 rounded-full font-display text-sm uppercase tracking-wider transition-all ${
              activeTab === "active"
                ? "bg-accent text-accent-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            Active ({activeQuests.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-5 py-2 rounded-full font-display text-sm uppercase tracking-wider transition-all ${
              activeTab === "completed"
                ? "bg-accent text-accent-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            Completed ({completedQuests.length})
          </button>
        </div>

        {/* Quest Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedQuests.map((quest) => (
              <motion.div
                key={quest.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="glass-panel p-5 flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors duration-300 group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-md bg-primary/20 neon-border flex items-center justify-center shrink-0">
                      <Swords className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline" className={`text-[10px] uppercase font-display tracking-wider ${difficultyConfig[quest.difficulty].className}`}>
                      {quest.difficulty}
                    </Badge>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{quest.title}</h3>
                  {quest.description && (
                    <p className="text-muted-foreground text-xs font-body mt-1">{quest.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline" className="text-[10px] bg-accent/15 text-accent border-accent/30 font-display tracking-wider">
                      ◆ +{quest.xp} XP
                    </Badge>
                    <span className="text-xs text-muted-foreground font-display tracking-wider">{quest.statBoost}</span>
                  </div>
                </div>
                {!quest.completed ? (
                  <Button
                    size="sm"
                    onClick={() => handleComplete(quest.id)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-xs gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Complete
                  </Button>
                ) : (
                  <Badge className="bg-accent/20 text-accent border-accent/30 font-display uppercase tracking-wider text-xs w-fit">
                    Completed
                  </Badge>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {displayedQuests.length === 0 && (
          <div className="glass-panel p-12 text-center mt-4">
            <p className="text-muted-foreground font-body">No quests found.</p>
          </div>
        )}

        {/* Pro Tip */}
        <div className="glass-panel p-5 mt-8">
          <div className="flex items-start gap-3">
            <Swords className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h4 className="font-display text-sm font-bold text-primary">Pro Tip</h4>
              <p className="text-muted-foreground text-sm font-body mt-1">
                Higher difficulty = more XP and stat points. Each category boosts specific stats: Fitness→STR, Learning→INT, Productivity→AGI, Health→VIT, Social→SEN.
              </p>
              <button
                onClick={() => setProTipOpen(!proTipOpen)}
                className="flex items-center gap-1 text-accent text-xs font-body mt-2 hover:underline"
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
                    <p className="text-muted-foreground text-xs font-body mt-3 leading-relaxed">
                      Create quests to track your personal growth activities. Set difficulty levels to earn appropriate XP rewards. Complete quests to level up your hunter profile and climb the leaderboard. Use AI Generate to get personalized quest suggestions based on your goals.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quests;
