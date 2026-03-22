import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Swords } from "lucide-react";
import { difficultyConfig } from "./types";

const QuestCard = ({ quest, onComplete }) => (
  <div className="glass-panel p-5 flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors duration-300 group">
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-md bg-primary/20 neon-border flex items-center justify-center shrink-0">
          <Swords className="w-5 h-5 text-primary" />
        </div>
        <Badge
          variant="outline"
          className={`text-[10px] uppercase font-display tracking-wider ${difficultyConfig[quest.difficulty]?.className ?? "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}
        >
          {quest.difficulty}
        </Badge>
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">{quest.questtitle}</h3>
      {quest.questdesc && <p className="text-muted-foreground text-xs font-body mt-1">{quest.questdesc}</p>}
      <div className="flex items-center gap-2 mt-3">
        <Badge
          variant="outline"
          className="text-[10px] bg-accent/15 text-accent border-accent/30 font-display tracking-wider"
        >
          ◆ +25 XP
        </Badge>
        <span className="text-xs text-muted-foreground font-display tracking-wider">{quest.statBoost}</span>
      </div>
    </div>

    {!quest.completed ? (
      <Button
        size="sm"
        onClick={() => onComplete(quest.questid)}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-xs gap-1.5"
      >
        <Check className="w-3.5 h-3.5" />
        Complete
      </Button>
    ) : (
      <Badge className="bg-accent/20 text-accent border-accent/30 font-display uppercase tracking-wider text-xs w-fit">
        Completed
      </Badge>
    )}
  </div>
);

export default QuestCard;
