import { GripVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DailyQuest, DailyQuestCompletion } from "./types";

interface QuestTrackerGridProps {
  quests: DailyQuest[];
  questsCompletion: Record<number, DailyQuestCompletion[]>;
  dayNumbers: number[];
  daysInMonth: number;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  onToggleDay: (questId: string, day: number) => void;
}

const QuestTrackerGrid = ({
  quests,
  questsCompletion,
  dayNumbers,
  daysInMonth,
  currentDay,
  currentMonth,
  currentYear,
  onToggleDay,
}: QuestTrackerGridProps) => (
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
      {quests.map((quest) => {
        const habitId = Number(quest.habitid);
        const completions = questsCompletion[habitId] || [];
        
        return (
          <div
            key={quest.habitid}
            className="grid gap-0 border-t border-border/20 hover:bg-secondary/20 transition-colors"
            style={{ gridTemplateColumns: `200px repeat(${daysInMonth}, 32px) 60px` }}
          >
            <div className="flex items-center gap-2 py-2.5 px-2">
              <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
              <span className="text-sm">{"⚡"}</span> {/* Default emoji since it's not in DB yet */}
              <span className="font-body text-sm text-foreground truncate">{quest.habittitle}</span>
            </div>
            {dayNumbers.map((day) => {
              const isChecked = completions.some(
                (c) => c.day === day && c.month === currentMonth && c.year === currentYear
              );
              return (
                <div key={day} className="flex items-center justify-center py-2.5">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => onToggleDay(quest.habitid, day)}
                    className={`h-5 w-5 rounded-sm border-border/50 transition-all ${
                      isChecked
                        ? "bg-accent border-accent/60 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                        : "bg-secondary/40"
                    }`}
                  />
                </div>
              );
            })}
            <div className="flex items-center justify-end py-2.5 pr-2">
              <span className="font-display text-sm font-bold text-foreground">{completions.length}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default QuestTrackerGrid;
