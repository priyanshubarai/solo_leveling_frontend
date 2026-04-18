import { useState, useMemo, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/react";

import DashboardNavbar from "@/components/DashboardNavbar";
import DailyQuestsHeader from "@/components/daily-quests/DailyQuestsHeader";
import MonthNavigator from "@/components/daily-quests/MonthNavigator";
import QuestTrackerGrid from "@/components/daily-quests/QuestTrackerGrid";
import CompletionDonut from "@/components/daily-quests/CompletionDonut";
import DailyProgressChart from "@/components/daily-quests/DailyProgressChart";
import SystemNotice from "@/components/daily-quests/SystemNotice";
import CreateQuestDialog from "@/components/daily-quests/CreateQuestDialog";
import { DailyQuest, monthNames, DailyQuestCompletion } from "@/components/daily-quests/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const DailyQuests = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-indexed: Jan=0, Mar=2…
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("productivity");

  const habits = useQuery({
    queryKey: ["habits", userId],
    queryFn: async () => {
      const response = await api.get(`/users/me/habits`);
      return response.data.data;
    },
    enabled: !!userId,
  });

  const questsData = habits.data;
  const quests: DailyQuest[] = useMemo(() => Array.isArray(questsData) ? questsData : [], [questsData]);

  const habitsCompletion = useQuery({
    queryKey: ["habits-completion", userId, currentMonth, currentYear, quests.length],
    queryFn: async () => {
      const completionMap: Record<number, DailyQuestCompletion[]> = {};

      await Promise.all(
        quests.map(async (q) => {
          const habitIdNum = Number(q.habitid);
          const response = await api.get(`/users/me/habits/${habitIdNum}?month=${currentMonth}&year=${currentYear}`);
          completionMap[habitIdNum] = response.data?.data || [];
        })
      );

      return completionMap;
    },
    enabled: !!userId && quests.length > 0,
  });

  const completionData = habitsCompletion.data;
  const questsCompletion: Record<number, DailyQuestCompletion[]> = useMemo(() => completionData || {}, [completionData]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const chartData = useMemo(
    () =>
      dayNumbers.map((day) => {
        const done = quests.filter((q) => {
          const habitCompletions = questsCompletion[Number(q.habitid)] || [];
          return habitCompletions.some(
            (c) => c.day === day && c.month === currentMonth && c.year === currentYear
          );
        }).length;
        const pct = quests.length > 0 ? Math.round((done / quests.length) * 100) : 0;
        return { name: `${monthNames[currentMonth].slice(0, 3)} ${day}`, pct };
      }),
    [quests, questsCompletion, dayNumbers, currentMonth, currentYear]
  );

  const habitsMutation = useMutation({
    mutationFn: async (newQuest: { habittitle: string; category: string; }) => {
      const response = await api.post(`/users/me/habits`, newQuest);
      return response.data.data;
    },
    onSuccess: () => {
      habits.refetch();
    },
    onError: (error) => {
      console.error("Error creating habit:", error);
    }
  });

  const handleCreate = useCallback(() => {
    if (!newTitle.trim()) return;
    
    habitsMutation.mutate({
      habittitle: newTitle.trim(),
      category: newCategory,
    });

    setNewTitle("");
    setNewCategory("productivity");
    setCreateOpen(false);
  }, [newTitle, newCategory, habitsMutation]);

  const toggleHabitMutation = useMutation({
    mutationFn: async ({ habitIdNum, day, existing }: { habitIdNum: number; day: number; existing: any }) => {
      if (existing) {
        await api.delete(`/users/me/habits/${habitIdNum}`, {
          data: { day, month: currentMonth, year: currentYear }
        });
      } else {
        await api.post(`/users/me/habits/${habitIdNum}`, {
          day, month: currentMonth, year: currentYear
        });
      }
    },
    onSuccess: () => {
      habitsCompletion.refetch();
    },
    onError: (error) => {
      console.error("Error toggling habit completion:", error);
    }
  });

  const handleToggleDay = useCallback((questId: string, day: number) => {
    const habitIdNum = Number(questId);
    const existing = questsCompletion[habitIdNum]?.find(
      (c) => c.day === day && c.month === currentMonth && c.year === currentYear
    );
    toggleHabitMutation.mutate({ habitIdNum, day, existing });
  }, [questsCompletion, currentMonth, currentYear, toggleHabitMutation]);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  const totalPossible = quests.length * daysInMonth;
  const totalDone = Object.values(questsCompletion).reduce((sum, completions) => {
    const currentMonthCompletions = completions.filter(
      c => c.month === currentMonth && c.year === currentYear
    );
    return sum + currentMonthCompletions.length;
  }, 0);
  const completionPct = totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;

  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/" replace />;

  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  const currentDay = isCurrentMonth ? today.getDate() : -1;

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-8">
        <DailyQuestsHeader onCreateOpen={() => setCreateOpen(true)} />

        <MonthNavigator
          currentMonth={currentMonth}
          currentYear={currentYear}
          onPrev={prevMonth}
          onNext={nextMonth}
        />

        <QuestTrackerGrid
          quests={quests}
          questsCompletion={questsCompletion}
          dayNumbers={dayNumbers}
          daysInMonth={daysInMonth}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onToggleDay={handleToggleDay}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CompletionDonut completionPct={completionPct} />
          <DailyProgressChart chartData={chartData} daysInMonth={daysInMonth} />
        </div>

        <SystemNotice />

        <CreateQuestDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          onCreate={handleCreate}
        />
      </main>
    </div>
  );
};

export default DailyQuests;
