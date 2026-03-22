import { motion } from "framer-motion";
import {
  Target,
  ArrowRight,
  RefreshCw,
  CalendarCheck,
  Shield,
} from "lucide-react";
import { fadeUp } from "./dashboardAnimations";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/react";
import { Link } from "react-router-dom";
import api from "@/lib/axios";

const ActiveQuests = () => {
  const { user } = useUser();
  const res = useQuery({ queryKey: ["quests", user?.id], queryFn: async () => {
    const res = await api.get(`/users/${user.id}/quests?completed=false`);
    return res.data;
  } });
  const quests = res?.data?.data ?? [];

  if(res.isPending) return <div>Loading....</div>
  if(res.isError) return <div>Error....</div>

  return (
    <div className="glass-panel neon-border p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-accent" />
          <span className="font-display text-sm font-bold tracking-wider text-foreground uppercase">
            Active Quests
          </span>
        </div>
        <span className="font-display text-xs text-muted-foreground tracking-wider">
          {quests.length} active
        </span>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.questtitle}
            className={`border-l-2 pl-4 py-2 flex items-center justify-between bg-secondary/30 rounded-r-md pr-3`}
          >
            <div>
              <div className="font-display text-sm font-bold text-foreground tracking-wider">
                {quest.questtitle}
              </div>
              {quest.questdesc && (
                <div className="text-xs text-muted-foreground font-body">
                  {quest.questdesc}
                </div>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className="font-display text-[10px] tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  {quest.difficulty}
                </span>
                <span className="font-display text-[10px] tracking-wider text-accent">
                  +10 XP
                </span>
              </div>
            </div>
            <RefreshCw className="w-4 h-4 text-accent shrink-0" />
          </div>
        ))}
      </div>

    
      <Link
        to="/quests"
        className="w-full text-center font-display text-xs tracking-wider text-muted-foreground hover:text-accent transition-colors flex items-center justify-center gap-1"
      >
        <ArrowRight className="w-3 h-3" /> View All Quests
      </Link>
    </div>
  );
};

const DailyTraining = () => {
    const {user} = useUser();
    const res = useQuery({queryKey : ['dailyquests',user?.id],queryFn : async()=>{
        const res = await api.get(`/users/${user.id}/habits`);
        return res.data;
    }})
    const dailyquests = res?.data?.data;

    if(res.isPending) return <div>Loading....</div>
    if(res.isError) return <div>Error....</div>

  return (
    <div className="glass-panel neon-border p-5 space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CalendarCheck className="w-4 h-4 text-accent" />
        <span className="font-display text-sm font-bold tracking-wider text-foreground uppercase">
          Daily Training
        </span>
      </div>
      <span className="font-display text-xs text-muted-foreground tracking-wider">
        {dailyquests.length} quests
      </span>
    </div>

    <div className="glass-panel neon-border-blue px-3 py-2 flex items-center gap-2">
      <Shield className="w-4 h-4 text-accent" />
      <span className="font-display text-xs tracking-wider text-accent">
        Penalty: None
      </span>
    </div>

    <div className="space-y-2">
      {dailyquests.map((item) => (
        <div
          key={item.habitid}
          className="flex items-center gap-3 bg-secondary/30 rounded-md px-3 py-2.5"
        >
          <div className="w-8 h-8 rounded-md bg-secondary/80 flex items-center justify-center shrink-0">
            {/* based on category */}
            {/* <item.icon className="w-4 h-4 text-accent" />  */}
          </div>
          <div>
            <div className="font-display text-sm font-bold text-foreground tracking-wider">
              {item.habittitle}
            </div>
            <div className="font-display text-[10px] tracking-wider text-accent">
              +10 XP
            </div>
          </div>
        </div>
      ))}
    </div>

    <Link
      to="/daily-quests"
      className="w-full text-center font-display text-xs tracking-wider text-muted-foreground hover:text-accent transition-colors flex items-center justify-center gap-1"
    >
      <ArrowRight className="w-3 h-3" /> View All Daily Quests
    </Link>
  </div>
);
};

const QuestsSection = () => (
  <motion.div
    custom={3}
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    className="grid grid-cols-1 lg:grid-cols-2 gap-4"
  >
    <ActiveQuests />
    <DailyTraining />
  </motion.div>
);

export default QuestsSection;
