import { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import ViewCreative from "./view-creative";
import { 
  LayoutDashboard, 
  Megaphone, 
  Users, 
  Palette, 
  CreditCard, 
  FileBarChart, 
  Settings,
  LogOut,
  Bell,
  User,
  Search,
  ChevronDown,
  Mail,
  UserX,
  RefreshCw,
  Edit2,
  Crown,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  BarChart3,
  Filter,
  Globe,
  MapPin,
  Pause,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Paperclip,
  Link2,
  Clock3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// --- Shared Layout Components ---

const Sidebar = () => {
  const [location] = useLocation();
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Megaphone, label: "Campaigns", href: "/campaigns" },
    { icon: Users, label: "Accounts", href: "/accounts" },
    { icon: Palette, label: "Creatives", href: "/creatives" },
    { icon: CreditCard, label: "Billing & Finance", href: "/billing" },
    { icon: FileBarChart, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="w-20 md:w-64 bg-sidebar flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border/50">
        <span className="text-xl font-bold text-white tracking-tight">passback</span>
      </div>
      <div className="flex-1 py-6 flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href === "/accounts" && location.startsWith("/client/"));
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors group",
                isActive ? "bg-sidebar-primary text-white" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
              )}>
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-sidebar-foreground/60 group-hover:text-white")} />
                <span className="hidden md:block text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t border-sidebar-border/50 flex flex-col gap-4">
        <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer group">
          <Bell className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-white" />
          <span className="hidden md:block text-sm font-medium">Updates</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer group">
          <User className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-white" />
          <span className="hidden md:block text-sm font-medium">Profile</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer group">
          <LogOut className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-white" />
          <span className="hidden md:block text-sm font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
};

const TopBar = () => {
  return (
    <header className="h-16 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-6 md:px-8 ml-20 md:ml-64 sticky top-0 z-40">
      <div className="flex-1 max-w-2xl relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sidebar-foreground/50" />
          <input type="text" placeholder="search" className="w-full bg-sidebar-accent/50 text-sidebar-foreground pl-10 pr-4 py-2 rounded text-sm focus:outline-none border-none" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-orange-500/10 border border-orange-500/20 text-orange-500 px-3 py-1.5 rounded flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-orange-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
          </div>
          <span className="text-sm font-medium text-orange-500">Agency</span>
        </div>
      </div>
    </header>
  );
};

// --- Page Components ---

const kpiData = [
  { title: "Active Accounts", value: "8", change: "you have 2 drafts that wait for an update", icon: "file", color: "bg-blue-50 text-blue-500" },
  { title: "Active Campaigns", value: "4", change: "you have 2 drafts that wait for an update", icon: "file", color: "bg-blue-50 text-blue-500" },
  { title: "Total Reach", value: "10,293", change: "1.3% Up from past week", changeType: "positive", icon: "users", color: "bg-teal-50 text-teal-500" },
  { title: "Average CPM", value: "$642.39", change: "1.3% Down from last month", changeType: "negative", icon: "chart", color: "bg-slate-100 text-slate-500" },
];

const chartData = [
  { month: "01", value: 20 },
  { month: "02", value: 30 },
  { month: "03", value: 20 },
  { month: "04", value: 10 },
  { month: "05", value: 60 },
  { month: "06", value: 25 },
  { month: "07", value: 5 },
  { month: "08", value: 35 },
  { month: "09", value: 18 },
  { month: "10", value: 12 },
  { month: "11", value: 30 },
  { month: "12", value: 22 },
];

