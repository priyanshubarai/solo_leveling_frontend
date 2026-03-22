export interface Quest {
  id: string;
  title: string;
  description?: string;
  difficulty: "easy" | "medium" | "hard";
  xp: number;
  statBoost: string;
  completed: boolean;
}

export const initialQuests: Quest[] = [
  {
    id: "1",
    title: "read nextjs docs",
    difficulty: "easy",
    xp: 25,
    statBoost: "+1 INT",
    completed: false,
  },
  {
    id: "2",
    title: "study postgres SQL",
    difficulty: "medium",
    xp: 50,
    statBoost: "+2 INT",
    completed: false,
  },
  {
    id: "3",
    title: "do Research",
    description: "research for pactumAI",
    difficulty: "medium",
    xp: 50,
    statBoost: "+2 AGI",
    completed: false,
  },
  {
    id: "4",
    title: "30 min workout",
    difficulty: "easy",
    xp: 25,
    statBoost: "+1 STR",
    completed: true,
  },
  {
    id: "5",
    title: "build portfolio site",
    difficulty: "hard",
    xp: 100,
    statBoost: "+3 INT",
    completed: true,
  },
];

export const difficultyConfig = {
  easy: {
    label: "easy",
    className: "bg-accent/20 text-accent border-accent/30",
    xp: 25,
  },
  medium: {
    label: "medium",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    xp: 50,
  },
  hard: {
    label: "hard",
    className: "bg-destructive/20 text-destructive border-destructive/30",
    xp: 100,
  },
} as const;

export const categoryConfig = {
  productivity: { label: "Productivity", icon: "Zap", statBoost: "AGI" },
  learning: { label: "Learning", icon: "Brain", statBoost: "INT" },
  fitness: { label: "Fitness", icon: "Dumbbell", statBoost: "STR" },
  health: { label: "Health", icon: "Heart", statBoost: "VIT" },
  social: { label: "Social", icon: "Users", statBoost: "SEN" },
} as const;

export const preferenceMap: Record<"easy" | "medium" | "hard", string> = {
  easy: "+25 XP",
  medium: "+50 XP",
  hard: "+100 XP",
};
