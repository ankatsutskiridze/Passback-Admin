import { useState } from "react";
import { Link, useLocation } from "wouter";
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
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  const [activeTab, setActiveTab] = useState("Summary");

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Sidebar />
      <TopBar />
      
      <main className="ml-20 md:ml-64 p-6 md:p-8 space-y-6">
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
                <Link href="/?impersonate=true">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded transition-colors">
                        <Users className="w-3.5 h-3.5" />
                        Impersonate
                    </button>
                </Link>
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
          {["Summary", "Updates", "Campaigns", "Creative", "Payments & Credits"].map((tab) => (
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
