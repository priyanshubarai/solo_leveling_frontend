import { useState, useEffect } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

import QuestFilters from "@/components/quests/QuestFilters";
import QuestList from "@/components/quests/QuestList";
import {
  difficultyConfig,
  categoryConfig,
  preferenceMap,
} from "@/components/quests/types";

type Quest = {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Legendary";
  completed: boolean;
};

const normalizeDifficulty = (value: string) => {
  const lower = value?.toLowerCase();
  if (lower === "easy" || lower === "moderate" || lower === "hard" || lower==="legendary") return lower;
  return "moderate";
};

const QuestsPage = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [matchPreference, setMatchPreference] = useState(false);
  const [preference] = useState<"Easy" | "Moderate" | "Hard" | "Legendary">("Moderate");
  const [proTipOpen, setProTipOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] =
    useState<keyof typeof categoryConfig>("productivity");
  const [newDifficulty, setNewDifficulty] = useState<"Easy" | "Moderate" | "Hard" | "Legendary">("Moderate");
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

  useEffect(() => {
    const incoming = questsQuery.data?.data;
    if (Array.isArray(incoming)) {
      setQuests(incoming);
    }
  }, [questsQuery.data]);

  const activeQuests = quests.filter((q) => !q.completed);
  const completedQuests = quests.filter((q) => q.completed);
  const displayedQuests = (
    activeTab === "active" ? activeQuests : completedQuests
  ).filter((q) => {
    const difficulty = q.difficulty?.toLowerCase();
    if (difficultyFilter !== "all" && difficulty !== difficultyFilter)
      return false;
    if (matchPreference && difficulty !== preference) return false;
    return true;
  });

  const completeQuestMutation = useMutation({
    mutationFn: async (questId: string) => {
      const res = await api.patch(`/users/${userId}/quests`, {
        questid: questId,
        completed: true,
      });
      return res;
    },
    onSuccess: () => questsQuery.refetch(),
    onError: () => questsQuery.refetch(),
  });

  const createQuestMutation = useMutation({
    mutationFn: async (apiPayload) => {
      const res = await api.post(`/users/${userId}/quests`, apiPayload);
      return res;
    },
    onError: () => questsQuery.refetch(),
    onSuccess: () => questsQuery.refetch(),
  });

  const handleComplete = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: true } : q)),
    );
    completeQuestMutation.mutate(id);
  };

  const handleCreateQuest = async () => {
    const title = newTitle.trim();
    const description = newDescription.trim();

    if (!title) return;
    if (!userId) return;

    const apiPayload: any = {
      questtitle: title,
      questdesc: description ?? "no description",
    };

    if (newCategory && categoryConfig[newCategory]?.label) {
      apiPayload.category = categoryConfig[newCategory].label;
    }

    if (newDifficulty) {
      apiPayload.difficulty =
        newDifficulty.charAt(0).toUpperCase() + newDifficulty.slice(1);
    }

    createQuestMutation.mutate(apiPayload)
    
    setNewTitle("");
    setNewDescription("");
    setNewCategory("productivity");
    setNewDifficulty("Moderate");
    setCreateOpen(false);
  };

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
            <h1 className="font-display text-4xl font-bold text-primary text-glow">
              Quest Board
            </h1>
            <p className="text-muted-foreground font-body text-sm mt-1">
              Manage and complete your quests
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 border-border/50 bg-secondary/50 hover:bg-secondary font-display uppercase tracking-wider text-xs"
            >
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
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="quest-title" className="text-sm font-medium">
                  Quest Title
                </Label>
                <Input
                  id="quest-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter your quest title..."
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="quest-description"
                  className="text-sm font-medium"
                >
                  Description
                </Label>
                <Textarea
                  id="quest-description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe your quest..."
                  className="w-full min-h-[80px] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Category</Label>
                  <Select
                    value={newCategory}
                    onValueChange={(value) =>
                      setNewCategory(value as keyof typeof categoryConfig)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryConfig).map(([key, item]) => (
                        <SelectItem key={key} value={key}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Difficulty</Label>
                  <Select
                    value={newDifficulty}
                    onValueChange={(value) =>{
                      setNewDifficulty(value as "Easy" | "Moderate" | "Hard" | "Legendary");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                      <SelectItem value="Legendary">Legendary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleCreateQuest}
                  disabled={!newTitle.trim()}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display uppercase tracking-wider text-sm h-11"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quest
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default QuestsPage;
