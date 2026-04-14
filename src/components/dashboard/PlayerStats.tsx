import { motion } from "framer-motion";
import { fadeUp } from "./dashboardAnimations";
import {
  Swords,
  Zap,
  Brain,
  Heart,
  Eye,
  Target,
  CalendarCheck,
  Trophy,
  BarChart3,
  Flame,
  Code,
  Briefcase,
  Database,
  Shield,
} from "lucide-react";
import { useUser } from "@clerk/react";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const PlayerCard = ({ userinfo }) => {

  if (!userinfo) return <div>Loading....!!!</div>

  return (
    <div className="glass-panel neon-border p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
          <span className="font-display text-lg font-bold text-foreground">
            {userinfo?.level || 1}
          </span>
        </div>
        <div>
          <div className="font-display text-base font-bold text-foreground tracking-wider">
            {userinfo?.username || "User"}
          </div>
          <div className="font-display text-xs text-muted-foreground tracking-wider">
            • {userinfo?.level || 1}-Rank
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between font-display text-xs tracking-wider">
          <span className="text-muted-foreground">Experience</span>
          <span className="text-foreground">{userinfo?.XP || 0} / 700</span>
        </div>
        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-accent neon-glow-blue"
            style={{ width: `${((userinfo?.XP || 0) / 700) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex gap-8">
        <div>
          <div className="font-display text-2xl font-bold text-accent text-glow-blue">
            {userinfo.XP}
          </div>
          <div className="font-display text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
            Total XP
          </div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold text-primary text-glow">
            0
          </div>
          <div className="font-display text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
            Day Streak
          </div>
        </div>
      </div>
    </div>
  );
};

const HunterStats = () => {
  const { user } = useUser();

  const res = useQuery({
    queryKey: ["statPoints", user?.id],
    queryFn: async () => {
      const res = await api.get(`/users/me/stats`);
      return res.data;
    },
    enabled: !!user?.id,
  });

  const statRes = res.data?.data?.[0];
  const stats = [
    { label: "FITNESS", value: statRes?.fitness ?? 20, icon: Swords },
    { label: "PRODUCTIVITY", value: statRes?.agility ?? 50, icon: Zap },
    { label: "INTELLIGENCE", value: statRes?.intelligence ?? 21, icon: Brain },
    { label: "HEALTH", value: statRes?.health ?? 14, icon: Heart },
    { label: "SOCIAL", value: statRes?.social ?? 16, icon: Eye },
    { label: "CREATIVITY", value: statRes?.creativity ?? 16, icon: Eye },
  ];

  if (res.isLoading) {
    return <div>Loading stats...</div>;
  }

  if (res.isError) {
    return <div>Error loading stats</div>;
  }

  return (
    <div className="glass-panel neon-border p-5">
      <div className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">
        Hunter Stats
      </div>
      <div className="grid grid-cols-5 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-accent" />
            </div>
            <div className="font-display text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
              {stat.label}
            </div>
            <div className="font-display text-xl font-bold text-foreground">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlayerStats = ({ userinfo }) => (
  <motion.div
    custom={1}
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    className="grid grid-cols-1 lg:grid-cols-2 gap-4"
  >
    <PlayerCard userinfo={userinfo} />
    <HunterStats />
  </motion.div>
);

export default PlayerStats;
