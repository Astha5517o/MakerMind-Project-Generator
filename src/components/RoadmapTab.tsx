import React, { useState, useEffect } from "react";
import { 
  ProjectBlueprint, 
  RoadmapMilestone, 
  SupportedRegion 
} from "../types";
import { 
  DEFAULT_ROADMAP_MILESTONES, 
  REGIONS_CONFIG 
} from "../data/internationalization";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Target, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Compass, 
  Wrench, 
  Cpu, 
  Code, 
  ShieldCheck, 
  BookOpenCheck,
  CheckSquare,
  Square,
  Globe
} from "lucide-react";

interface RoadmapTabProps {
  blueprint: ProjectBlueprint;
  currentRegion?: SupportedRegion;
}

export const RoadmapTab: React.FC<RoadmapTabProps> = ({
  blueprint,
  currentRegion = "global"
}) => {
  const regionConfig = REGIONS_CONFIG[currentRegion] || REGIONS_CONFIG.global;

  // Local storage key for storing roadmap progress per project
  const storageKey = `makermind_roadmap_${blueprint.id}`;

  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load saved roadmap:", e);
    }
    return DEFAULT_ROADMAP_MILESTONES;
  });

  const [activeStage, setActiveStage] = useState<number>(1);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(milestones));
    } catch (e) {
      console.warn("Could not save roadmap to localStorage:", e);
    }
  }, [milestones, storageKey]);

  // Toggle individual checklist item inside a milestone
  const toggleChecklistItem = (milestoneId: string, itemIdx: number) => {
    setMilestones(prev => 
      prev.map(m => {
        if (m.id !== milestoneId) return m;
        const updatedItems = [...m.checklist];
        updatedItems[itemIdx] = {
          ...updatedItems[itemIdx],
          completed: !updatedItems[itemIdx].completed
        };
        const allCompleted = updatedItems.every(i => i.completed);
        return {
          ...m,
          checklist: updatedItems,
          status: allCompleted ? "completed" : updatedItems.some(i => i.completed) ? "in_progress" : "pending"
        };
      })
    );
  };

  // Toggle entire milestone status
  const toggleMilestoneStatus = (milestoneId: string) => {
    setMilestones(prev =>
      prev.map(m => {
        if (m.id !== milestoneId) return m;
        const willBeComplete = m.status !== "completed";
        return {
          ...m,
          status: willBeComplete ? "completed" : "pending",
          checklist: m.checklist.map(i => ({ ...i, completed: willBeComplete }))
        };
      })
    );
  };

  // Calculate overall project completion percentage
  const totalTasks = milestones.reduce((acc, m) => acc + m.checklist.length, 0);
  const completedTasks = milestones.reduce(
    (acc, m) => acc + m.checklist.filter(i => i.completed).length,
    0
  );
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const currentStageMilestone = milestones.find(m => m.stageNumber === activeStage) || milestones[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Overview & Progress Bar Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>End-to-End Real Project Lifecycle</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                5-Stage Real Project Execution Roadmap
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                Track every stage from hypothesis validation to final science fair defense for: <strong className="text-slate-200">{blueprint.title}</strong>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-400">
                  {progressPercent}%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Roadmap Progress
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <div className="text-xl font-bold text-indigo-300">
                  {completedTasks} / {totalTasks}
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Tasks Finished
                </div>
              </div>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          {/* Regional Science Fair Accreditation Alert */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between gap-3 text-xs text-indigo-200">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{regionConfig.flag}</span>
              <div>
                <strong>Target Competition Standard:</strong> {regionConfig.scienceFairName}
              </div>
            </div>
            <div className="hidden sm:block text-[11px] text-slate-400">
              Hardware Hub: {regionConfig.hardwareSourcingHub}
            </div>
          </div>
        </div>
      </div>

      {/* Stage Selection Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {milestones.map((m) => {
          const isSelected = activeStage === m.stageNumber;
          const isDone = m.status === "completed";
          const inProgress = m.status === "in_progress";
          const completedCount = m.checklist.filter(i => i.completed).length;

          return (
            <button
              key={m.id}
              onClick={() => setActiveStage(m.stageNumber)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                isSelected
                  ? "bg-slate-800 border-indigo-500 text-white shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500/40"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                  isDone 
                    ? "bg-emerald-500 text-slate-950" 
                    : inProgress 
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : isSelected 
                    ? "bg-indigo-500 text-white" 
                    : "bg-slate-950 text-slate-400"
                }`}>
                  Stage {m.stageNumber}
                </span>

                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                )}
              </div>

              <div className="text-xs font-bold text-slate-200 line-clamp-1">
                {m.title.split(":")[1]?.trim() || m.title}
              </div>

              <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                {m.estimatedTime}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 font-medium">
                  {completedCount}/{m.checklist.length} Done
                </span>
                <span className="text-emerald-400 font-bold">
                  {Math.round((completedCount / m.checklist.length) * 100)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail & Interactive Tasks */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <span>Stage {currentStageMilestone.stageNumber} of 5</span>
              <span>•</span>
              <span className="text-indigo-300">{currentStageMilestone.estimatedTime}</span>
            </div>
            <h3 className="text-lg font-black text-white mt-1">
              {currentStageMilestone.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentStageMilestone.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleMilestoneStatus(currentStageMilestone.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                currentStageMilestone.status === "completed"
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                  : "bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentStageMilestone.status === "completed" ? "Stage Completed ✓" : "Mark Stage Done"}</span>
            </button>
          </div>
        </div>

        {/* Milestone Key Deliverable Banner */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Stage Milestone Target & Tangible Deliverable:
            </div>
            <p className="text-xs text-amber-300/90 font-medium mt-0.5">
              {currentStageMilestone.keyDeliverable}
            </p>
          </div>
        </div>

        {/* Stage Checklist Tasks */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-indigo-400" />
            <span>Required Engineering Tasks & Checkpoints</span>
          </h4>

          <div className="space-y-2.5">
            {currentStageMilestone.checklist.map((item, idx) => (
              <div
                key={idx}
                onClick={() => toggleChecklistItem(currentStageMilestone.id, idx)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  item.completed
                    ? "bg-slate-950/40 border-slate-800/40 opacity-60"
                    : "bg-slate-950 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button className="text-slate-400 hover:text-emerald-400 shrink-0">
                    {item.completed ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  <span className={`text-xs sm:text-sm font-medium ${item.completed ? "line-through text-slate-500" : "text-slate-200"}`}>
                    {item.task}
                  </span>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.completed 
                    ? "bg-emerald-500/20 text-emerald-400" 
                    : "bg-slate-900 text-slate-400"
                }`}>
                  {item.completed ? "DONE" : "PENDING"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation Between Stages */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            disabled={activeStage <= 1}
            onClick={() => setActiveStage(prev => Math.max(1, prev - 1))}
            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Previous Stage
          </button>

          <span className="text-xs text-slate-400 font-mono">
            Stage {activeStage} of 5
          </span>

          <button
            disabled={activeStage >= 5}
            onClick={() => setActiveStage(prev => Math.min(5, prev + 1))}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Next Stage →
          </button>
        </div>
      </div>
    </div>
  );
};
