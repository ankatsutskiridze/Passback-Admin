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
  RefreshCw,
  User,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  BarChart3
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Mock Data ---

const kpiData = [
  {
    title: "Live Campaigns",
    value: "200",
    change: "you have 2 campaigns waiting for review",
    changeType: "neutral",
    icon: "file",
    color: "bg-blue-50 text-blue-500",
  },
  {
    title: "Active Advertisers",
    value: "50",
    change: "1.3% Up from past month",
    changeType: "positive",
    icon: "users",
    color: "bg-teal-50 text-teal-500",
  },
  {
    title: "Total Revenue",
    value: "$20,000",
    change: "10% from last month",
    changeType: "positive",
    icon: "refresh-ccw",
    color: "bg-orange-50 text-orange-500",
  },
  {
    title: "Cost",
    value: "$20,000",
    change: "10% from last month",
    changeType: "positive",
    icon: "refresh-ccw",
    color: "bg-orange-50 text-orange-500",
  },
];

const chartData = [
  { name: "January", value: 5000 },
  { name: "Febuary", value: 8000 },
  { name: "March", value: 7000 },
  { name: "April", value: 42000 }, // Spike
  { name: "May", value: 10000 },
  { name: "June", value: 15000 },
  { name: "July", value: 12000 },
  { name: "August", value: 8000 },
  { name: "September", value: 25000 },
  { name: "October", value: 18000 },
  { name: "November", value: 15000 },
  { name: "December", value: 20000 },
];

const accountsData = [
  {
    id: 1,
    name: "Name",
    account: "Client name",
    type: "Agency",
    status: "Paused",
    active: false,
    impressions: "236K",
    dates: "02.10.25 - 10.10.25",
    notes: "Requires your approval",
  },
  {
    id: 2,
    name: "Name",
    account: "Client name",
    type: "Advertiser",
    status: "Active",
    active: true,
    impressions: "35K",
    dates: "15.10.25 - ongoing",
    notes: "Approve creative",
  },
  {
    id: 3,
    name: "Name",
    account: "Client name",
    type: "Agency",
    status: "Pending",
    active: true,
    impressions: "35K",
    dates: "15.10.25 - ongoing",
    notes: "Needs Clien's Info",
  },
];

// --- Components ---

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
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors group",
                  isActive
                    ? "bg-sidebar-primary text-white"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-sidebar-foreground/60 group-hover:text-white")} />
                <span className="hidden md:block text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border/50">
         {/* Bottom Actions */}
         <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="hidden md:block text-sm">Updates</span>
             </div>
             <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer">
                <User className="w-5 h-5" />
                <span className="hidden md:block text-sm">Profile</span>
             </div>
             <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer">
                <LogOut className="w-5 h-5" />
                <span className="hidden md:block text-sm">Log Out</span>
             </div>
         </div>
      </div>
    </div>
  );
};

const TopBar = () => {
  return (
    <header className="h-16 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-6 md:px-8 ml-20 md:ml-64">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sidebar-foreground/50" />
                <input 
                    type="text" 
                    placeholder="search" 
                    className="w-full bg-sidebar-accent/50 text-sidebar-foreground pl-10 pr-4 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sidebar-primary border-none"
                />
            </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
            <div className="bg-orange-500/10 border border-orange-500/20 text-orange-500 px-3 py-1.5 rounded flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-orange-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
                <span className="text-sm font-medium">Admin</span>
            </div>
        </div>
    </header>
  );
};

