import { Navigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import PlayerStats from "@/components/dashboard/PlayerStats";
// import StatPointsBanner from "@/components/dashboard/StatPointsBanner";
import QuestsSection from "@/components/dashboard/QuestsSection";
import QuickActions from "@/components/dashboard/QuickActions";
import SystemMessage from "@/components/dashboard/SystemMessage";
import ProTips from "@/components/dashboard/ProTips";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { authClient } from "@/lib/auth-client"

const Dashboard = () => {
  const { data: session, isPending, error } = authClient.useSession();
  const res = useQuery({
    queryKey: ["userinfo", session?.user?.id],
    queryFn: async () => {
      const res = await api.get(`/users/me`);
      return res.data;
    },
    enabled: !!session?.user?.id, 
  });
  const userinfo = res.data?.data?.[0];

  if(error) return <div>Error...!</div>;
  if (isPending) return <div>Loading...</div>;
  if (!session){
    console.log("User is not Signed In");
    return <Navigate to="/sign-in" replace />;
  }
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar  />
      <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-8 space-y-6">
        <WelcomeHeader username={userinfo?.username || "User"}/>
        <PlayerStats userinfo={userinfo}/>
        {/* <StatPointsBanner /> */}
        <QuestsSection />
        <QuickActions />
        <SystemMessage />
        <ProTips />
      </main>
    </div>
  );
};

export default Dashboard;
