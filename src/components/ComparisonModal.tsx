import React from "react";
import { ProjectBlueprint } from "../types";
import { X, CheckCircle2, Clock, IndianRupee, Layers, Wrench, BookOpenCheck } from "lucide-react";

interface ComparisonModalProps {
  bp1: ProjectBlueprint;
  bp2: ProjectBlueprint;
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  bp1,
  bp2,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Side-by-Side Blueprint Technical Comparison
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Comparing dynamic implementation angles for optimal lab selection
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Comparative Grid */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Top Titles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold">
                OPTION A
              </span>
              <h3 className="text-sm font-extrabold text-white">{bp1.title}</h3>
              <p className="text-xs text-emerald-400 font-semibold">{bp1.angleTag}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px] font-bold">
                OPTION B
              </span>
              <h3 className="text-sm font-extrabold text-white">{bp2.title}</h3>
              <p className="text-xs text-emerald-400 font-semibold">{bp2.angleTag}</p>
            </div>
          </div>

          {/* Metric Comparison */}
          <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <div className="space-y-1 text-xs text-slate-300">
              <div>Budget: <strong className="text-emerald-400">₹{bp1.estimatedTotalCostINR}</strong></div>
              <div>Difficulty: <strong className="text-amber-400">{bp1.difficulty}</strong></div>
              <div>Build Time: <strong className="text-white">{bp1.buildTime}</strong></div>
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <div>Budget: <strong className="text-emerald-400">₹{bp2.estimatedTotalCostINR}</strong></div>
              <div>Difficulty: <strong className="text-amber-400">{bp2.difficulty}</strong></div>
              <div>Build Time: <strong className="text-white">{bp2.buildTime}</strong></div>
            </div>
          </div>

          {/* Core Controller / Primary Components Comparison */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-400" />
              Primary Hardware Components Comparison
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                {bp1.materials.slice(0, 4).map((m, i) => (
                  <div key={i} className="text-xs text-slate-300 flex justify-between">
                    <span>{m.name}</span>
                    <span className="text-emerald-400 font-mono">₹{m.costINR}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                {bp2.materials.slice(0, 4).map((m, i) => (
                  <div key={i} className="text-xs text-slate-300 flex justify-between">
                    <span>{m.name}</span>
                    <span className="text-emerald-400 font-mono">₹{m.costINR}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Principles Comparison */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpenCheck className="w-4 h-4 text-purple-400" />
              Core Scientific Principles
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {bp1.scientificPrinciples[0]?.explanation || bp1.overview}
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {bp2.scientificPrinciples[0]?.explanation || bp2.overview}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
