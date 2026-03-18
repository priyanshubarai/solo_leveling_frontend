import DashboardNavbar from "@/components/DashboardNavbar";
import { motion } from "framer-motion";
import { Trophy, Lock, Star, Target, Swords, Zap, Shield, Crown, Flame, Award, TrendingUp, Gem } from "lucide-react";
import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  { id: "1", title: "First Steps", description: "Complete your first quest", icon: <Target className="w-6 h-6" />, unlocked: true },
  { id: "2", title: "Quest Hunter", description: "Complete 10 quests", icon: <Swords className="w-6 h-6" />, unlocked: true },
  { id: "3", title: "Quest Master", description: "Complete 50 quests", icon: <Swords className="w-6 h-6" />, unlocked: false },
  { id: "4", title: "Quest Legend", description: "Complete 100 quests", icon: <Crown className="w-6 h-6" />, unlocked: false },
  { id: "5", title: "Week Warrior", description: "Maintain a 7-day streak", icon: <Flame className="w-6 h-6" />, unlocked: false },
  { id: "6", title: "Monthly Champion", description: "Maintain a 30-day streak", icon: <Flame className="w-6 h-6" />, unlocked: false },
  { id: "7", title: "Unstoppable", description: "Maintain a 100-day streak", icon: <Zap className="w-6 h-6" />, unlocked: false },
  { id: "8", title: "Rising Hunter", description: "Reach level 10", icon: <TrendingUp className="w-6 h-6" />, unlocked: false },
  { id: "9", title: "Skilled Hunter", description: "Reach level 25", icon: <Award className="w-6 h-6" />, unlocked: false },
  { id: "10", title: "Elite Hunter", description: "Reach level 50", icon: <Shield className="w-6 h-6" />, unlocked: false },
  { id: "11", title: "E-Rank Awakening", description: "Reach E-Rank", icon: <Gem className="w-6 h-6" />, unlocked: true },
  { id: "12", title: "D-Rank Power", description: "Reach D-Rank", icon: <Gem className="w-6 h-6" />, unlocked: false },
  { id: "13", title: "C-Rank Mastery", description: "Reach C-Rank", icon: <Gem className="w-6 h-6" />, unlocked: false },
  { id: "14", title: "B-Rank Elite", description: "Reach B-Rank", icon: <Gem className="w-6 h-6" />, unlocked: false },
  { id: "15", title: "A-Rank Legend", description: "Reach A-Rank", icon: <Gem className="w-6 h-6" />, unlocked: false },
  { id: "16", title: "Shadow Monarch", description: "Reach S-Rank", icon: <Crown className="w-6 h-6" />, unlocked: false },
];

const Achievements = () => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to finish loading before checking auth status.
  // Without this, isSignedIn is `undefined` on first render and triggers
  // an immediate redirect back to "/" even for authenticated users.
  
  if (!isLoaded) {
    return null; // or a loading spinner
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="w-full px-4 md:px-8 xl:px-16 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow tracking-wider">
              Achievements
            </h1>
            <p className="font-display text-sm tracking-wider text-muted-foreground mt-1">
              Unlock achievements by completing challenges
            </p>
          </div>
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full neon-border">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="font-display text-sm font-bold tracking-wider text-foreground">
              {unlockedCount} / {achievements.length}
            </span>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className={`relative rounded-lg border p-4 flex items-center gap-4 transition-all duration-300 ${
                ach.unlocked
                  ? "glass-panel neon-border bg-primary/5"
                  : "border-border/30 bg-secondary/20 opacity-60"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  ach.unlocked
                    ? "bg-accent/20 text-accent"
                    : "bg-muted/30 text-muted-foreground"
                }`}
              >
                {ach.icon}
              </div>

              {/* Info */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-display text-sm font-bold tracking-wider truncate ${
                    ach.unlocked ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {ach.title}
                  </span>
                  {ach.unlocked ? (
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  )}
                </div>
                <p className="font-body text-xs text-muted-foreground truncate">
                  {ach.description}
                </p>
              </div>

              {/* Unlocked glow accent */}
              {ach.unlocked && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Pro Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 glass-panel rounded-lg border border-border/30 p-5 flex items-start gap-3"
        >
          <Star className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <span className="font-display text-sm font-bold tracking-wider text-primary">Pro Tip</span>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Achievements unlock automatically as you progress. Focus on streaks and quest completion to unlock them faster!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Achievements;
