import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/react";
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


export const activeQuests = [
  {
    title: "read nextjs docs",
    rank: "easy-Rank",
    xp: 25,
    color: "border-accent",
  },
  {
    title: "study postgres SQL",
    rank: "medium-Rank",
    xp: 50,
    color: "border-primary",
  },
  {
    title: "do Research",
    subtitle: "research for pactumAI",
    rank: "medium-Rank",
    xp: 50,
    color: "border-primary",
  },
];

export const dailyTraining = [
  { title: "Project Work", xp: 10, icon: Flame },
  { title: "DSA Practice", xp: 10, icon: Code },
  { title: "Apply for Roles", xp: 10, icon: Briefcase },
  { title: "Study Backend", xp: 10, icon: Database },
  { title: "NF", xp: 10, icon: Shield },
];

export const quickActions = [
  { label: "Quest Board", icon: Target },
  { label: "Daily Training", icon: CalendarCheck },
  { label: "Rankings", icon: Trophy },
  { label: "Analytics", icon: BarChart3 },
];
