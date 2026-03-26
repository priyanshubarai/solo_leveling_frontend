import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DailyQuestsHeaderProps {
  onCreateOpen: () => void;
}

const DailyQuestsHeader = ({ onCreateOpen }: DailyQuestsHeaderProps) => (
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
      onClick={onCreateOpen}
      className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-xs"
    >
      <Plus className="w-4 h-4" />
      New Daily Quest
    </Button>
  </div>
);

export default DailyQuestsHeader;
