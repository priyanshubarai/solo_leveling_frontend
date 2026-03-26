import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { monthNames } from "./types";

interface MonthNavigatorProps {
  currentMonth: number;
  currentYear: number;
  onPrev: () => void;
  onNext: () => void;
}

const MonthNavigator = ({ currentMonth, currentYear, onPrev, onNext }: MonthNavigatorProps) => (
  <div className="glass-panel p-4 mb-6 flex items-center justify-between">
    <button onClick={onPrev} className="text-muted-foreground hover:text-foreground transition-colors p-1">
      <ChevronLeft className="w-5 h-5" />
    </button>
    <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
      <CalendarDays className="w-5 h-5 text-accent" />
      {monthNames[currentMonth]} {currentYear}
    </div>
    <button onClick={onNext} className="text-muted-foreground hover:text-foreground transition-colors p-1">
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
);

export default MonthNavigator;
