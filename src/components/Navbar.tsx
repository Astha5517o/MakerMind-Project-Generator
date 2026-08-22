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
  ChevronDown,
  Globe,
  Coins
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { 
  SupportedRegion, 
  SupportedLanguage, 
  SupportedCurrency 
} from "../types";
import { 
  REGIONS_CONFIG, 
  CURRENCIES_CONFIG, 
  UI_TRANSLATIONS 
} from "../data/internationalization";
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
  currentRegion: SupportedRegion;
  onSelectRegion: (region: SupportedRegion) => void;
  currentCurrency: SupportedCurrency;
  onSelectCurrency: (currency: SupportedCurrency) => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
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
  currentRegion,
  onSelectRegion,
  currentCurrency,
  onSelectCurrency,
  currentLanguage,
  onSelectLanguage
}) => {
  const { user, userProfile, signOutUser } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

  const regionDetail = REGIONS_CONFIG[currentRegion] || REGIONS_CONFIG.global;
  const currencyDetail = CURRENCIES_CONFIG[currentCurrency] || CURRENCIES_CONFIG.INR;
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <button 
          onClick={onReset}
          className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none cursor-pointer shrink-0"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-indigo-500/40 shadow-lg shadow-indigo-600/20 group-hover:border-emerald-400 group-hover:scale-105 transition-all">
            <img 
              src={appIconUrl} 
              alt="MakerMind Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                MAKERMIND
              </span>
              <span className="text-slate-500 font-bold text-[9px] sm:text-[10px] ml-2 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 uppercase tracking-widest hidden sm:inline">
                Global STEM Lab
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden md:block uppercase tracking-wider font-semibold">
              Real Project Blueprint & Execution Roadmap
            </p>
          </div>
        </button>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          
          {/* Region / Country Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRegionMenu(!showRegionMenu);
                setShowCurrencyMenu(false);
                setShowProfileMenu(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Change Country & Educational System"
            >
              <span className="text-base leading-none">{regionDetail.flag}</span>
              <span className="hidden lg:inline text-[11px] font-semibold text-slate-300">
                {regionDetail.countryName.split("(")[0].trim()}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRegionMenu && (
              <div 
                className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-72 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-fadeIn"
                onClick={() => setShowRegionMenu(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800/80">
                  <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Select Country & Education System</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Adapts grade naming (e.g. Japan 高校 11/12, China 高中, US High School)
                  </p>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-1 p-1">
                  {(Object.keys(REGIONS_CONFIG) as SupportedRegion[]).map((rKey) => {
                    const reg = REGIONS_CONFIG[rKey];
                    const active = currentRegion === rKey;
                    return (
                      <button
                        key={rKey}
                        onClick={() => {
                          onSelectRegion(rKey);
                          onSelectCurrency(reg.defaultCurrency);
                          onSelectLanguage(reg.defaultLanguage);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                          active 
                            ? "bg-slate-800 border border-indigo-500/50 text-white font-bold" 
                            : "hover:bg-slate-900 text-slate-300 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{reg.flag}</span>
                          <div>
                            <p className="text-xs font-bold text-slate-200">{reg.countryName}</p>
                            <p className="text-[10px] text-slate-400">{reg.scienceFairName.substring(0, 32)}...</p>
                          </div>
                        </div>
                        {active && (
                          <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-black">
                            ACTIVE
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCurrencyMenu(!showCurrencyMenu);
                setShowRegionMenu(false);
                setShowProfileMenu(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Switch BOM Currency"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-emerald-400">{currencyDetail.symbol}</span>
              <span className="text-[11px] hidden sm:inline">{currencyDetail.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showCurrencyMenu && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-1.5 space-y-1 z-50 animate-fadeIn"
                onClick={() => setShowCurrencyMenu(false)}
              >
                <div className="px-2.5 py-1.5 border-b border-slate-800/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Currency (BOM Pricing)
                </div>
                {(Object.keys(CURRENCIES_CONFIG) as SupportedCurrency[]).map((cKey) => {
                  const curr = CURRENCIES_CONFIG[cKey];
                  const active = currentCurrency === cKey;
                  return (
                    <button
                      key={cKey}
                      onClick={() => onSelectCurrency(cKey)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                        active 
                          ? "bg-slate-800 text-white font-bold" 
                          : "hover:bg-slate-900 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-400 w-4 text-center">{curr.symbol}</span>
                        <span>{curr.code}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{curr.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Exhibition Prompts Button */}
          <button
            onClick={onOpenPrompts}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/15 to-emerald-500/15 hover:from-amber-500/25 hover:to-emerald-500/25 border border-amber-500/30 text-amber-300 hover:text-white transition-all cursor-pointer shadow-sm"
            title="Browse Award-Winning Exhibition Prompts"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">{t.exhibitionPrompts || "Prompts"}</span>
          </button>

          {/* Saved Blueprints Trigger */}
          <button
            onClick={onOpenSaved}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">{t.savedBlueprints || "Saved"}</span>
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
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowRegionMenu(false);
                  setShowCurrencyMenu(false);
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/40 text-slate-200 transition-all cursor-pointer"
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
                    {user.displayName || userProfile?.name || "Scholar"}
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
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 text-left transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>My Scholar Profile</span>
                  </button>

                  <button
                    onClick={signOutUser}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-rose-500/20 text-rose-300 text-left transition-colors cursor-pointer"
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
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer text-xs font-semibold shadow-md shadow-indigo-600/20"
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

