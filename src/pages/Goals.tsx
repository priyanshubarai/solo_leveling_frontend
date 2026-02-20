import DashboardNavbar from "@/components/DashboardNavbar";

const Goals = () => (
  <div className="min-h-screen bg-background">
    <DashboardNavbar />
    <div className="flex items-center justify-center h-[calc(100vh-56px)]">
      <h1 className="font-display text-4xl font-bold text-accent text-glow-blue">Goals Page</h1>
    </div>
  </div>
);
export default Goals;
