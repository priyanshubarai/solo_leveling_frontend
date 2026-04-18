export const difficultyConfig = {
  easy: {
    label: "Easy",
    className: "bg-accent/20 text-accent border-accent/30",
    xp: 25,
  },
  moderate: {
    label: "Moderate",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    xp: 50,
  },
  hard: {
    label: "Hard",
    className: "bg-destructive/20 text-destructive border-destructive/30",
    xp: 100,
  },
  legendary: {
    label: "Legendary",
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    xp: 200,
  },
} as const;

export const categoryConfig = {
  productivity: { label: "Productivity", icon: "Zap", statBoost: "AGI" },
  learning: { label: "Learning", icon: "Brain", statBoost: "INT" },
  fitness: { label: "Fitness", icon: "Dumbbell", statBoost: "STR" },
  health: { label: "Health", icon: "Heart", statBoost: "VIT" },
  social: { label: "Social", icon: "Users", statBoost: "SEN" },
} as const;

export const preferenceMap: Record<"Easy" | "Moderate" | "Hard" | "Legendary", string> = {
  Easy: "+25 XP",
  Moderate: "+50 XP",
  Hard: "+100 XP",
  Legendary: "+200 XP",
};
