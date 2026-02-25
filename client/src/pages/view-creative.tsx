import { useLocation, Link, useParams } from "wouter";
import { useAuth } from "@/lib/auth-context";
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
  Search,
  ChevronLeft,
  Paperclip,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Creative } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";

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
        <div onClick={logout} className="flex items-center gap-3 px-4 py-2 text-sidebar-foreground/70 hover:text-white cursor-pointer group">
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

export default function ViewCreative() {
  const { id, creativeId } = useParams<{ id: string; creativeId: string }>();
  const [, setLocation] = useLocation();

  const { data: creative, isLoading } = useQuery<Creative>({
    queryKey: ["/creatives", creativeId],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!creativeId,
  });

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Sidebar />
      <TopBar />
      
      <main className="ml-20 md:ml-64 p-6 md:p-8 space-y-6">
        {/* Breadcrumbs Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLocation(`/client/${id}`)}
            className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            data-testid="button-back-to-client"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-900">View Creative</h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-0.5">
              <span>Client profile</span>
              <span>/</span>
              <span>creative</span>
              <span>/</span>
              <span className="text-slate-600 font-bold tracking-tight" data-testid="text-creative-name">
                {isLoading ? "Loading..." : creative?.name || "creative name"}
              </span>
            </div>
          </div>
        </div>

        {/* Creative Detail Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Preview */}
            <div className="w-full lg:w-1/3 aspect-video relative group cursor-pointer overflow-hidden rounded-xl border border-slate-100 shadow-sm">
              <img 
                src={creative?.preview || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"} 
                alt="Creative Preview" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                data-testid="img-creative-preview"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  <Play className="w-5 h-5 text-slate-900 fill-slate-900 ml-0.5" />
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-slate-900" data-testid="text-creative-name-title">
                    {isLoading ? "Loading..." : creative?.name || "Creative name"}
                  </h2>
                  <div className="flex items-center gap-1.5 text-orange-400 font-bold text-xs" data-testid="badge-status">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    {isLoading ? "..." : creative?.status || "Pending for approval"}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Related Campaign</p>
                    <p className="text-sm font-bold text-slate-800 underline decoration-slate-200 underline-offset-4 hover:text-slate-900 cursor-pointer" data-testid="text-campaign-name">
                      {isLoading ? "Loading..." : creative?.campaignName || "Campaign name"}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Date</p>
                    <p className="text-sm font-bold text-slate-800 tracking-tight" data-testid="text-date">
                      {isLoading ? "Loading..." : creative?.date || "DD/MM/YYYY"}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Size</p>
                    <p className="text-sm font-bold text-slate-800 tracking-tight" data-testid="text-file-size">
                      {isLoading ? "Loading..." : creative?.fileSize || "320 Mb"}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Type</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800" data-testid="text-file-type">
                      <Paperclip className="w-4 h-4 text-slate-400" />
                      {isLoading ? "Loading..." : creative?.fileType || "File"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-10">
                <button 
                  className="bg-slate-900 text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md shadow-slate-200 active:scale-95"
                  data-testid="button-approve"
                >
                  Approve
                </button>
                <button 
                  className="bg-slate-50 text-slate-600 border border-slate-200 px-8 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 transition-all active:scale-95"
                  data-testid="button-reject"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
