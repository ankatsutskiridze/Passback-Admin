import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
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
  Mail,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getQueryFn } from "@/lib/queryClient";
import type { Client } from "@shared/schema";

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

const AccountsManagement = () => {
  const [activeTab, setActiveTab] = useState("Advertiser");
  
  // Fetch clients from API
  const { data: allClients = [], isLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Filter clients by role based on activeTab
  const filteredClients = allClients.filter((client) => {
    const clientRole = client.role?.toLowerCase() || "agency";
    const tabRole = activeTab.toLowerCase();
    return clientRole === tabRole;
  });

  // Map status display values
  const getStatusDisplay = (status: string | null | undefined) => {
    if (!status) return "Active";
    const statusLower = status.toLowerCase();
    if (statusLower === "suspended") return "Restricted";
    return "Active";
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      
      <main className="ml-20 md:ml-64 p-6 md:p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-xl font-bold text-slate-900">Accounts Management</h1>
                <p className="text-muted-foreground text-sm">text text text text text text text text</p>
            </div>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                Add Account
            </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-transparent">
            {["Advertiser", "Agency"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                        "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                        activeTab === tab 
                        ? "bg-slate-200 text-slate-900" 
                        : "text-muted-foreground hover:text-slate-600"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
            <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h3 className="font-semibold text-slate-900">All {activeTab}s</h3>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <input 
                            type="text" 
                            placeholder="search" 
                            className="bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary w-48"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded flex items-center gap-1 text-slate-600 hover:bg-slate-100">
                        Recent <ChevronDown className="w-3 h-3 text-slate-400" />
                    </button>
                    <button className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded flex items-center gap-1 text-slate-600 hover:bg-slate-100">
                        status: <span className="font-medium text-slate-900">Active</span> <ChevronDown className="w-3 h-3 text-slate-400" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-muted-foreground font-medium border-b border-border/30">
                        <tr>
                            <th className="px-6 py-3 font-medium w-16"></th>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Publish Permission</th>
                            <th className="px-6 py-3 font-medium">Contact Person</th>
                            <th className="px-6 py-3 font-medium">Budget balance</th>
                            <th className="px-6 py-3 font-medium">Registration Date</th>
                            <th className="px-6 py-3 font-medium text-right">more</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {isLoading ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                                    Loading clients...
                                </td>
                            </tr>
                        ) : filteredClients.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                                    No {activeTab.toLowerCase()}s found.
                                </td>
                            </tr>
                        ) : (
                            filteredClients.map((client, index) => {
                                const displayStatus = getStatusDisplay(client.status);
                                return (
                                    <tr key={client.id} className="hover:bg-slate-50/50 group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-muted-foreground w-4">{index + 1}.</span>
                                                <Link href={`/client/${client.id}`}>
                                                    <Avatar className="w-8 h-8 rounded-full border border-slate-100 cursor-pointer hover:opacity-80 transition-opacity">
                                                        {client.avatar ? (
                                                            <AvatarImage src={client.avatar} />
                                                        ) : (
                                                            <AvatarFallback className="bg-slate-200 text-[10px] text-slate-500 font-bold uppercase">
                                                                {client.name?.slice(0, 2).toUpperCase() || "AC"}
                                                            </AvatarFallback>
                                                        )}
                                                    </Avatar>
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-900">
                                            <Link href={`/client/${client.id}`}>
                                                <span className="cursor-pointer hover:underline decoration-slate-300 underline-offset-4">{client.name}</span>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-0.5 rounded text-[11px] font-semibold inline-block min-w-[70px] text-center uppercase tracking-tight",
                                                displayStatus === "Restricted" ? "bg-red-100 text-red-500" : "bg-emerald-100 text-emerald-600"
                                            )}>
                                                {displayStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Switch checked={false} className="data-[state=checked]:bg-slate-900" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <Link href={`/client/${client.id}`}>
                                                    <div className="flex items-center gap-1.5 font-medium text-slate-900 cursor-pointer hover:underline decoration-slate-300 underline-offset-4">
                                                        <User className="w-3 h-3 text-slate-400" />
                                                        {client.contactPerson || client.name}
                                                    </div>
                                                </Link>
                                                {client.contactPhone || client.email ? (
                                                    <div className="flex flex-col mt-0.5 ml-4.5 text-[10px] text-muted-foreground/80 leading-tight">
                                                        <span>{client.contactPhone} {client.contactPhone && client.email ? "|" : ""} {client.email}</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">2,500$</td>
                                        <td className="px-6 py-4 text-muted-foreground text-xs">{client.registrationDate || "DD/MM/YYYY"}</td>
                                        <td className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="p-1 hover:bg-slate-100 rounded text-muted-foreground">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <Link href={`/client/${client.id}`}>
                                                        <DropdownMenuItem className="text-xs cursor-pointer">View Profile</DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem className="text-xs">Edit</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-xs">Reset password</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-xs">Suspend</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-xs">Impersonate</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-xs">Load Coupon</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="p-4 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground bg-white">
                <div>showing 1-5 of 20</div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-1 text-slate-400">
                        <span className="text-slate-900 font-bold">1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                    </div>
                    <div className="flex gap-1">
                        <button className="p-1 border border-slate-200 rounded hover:bg-slate-100 transition-colors"><ChevronLeft className="w-3.5 h-3.5" /></button>
                        <button className="p-1 bg-sidebar text-white border border-sidebar rounded hover:bg-sidebar/90 transition-colors"><ChevronRight className="w-3.5 h-3.5" /></button>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AccountsManagement;
