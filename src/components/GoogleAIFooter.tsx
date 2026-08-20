import React from "react";
import { Cpu, ShieldCheck, Award, Layers } from "lucide-react";
import appIconUrl from "../assets/images/makermind_app_icon_1786532760729.jpg";

export const GoogleAIFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Clean Student STEM Fair Toolkit Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block font-semibold">BOM & Circuit Verified</strong>
              <span className="text-slate-500 text-[11px]">Domain-accurate components tailored to your exact project</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block font-semibold">Science Exhibition Dossier</strong>
              <span className="text-slate-500 text-[11px]">Judge pitch, hypothesis, and trifold display guides</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <Layers className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block font-semibold">Model Image Prompts</strong>
              <span className="text-slate-500 text-[11px]">Ready-to-use AI prompts for 3D prototype & CAD visuals</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block font-semibold">Lab Safety Protocols</strong>
              <span className="text-slate-500 text-[11px]">Safe voltage limits, insulation, and test procedures</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-900 pt-6">
          <div className="flex items-center gap-3">
            <img 
              src={appIconUrl} 
              alt="MakerMind Logo" 
              className="w-6 h-6 rounded-lg border border-slate-800 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">MakerMind STEM Exhibition Lab</span>
              <span className="text-slate-700">•</span>
              <span className="text-slate-500">Student & Scholar Blueprint Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span>Cloud Sync & Local Persistence Enabled</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
