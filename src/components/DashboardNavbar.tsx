import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  CalendarCheck,
  Flag,
  Trophy,
  Award,
  BarChart3,
  Settings,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Quests", icon: Target, path: "/quests" },
  { label: "Daily Quests", icon: CalendarCheck, path: "/daily-quests" },
  { label: "Goals", icon: Flag, path: "/goals" },
  { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
  { label: "Achievements", icon: Award, path: "/achievements" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
        },
      },
    });
  };

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
            Hunter
            <br className="hidden" />
            <span className="text-primary text-glow"> Level</span>
          </span>
        </button>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
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
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative w-9 h-9 rounded-full bg-secondary/60 neon-border flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95 group">
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <UserIcon className="w-5 h-5" />
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-panel neon-border p-1 bg-card/90 backdrop-blur-xl border-border/40">
                <DropdownMenuLabel className="font-display px-3 py-2">
                  <div className="text-sm font-bold text-foreground truncate">{session.user.name}</div>
                  <div className="text-[10px] text-muted-foreground tracking-wider uppercase truncate">{session.user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/20 mx-1" />
                <DropdownMenuItem 
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md transition-colors hover:bg-secondary/50 focus:bg-secondary/50" 
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span className="font-display text-xs tracking-wider">SETTINGS</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/20 mx-1" />
                <DropdownMenuItem 
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md text-destructive transition-colors hover:bg-destructive/10 focus:bg-destructive/10" 
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-display text-xs tracking-wider">LOG OUT</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button 
              onClick={() => navigate("/sign-in")}
              className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground font-display text-xs tracking-widest uppercase hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            >
              LOG IN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
