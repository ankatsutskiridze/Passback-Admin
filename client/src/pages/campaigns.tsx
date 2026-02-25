import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
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
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
  Globe,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Components (Shared Layout) ---

const Sidebar = () => {
  const [location] = useLocation();
  const { logout } = useAuth();

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
         <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer group">
                <Bell className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-white" />
                <span className="hidden md:block text-sm font-medium">Updates</span>
             </div>
             <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer group">
                <User className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-white" />
                <span className="hidden md:block text-sm font-medium">Profile</span>
             </div>
             <div onClick={logout} className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer group">
                <LogOut className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-white" />
                <span className="hidden md:block text-sm font-medium">Log Out</span>
             </div>
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
                <input 
                    type="text" 
                    placeholder="search" 
                    className="w-full bg-sidebar-accent/50 text-sidebar-foreground pl-10 pr-4 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sidebar-primary border-none"
                />
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="bg-orange-500/10 border border-orange-500/20 text-orange-500 px-3 py-1.5 rounded flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-orange-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
                <span className="text-sm font-medium text-orange-500">Admin</span>
            </div>
        </div>
    </header>
  );
};

// --- Page Content ---

const campaignsMockData = [
  { id: 1, name: "Name", target: "National", status: "Paused", client: "Client Name", budget: "20K", dates: "02.10.25 - 10.10.25", creative: "Pending for approval" },
  { id: 2, name: "Name", target: "Local", status: "Active", client: "Client Name", budget: "20K", dates: "15.10.25 - ongoing", creative: "Approved" },
  { id: 3, name: "Name", target: "Local", status: "Active", client: "Client Name", budget: "20K", dates: "15.10.25 - ongoing", creative: "Pending for approval" },
  { id: 4, name: "Name", target: "National", status: "Draft", client: "Client Name", budget: "20K", dates: "-", creative: "Pending for approval" },
  { id: 5, name: "Name", target: "National", status: "Ended", client: "Client Name", budget: "20K", dates: "01.09.25 - 25.09.25", creative: "Rejected" },
  { id: 6, name: "Name", target: "National", status: "Pending", client: "Client Name", budget: "20K", dates: "22.10.25", creative: "Approved" },
  { id: 7, name: "Name", target: "Local", status: "Ended", client: "Client Name", budget: "20K", dates: "01.09.25 - 25.09.25", creative: "Approved" },
  { id: 8, name: "Name", target: "Local", status: "Ended", client: "Client Name", budget: "20K", dates: "01.09.25 - 25.09.25", creative: "Approved" },
];

const CampaignsManagement = () => {
  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Sidebar />
      <TopBar />
      
      <main className="ml-20 md:ml-64 p-6 md:p-8 space-y-6">
        {/* Page Header */}
        <div>
            <h1 className="text-xl font-bold text-slate-900">Campaigns Management</h1>
            <p className="text-muted-foreground text-sm mt-1">text text text text text text text text</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-6">
                    <h3 className="font-semibold text-slate-900 whitespace-nowrap">Campaigns</h3>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded border border-transparent hover:border-slate-200 transition-all">
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded border border-transparent hover:border-slate-200 transition-all">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approve
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-end gap-3">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <input 
                            type="text" 
                            placeholder="search" 
                            className="bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-48"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded flex items-center justify-between gap-4 text-slate-600 hover:bg-slate-50 min-w-[120px]">
                            This Month <ChevronDown className="w-3 h-3 text-slate-400" />
                        </button>
                        <button className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded flex items-center justify-between gap-4 text-slate-600 hover:bg-slate-50 min-w-[120px]">
                            <span>status: <span className="font-bold text-slate-900 ml-1">Active</span></span>
                            <ChevronDown className="w-3 h-3 text-slate-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-muted-foreground font-medium border-b border-border/30">
                        <tr>
                            <th className="px-6 py-3 w-12">
                                <Checkbox className="border-slate-300" />
                            </th>
                            <th className="px-6 py-3 font-medium">name</th>
                            <th className="px-6 py-3 font-medium">Campaign target</th>
                            <th className="px-6 py-3 font-medium">status</th>
                            <th className="px-6 py-3 font-medium">Related Client</th>
                            <th className="px-6 py-3 font-medium">Budget</th>
                            <th className="px-6 py-3 font-medium">dates</th>
                            <th className="px-6 py-3 font-medium">Creative Status</th>
                            <th className="px-6 py-3 font-medium text-right">more</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {campaignsMockData.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/50 group">
                                <td className="px-6 py-4">
                                    <Checkbox className="border-slate-300" />
                                </td>
                                <td className="px-6 py-4">
                                    <button className="font-medium text-slate-900 hover:underline decoration-slate-300 underline-offset-4">
                                        {row.name}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        {row.target === "National" ? (
                                            <Globe className="w-4 h-4 text-orange-200" />
                                        ) : (
                                            <MapPin className="w-4 h-4 text-orange-200" />
                                        )}
                                        <span className="text-slate-400 font-normal">{row.target}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-3 py-1 rounded text-[10px] font-bold inline-block min-w-[75px] text-center uppercase tracking-wider",
                                        row.status === "Paused" && "bg-red-100 text-red-500",
                                        row.status === "Active" && "bg-emerald-100 text-emerald-600",
                                        row.status === "Draft" && "bg-slate-100 text-slate-400",
                                        row.status === "Ended" && "bg-indigo-100 text-indigo-500",
                                        row.status === "Pending" && "bg-amber-100 text-amber-500",
                                    )}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/client/client-${row.id}`}>
                                        <button className="text-slate-900 font-medium hover:underline decoration-slate-300 underline-offset-4">
                                            {row.client}
                                        </button>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">{row.budget}</td>
                                <td className="px-6 py-4 text-slate-500 text-xs">{row.dates}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full",
                                            row.creative === "Approved" && "bg-emerald-500",
                                            row.creative === "Pending for approval" && "bg-amber-400",
                                            row.creative === "Rejected" && "bg-red-500"
                                        )} />
                                        <span className={cn(
                                            "text-xs font-medium",
                                            row.creative === "Approved" && "text-emerald-600",
                                            row.creative === "Pending for approval" && "text-amber-500",
                                            row.creative === "Rejected" && "text-red-500"
                                        )}>
                                            {row.creative}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="p-1 hover:bg-slate-100 rounded text-muted-foreground transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 p-1">
                                            <DropdownMenuItem className="text-xs py-2 px-3 focus:bg-indigo-50 focus:text-indigo-600">View Campaign</DropdownMenuItem>
                                            <DropdownMenuItem className="text-xs py-2 px-3">Approve</DropdownMenuItem>
                                            <DropdownMenuItem className="text-xs py-2 px-3">Reject</DropdownMenuItem>
                                            <DropdownMenuItem className="text-xs py-2 px-3">View Creative</DropdownMenuItem>
                                            <DropdownMenuItem className="text-xs py-2 px-3">Contact Agency</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="p-4 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground bg-white">
                <div>showing 1-5 of 20</div>
                <div className="flex gap-1">
                    <button className="p-1 border border-slate-200 rounded hover:bg-slate-100 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-1 bg-sidebar text-white border border-sidebar rounded hover:bg-sidebar/90 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignsManagement;
