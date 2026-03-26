import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { categoryOptions } from "./types";

interface CreateQuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newTitle: string;
  setNewTitle: (v: string) => void;
  newCategory: string;
  setNewCategory: (v: string) => void;
  onCreate: () => void;
}

const CreateQuestDialog = ({
  open,
  onOpenChange,
  newTitle,
  setNewTitle,
  newCategory,
  setNewCategory,
  onCreate,
}: CreateQuestDialogProps) => {
  const selectedCategory = categoryOptions.find((c) => c.value === newCategory)!;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

          {/* Icon Picker Grid
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
          </div> */}

          {/* Stat Reward Banner */}
          <div className="flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/30 px-4 py-3">
            <Zap className="w-4 h-4 text-accent shrink-0" />
            <span className="text-sm font-body text-accent">
              Each completion: +10 XP, +1 {selectedCategory.stat}
            </span>
          </div>

          <Button
            onClick={onCreate}
            disabled={!newTitle.trim()}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-sm"
          >
            Create Daily Quest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestDialog;
