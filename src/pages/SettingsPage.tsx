import DashboardNavbar from "@/components/DashboardNavbar";

const SettingsPage = () => (
  <div className="min-h-screen bg-background">
    <DashboardNavbar />
    <div className="flex items-center justify-center h-[calc(100vh-56px)]">
      <h1 className="font-display text-4xl font-bold text-accent text-glow-blue">Settings Page</h1>
    </div>
  </div>
);
export default SettingsPage;
