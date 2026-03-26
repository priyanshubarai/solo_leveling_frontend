export interface DailyQuest {
  habitid: string;
  clerkuserid: string;
  habittitle: string;
  category: string;
  emoji: string;
}

export interface DailyQuestCompletion {
  dayid: number;
  clerkuserid: string;
  habitid: string;
  day: number;
  month: number;
  year: number;
  created_at: string;
}



export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const categoryOptions = [
  { value: "fitness", label: "💪 Fitness → +STR", emoji: "💪", stat: "STR" },
  { value: "learning", label: "📚 Learning → +INT", emoji: "📚", stat: "INT" },
  { value: "productivity", label: "⚡ Productivity → +AGI", emoji: "⚡", stat: "AGI" },
  { value: "health", label: "❤️ Health → +VIT", emoji: "❤️", stat: "VIT" },
  { value: "social", label: "👥 Social → +SEN", emoji: "👥", stat: "SEN" },
  { value: "creativity", label: "🎨 Creativity → +INT", emoji: "🎨", stat: "INT" },
];
