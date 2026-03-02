import DashboardNavbar from "@/components/DashboardNavbar";
import { motion } from "framer-motion";
import { Target, TrendingUp, BarChart3, Flame, Zap, BookOpen } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const statCards = [
  { label: "Total Quests", value: "22", icon: Target, accent: "primary" },
  { label: "Completed", value: "19", icon: TrendingUp, accent: "accent" },
  { label: "Completion Rate", value: "86%", icon: BarChart3, accent: "muted-foreground" },
  { label: "Current Streak", value: "0 days", icon: Flame, accent: "destructive" },
];

const xpData = [
  { day: "Feb 1", xp: 40 },
  { day: "Feb 2", xp: 120 },
  { day: "Feb 3", xp: 80 },
  { day: "Feb 4", xp: 200 },
  { day: "Feb 5", xp: 160 },
  { day: "Feb 6", xp: 260 },
  { day: "Feb 7", xp: 300 },
];

const radarData = [
  { category: "Fitness", value: 8 },
  { category: "Learning", value: 6 },
  { category: "Productivity", value: 9 },
  { category: "Health", value: 5 },
  { category: "Social", value: 4 },
  { category: "Creativity", value: 7 },
];

const accentMap: Record<string, string> = {
  primary: "bg-primary/10 border-primary/30",
  accent: "bg-accent/10 border-accent/30",
  "muted-foreground": "bg-secondary/30 border-border/40",
  destructive: "bg-destructive/10 border-destructive/30",
};

const iconColorMap: Record<string, string> = {
  primary: "text-primary",
  accent: "text-accent",
  "muted-foreground": "text-muted-foreground",
  destructive: "text-destructive",
};

const Analytics = () => (
  <div className="min-h-screen bg-background">
    <DashboardNavbar />
    <div className="w-full px-4 md:px-8 xl:px-16 py-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow">Analytics</h1>
        <p className="text-muted-foreground font-display text-sm tracking-wider mt-1">Track your progress and performance</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass-panel neon-border p-5 rounded-xl border ${accentMap[card.accent]} flex items-start justify-between`}
          >
            <div>
              <p className="text-muted-foreground font-display text-xs tracking-wider uppercase">{card.label}</p>
              <p className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1">{card.value}</p>
            </div>
            <card.icon className={`w-5 h-5 ${iconColorMap[card.accent]}`} />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* XP Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel neon-border p-6 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground tracking-wider">XP Over Time</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={xpData}>
                <defs>
                  <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    color: "hsl(var(--foreground))",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="xp" stroke="hsl(var(--primary))" fill="url(#xpGrad)" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quests by Category – Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel neon-border p-6 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-accent" />
            <h2 className="font-display text-lg font-bold text-foreground tracking-wider">Quests by Category</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <PolarAngleAxis dataKey="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.25} strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--accent))" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Pro Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel neon-border p-6 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-display text-sm font-bold text-primary tracking-wider">Pro Tip</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Check your heatmap to spot productivity patterns. Focus on categories where you're weakest to build a balanced stat profile!
            </p>
            <button className="text-primary text-xs font-display tracking-wider mt-2 hover:underline">Learn more about this page ↓</button>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Analytics;
