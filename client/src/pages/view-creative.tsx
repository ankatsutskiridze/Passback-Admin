import { useLocation, useParams } from "wouter";
import { 
  ChevronLeft,
  Paperclip,
  Play
} from "lucide-react";

export default function ViewCreative({ isNested = false }) {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (isNested) {
      setLocation(`/client/${id}`);
    } else {
      setLocation(`/client/${id}`);
    }
  };

  const content = (
    <>
      {/* Breadcrumbs Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
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
            <span className="text-slate-600 font-bold tracking-tight">creative name</span>
          </div>
        </div>
      </div>

      {/* Creative Detail Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Preview */}
          <div className="w-full lg:w-1/3 aspect-video relative group cursor-pointer overflow-hidden rounded-xl border border-slate-100 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" 
              alt="Creative Preview" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                <h2 className="text-2xl font-bold text-slate-900">Creative name</h2>
                <div className="flex items-center gap-1.5 text-orange-400 font-bold text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Pending for approval
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Related Campaign</p>
                  <p className="text-sm font-bold text-slate-800 underline decoration-slate-200 underline-offset-4 hover:text-slate-900 cursor-pointer">Campaign name</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Date</p>
                  <p className="text-sm font-bold text-slate-800 tracking-tight">DD/MM/YYYY</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Size</p>
                  <p className="text-sm font-bold text-slate-800 tracking-tight">320 Mb</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Type</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Paperclip className="w-4 h-4 text-slate-400" />
                    File
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-10">
              <button className="bg-slate-900 text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md shadow-slate-200 active:scale-95">
                Approve
              </button>
              <button className="bg-slate-50 text-slate-600 border border-slate-200 px-8 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 transition-all active:scale-95">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (isNested) {
    return content;
  }

  // This part is redundant since we are using isNested=true in ClientProfile, 
  // but keeping it for direct route access just in case.
  return (
    <div className="min-h-screen bg-background text-slate-900">
      <main className="p-6 md:p-8 space-y-6">
        {content}
      </main>
    </div>
  );
}
