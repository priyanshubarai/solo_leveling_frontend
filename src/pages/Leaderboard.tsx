import { Trophy, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { authClient } from "@/lib/auth-client";

interface leaderboardDataType {
  userId: string;
  username: string;
  level: string;
  XP: number;
}

const trophyColors: Record<number, string> = {
  0: "text-yellow-400",
  1: "text-primary",
  2: "text-amber-600",
};

const Leaderboard = () => {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const userId = session?.user?.id;

  const result = useQuery({
    queryKey: ["leaderboardData", userId],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data.data;
    },
    enabled: !!userId,
  });

  const data: leaderboardDataType[] = Array.isArray(result.data) ? result.data : [];

  if (isSessionPending) return <div>Loading...</div>;
  if (!session) return <Navigate to="/" replace />;

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

        {/* Player list */}
        <AnimatePresence mode="wait">
          <motion.div
            key="leaderboard-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
          {result.isSuccess ? (
            data.map((p, i) => {
              const isTop3 = i < 3;
              const isYou = p.userId === userId;
              return (
                <div
                  key={p.userId || p.username}
                  className={`glass-panel rounded-lg px-5 py-4 flex items-center gap-4 transition-all duration-300 ${
                    isYou ? "border border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.2)]" : "border border-border/20"
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
                      {(p.username || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Name & info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-semibold text-foreground truncate">
                        {p.username || "Anonymous"}
                      </span>
                      {isYou && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-display tracking-wider bg-primary/20 text-primary border border-primary/30">
                          You
                        </span>
                      )}
                    </div>
                    <span className="font-display text-xs text-muted-foreground">
                      • Level {p.level || "0"}
                    </span>
                  </div>

                  {/* XP & streak */}
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="font-display text-sm font-bold text-accent flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      {(p.XP || 0).toString()}
                    </span>
                  </div>
                </div>
              );
            })
          ) : result.isLoading ? (
            <div className="flex justify-center py-12">
               <span className="font-display text-sm tracking-widest text-muted-foreground animate-pulse">SYNCHRONIZING LEADERBOARD...</span>
            </div>
          ) : (
            <div className="flex justify-center py-12 text-destructive font-display text-sm tracking-widest">
               COMMUNICATION ERROR
            </div>
          )}
          </motion.div>
        </AnimatePresence>

        {/* Pro Tip */}
        <div className="glass-panel rounded-lg border border-border/20 p-5 mt-8 flex items-start gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <h3 className="font-display text-sm font-bold text-primary mb-1">
              Pro Tip
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Maintain streaks and complete quests daily to climb the leaderboard!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
