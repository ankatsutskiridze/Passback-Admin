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
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
  Paperclip,
  Link2,
  CheckCircle2,
  XCircle
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
             <div className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer group">
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

const creativesMockData = [
  { id: 1, name: "Name", account: "Client Name", campaign: "Campaign name", type: "File", status: "Active", size: "230 Mb", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=60&fit=crop" },
  { id: 2, name: "Name", account: "Client Name", campaign: "Campaign name", type: "File", status: "Rejected", size: "230 Mb", thumbnail: "https://images.unsplash.com/photo-1551288049-bbbda5366991?w=100&h=60&fit=crop" },
  { id: 3, name: "Name", account: "Client Name", campaign: "Campaign name", type: "File", status: "Active", size: "230 Mb", thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=60&fit=crop" },
  { id: 4, name: "Name", account: "Client Name", campaign: "Campaign name", type: "File", status: "Active", size: "230 Mb", thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=100&h=60&fit=crop" },
  { id: 5, name: "Name", account: "Client Name", campaign: "Campaign name", type: "Link", status: "Pending for approval", size: "-", thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=60&fit=crop" },
];

const CreativesManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      
      <main className="ml-20 md:ml-64 p-6 md:p-8 space-y-6">
        {/* Page Header */}
        <div>
            <h1 className="text-xl font-bold text-slate-900">Creatives Management</h1>
            <p className="text-muted-foreground text-sm mt-1">text text text text text text text text</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-6">
                    <h3 className="font-semibold text-slate-900 whitespace-nowrap">Creatives</h3>
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
                            <th className="px-6 py-3 font-medium"></th>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Related Account</th>
                            <th className="px-6 py-3 font-medium">Related Campaign</th>
                            <th className="px-6 py-3 font-medium">File/Link</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">File Size</th>
                            <th className="px-6 py-3 font-medium text-right">more</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {creativesMockData.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/50 group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Checkbox className="border-slate-300" />
                                        <span className="text-xs text-slate-400 w-4">{row.id}.</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-12 h-8 rounded border border-slate-200 overflow-hidden bg-slate-100 shadow-sm">
                                        <img src={row.thumbnail} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-900">{row.name}</td>
                                <td className="px-6 py-4">
                                    <Link href={`/client/client-${row.id}`}>
                                        <button className="font-bold text-slate-900 hover:underline underline-offset-4 decoration-slate-300">
                                            {row.account}
                                        </button>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="font-bold text-slate-900 hover:underline underline-offset-4 decoration-slate-300">
                                        {row.campaign}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-slate-400 font-normal">
                                        {row.type === "File" ? <Paperclip className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                                        {row.type}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2.5 py-0.5 rounded text-[10px] font-bold inline-block min-w-[75px] text-center uppercase tracking-wider",
                                        row.status === "Active" && "bg-emerald-100 text-emerald-600",
                                        row.status === "Rejected" && "bg-red-100 text-red-500",
                                        row.status === "Pending for approval" && "bg-amber-100 text-amber-500",
                                    )}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500 font-normal">{row.size}</td>
                                <td className="px-6 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="p-1 hover:bg-slate-100 rounded text-muted-foreground transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 p-1">
                                            <DropdownMenuItem className="text-xs py-2 px-3 focus:bg-indigo-50 focus:text-indigo-600">View creative</DropdownMenuItem>
                                            <DropdownMenuItem className="text-xs py-2 px-3">Approve</DropdownMenuItem>
                                            <DropdownMenuItem className="text-xs py-2 px-3">Reject</DropdownMenuItem>
                                            <DropdownMenuItem className="text-xs py-2 px-3">View Campaign</DropdownMenuItem>
                                            <DropdownMenuItem className="text-xs py-2 px-3">Contact Account</DropdownMenuItem>
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

export default CreativesManagement;
