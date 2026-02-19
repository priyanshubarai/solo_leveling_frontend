import { motion } from "framer-motion";
import DashboardNavbar from "@/components/DashboardNavbar";
import {
  Sparkles,
  Swords,
  Zap,
  Brain,
  Heart,
  Eye,
  ArrowRight,
  Target,
  CalendarCheck,
  Trophy,
  BarChart3,
  MessageCircle,
  Lightbulb,
  ChevronDown,
  RefreshCw,
  Flame,
  BookOpen,
  Code,
  Briefcase,
  Database,
  Shield,
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const stats = [
  { label: "STRENGTH", value: 20, icon: Swords },
  { label: "AGILITY", value: 50, icon: Zap },
  { label: "INTELLIGENCE", value: 21, icon: Brain },
  { label: "VITALITY", value: 14, icon: Heart },
  { label: "SENSE", value: 16, icon: Eye },
];

const activeQuests = [
  { title: "read nextjs docs", rank: "easy-Rank", xp: 25, color: "border-accent" },
  { title: "study postgres SQL", rank: "medium-Rank", xp: 50, color: "border-primary" },
  { title: "do Research", subtitle: "research for pactumAI", rank: "medium-Rank", xp: 50, color: "border-primary" },
];

const dailyTraining = [
  { title: "Project Work", xp: 10, icon: Flame },
  { title: "DSA Practice", xp: 10, icon: Code },
  { title: "Apply for Roles", xp: 10, icon: Briefcase },
  { title: "Study Backend", xp: 10, icon: Database },
  { title: "NF", xp: 10, icon: Shield },
];

const quickActions = [
  { label: "Quest Board", icon: Target },
  { label: "Daily Training", icon: CalendarCheck },
  { label: "Rankings", icon: Trophy },
  { label: "Analytics", icon: BarChart3 },
];

const Dashboard = () => {
  const [tipsOpen, setTipsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-8 space-y-6">
        {/* Welcome Header */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <div className="inline-flex items-center gap-2 glass-panel neon-border px-3 py-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="font-display text-xs tracking-[0.15em] text-accent uppercase">Hunter Dashboard</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-accent text-glow-blue mb-1">
            Welcome Back, Being Specter
          </h1>
          <p className="text-muted-foreground font-body text-sm">Continue your journey to greatness</p>
        </motion.div>

        {/* Player Card + Hunter Stats */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Player Card */}
          <div className="glass-panel neon-border p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                <span className="font-display text-lg font-bold text-foreground">E</span>
              </div>
              <div>
                <div className="font-display text-base font-bold text-foreground tracking-wider">Being Specter</div>
                <div className="font-display text-xs text-muted-foreground tracking-wider">Level 7 • E-Rank</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-display text-xs tracking-wider">
                <span className="text-muted-foreground">Experience</span>
                <span className="text-foreground">92 / 700</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-accent neon-glow-blue" style={{ width: "13%" }} />
              </div>
            </div>

            <div className="flex gap-8">
              <div>
                <div className="font-display text-2xl font-bold text-accent text-glow-blue">965</div>
                <div className="font-display text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Total XP</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-primary text-glow">0</div>
                <div className="font-display text-[10px] tracking-[0.15em] text-muted-foreground uppercase">Day Streak</div>
              </div>
            </div>
          </div>

          {/* Hunter Stats */}
          <div className="glass-panel neon-border p-5">
            <div className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">Hunter Stats</div>
            <div className="grid grid-cols-5 gap-2">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="font-display text-[10px] tracking-[0.15em] text-muted-foreground uppercase">{stat.label}</div>
                  <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stat Points Banner */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div className="glass-panel neon-border-blue p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-foreground tracking-wider">Stat Points Available</div>
                <div className="font-display text-xs text-accent tracking-wider">6 points ready to allocate</div>
              </div>
            </div>
            <button className="btn-primary-glow text-xs py-2 px-5 flex items-center gap-1.5 !bg-accent">
              <ArrowRight className="w-3.5 h-3.5" />
              Allocate
            </button>
          </div>
        </motion.div>

        {/* Active Quests + Daily Training */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Active Quests */}
          <div className="glass-panel neon-border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span className="font-display text-sm font-bold tracking-wider text-foreground uppercase">Active Quests</span>
              </div>
              <span className="font-display text-xs text-muted-foreground tracking-wider">3 active</span>
            </div>

            <div className="space-y-3">
              {activeQuests.map((quest) => (
                <div key={quest.title} className={`border-l-2 ${quest.color} pl-4 py-2 flex items-center justify-between bg-secondary/30 rounded-r-md pr-3`}>
                  <div>
                    <div className="font-display text-sm font-bold text-foreground tracking-wider">{quest.title}</div>
                    {quest.subtitle && <div className="text-xs text-muted-foreground font-body">{quest.subtitle}</div>}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-display text-[10px] tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">{quest.rank}</span>
                      <span className="font-display text-[10px] tracking-wider text-accent">+{quest.xp} XP</span>
                    </div>
                  </div>
                  <RefreshCw className="w-4 h-4 text-accent shrink-0" />
                </div>
              ))}
            </div>

            <button className="w-full text-center font-display text-xs tracking-wider text-muted-foreground hover:text-accent transition-colors flex items-center justify-center gap-1">
              <ArrowRight className="w-3 h-3" /> View All Quests
            </button>
          </div>

          {/* Daily Training */}
          <div className="glass-panel neon-border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-accent" />
                <span className="font-display text-sm font-bold tracking-wider text-foreground uppercase">Daily Training</span>
              </div>
              <span className="font-display text-xs text-muted-foreground tracking-wider">5 quests</span>
            </div>

            <div className="glass-panel neon-border-blue px-3 py-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="font-display text-xs tracking-wider text-accent">Penalty: None</span>
            </div>

            <div className="space-y-2">
              {dailyTraining.map((item) => (
                <div key={item.title} className="flex items-center gap-3 bg-secondary/30 rounded-md px-3 py-2.5">
                  <div className="w-8 h-8 rounded-md bg-secondary/80 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-foreground tracking-wider">{item.title}</div>
                    <div className="font-display text-[10px] tracking-wider text-accent">+{item.xp} XP</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full text-center font-display text-xs tracking-wider text-muted-foreground hover:text-accent transition-colors flex items-center justify-center gap-1">
              <ArrowRight className="w-3 h-3" /> View All Daily Quests
            </button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button key={action.label} className="glass-panel neon-border p-5 flex flex-col items-center gap-3 hover:bg-secondary/50 transition-all duration-300 group">
              <action.icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
              <span className="font-display text-xs tracking-wider text-foreground uppercase">{action.label}</span>
            </button>
          ))}
        </motion.div>

        {/* System Message */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
          <div className="glass-panel neon-border p-4 space-y-1.5">
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-body text-sm text-foreground">
                  <span className="text-accent font-semibold">System Message:</span> You're making great progress! Keep completing quests to reach higher ranks and unlock powerful titles.
                </p>
                <p className="font-body text-sm text-primary flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Tip: Spend your 6 stat points to boost your hunter abilities!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Pro Tips */}
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
          <button
            onClick={() => setTipsOpen(!tipsOpen)}
            className="w-full glass-panel neon-border p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-display text-sm font-bold text-foreground tracking-wider">Dashboard Pro Tips</div>
                <div className="font-body text-xs text-muted-foreground">Get the most out of your hunter dashboard</div>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${tipsOpen ? "rotate-180" : ""}`} />
          </button>
          {tipsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="glass-panel border border-border/30 border-t-0 rounded-t-none p-4 space-y-2"
            >
              <p className="font-body text-sm text-muted-foreground">• Complete daily quests for consistent XP gains</p>
              <p className="font-body text-sm text-muted-foreground">• Allocate stat points to match your growth path</p>
              <p className="font-body text-sm text-muted-foreground">• Maintain day streaks for bonus XP multipliers</p>
              <p className="font-body text-sm text-muted-foreground">• Check the leaderboard to track your ranking</p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
