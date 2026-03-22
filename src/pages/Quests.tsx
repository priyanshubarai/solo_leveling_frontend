import { useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

import QuestFilters from "@/components/quests/QuestFilters";
import QuestList from "@/components/quests/QuestList";
import { Quest, initialQuests, difficultyConfig, categoryConfig, preferenceMap } from "@/components/quests/types";

const QuestsPage = () => {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [matchPreference, setMatchPreference] = useState(false);
  const [preference] = useState<"easy" | "medium" | "hard">("medium");
  const [proTipOpen, setProTipOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState<keyof typeof categoryConfig>("productivity");
  const [newDifficulty, setNewDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  const activeQuests = quests.filter((q) => !q.completed);
  const completedQuests = quests.filter((q) => q.completed);

  const displayedQuests = (activeTab === "active" ? activeQuests : completedQuests).filter((q) => {
    if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter) return false;
    if (matchPreference && q.difficulty !== preference) return false;
    return true;
  });

  const handleComplete = (id: string) => setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, completed: true } : q)));

  const handleCreateQuest = () => {
    if (!newTitle.trim()) return;
    const cat = categoryConfig[newCategory];
    const diff = difficultyConfig[newDifficulty];
    const statVal = newDifficulty === "easy" ? 1 : newDifficulty === "medium" ? 2 : 3;

    const newQuest: Quest = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
      difficulty: newDifficulty,
      xp: diff.xp,
      statBoost: `+${statVal} ${cat.statBoost}`,
      completed: false,
    };

    setQuests((prev) => [newQuest, ...prev]);
    setNewTitle("");
    setNewDescription("");
    setNewCategory("productivity");
    setNewDifficulty("medium");
    setCreateOpen(false);
  };

  const { isSignedIn, isLoaded, userId } = useAuth();

  const questsQuery = useQuery({
    queryKey: ["quests", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Not authenticated");
      const response = await api.get(`/users/${userId}/quests`);
      return response.data;
    },
    enabled: !!userId && isLoaded,
  });

  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/" replace />;
  if (questsQuery.isLoading) return <div>Loading...!!!</div>;
  if (questsQuery.isError) return <div>Error...!!!</div>;

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-8">
        <section className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-primary text-glow">Quest Board</h1>
            <p className="text-muted-foreground font-body text-sm mt-1">Manage and complete your quests</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary font-display uppercase tracking-wider text-xs">
              <Sparkles className="w-4 h-4" />
              AI Generate
            </Button>
            <Button
              onClick={() => setCreateOpen(true)}
              className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-xs"
            >
              <Plus className="w-4 h-4" />
              Create Quest
            </Button>
          </div>
        </section>

        <QuestFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          matchPreference={matchPreference}
          setMatchPreference={setMatchPreference}
          preference={preference}
          preferenceLabel={preferenceMap[preference]}
          activeCount={activeQuests.length}
          completedCount={completedQuests.length}
        />

        <QuestList quests={displayedQuests} onComplete={handleComplete} />

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Quest</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3">
              <label className="flex flex-col gap-1">
                Title
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Quest title"
                />
              </label>
              <label className="flex flex-col gap-1">
                Description
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="Quest description"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="select select-bordered w-full" value={newCategory} onChange={(e) => setNewCategory(e.target.value as keyof typeof categoryConfig)}>
                    {Object.entries(categoryConfig).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <select className="select select-bordered w-full" value={newDifficulty} onChange={(e) => setNewDifficulty(e.target.value as "easy" | "medium" | "hard")}> 
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <Button onClick={handleCreateQuest} disabled={!newTitle.trim()} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-sm mt-2">
                Create Quest
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default QuestsPage;
