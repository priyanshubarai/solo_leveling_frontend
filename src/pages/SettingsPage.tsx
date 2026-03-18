import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Volume2,
  Globe,
  Trash2,
  Save,
  Camera,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

type SettingsTab = "profile" | "notifications" | "appearance" | "privacy" | "account";

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "account", label: "Account", icon: Lock },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const { toast } = useToast();

  // Profile state
  const [displayName, setDisplayName] = useState("Being Specter");
  const [username, setUsername] = useState("beingspecter");
  const [email, setEmail] = useState("specter@hunterlevel.com");
  const [bio, setBio] = useState("Shadow Monarch in training. Grinding quests daily.");
  const [showPassword, setShowPassword] = useState(false);

  // Notification state
  const [questReminders, setQuestReminders] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [levelUpAlerts, setLevelUpAlerts] = useState(true);
  const [communityMentions, setCommunityMentions] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  // Appearance state
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  // Privacy state
  const [profilePublic, setProfilePublic] = useState(true);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const [showActivity, setShowActivity] = useState(false);
  const [allowFriendRequests, setAllowFriendRequests] = useState(true);

  const handleSave = () => {
    toast({ title: "Settings Saved", description: "Your preferences have been updated." });
  };

  const anim = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.07, duration: 0.4 },
  });

  const SectionCard = ({ children, title, description, index }: { children: React.ReactNode; title: string; description?: string; index: number }) => (
    <motion.div {...anim(index)} className="glass-panel neon-border p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg tracking-wider uppercase text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <Separator className="bg-border/30" />
      {children}
    </motion.div>
  );

  const SettingRow = ({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-0.5">
        <Label className="font-display text-sm tracking-wider text-foreground">{label}</Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );

  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to finish loading before checking auth status.
  // Without this, isSignedIn is `undefined` on first render and triggers
  // an immediate redirect back to "/" even for authenticated users.
  
  if (!isLoaded) {
    return null; // or a loading spinner
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div {...anim(0)} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wider uppercase text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1 font-body text-sm">Manage your hunter profile and preferences</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <motion.div {...anim(1)} className="lg:w-56 shrink-0">
            <div className="glass-panel neon-border p-2 space-y-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md font-display text-xs tracking-wider uppercase transition-all duration-300 ${
                      isActive
                        ? "bg-primary/20 text-primary neon-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {activeTab === "profile" && (
              <>
                <SectionCard title="Avatar & Display" description="Customize how others see you" index={2}>
                  <div className="flex items-center gap-5">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-full bg-accent/20 neon-border-blue flex items-center justify-center">
                        <span className="text-accent font-display text-2xl font-bold">E</span>
                      </div>
                      <button className="absolute inset-0 rounded-full bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="w-5 h-5 text-foreground" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <p className="font-display text-sm tracking-wider text-foreground">Being Specter</p>
                      <p className="text-xs text-muted-foreground">Level 7 · Shadow Monarch</p>
                      <button className="text-xs text-primary hover:underline font-display tracking-wider">Change Avatar</button>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Personal Information" description="Update your profile details" index={3}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="font-display text-xs tracking-wider text-muted-foreground">Display Name</Label>
                      <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="bg-secondary/30 border-border/40 focus:border-primary/60" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-display text-xs tracking-wider text-muted-foreground">Username</Label>
                      <Input value={username} onChange={(e) => setUsername(e.target.value)} className="bg-secondary/30 border-border/40 focus:border-primary/60" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-display text-xs tracking-wider text-muted-foreground">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-secondary/30 border-border/40 focus:border-primary/60" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-display text-xs tracking-wider text-muted-foreground">Bio</Label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full rounded-md border border-border/40 bg-secondary/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>
                </SectionCard>
              </>
            )}

            {activeTab === "notifications" && (
              <SectionCard title="Notification Preferences" description="Choose what alerts you receive" index={2}>
                <div className="space-y-5">
                  <SettingRow label="Quest Reminders" description="Get reminded about active and expiring quests">
                    <Switch checked={questReminders} onCheckedChange={setQuestReminders} />
                  </SettingRow>
                  <SettingRow label="Daily Digest" description="Receive a daily summary of your progress">
                    <Switch checked={dailyDigest} onCheckedChange={setDailyDigest} />
                  </SettingRow>
                  <SettingRow label="Level Up Alerts" description="Celebrate when you reach a new level">
                    <Switch checked={levelUpAlerts} onCheckedChange={setLevelUpAlerts} />
                  </SettingRow>
                  <SettingRow label="Community Mentions" description="Notify when someone mentions you">
                    <Switch checked={communityMentions} onCheckedChange={setCommunityMentions} />
                  </SettingRow>
                  <Separator className="bg-border/30" />
                  <SettingRow label="Sound Effects" description="Play sounds for notifications and events">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
                    </div>
                  </SettingRow>
                  <SettingRow label="Email Notifications" description="Receive updates via email">
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </SettingRow>
                </div>
              </SectionCard>
            )}

            {activeTab === "appearance" && (
              <SectionCard title="Appearance & Display" description="Customize the look and feel" index={2}>
                <div className="space-y-5">
                  <SettingRow label="Theme" description="Select your preferred color theme">
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-36 bg-secondary/30 border-border/40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark Void</SelectItem>
                        <SelectItem value="midnight">Midnight</SelectItem>
                        <SelectItem value="abyss">Abyss</SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingRow>
                  <SettingRow label="Language" description="Choose your display language">
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-36 bg-secondary/30 border-border/40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="ko">한국어</SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingRow>
                  <Separator className="bg-border/30" />
                  <SettingRow label="Animations" description="Enable UI motion and transitions">
                    <Switch checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
                  </SettingRow>
                  <SettingRow label="Compact Mode" description="Reduce spacing for denser layouts">
                    <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                  </SettingRow>
                </div>
              </SectionCard>
            )}

            {activeTab === "privacy" && (
              <SectionCard title="Privacy & Visibility" description="Control who can see your data" index={2}>
                <div className="space-y-5">
                  <SettingRow label="Public Profile" description="Allow other hunters to view your profile">
                    <Switch checked={profilePublic} onCheckedChange={setProfilePublic} />
                  </SettingRow>
                  <SettingRow label="Show on Leaderboard" description="Display your rank on the global leaderboard">
                    <Switch checked={showOnLeaderboard} onCheckedChange={setShowOnLeaderboard} />
                  </SettingRow>
                  <SettingRow label="Activity Status" description="Show when you're online or active">
                    <Switch checked={showActivity} onCheckedChange={setShowActivity} />
                  </SettingRow>
                  <SettingRow label="Friend Requests" description="Allow others to send you friend requests">
                    <Switch checked={allowFriendRequests} onCheckedChange={setAllowFriendRequests} />
                  </SettingRow>
                </div>
              </SectionCard>
            )}

            {activeTab === "account" && (
              <>
                <SectionCard title="Change Password" description="Update your account security" index={2}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="font-display text-xs tracking-wider text-muted-foreground">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10 bg-secondary/30 border-border/40" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="font-display text-xs tracking-wider text-muted-foreground">New Password</Label>
                        <Input type="password" placeholder="••••••••" className="bg-secondary/30 border-border/40" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-display text-xs tracking-wider text-muted-foreground">Confirm Password</Label>
                        <Input type="password" placeholder="••••••••" className="bg-secondary/30 border-border/40" />
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Danger Zone" description="Irreversible account actions" index={3}>
                  <div className="flex items-center justify-between p-4 rounded-md border border-destructive/30 bg-destructive/5">
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-5 h-5 text-destructive" />
                      <div>
                        <p className="font-display text-sm tracking-wider text-foreground">Delete Account</p>
                        <p className="text-xs text-muted-foreground">Permanently remove your account and all data</p>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="font-display tracking-wider text-xs uppercase">
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-panel border-destructive/30">
                        <DialogHeader>
                          <DialogTitle className="font-display tracking-wider">Are you absolutely sure?</DialogTitle>
                          <DialogDescription>This action cannot be undone. All your quests, achievements, and progress will be permanently deleted.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline" className="font-display tracking-wider text-xs uppercase">Cancel</Button>
                          </DialogClose>
                          <Button variant="destructive" className="font-display tracking-wider text-xs uppercase">Confirm Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </SectionCard>
              </>
            )}

            {/* Save Button */}
            <motion.div {...anim(4)} className="flex justify-end pt-2">
              <Button onClick={handleSave} className="btn-primary-glow flex items-center gap-2 text-xs">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </motion.div>

            {/* Pro Tip */}
            <motion.div {...anim(5)} className="glass-panel neon-border-blue p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-display text-xs tracking-wider text-accent uppercase">System Notice</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your settings are stored locally. Connect your account to sync across devices.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
