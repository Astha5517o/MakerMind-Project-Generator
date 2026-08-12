import React from "react";
import { Sparkles, ExternalLink, Cpu, Zap, Layers, ShieldCheck } from "lucide-react";
import appIconUrl from "../assets/images/makermind_app_icon_1786532760729.jpg";

export const GoogleAIFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-300 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Google AI Advertisement & Sponsorship Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          {/* Subtle Google Color Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            
            {/* Left Brand Details */}
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                {/* Official Style Google AI Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-700 text-xs font-bold">
                  <span className="flex items-center font-extrabold text-sm tracking-tight">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                  <span className="text-white font-semibold ml-1">AI Studio</span>
                </div>

                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  Gemini 3.6 Flash Engine
                </span>
                
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold uppercase tracking-widest">
                  Google Imagen 3
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Supercharged by Google AI & Gemini Models
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                MakerMind leverages <strong>Google Gemini 3.6 Flash</strong> for sub-second STEM blueprint synthesis, viva voce examination prep, and hardware circuit reasoning. Visual prototype renders and technical CAD schematics are generated via <strong>Google Imagen</strong>.
              </p>
            </div>

            {/* Right Interactive CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://ai.google.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-900/30 transition-all cursor-pointer"
              >
                <span>Build with Google AI</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Google AI Studio</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

          </div>

          {/* Feature Highlights Row */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-[#4285F4] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block font-semibold">Gemini Flash Multimodal</strong>
                <span className="text-slate-400 text-[11px]">Instant academic hardware reasoning & viva Q&A</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#FBBC05] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block font-semibold">Google Imagen Rendering</strong>
                <span className="text-slate-400 text-[11px]">3D photorealistic prototype & schematic studio</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block font-semibold">Google Cloud Run Host</strong>
                <span className="text-slate-400 text-[11px]">Enterprise-grade container runtime deployment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & App Branding Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-900 pt-6">
          
          <div className="flex items-center gap-3">
            <img 
              src={appIconUrl} 
              alt="MakerMind Logo" 
              className="w-7 h-7 rounded-lg border border-slate-800 shadow-md object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-200 tracking-wider">MAKERMIND ENGINE</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Zero-Repeat STEM Blueprint Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Powered by <strong className="text-white">Google AI</strong></span>
            <span>•</span>
            <span>Developed for STEM Educators & Scholars</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
