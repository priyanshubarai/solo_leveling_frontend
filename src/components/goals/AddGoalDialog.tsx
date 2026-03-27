import { useState } from "react";
import { Plus, Zap, Heart, Sparkles, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GoalType } from "@/types/goals";

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: { title: string; description: string; type: GoalType; icon: string }) => void;
  initialType?: GoalType;
}

const AddGoalDialog = ({ open, onOpenChange, onAddGoal, initialType = "weekly" }: AddGoalDialogProps) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newType, setNewType] = useState<GoalType>(initialType);
  const [newIcon, setNewIcon] = useState("zap");

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAddGoal({
      title: newTitle,
      description: newDescription,
      type: newType,
      icon: newIcon,
    });
    setNewTitle("");
    setNewDescription("");
    setNewIcon("zap");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel border-border/30 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl tracking-wider text-primary text-glow">
            Add New Goal
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs font-display tracking-wider">
            Set a goal and let the system guide your path.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <label className="font-display text-xs tracking-wider text-muted-foreground mb-1.5 block">Title</label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter goal title..."
              className="bg-secondary/30 border-border/30 font-display text-sm"
            />
          </div>
          <div>
            <label className="font-display text-xs tracking-wider text-muted-foreground mb-1.5 block">Description (optional)</label>
            <Textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe your goal..."
              className="bg-secondary/30 border-border/30 font-display text-sm min-h-[60px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-display text-xs tracking-wider text-muted-foreground mb-1.5 block">Type</label>
              <Select value={newType} onValueChange={(v) => setNewType(v as GoalType)}>
                <SelectTrigger className="bg-secondary/30 border-border/30 font-display text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-panel border-border/30">
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="font-display text-xs tracking-wider">
            Cancel
          </Button>
          <Button onClick={handleAdd} className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-display text-xs tracking-wider gap-2">
            <Plus className="w-3.5 h-3.5" />
            Add Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;
