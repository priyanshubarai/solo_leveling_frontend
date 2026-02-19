import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  CalendarCheck,
  Flag,
  Users,
  Trophy,
  Award,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Quests", icon: Target, path: "/dashboard" },
  { label: "Daily Quests", icon: CalendarCheck, path: "/dashboard" },
  { label: "Goals", icon: Flag, path: "/dashboard" },
  { label: "Community", icon: Users, path: "/dashboard" },
  { label: "Leaderboard", icon: Trophy, path: "/dashboard" },
  { label: "Achievements", icon: Award, path: "/dashboard" },
  { label: "Analytics", icon: BarChart3, path: "/dashboard" },
  { label: "Settings", icon: Settings, path: "/dashboard" },
];

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 glass-panel border-b border-border/30 border-t-0 border-x-0 rounded-none">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-[0.15em] text-foreground shrink-0"
        >
          <div className="w-8 h-8 rounded-md bg-primary/20 neon-border flex items-center justify-center">
            <span className="text-primary text-xs font-bold">HL</span>
          </div>
          <span>
            Hunter<br className="hidden" />
            <span className="text-primary text-glow"> Level</span>
          </span>
        </button>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = item.label === "Dashboard";
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-display text-xs tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-primary/20 text-primary neon-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* User */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block text-right">
            <div className="font-display text-xs tracking-wider text-foreground">Being Specter</div>
            <div className="font-display text-[10px] tracking-wider text-muted-foreground">Level 7</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-accent/20 neon-border-blue flex items-center justify-center">
            <span className="text-accent font-display text-sm font-bold">E</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
