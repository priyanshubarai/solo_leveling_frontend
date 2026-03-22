import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface QuestFiltersProps {
  activeTab: "active" | "completed";
  setActiveTab: (value: "active" | "completed") => void;
  difficultyFilter: string;
  setDifficultyFilter: (value: string) => void;
  matchPreference: boolean;
  setMatchPreference: (val: boolean) => void;
  preference: "Easy" | "Moderate" | "Hard" | "Legendary";
  preferenceLabel: string;
  activeCount: number;
  completedCount: number;
}

const QuestFilters = ({
  activeTab,
  setActiveTab,
  difficultyFilter,
  setDifficultyFilter,
  matchPreference,
  setMatchPreference,
  preference,
  preferenceLabel,
  activeCount,
  completedCount,
}: QuestFiltersProps) => (
  <>
    <div className="glass-panel p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <p className="text-sm font-body">
        <span className="text-accent font-semibold">Your Preference:</span>{" "}
        <span className="text-foreground capitalize">{preference} ({preferenceLabel})</span>
      </p>
      <div className="flex items-center gap-4">
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-[160px] bg-secondary/60 border-border/40 font-body text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={matchPreference}
            onChange={(e) => setMatchPreference(e.target.checked)}
            className="accent-accent"
          />
          Match preference
        </label>
      </div>
    </div>

    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setActiveTab("active")}
        className={`px-3 py-1 rounded-md ${
          activeTab === "active"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
        }`}
      >
        Active ({activeCount})
      </button>
      <button
        onClick={() => setActiveTab("completed")}
        className={`px-3 py-1 rounded-md ${
          activeTab === "completed"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
        }`}
      >
        Completed ({completedCount})
      </button>
    </div>
  </>
);

export default QuestFilters;
