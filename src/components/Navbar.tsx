import React, { useState } from "react";
import { 
  Cpu, 
  Bookmark, 
  Sparkles, 
  RefreshCw, 
  Layers, 
  Info, 
  User, 
  Lightbulb, 
  LogOut, 
  LogIn, 
  ShieldCheck, 
  CloudCheck, 
  Award,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import appIconUrl from "../assets/images/makermind_app_icon_1786532760729.jpg";

interface NavbarProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenAbout: () => void;
  onOpenAboutMe: () => void;
  onOpenPrompts: () => void;
  onOpenAuth: () => void;
  onReset: () => void;
  aiStatus: "online" | "offline" | "checking";
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  onOpenSaved,
  onOpenAbout,
  onOpenAboutMe,
  onOpenPrompts,
  onOpenAuth,
  onReset,
  aiStatus,
}) => {
  const { user, userProfile, signOutUser } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <button 
          onClick={onReset}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-indigo-500/40 shadow-lg shadow-indigo-600/20 group-hover:border-emerald-400 group-hover:scale-105 transition-all">
            <img 
              src={appIconUrl} 
              alt="MakerMind Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                MAKERMIND
              </span>
              <span className="text-slate-500 font-normal text-[10px] ml-2.5 uppercase tracking-widest hidden sm:inline">
                Exhibition Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block uppercase tracking-wider font-semibold">
              STEM Blueprint & Prototype Builder
            </p>
          </div>
        </button>

        {/* Center / Right Status & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {/* Exhibition Prompts Button */}
          <button
            onClick={onOpenPrompts}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 to-emerald-500/15 hover:from-amber-500/25 hover:to-emerald-500/25 border border-amber-500/30 text-amber-300 hover:text-white transition-all cursor-pointer shadow-sm"
            title="Browse Award-Winning Exhibition Prompts"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Exhibition Prompts</span>
          </button>

          {/* AI Engine Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
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

          {/* Saved Blueprints Trigger */}
          <button
            onClick={onOpenSaved}
            className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Saved</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                {savedCount}
              </span>
            )}
          </button>

          {/* Auth Button or User Profile Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/40 text-slate-200 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500 flex items-center justify-center text-white text-[11px] font-bold">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    (user.displayName || userProfile?.name || "S").charAt(0).toUpperCase()
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[11px] font-bold text-white leading-tight">
                    {user.displayName || userProfile?.name || "Student"}
                  </span>
                  <span className="text-[9px] text-emerald-400 lowercase tracking-normal">
                    Cloud Synced
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 space-y-1 z-50 text-slate-200 animate-fadeIn"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <div className="p-2 border-b border-slate-800 text-left">
                    <p className="text-xs font-bold text-white">{user.displayName || userProfile?.name || "Student Account"}</p>
                    <p className="text-[10px] text-slate-400 lowercase truncate">{user.email || "Guest Scholar"}</p>
                    {userProfile?.institution && (
                      <p className="text-[10px] text-indigo-400 mt-1 truncate">{userProfile.institution}</p>
                    )}
                  </div>

                  <button
                    onClick={onOpenAboutMe}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 text-left transition-colors"
                  >
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>My Scholar Profile</span>
                  </button>

                  <button
                    onClick={signOutUser}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-rose-500/20 text-rose-300 text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer text-xs font-semibold shadow-md shadow-indigo-600/20"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