const KPICard = ({ data }: { data: typeof kpiData[0] }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50 flex flex-col justify-between h-40 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-muted-foreground">{data.title}</h3>
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", data.color)}>
                    {data.icon === "file" && <div className="w-5 h-5 border-2 border-current rounded-sm" />}
                    {data.icon === "users" && <Users className="w-5 h-5" />}
                    {data.icon === "refresh-ccw" && <RefreshCw className="w-5 h-5" />}
                </div>
            </div>
            
            <div>
                <div className="text-2xl font-bold text-slate-900 mb-2">{data.value}</div>
                <div className="flex items-center gap-2 text-xs">
                    {data.changeType === "positive" ? (
                        <span className="text-green-500 font-medium flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-0.5" />
                            {data.change.split(' ')[0]}
                        </span>
                    ) : (
                        <span className="text-orange-400 font-medium">
                           <Lightbulb className="w-3 h-3 inline mr-1" />
                        </span>
                    )}
                    <span className="text-muted-foreground line-clamp-1">
                        {data.changeType === "positive" ? data.change.split(' ').slice(1).join(' ') : data.change}
                    </span>
                </div>
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-sidebar text-white text-xs py-1 px-2 rounded shadow-lg">
          <p className="font-medium">{`${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

const Dashboard = () => {
  const [location] = useLocation();
  const isImpersonating = new URLSearchParams(window.location.search).get("impersonate") === "true";

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Sidebar />
      <TopBar />
      
      <main className="ml-20 md:ml-64 p-6 md:p-8 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-muted-foreground text-sm">text text text text text text text text</p>
                {isImpersonating && (
                  <div className="flex items-center gap-2 mt-2 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="bg-orange-50 border border-orange-100 px-2 py-0.5 rounded flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span className="text-[11px] font-medium text-orange-600">Advertiser's name view</span>
                    </div>
                    <Link href="/">
                      <span className="text-[11px] font-medium text-slate-400 hover:text-slate-600 cursor-pointer underline underline-offset-2">Exit mode</span>
                    </Link>
                  </div>
                )}
            </div>
            {isImpersonating && (
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
                new Campaign
              </button>
            )}
        </div>

        {/* User Specific Metrics (shown when impersonating or normally) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: "Active Accounts", value: "8", change: "you have 2 drafts that wait for an update", color: "bg-blue-50 text-blue-500" },
              { title: "Active Campaigns", value: "4", change: "you have 2 drafts that wait for an update", color: "bg-blue-50 text-blue-500" },
              { title: "Total Reach", value: "10,293", change: "1.3% Up from past week", type: "pos", color: "bg-teal-50 text-teal-500" },
              { title: "Spend this month", value: "$350.4", change: "+10% from last month", type: "pos", color: "bg-orange-50 text-orange-500" },
              { title: "Average CPM", value: "$642.39", change: "1.3% Down from last month", type: "neg", color: "bg-slate-50 text-slate-500" },
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-border/50 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{kpi.title}</h3>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", kpi.color)}>
                    {i < 2 ? <div className="w-4 h-5 border-2 border-current rounded-sm" /> : 
                     i === 2 ? <Users className="w-4 h-4" /> :
                     i === 3 ? <RefreshCw className="w-4 h-4" /> :
                     <BarChart3 className="w-4 h-4" />}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{kpi.value}</div>
                  <div className="flex items-center gap-1.5 text-[10px] mt-1">
                    {kpi.type === "pos" ? (
                      <span className="text-emerald-500 font-bold flex items-center"><ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />{kpi.change.split(' ')[0]}</span>
                    ) : kpi.type === "neg" ? (
                      <span className="text-red-400 font-bold flex items-center"><ArrowDownRight className="w-2.5 h-2.5 mr-0.5" />{kpi.change.split(' ')[0]}</span>
                    ) : (
                      <span className="text-orange-400"><Lightbulb className="w-2.5 h-2.5 inline mr-1" /></span>
                    )}
                    <span className="text-slate-300 font-medium italic line-clamp-1">
                      {kpi.type ? kpi.change.split(' ').slice(1).join(' ') : kpi.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-slate-700">Total Reach</h3>
                    <div className="flex gap-2">
                        <button className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded flex items-center gap-1 text-slate-400">All projects <ChevronDown className="w-3 h-3" /></button>
                        <button className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded flex items-center gap-1 text-slate-400">2025 <ChevronDown className="w-3 h-3" /></button>
                    </div>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 9 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 9 }} tickFormatter={(v) => `${v/1000}K`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="value" stroke="#f97316" fill="url(#reachGradient)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-slate-700">CPM per Campaign</h3>
                    <div className="flex gap-2">
                        <button className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded flex items-center gap-1 text-slate-400">Campaign name <ChevronDown className="w-3 h-3" /></button>
                        <button className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded flex items-center gap-1 text-slate-400">2025 <ChevronDown className="w-3 h-3" /></button>
                    </div>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData.map(d => ({...d, cpm: Math.random() * 60}))}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#cbd5e1', fontSize: 9 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 9 }} tickFormatter={(v) => `${v}%`} />
                            <Bar dataKey="cpm" fill="#5eead4" radius={[4, 4, 0, 0]} barSize={10} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
            <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h3 className="font-semibold text-slate-900">Campaigns</h3>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <input 
                            type="text" 
                            placeholder="search" 
                            className="bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary w-40"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded flex items-center gap-1 text-slate-600 hover:bg-slate-100">
                        Recent <ChevronDown className="w-3 h-3" />
                    </button>
                    <button className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded flex items-center gap-1 text-slate-600 hover:bg-slate-100">
                        status: <span className="font-medium text-slate-900">Active</span> <ChevronDown className="w-3 h-3" />
                    </button>
                    {isImpersonating && (
                      <button className="bg-slate-900 text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-slate-800 transition-colors">
                        new Campaign
                      </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-muted-foreground font-medium border-b border-border/30">
                        <tr>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Account</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">on/off</th>
                            <th className="px-6 py-3 font-medium">Impressions</th>
                            <th className="px-6 py-3 font-medium">Dates</th>
                            <th className="px-6 py-3 font-medium text-right">More</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {[
                          { name: "Name", account: "Account name", status: "Paused", active: false, impressions: "236K", dates: "02.10.25 - 10.10.25" }
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 group">
                                <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                                <td className="px-6 py-4">
                                  <span className="font-bold text-slate-900 underline underline-offset-4 decoration-slate-200">{row.account}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2.5 py-0.5 rounded text-[10px] font-bold inline-block min-w-[70px] text-center uppercase tracking-wider",
                                        row.status === "Paused" ? "bg-red-100 text-red-500" : "bg-emerald-100 text-emerald-600"
                                    )}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Switch checked={row.active} className="data-[state=checked]:bg-slate-900" />
                                </td>
                                <td className="px-6 py-4 text-slate-400">{row.impressions}</td>
                                <td className="px-6 py-4 text-slate-400 text-xs">{row.dates}</td>
                                <td className="px-6 py-4 text-right text-slate-100 group-hover:text-slate-300">
                                    <MoreHorizontal className="w-4 h-4 ml-auto" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="p-4 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <div>showing 1-5 of 20</div>
                <div className="flex gap-1">
                    <button className="p-1 border border-slate-200 rounded hover:bg-slate-100 transition-colors"><ChevronLeft className="w-3.5 h-3.5" /></button>
                    <button className="p-1 bg-sidebar text-white border border-sidebar rounded hover:bg-sidebar/90 transition-colors"><ChevronRight className="w-3.5 h-3.5" /></button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
