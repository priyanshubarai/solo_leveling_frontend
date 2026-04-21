import DashboardNavbar from "@/components/DashboardNavbar";
import { motion } from "framer-motion";
import { Trophy, Lock, Star, Target, Swords, Zap, Shield, Crown, Flame, Award, TrendingUp, Gem } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useMemo } from "react";
import { authClient } from "@/lib/auth-client";

interface Badge {
  badgeid: number,
  badgename: string,
  eligibility: string,
  value: number
}

interface Achievement {
  badgeid: number,
  userId: string,
  created_at: string | null,
  updated_at: string | null,
  deleted_at: string | null,
}

const icons = [
  { icon: <Target className="w-6 h-6" /> },
  { icon: <Swords className="w-6 h-6" /> },
  { icon: <Swords className="w-6 h-6" /> },
  { icon: <Crown className="w-6 h-6" /> },
  { icon: <Flame className="w-6 h-6" /> },
  { icon: <Flame className="w-6 h-6" /> },
  { icon: <Zap className="w-6 h-6" /> },
  { icon: <TrendingUp className="w-6 h-6" /> },
  { icon: <Award className="w-6 h-6" /> },
  { icon: <Shield className="w-6 h-6" /> },
  { icon: <Gem className="w-6 h-6" /> },
  { icon: <Gem className="w-6 h-6" /> },
  { icon: <Gem className="w-6 h-6" /> },
  { icon: <Gem className="w-6 h-6" /> },
  { icon: <Crown className="w-6 h-6" /> },
];

const Achievements = () => {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const userId = session?.user?.id;

  const [badgeQuery, achievementQuery] = useQueries({
    queries: [
      {
        queryKey: ["badges"],
        queryFn: async () => {
          const res = await api.get("/badges");
          return res.data;
        },
        enabled: !!userId,
      },
      {
        queryKey: ["achievements", userId],
        queryFn: async () => {
          const res = await api.get("/users/me/achievements");
          return res.data;
        },
        enabled: !!userId,
      },
    ],
  });

  const badgesData = badgeQuery.data?.data;
  const badges: Badge[] = useMemo(() => Array.isArray(badgesData) ? badgesData : [], [badgesData]);

  const achievementsData = achievementQuery.data?.data;
  const achievements: Achievement[] = useMemo(() => Array.isArray(achievementsData) ? achievementsData : [], [achievementsData]);

  if (isSessionPending) return <div>Loading...</div>;
  if (!session) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      {badgeQuery.isLoading || achievementQuery.isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="font-display text-sm tracking-widest text-muted-foreground animate-pulse">SYNCHRONIZING ACHIEVEMENTS...</span>
        </div>
      ) : badgeQuery.isError || achievementQuery.isError ? (
        <div className="flex items-center justify-center min-h-[60vh] text-destructive font-display text-sm tracking-widest">
          SYSTEM ERROR: DATA STREAM INTERRUPTED
        </div>
      ) : (
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
                {achievements.length} / {badges.length}
              </span>
            </div>
          </div>

          {/* Achievement Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((ach, i) => {
              const isUnlocked = achievements.some(item => item.badgeid === ach.badgeid);
              return (
              <motion.div
                key={ach.badgeid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`relative rounded-lg border p-4 flex items-center gap-4 transition-all duration-300 ${isUnlocked
                  ? "glass-panel neon-border bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                  : "border-border/30 bg-secondary/20 opacity-60"
                  }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isUnlocked
                    ? "bg-accent/20 text-accent"
                    : "bg-muted/30 text-muted-foreground"
                    }`}
                >
                  {icons[i % icons.length].icon}
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-display text-sm font-bold tracking-wider truncate ${isUnlocked ? "text-foreground" : "text-muted-foreground"
                      }`}>
                      {ach.badgename}
                    </span>
                    {isUnlocked ? (
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    )}
                  </div>
                  <p className="font-body text-xs text-muted-foreground truncate">
                    {ach.eligibility}
                  </p>
                </div>

                {/* Unlocked glow accent */}
                {isUnlocked && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 pointer-events-none" />
                )}
              </motion.div>
            )})}
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
      )}
    </div>
  );
};

export default Achievements;