const ClientProfile = () => {
  const { id, creativeId } = useParams();
  const [activeTab, setActiveTab] = useState("Summary");
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (creativeId) {
      setActiveTab("Creatives");
    }
  }, [creativeId]);

  if (creativeId) {
    return (
      <div className="min-h-screen bg-background text-slate-900">
        <Sidebar />
        <TopBar />
        
        <main className="ml-20 md:ml-64 p-6 md:p-8 space-y-6">
          <ViewCreative isNested={true} />
        </main>
      </div>
    );
  }
        <div>
          <h1 className="text-xl font-bold">client profile</h1>
          <p className="text-muted-foreground text-sm">text text text text text text text text</p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8 flex flex-col md:flex-row items-center gap-8 relative">
          <Avatar className="w-24 h-24 border-2 border-slate-100 shadow-sm">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&auto=format" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-normal text-slate-700">client name</h2>
                <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active Client
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  Contact User
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded transition-colors">
                  <UserX className="w-3.5 h-3.5" />
                  Suspend Account
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Password
                </button>
                <button className="bg-slate-900 text-white px-5 py-1.5 rounded text-sm font-medium hover:bg-slate-800 transition-colors">
                  Edit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-2">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Registration Date</p>
                <p className="text-xs font-medium text-slate-700">DD/MM/YYYY</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Role</p>
                <div className="flex items-center gap-1 text-xs font-medium text-slate-700">
                  <div className="w-3.5 h-3.5 border border-slate-300 rounded-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  </div>
                  Agency
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Contact Person</p>
                <p className="text-xs font-medium text-slate-700">Name | +000-000000</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Plan Chosen</p>
                <p className="text-xs font-medium text-slate-700">Plan Name</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Status</p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-orange-400">
                  <Crown className="w-3.5 h-3.5" />
                  Gold Agency
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6">
          {["Summary", "Updates", "Campaigns", "Creatives", "Payments & Credits"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "py-2 text-sm font-medium transition-all relative",
                activeTab === tab ? "text-slate-900" : "text-muted-foreground hover:text-slate-600"
              )}
            >
              <div className="flex items-center gap-2">
                {tab}
                {tab === "Updates" && (
                  <span className="w-5 h-5 bg-slate-900 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
                )}
              </div>
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Payments & Credits Tab Content */}
        {activeTab === "Payments & Credits" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Top Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: Set Campaign Type */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50 space-y-6 flex flex-col justify-between h-[280px]">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-orange-400">Set Campaign Type</h3>
                  <p className="text-xs text-slate-400">Lorem Ipsum</p>
                </div>
                <RadioGroup defaultValue="local" className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="local" id="local" className="text-orange-400 border-slate-300" />
                    <Label htmlFor="local" className="text-sm font-medium text-slate-600 cursor-pointer">Local</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="national" id="national" className="text-orange-400 border-slate-300" />
                    <Label htmlFor="national" className="text-sm font-medium text-slate-600 cursor-pointer">National</Label>
                  </div>
                </RadioGroup>
                <button className="w-24 bg-slate-900 text-white py-1.5 rounded text-xs font-bold hover:bg-slate-800 transition-colors uppercase tracking-wider">
                  Submit
                </button>
              </div>

              {/* Card 2: Set Special Cost */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50 space-y-6 flex flex-col justify-between h-[280px]">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-orange-400">Set Special Cost</h3>
                  <p className="text-xs text-slate-400">Lorem Ipsum</p>
                </div>
                <div className="space-y-4">
                  <RadioGroup defaultValue="other" className="flex items-center gap-4">
                    {["5$", "7$", "10$"].map((val) => (
                      <div key={val} className="flex items-center space-x-2">
                        <RadioGroupItem value={val} id={val} className="text-orange-400 border-slate-300" />
                        <Label htmlFor={val} className="text-xs font-medium text-slate-600 cursor-pointer">{val}</Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" className="text-orange-400 border-slate-300" />
                      <Label htmlFor="other" className="text-xs font-medium text-slate-600 cursor-pointer text-slate-900 font-bold">Other</Label>
                    </div>
                  </RadioGroup>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input placeholder="Amount ($)" className="h-9 text-xs bg-slate-50 border-slate-200 text-slate-400 placeholder:text-slate-300 pr-12" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Per</span>
                    <button className="px-3 h-9 border border-slate-200 rounded text-[10px] font-bold text-slate-600 hover:bg-slate-50 uppercase tracking-wider">
                      CPM
                    </button>
                  </div>
                </div>
                <button className="w-24 bg-slate-900 text-white py-1.5 rounded text-xs font-bold hover:bg-slate-800 transition-colors uppercase tracking-wider">
                  Submit
                </button>
              </div>

              {/* Card 3: Coupon & Credits */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50 space-y-6 flex flex-col justify-between h-[280px]">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-orange-400">Coupon & Credits</h3>
                  <p className="text-xs text-slate-400">Load Coupons to Client's Profile</p>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Code" className="h-10 text-xs bg-slate-50 border-slate-200 text-slate-400 placeholder:text-slate-300" />
                    <button className="px-6 bg-slate-900 text-white rounded text-xs font-bold hover:bg-slate-800 transition-colors uppercase tracking-wider">
                      Activate
                    </button>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-orange-400">Bank Transfer Payment</p>
                      <p className="text-[10px] font-medium text-slate-300">no Credit Card</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-slate-900" />
                  </div>
                </div>
                <div className="h-4" /> {/* Spacer */}
              </div>
            </div>

            {/* Payment Activity Section */}
            <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
              <div className="p-4 border-b border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
                <h3 className="text-sm font-bold text-orange-400">Payment activity</h3>
                <div className="flex flex-1 max-w-2xl gap-2 px-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="search" 
                      className="w-full bg-white border border-slate-100 text-sm pl-10 pr-4 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-slate-100 transition-all text-slate-400 placeholder:text-slate-300"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-8 px-4 py-1.5 bg-white border border-slate-100 rounded text-xs font-medium text-slate-400">
                    Recent <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-1.5 bg-slate-900 text-white rounded text-xs font-bold hover:bg-slate-800 transition-colors uppercase tracking-wider shadow-sm">
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-border/50">
                      <th className="p-4 w-12 text-[10px] uppercase tracking-wider font-bold text-slate-400">#</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">Status</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">Date</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">Payment method</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">Amount</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">Campaign</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400 text-right">more</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { status: "Paid", date: "Nov 20, 2025", method: "XXXX - XX83", amount: "2,500$", campaign: "Campaign Name" },
                      { status: "Paid", date: "Nov 20, 2025", method: "XXXX - XX83", amount: "2,500$", campaign: "Campaign Name" },
                      { status: "Paid", date: "Nov 20, 2025", method: "XXXX - XX83", amount: "2,500$", campaign: "Campaign Name" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border/30 hover:bg-slate-50 transition-colors group">
                        <td className="p-4 text-xs font-medium text-slate-400">{i + 1}.</td>
                        <td className="p-4">
                          <div className={cn(
                            "flex items-center gap-2 text-xs font-bold",
                            row.status === "Paid" && "text-emerald-500",
                            row.status === "Open" && "text-red-500",
                            row.status === "Delayed" && "text-orange-400",
                          )}>
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              row.status === "Paid" && "bg-emerald-500",
                              row.status === "Open" && "bg-red-500",
                              row.status === "Delayed" && "bg-orange-400",
                            )} />
                            {row.status}
                          </div>
                        </td>
                        <td className="p-4 text-xs font-medium text-slate-400">{row.date}</td>
                        <td className="p-4 text-xs font-medium text-slate-400">{row.method}</td>
                        <td className="p-4 text-xs font-medium text-slate-400">{row.amount}</td>
                        <td className="p-4">
                          <span className="text-xs font-medium text-slate-400 hover:text-slate-600 cursor-pointer underline decoration-slate-200 underline-offset-4">{row.campaign}</span>
                        </td>
                        <td className="p-4 text-right relative">
                          <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-200 hover:text-slate-400">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border/50 flex items-center justify-end bg-slate-50/10">
                <div className="flex items-center gap-1">
                  <button className="p-1.5 border border-slate-200 rounded hover:bg-white text-slate-400 disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 border border-slate-200 rounded bg-slate-900 text-white shadow-sm">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Updates Tab Content */}
        {activeTab === "Updates" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
              <div className="p-4 border-b border-border/50 flex items-center justify-between bg-slate-50/30">
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button className="px-6 py-1.5 text-xs font-semibold rounded-md bg-white shadow-sm text-slate-900">All</button>
                  <button className="px-6 py-1.5 text-xs font-semibold rounded-md text-slate-400 hover:text-slate-600">Unread</button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-4 px-4 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-400">
                    Recent <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors">
                    <Filter className="w-3.5 h-3.5" />
                    filter
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-10">
                {/* Today Group */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-800">Today</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={`today-${i}`} className="flex items-start justify-between group cursor-pointer">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                            <Bell className="w-5 h-5 text-orange-400" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800">notification</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                            </p>
                            <p className="text-[11px] font-medium text-slate-300">6h ago</p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="w-2 h-2 rounded-full bg-orange-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yesterday Group */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-800">Yesterday</h3>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={`yesterday-${i}`} className="flex items-start justify-between group cursor-pointer opacity-70">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                            <Bell className="w-5 h-5 text-orange-400" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800">notification</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                            </p>
                            <p className="text-[11px] font-medium text-slate-300">1d ago</p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="w-2 h-2 rounded-full bg-orange-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Creatives Tab Content */}
        {activeTab === "Creatives" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
              {/* Toolbar */}
              <div className="p-4 border-b border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-800 mr-4">Creatives</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  </div>
                </div>

                <div className="flex-1 max-w-md w-full relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="search" 
                    className="w-full bg-white border border-slate-200 text-sm pl-10 pr-4 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-slate-200 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-6 px-4 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-400">
                    This Month <ChevronDown className="w-3.5 h-3.5 ml-auto" />
                  </button>
                  <button className="flex items-center gap-6 px-4 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-400">
                    <span className="text-slate-300 mr-1">status:</span> <span className="text-slate-600">Active</span> <ChevronDown className="w-3.5 h-3.5 ml-auto" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-border/50">
                      <th className="p-4 w-10 text-[10px] uppercase tracking-wider font-bold text-slate-400">#</th>
                      <th className="p-4 w-16 text-[10px] uppercase tracking-wider font-bold text-slate-400">preview</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">name</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">related campaign</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">file/link</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">status</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">file size</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400 text-right">more</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "1", name: "Name", campaign: "Campaign name", type: "File", status: "Active", size: "230 Mb", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&h=64&fit=crop" },
                      { id: "2", name: "Name", campaign: "Campaign name", type: "File", status: "Rejected", size: "230 Mb", img: "https://images.unsplash.com/photo-1618005192346-064f37a1c1f9?w=64&h=64&fit=crop" },
                      { id: "3", name: "Name", campaign: "Campaign name", type: "File", status: "Active", size: "230 Mb", img: "https://images.unsplash.com/photo-1633284738054-67a22e79b532?w=64&h=64&fit=crop" },
                      { id: "4", name: "Name", campaign: "Campaign name", type: "File", status: "Active", size: "230 Mb", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=64&h=64&fit=crop" },
                      { id: "5", name: "Name", campaign: "Campaign name", type: "Link", status: "Pending for Approval", size: "-", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=64&h=64&fit=crop" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border/30 hover:bg-slate-50 transition-colors group">
                        <td className="p-4 text-xs font-medium text-slate-400">{i + 1}.</td>
                        <td className="p-4">
                          <Link href={`/client/${id}/creatives/${row.id}`}>
                            <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer">
                              <img src={row.img} alt="preview" className="w-full h-full object-cover" />
                            </div>
                          </Link>
                        </td>
                        <td className="p-4">
                          <Link href={`/client/${id}/creatives/${row.id}`}>
                            <span className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">{row.name}</span>
                          </Link>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-bold text-slate-800 hover:text-slate-900 cursor-pointer underline decoration-slate-300 underline-offset-4">{row.campaign}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            {row.type === "File" ? <Paperclip className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                            {row.type}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight shadow-none border-none",
                            row.status === "Active" && "bg-emerald-100 text-emerald-600",
                            row.status === "Rejected" && "bg-red-100 text-red-600",
                            row.status === "Pending for Approval" && "bg-orange-100 text-orange-600",
                          )}>
                            {row.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-xs font-medium text-slate-500">{row.size}</td>
                        <td className="p-4 text-right relative">
                          <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-300 hover:text-slate-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          {/* More Dropdown Mockup (visible on hover or state) */}
                          {i === 0 && (
                            <div className="absolute right-4 top-12 w-48 bg-white border border-border shadow-lg rounded-lg z-10 py-1 text-left">
                              <Link href={`/client/${id}/creatives/${row.id}`}>
                                <button className="w-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left">
                                  View creative
                                </button>
                              </Link>
                              {["Approve", "Reject", "View Campaign", "Contact Agency"].map((action) => (
                                <button key={action} className="w-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left">
                                  {action}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border/50 flex items-center justify-end bg-slate-50/10">
                <div className="flex items-center gap-1">
                  <button className="p-1.5 border border-slate-200 rounded hover:bg-white text-slate-400 disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 border border-slate-200 rounded bg-slate-900 text-white shadow-sm">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab Content */}
        {activeTab === "Campaigns" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
              {/* Toolbar */}
              <div className="p-4 border-b border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-800 mr-4">Campaigns</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                      <Pause className="w-3.5 h-3.5" />
                      Pause
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                      <Play className="w-3.5 h-3.5" />
                      Active
                    </button>
                  </div>
                </div>

                <div className="flex-1 max-w-md w-full relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="search" 
                    className="w-full bg-white border border-slate-200 text-sm pl-10 pr-4 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-slate-200 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-6 px-4 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-400">
                    This Month <ChevronDown className="w-3.5 h-3.5 ml-auto" />
                  </button>
                  <button className="flex items-center gap-6 px-4 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-400">
                    <span className="text-slate-300 mr-1">status:</span> <span className="text-slate-600">Active</span> <ChevronDown className="w-3.5 h-3.5 ml-auto" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-border/50">
                      <th className="p-4 w-10">
                        <Checkbox className="data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900" />
                      </th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">name</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">campaign target</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">status</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">budget</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">dates</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400">creative status</th>
                      <th className="p-4 text-[10px] uppercase tracking-wider font-bold text-slate-400 text-right">more</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Name", target: "National", status: "Paused", budget: "20K", dates: "02.10.25 - 10.10.25", creative: "Pending for approval" },
                      { name: "Name", target: "Local", status: "Active", budget: "20K", dates: "15.10.25 - ongoing", creative: "Approved" },
                      { name: "Name", target: "Local", status: "Active", budget: "20K", dates: "15.10.25 - ongoing", creative: "Pending for approval" },
                      { name: "Name", target: "National", status: "Draft", budget: "20K", dates: "-", creative: "Pending for approval" },
                      { name: "Name", target: "National", status: "Ended", budget: "20K", dates: "01.09.25 - 25.09.25", creative: "Rejected" },
                      { name: "Name", target: "National", status: "Pending", budget: "20K", dates: "22.10.25", creative: "Approved" },
                      { name: "Name", target: "Local", status: "Ended", budget: "20K", dates: "01.09.25 - 25.09.25", creative: "Approved" },
                      { name: "Name", target: "Local", status: "Ended", budget: "20K", dates: "01.09.25 - 25.09.25", creative: "Approved" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border/30 hover:bg-slate-50 transition-colors group">
                        <td className="p-4">
                          <Checkbox className="data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900" />
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer underline decoration-slate-200 underline-offset-4">{row.name}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            {row.target === "National" ? <Globe className="w-3.5 h-3.5 text-orange-400/60" /> : <MapPin className="w-3.5 h-3.5 text-orange-400/60" />}
                            {row.target}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight shadow-none border-none",
                            row.status === "Active" && "bg-emerald-100 text-emerald-600",
                            row.status === "Paused" && "bg-red-100 text-red-600",
                            row.status === "Draft" && "bg-slate-100 text-slate-500",
                            row.status === "Ended" && "bg-blue-100 text-blue-600",
                            row.status === "Pending" && "bg-orange-100 text-orange-600",
                          )}>
                            {row.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-xs font-medium text-slate-500">{row.budget}</td>
                        <td className="p-4 text-xs font-medium text-slate-500">{row.dates}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-xs font-medium">
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              row.creative === "Approved" && "bg-emerald-500",
                              row.creative === "Pending for approval" && "bg-orange-400",
                              row.creative === "Rejected" && "bg-red-500",
                            )} />
                            <span className={cn(
                              row.creative === "Approved" && "text-emerald-500",
                              row.creative === "Pending for approval" && "text-orange-400",
                              row.creative === "Rejected" && "text-red-500",
                            )}>{row.creative}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right relative">
                          <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-300 hover:text-slate-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          {/* More Dropdown Mockup (visible on hover or state) */}
                          {i === 0 && activeTab === "Campaigns" && (
                            <div className="absolute right-4 top-12 w-48 bg-white border border-border shadow-lg rounded-lg z-10 py-1 text-left">
                              {["View Campaign", "Approve", "Reject", "View Creative", "Contact Agency"].map((action) => (
                                <button key={action} className="w-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                  {action}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border/50 flex items-center justify-between bg-slate-50/10">
                <span className="text-[10px] font-medium text-slate-400">showing 1-5 of 20</span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 border border-slate-200 rounded hover:bg-white text-slate-400 disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 border border-slate-200 rounded bg-slate-900 text-white shadow-sm">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Tab Content */}
        {activeTab === "Summary" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-border/50 flex flex-col justify-between h-40 relative group hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-slate-400">{kpi.title}</h3>
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", kpi.color)}>
                      {kpi.icon === "file" && <div className="w-4 h-5 border-2 border-current rounded-sm" />}
                      {kpi.icon === "users" && <Users className="w-5 h-5" />}
                      {kpi.icon === "chart" && <BarChart3 className="w-5 h-5" />}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-2">{kpi.value}</div>
                    <div className="flex items-center gap-2 text-[11px]">
                      {kpi.changeType === "positive" ? (
                        <span className="text-emerald-500 font-bold flex items-center">
                          <ArrowUpRight className="w-3 h-3 mr-0.5" />
                          {kpi.change.split(' ')[0]}
                        </span>
                      ) : kpi.changeType === "negative" ? (
                        <span className="text-red-400 font-bold flex items-center">
                          <ArrowDownRight className="w-3 h-3 mr-0.5" />
                          {kpi.change.split(' ')[0]}
                        </span>
                      ) : (
                        <span className="text-orange-400 font-medium">
                          <Lightbulb className="w-3 h-3 inline mr-1" />
                        </span>
                      )}
                      <span className="text-slate-300 font-medium line-clamp-1 italic">
                        {kpi.changeType ? kpi.change.split(' ').slice(1).join(' ') : kpi.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Card */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-border/50">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-base font-bold text-slate-700">Payment History</h3>
                  <button className="text-xs bg-white border border-slate-200 px-3 py-1 rounded flex items-center gap-4 text-slate-400">
                    2025 <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 10 }} tickFormatter={(val) => `${val}%`} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="value" fill="#5eead4" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sidebar Info Cards */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50 space-y-4">
                  <div className="flex items-center gap-2 text-orange-400">
                    <Crown className="w-5 h-5" />
                    <h3 className="text-lg font-normal">Gold Agency</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50 flex flex-col justify-between h-40">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-slate-400">Spend this month</h3>
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-400">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-2">$350.4</div>
                    <div className="text-[11px] font-bold text-emerald-500">+10% from last month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientProfile;
