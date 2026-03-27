import { useState, useEffect } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

// Modular Components
import ProTipBanner from "@/components/goals/ProTipBanner";
import GoalColumnComponent from "@/components/goals/GoalColumn";
import AddGoalDialog from "@/components/goals/AddGoalDialog";

// Types
import { Goal, GoalColumn, GoalType } from "@/types/goals";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const Goals = () => {
  const { isSignedIn, isLoaded , userId } = useAuth();
  const [goals , setGoals] = useState<Goal[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<GoalType>("weekly");
  const [columns, setColumns] = useState<GoalColumn[]>([
    { type: "weekly", label: "Weekly Goals", goals: [] },
    { type: "monthly", label: "Monthly Goals", goals: [] },
    { type: "annual", label: "Annual Goals", goals: [] },
  ]);

  const goalsquery = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const res = await api.get(`/users/${userId}/goals`);
      // Extract data from response { message: "success", data: [...] }
      const fetchedGoals = res.data.data || res.data; 
      setGoals(fetchedGoals);
      return fetchedGoals;
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (goals && Array.isArray(goals)) {
      setColumns([
        { 
          type: "weekly", 
          label: "Weekly Goals", 
          goals: goals.filter(g => g.category?.toLowerCase() === "weekly") 
        },
        { 
          type: "monthly", 
          label: "Monthly Goals", 
          goals: goals.filter(g => g.category?.toLowerCase() === "monthly") 
        },
        { 
          type: "annual", 
          label: "Annual Goals", 
          goals: goals.filter(g => g.category?.toLowerCase() === "annualy") 
        },
      ]);
    }
  }, [goals]);


  const toggleComplete = async (colType: GoalType, goalid: number) => {
    try {
      // Find the goal to get its current status
      const goal = goals.find(g => g.goalid === goalid);
      if (!goal) return;

      await api.patch(`/users/${userId}/goals`, {
        goalid,
        completed: !goal.completed
      });
      goalsquery.refetch();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const openAddGoalDialog = (colType: GoalType) => {
    setSelectedType(colType);
    setDialogOpen(true);
  };

  const handleAddGoal = async (newGoal: { title: string; description: string; type: GoalType; }) => {
    try {
      const category = newGoal.type === "annual" ? "Annualy" : newGoal.type.charAt(0).toUpperCase() + newGoal.type.slice(1);
      
      await api.post(`/users/${userId}/goals`, {
        goaltitle: newGoal.title,
        goaldesc: newGoal.description,
        category: category,
        completed: false
      });
      
      goalsquery.refetch();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };


  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="w-full px-4 md:px-8 xl:px-16 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow">Goals</h1>
            <p className="text-muted-foreground font-display text-sm tracking-wider mt-1">
              Set your goals to get personalized AI quests
            </p>
          </div>
          <Button
            onClick={() => openAddGoalDialog("weekly")}
            className="bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 font-display tracking-wider uppercase text-xs gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </Button>
        </div>

        {/* Pro Tip Banner */}
        <ProTipBanner />

        {/* Goal Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col, ci) => (
            <GoalColumnComponent
              key={col.type}
              type={col.type}
              label={col.label}
              goals={col.goals}
              onToggleComplete={toggleComplete}
              onAddGoal={openAddGoalDialog}
              index={ci}
            />
          ))}
        </div>
      </div>

      {/* Add Goal Dialog */}
      <AddGoalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddGoal={handleAddGoal}
        initialType={selectedType}
      />
    </div>
  );
};

export default Goals;
