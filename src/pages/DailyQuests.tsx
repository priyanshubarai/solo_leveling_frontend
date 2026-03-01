import { useState, useMemo } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Plus, ChevronLeft, ChevronRight, CalendarDays, Zap, ChevronDown, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface DailyQuest {
  id: string;
  title: string;
  emoji: string;
  completedDays: Set<number>;
}

const initialQuests: DailyQuest[] = [
  { id: "1", title: "Project Work", emoji: "💪", completedDays: new Set([1, 3, 4, 5, 6, 7, 8, 9, 10, 11]) },
  { id: "2", title: "DSA Practice", emoji: "📘", completedDays: new Set([1, 2, 3, 4, 5, 6, 7, 9, 10, 11]) },
  { id: "3", title: "Apply for Roles", emoji: "📮", completedDays: new Set([1, 3, 10]) },
  { id: "4", title: "Study Backend", emoji: "🔮", completedDays: new Set([1, 3, 5, 7, 10]) },
  { id: "5", title: "NF", emoji: "💪", completedDays: new Set([1, 2, 3, 4, 6, 8, 9, 10, 11]) },
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DailyQuests = () => {
  const [quests, setQuests] = useState<DailyQuest[]>(initialQuests);
  const [currentMonth, setCurrentMonth] = useState(1); // Feb (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("productivity");
  const [newIcon, setNewIcon] = useState("⚡");
  const [noticeOpen, setNoticeOpen] = useState(false);

  const categoryOptions = [
    { value: "fitness", label: "💪 Fitness → +STR", emoji: "💪", stat: "STR" },
    { value: "learning", label: "📚 Learning → +INT", emoji: "📚", stat: "INT" },
    { value: "productivity", label: "⚡ Productivity → +AGI", emoji: "⚡", stat: "AGI" },
    { value: "health", label: "❤️ Health → +VIT", emoji: "❤️", stat: "VIT" },
    { value: "social", label: "👥 Social → +SEN", emoji: "👥", stat: "SEN" },
    { value: "creativity", label: "🎨 Creativity → +INT", emoji: "🎨", stat: "INT" },
  ];

  const iconOptions = ["🏃", "💧", "📊", "✌️", "🧘", "📈", "🤖", "☁️", "🐙", "🎯", "📦", "🚀", "🎮", "🧠", "🎵"];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  const currentDay = isCurrentMonth ? today.getDate() : -1;

  const handleToggleDay = (questId: string, day: number) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id !== questId) return q;
        const updated = new Set(q.completedDays);
        if (updated.has(day)) updated.delete(day);
        else updated.add(day);
        return { ...q, completedDays: updated };
      })
    );
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  // Overall completion
  const totalPossible = quests.length * daysInMonth;
  const totalDone = quests.reduce((sum, q) => sum + q.completedDays.size, 0);
  const completionPct = totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;

  // Daily progress chart data
  const chartData = useMemo(() => {
    return dayNumbers.map((day) => {
      const done = quests.filter((q) => q.completedDays.has(day)).length;
      const pct = quests.length > 0 ? Math.round((done / quests.length) * 100) : 0;
      return { name: `${monthNames[currentMonth].slice(0, 3)} ${day}`, pct };
    });
  }, [quests, dayNumbers, currentMonth]);

  const selectedCategory = categoryOptions.find(c => c.value === newCategory)!;

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const newQuest: DailyQuest = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      emoji: newIcon || "⚡",
      completedDays: new Set(),
    };
    setQuests((prev) => [...prev, newQuest]);
    setNewTitle("");
    setNewCategory("productivity");
    setNewIcon("⚡");
    setCreateOpen(false);
  };

  // Donut chart SVG
  const donutRadius = 60;
  const donutStroke = 12;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const donutOffset = donutCircumference - (completionPct / 100) * donutCircumference;

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-primary text-glow">
              Daily Quests{" "}
              <span className="text-muted-foreground text-base font-body normal-case tracking-normal">[Penalty: None]</span>
            </h1>
            <p className="text-muted-foreground font-body text-sm mt-1">
              Complete your daily training like Jin-Woo's system quests
            </p>
          </div>
          <Button
            onClick={() => setCreateOpen(true)}
            className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-xs"
          >
            <Plus className="w-4 h-4" />
            New Daily Quest
          </Button>
        </div>

        {/* Month Navigator */}
        <div className="glass-panel p-4 mb-6 flex items-center justify-between">
          <button onClick={prevMonth} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <CalendarDays className="w-5 h-5 text-accent" />
            {monthNames[currentMonth]} {currentYear}
          </div>
          <button onClick={nextMonth} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Quests Tracker Grid */}
        <div className="glass-panel p-5 mb-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">My Daily Quests</h2>
            <span className="text-muted-foreground text-xs font-body">Drag to reorder • Click pencil to edit</span>
          </div>

          <div className="min-w-[700px]">
            {/* Header row */}
            <div className="grid gap-0" style={{ gridTemplateColumns: `200px repeat(${daysInMonth}, 32px) 60px` }}>
              <div className="text-xs font-display text-accent uppercase tracking-wider py-2 px-2">Daily Quest</div>
              {dayNumbers.map((d) => (
                <div
                  key={d}
                  className={`text-xs font-display text-center py-2 ${
                    d === currentDay ? "text-accent font-bold" : "text-muted-foreground"
                  }`}
                >
                  {d}
                </div>
              ))}
              <div className="text-xs font-display text-accent uppercase tracking-wider text-right py-2 pr-2">Progress</div>
            </div>

            {/* Quest rows */}
            {quests.map((quest) => (
              <div
                key={quest.id}
                className="grid gap-0 border-t border-border/20 hover:bg-secondary/20 transition-colors"
                style={{ gridTemplateColumns: `200px repeat(${daysInMonth}, 32px) 60px` }}
              >
                <div className="flex items-center gap-2 py-2.5 px-2">
                  <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                  <span className="text-sm">{quest.emoji}</span>
                  <span className="font-body text-sm text-foreground truncate">{quest.title}</span>
                </div>
                {dayNumbers.map((day) => {
                  const checked = quest.completedDays.has(day);
                  return (
                    <div key={day} className="flex items-center justify-center py-2.5">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => handleToggleDay(quest.id, day)}
                        className={`h-5 w-5 rounded-sm border-border/50 transition-all ${
                          checked
                            ? "bg-accent border-accent/60 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                            : "bg-secondary/40"
                        }`}
                      />
                    </div>
                  );
                })}
                <div className="flex items-center justify-end py-2.5 pr-2">
                  <span className="font-display text-sm font-bold text-foreground">{quest.completedDays.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row: Overall Completion + Daily Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Overall Completion Donut */}
          <div className="glass-panel p-6 flex flex-col items-center">
            <h3 className="font-display text-lg font-bold text-foreground mb-6 self-start">Overall Completion</h3>
            <svg width="160" height="160" className="mb-4">
              <circle
                cx="80" cy="80" r={donutRadius}
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth={donutStroke}
              />
              <circle
                cx="80" cy="80" r={donutRadius}
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth={donutStroke}
                strokeDasharray={donutCircumference}
                strokeDashoffset={donutOffset}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
                className="transition-all duration-700"
              />
              <text x="80" y="75" textAnchor="middle" className="fill-foreground font-display text-3xl font-bold" fontSize="28">
                {completionPct}%
              </text>
              <text x="80" y="95" textAnchor="middle" className="fill-muted-foreground font-body" fontSize="12">
                Completion
              </text>
            </svg>
            <div className="flex items-center gap-6 text-xs font-body text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Done
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Remaining
              </span>
            </div>
          </div>

          {/* Daily Progress Line Chart */}
          <div className="glass-panel p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "hsl(220 10% 55%)" }}
                  axisLine={false}
                  tickLine={false}
                  interval={Math.floor(daysInMonth / 7)}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(220 10% 55%)" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(240 10% 8%)",
                    border: "1px solid hsl(270 40% 25%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "hsl(220 20% 90%)" }}
                  formatter={(value: number) => [`${value}%`, "Completion"]}
                />
                <Line
                  type="monotone"
                  dataKey="pct"
                  stroke="hsl(200 100% 55%)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "hsl(200 100% 55%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Notice */}
        <div className="glass-panel p-5">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h4 className="font-display text-sm font-bold text-primary">System Notice</h4>
              <p className="text-muted-foreground text-sm font-body mt-1">
                Daily Quests work like Jin-Woo's training system! Each completion gives you +10 XP and +1 stat point based on the quest category. Unlike regular quests, Daily Quests don't affect your streak but provide consistent growth.
              </p>
              <button
                onClick={() => setNoticeOpen(!noticeOpen)}
                className="flex items-center gap-1 text-accent text-xs font-body mt-2 hover:underline"
              >
                Learn more about Daily Quests
                <ChevronDown className={`w-3 h-3 transition-transform ${noticeOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {noticeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground text-xs font-body mt-3 leading-relaxed">
                      Daily Quests reset each day and help you build consistent habits. Check off each quest for the current day to earn XP. Track your monthly progress with the grid above and watch your completion rate improve over time. The more consistent you are, the faster you level up!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Create Daily Quest Dialog */}
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="glass-panel border-border/50 bg-background/95 backdrop-blur-xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-bold text-foreground">Create New Daily Quest</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 mt-2">
              {/* Quest Name */}
              <div className="space-y-2">
                <label className="text-sm font-body text-muted-foreground">Quest Name</label>
                <Input
                  placeholder="e.g., Morning Training"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-secondary/60 border-border/40 font-body placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-body text-muted-foreground">Category (affects stat gain)</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-border/40 bg-secondary/60 px-3 py-2 text-sm font-body text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-background text-foreground">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Icon Picker Grid */}
              <div className="space-y-2">
                <label className="text-sm font-body text-muted-foreground">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewIcon(icon)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${
                        newIcon === icon
                          ? "bg-accent/30 border-2 border-accent ring-1 ring-accent/50 scale-110"
                          : "bg-secondary/40 border border-border/30 hover:bg-secondary/60 hover:border-border/60"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stat Reward Banner */}
              <div className="flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/30 px-4 py-3">
                <Zap className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm font-body text-accent">
                  Each completion: +10 XP, +1 {selectedCategory.stat}
                </span>
              </div>

              <Button
                onClick={handleCreate}
                disabled={!newTitle.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-sm"
              >
                Create Daily Quest
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default DailyQuests;
