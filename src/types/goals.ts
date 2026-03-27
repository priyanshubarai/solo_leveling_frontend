export type GoalType = "weekly" | "monthly" | "annual";

export interface Goal {
  goalid: number;
  clerkuserid : string;
  goaltitle: string;
  goaldesc: string;
  category: string;
  completed: boolean;
}

export interface GoalColumn {
  type: GoalType;
  label: string;
  goals: Goal[];
}
