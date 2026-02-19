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
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
          const isActive = location === item.href;
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
          <span className="text-sm font-medium text-orange-500">Admin</span>
        </div>
      </div>
    </header>
  );
};

// --- Page Content ---

const transactionsData = [
  { id: 1, status: "Paid", date: "Nov 20, 2025", method: "XXXX - XX83", amount: "2,500$", campaign: "Campaign Name", client: "Client Name" },
  { id: 2, status: "Open", date: "Nov 20, 2025", method: "XXXX - XX83", amount: "2,500$", campaign: "Campaign Name", client: "Client Name" },
  { id: 3, status: "Delayed", date: "Nov 20, 2025", method: "XXXX - XX83", amount: "2,500$", campaign: "Campaign Name", client: "Client Name" },
  { id: 4, status: "Delayed", date: "Nov 20, 2025", method: "XXXX - XX83", amount: "2,500$", campaign: "Campaign Name", client: "Client Name" },
  { id: 5, status: "Paid", date: "Nov 20, 2025", method: "XXXX - XX83", amount: "2,500$", campaign: "Campaign Name", client: "Client Name" },
];

const BillingFinance = () => {
  const [activeTab, setActiveTab] = useState("Transactions log");
  const [specialCost, setSpecialCost] = useState("Other");

  return (
    <div className="min-h-screen bg-background text-slate-900 font-sans">
      <Sidebar />
      <TopBar />
      
      <main className="ml-20 md:ml-64 p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold">Billing&Finance Management</h1>
          <p className="text-muted-foreground text-sm mt-1">text text text text text text text text</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          {["Transactions log", "Credit Limit"].map((tab) => (
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

        {activeTab === "Transactions log" ? (
          /* Table Card */
          <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden animate-in fade-in duration-500">
              <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                      <h3 className="font-semibold text-slate-900">Transactions log</h3>
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
                      <button className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded flex items-center justify-between gap-6 text-slate-600 hover:bg-slate-50">
                          Recent <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>
                      <button className="bg-slate-900 text-white px-6 py-1.5 rounded text-xs font-medium hover:bg-slate-800 transition-colors">
                          Export
                      </button>
                  </div>
              </div>

              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-muted-foreground font-medium border-b border-border/30">
                          <tr>
                              <th className="px-6 py-3 font-medium w-12 text-center"></th>
                              <th className="px-6 py-3 font-medium">Status</th>
                              <th className="px-6 py-3 font-medium">Date</th>
                              <th className="px-6 py-3 font-medium">Payment method</th>
                              <th className="px-6 py-3 font-medium">Amount</th>
                              <th className="px-6 py-3 font-medium">Campaign</th>
                              <th className="px-6 py-3 font-medium">Client</th>
                              <th className="px-6 py-3 font-medium text-right">more</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                          {transactionsData.map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50/50 group">
                                  <td className="px-6 py-5 text-xs text-slate-400 text-center">{row.id}.</td>
                                  <td className="px-6 py-5">
                                      <div className="flex items-center gap-2">
                                          <div className={cn(
                                              "w-1.5 h-1.5 rounded-full",
                                              row.status === "Paid" && "bg-emerald-500",
                                              row.status === "Open" && "bg-red-400",
                                              row.status === "Delayed" && "bg-amber-400"
                                          )} />
                                          <span className={cn(
                                              "text-xs font-medium",
                                              row.status === "Paid" && "text-emerald-500",
                                              row.status === "Open" && "text-red-400",
                                              row.status === "Delayed" && "text-amber-400"
                                          )}>
                                              {row.status}
                                          </span>
                                      </div>
                                  </td>
                                  <td className="px-6 py-5">
                                      <button className="font-bold text-slate-900 hover:underline decoration-slate-300 underline-offset-4">
                                          {row.date}
                                      </button>
                                  </td>
                                  <td className="px-6 py-5 text-slate-400 font-normal">{row.method}</td>
                                  <td className="px-6 py-5 font-bold text-slate-900">{row.amount}</td>
                                  <td className="px-6 py-5">
                                      <button className="text-slate-500 hover:text-slate-900 hover:underline decoration-slate-300 underline-offset-4 font-normal">
                                          {row.campaign}
                                      </button>
                                  </td>
                                  <td className="px-6 py-5">
                                      <button className="text-slate-500 hover:text-slate-900 hover:underline decoration-slate-300 underline-offset-4 font-normal">
                                          {row.client}
                                      </button>
                                  </td>
                                  <td className="px-6 py-5 text-right">
                                      <button className="text-orange-400 text-xs font-medium hover:underline flex items-center justify-end gap-1 ml-auto">
                                          Download
                                      </button>
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
        ) : (
          /* Credit Limit Content */
          <div className="space-y-6 max-w-md animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Set Special Cost Card */}
            <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-orange-400">Set Special Cost</h3>
                <p className="text-xs text-slate-400">Lorem Ipsum</p>
              </div>

              <RadioGroup 
                defaultValue={specialCost} 
                onValueChange={setSpecialCost}
                className="flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="5$" id="cost-5" className="border-slate-300 text-slate-900" />
                  <Label htmlFor="cost-5" className="text-sm text-slate-500 font-normal cursor-pointer">5 $</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="7$" id="cost-7" className="border-slate-300 text-slate-900" />
                  <Label htmlFor="cost-7" className="text-sm text-slate-500 font-normal cursor-pointer">7 $</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="10$" id="cost-10" className="border-slate-300 text-slate-900" />
                  <Label htmlFor="cost-10" className="text-sm text-slate-500 font-normal cursor-pointer">10 $</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Other" id="cost-other" className="border-slate-300 text-slate-900" />
                  <Label htmlFor="cost-other" className="text-sm text-slate-500 font-normal cursor-pointer">Other</Label>
                </div>
              </RadioGroup>

              {specialCost === "Other" && (
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex-1">
                    <Input 
                      placeholder="Amount ($)" 
                      className="bg-white border-slate-200 text-xs h-10 px-4 placeholder:text-slate-300"
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Per</span>
                  <button className="flex items-center justify-between gap-4 border border-slate-200 rounded px-4 h-10 text-xs text-slate-600 font-medium min-w-[80px]">
                    CPM
                  </button>
                </div>
              )}

              <button className="bg-slate-900 text-white px-6 py-2 rounded text-xs font-semibold hover:bg-slate-800 transition-colors w-fit mt-2">
                Activate
              </button>
            </div>

            {/* Coupon & Credits Card */}
            <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-orange-400">Coupon&Credits</h3>
                <p className="text-xs text-slate-400">Load Coupons to Client's Profile</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1">
                  <Input 
                    placeholder="Code" 
                    className="bg-white border-slate-200 text-xs h-10 px-4 placeholder:text-slate-300"
                  />
                </div>
                <button className="bg-slate-900 text-white px-8 py-2.5 rounded text-xs font-bold hover:bg-slate-800 transition-colors">
                  Activate
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BillingFinance;
