import { useState } from "react";
import { Trophy, Zap, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardNavbar from "@/components/DashboardNavbar";
import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

const timeFilters = ["Today", "This Week", "This Month", "All Time"] as const;
type TimeFilter = (typeof timeFilters)[number];

interface Player {
  name: string;
  level: number;
  rank: string;
  xp: number;
  streak?: number;
  isYou?: boolean;
}

const allData: Record<TimeFilter, Player[]> = {
  Today: [
    { name: "Relentless", level: 9, rank: "Novice Hunter", xp: 320 },
    { name: "Being Specter", level: 7, rank: "Novice Hunter", xp: 210, isYou: true },
    { name: "Antoni4x4", level: 1, rank: "Novice Hunter", xp: 45 },
    { name: "حسین", level: 1, rank: "Novice Hunter", xp: 0 },
    { name: "Mr.", level: 1, rank: "Novice Hunter", xp: 0 },
  ],
  "This Week": [
    { name: "Relentless", level: 9, rank: "Novice Hunter", xp: 1425, streak: 2 },
    { name: "Being Specter", level: 7, rank: "Novice Hunter", xp: 965, isYou: true },
    { name: "Antoni4x4", level: 1, rank: "Novice Hunter", xp: 90 },
    { name: "حسین", level: 1, rank: "Novice Hunter", xp: 0 },
    { name: "Mr.", level: 1, rank: "Novice Hunter", xp: 0 },
    { name: "Rachit", level: 1, rank: "Novice Hunter", xp: 0 },
    { name: "Nimit", level: 1, rank: "Novice Hunter", xp: 0 },
  ],
  "This Month": [
    { name: "Relentless", level: 9, rank: "Novice Hunter", xp: 4820, streak: 14 },
    { name: "Being Specter", level: 7, rank: "Novice Hunter", xp: 3150, isYou: true, streak: 5 },
    { name: "Antoni4x4", level: 1, rank: "Novice Hunter", xp: 340 },
    { name: "حسین", level: 1, rank: "Novice Hunter", xp: 10 },
    { name: "Mr.", level: 1, rank: "Novice Hunter", xp: 0 },
    { name: "Rachit", level: 1, rank: "Novice Hunter", xp: 0 },
    { name: "Nimit", level: 1, rank: "Novice Hunter", xp: 0 },
  ],
  "All Time": [
    { name: "Relentless", level: 9, rank: "Novice Hunter", xp: 12400, streak: 14 },
    { name: "Being Specter", level: 7, rank: "Novice Hunter", xp: 8650, isYou: true, streak: 5 },
    { name: "Antoni4x4", level: 1, rank: "Novice Hunter", xp: 1200 },
    { name: "حسین", level: 1, rank: "Novice Hunter", xp: 90 },
    { name: "Mr.", level: 1, rank: "Novice Hunter", xp: 50 },
    { name: "Rachit", level: 1, rank: "Novice Hunter", xp: 30 },
    { name: "Nimit", level: 1, rank: "Novice Hunter", xp: 10 },
  ],
};

const trophyColors: Record<number, string> = {
  0: "text-yellow-400",
  1: "text-primary",
  2: "text-amber-600",
};

const Leaderboard = () => {
  const [filter, setFilter] = useState<TimeFilter>("This Week");
  const players = allData[filter];

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
      <div className="w-full px-4 md:px-8 xl:px-16 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-primary" />
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow">
              Leaderboard
            </h1>
            <p className="font-display text-sm tracking-wider text-muted-foreground">
              Top hunters ranked by total XP
            </p>
          </div>
        </div>

        {/* Time filter tabs */}
        <div className="flex gap-2 mt-6 mb-8">
          {timeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-md font-display text-xs tracking-wider uppercase transition-all duration-300 ${
                filter === t
                  ? "bg-primary/20 text-primary neon-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Player list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            {players.map((p, i) => {
              const isTop3 = i < 3;
              return (
                <div
                  key={p.name}
                  className={`glass-panel rounded-lg px-5 py-4 flex items-center gap-4 transition-all duration-300 ${
                    p.isYou ? "border border-primary/40" : "border border-border/20"
                  }`}
                >
                  {/* Rank */}
                  <div className="w-8 flex-shrink-0 flex items-center justify-center">
                    {isTop3 ? (
                      <Trophy className={`w-5 h-5 ${trophyColors[i]}`} />
                    ) : (
                      <span className="font-display text-sm text-muted-foreground">
                        #{i + 1}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-accent/20 neon-border-blue flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-display text-sm font-bold">
                      {p.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Name & info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-semibold text-foreground truncate">
                        {p.name}
                      </span>
                      {p.isYou && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-display tracking-wider bg-primary/20 text-primary border border-primary/30">
                          You
                        </span>
                      )}
                    </div>
                    <span className="font-display text-xs text-muted-foreground">
                      Level {p.level} • {p.rank}
                    </span>
                  </div>

                  {/* XP & streak */}
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="font-display text-sm font-bold text-accent flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      {p.xp.toLocaleString()}
                    </span>
                    {p.streak && (
                      <span className="font-display text-[10px] text-orange-400 flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {p.streak} day streak
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pro Tip */}
        <div className="glass-panel rounded-lg border border-border/20 p-5 mt-8 flex items-start gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <h3 className="font-display text-sm font-bold text-primary mb-1">Pro Tip</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Compete in different time periods to see where you rank. Maintain streaks and complete quests daily to climb the leaderboard!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
