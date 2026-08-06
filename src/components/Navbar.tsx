import React from "react";
import { Cpu, Bookmark, Sparkles, RefreshCw, Layers, Info, User } from "lucide-react";

interface NavbarProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenAbout: () => void;
  onOpenAboutMe: () => void;
  onReset: () => void;
  aiStatus: "online" | "offline" | "checking";
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  onOpenSaved,
  onOpenAbout,
  onOpenAboutMe,
  onReset,
  aiStatus,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <button 
          onClick={onReset}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30 group-hover:bg-indigo-500 transition-all">
            M
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                MAKERMIND
              </span>
              <span className="text-slate-500 font-normal text-[10px] ml-2.5 uppercase tracking-widest hidden sm:inline">
                v2.5 Blueprint Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block uppercase tracking-wider font-semibold">
              Dynamic STEM School & College Generator
            </p>
          </div>
        </button>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
          {/* AI Engine Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className={`w-2 h-2 rounded-full ${
              aiStatus === "online" 
                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" 
                : aiStatus === "checking"
                ? "bg-amber-400 animate-ping"
                : "bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
            }`} />
            <span className="text-slate-300">
              {aiStatus === "online" 
                ? "Live AI Engine" 
                : aiStatus === "checking"
                ? "Connecting..."
                : "Offline Engine"}
            </span>
          </div>

          {/* About Me Trigger Button */}
          <button
            onClick={onOpenAboutMe}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-800/80 text-indigo-300 hover:text-white transition-all cursor-pointer text-xs font-semibold"
            title="About Me (Astha - astha5517o@gmail.com)"
          >
            <User className="w-4 h-4 text-emerald-400" />
            <span>About Me</span>
          </button>

          {/* About Engine Trigger Button */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer text-xs font-semibold"
            title="About MakerMind Engine Specs"
          >
            <Info className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Engine</span>
          </button>

          {/* Saved Blueprints Trigger */}
          <button
            onClick={onOpenSaved}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
