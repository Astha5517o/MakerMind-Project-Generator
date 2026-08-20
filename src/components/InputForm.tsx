import React, { useState } from "react";
import { 
  GeneratorInputs, 
  StudentLevel, 
  SubjectArea, 
  BudgetRange 
} from "../types";
import { PRESET_TOPICS, PresetTopic } from "../data/presetTopics";
import { CURATED_EXHIBITION_PROMPTS } from "../data/exhibitionPrompts";
import { 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  IndianRupee, 
  Cpu, 
  Zap, 
  FlaskConical, 
  Leaf, 
  Bot, 
  RefreshCw,
  Lightbulb,
  CheckCircle2,
  Layers,
  Award,
  ArrowRight
} from "lucide-react";

interface InputFormProps {
  onSubmit: (inputs: GeneratorInputs, forceNewAngle: boolean) => void;
  isLoading: boolean;
  loadingMessage: string;
  onOpenPrompts?: () => void;
}

const LEVELS: StudentLevel[] = [
  "Middle School (Class 6-10)",
  "High School (Class 11-12)",
  "College / Engineering"
];

const SUBJECTS: { name: SubjectArea; icon: any; color: string; desc: string }[] = [
  { 
    name: "Robotics & Electronics", 
    icon: Bot, 
    color: "from-blue-500 to-indigo-600",
    desc: "Arduino, ESP32, Motors & Sensors"
  },
  { 
    name: "Computer Science & AI", 
    icon: Cpu, 
    color: "from-purple-500 to-pink-600",
    desc: "Machine Learning, Edge-AI & Web IoT"
  },
  { 
    name: "Physics & Applied Mechanics", 
    icon: Zap, 
    color: "from-amber-500 to-orange-600",
    desc: "Electromagnetism, Energy & Motion"
  },
  { 
    name: "Environmental & Green Tech", 
    icon: Leaf, 
    color: "from-emerald-500 to-teal-600",
    desc: "Solar, Purifiers & Sustainability"
  },
  { 
    name: "Chemistry & Material Science", 
    icon: FlaskConical, 
    color: "from-cyan-500 to-blue-600",
    desc: "Pyrolysis, pH Sensors & Polymers"
  }
];

const BUDGETS: BudgetRange[] = [
  "Low (Under ₹500)",
  "Medium (₹500 - ₹2000)",
  "Advanced (₹2000+)"
];

export const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  isLoading,
  loadingMessage,
  onOpenPrompts,
}) => {
  const [level, setLevel] = useState<StudentLevel>("High School (Class 11-12)");
  const [subject, setSubject] = useState<SubjectArea>("Robotics & Electronics");
  const [topic, setTopic] = useState<string>("");
  const [budget, setBudget] = useState<BudgetRange>("Medium (₹500 - ₹2000)");
  const [forceNewAngle, setForceNewAngle] = useState<boolean>(false);

  const handlePresetSelect = (preset: PresetTopic) => {
    setTopic(preset.title);
    setSubject(preset.subject);
    setLevel(preset.level);
    setBudget(preset.budget);
  };

  const handleCuratedPromptSelect = (prompt: typeof CURATED_EXHIBITION_PROMPTS[0]) => {
    setTopic(prompt.title);
    setSubject(prompt.subject);
    setLevel(prompt.level);
    setBudget(prompt.budget);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      {
        level,
        subject,
        topic: topic.trim() || "Smart Automated System",
        budget
      },
      forceNewAngle
    );
  };

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Non-Repetitive Blueprint Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          BUILD YOUR STEM BLUEPRINT
        </h1>
        <p className="mt-1.5 text-slate-400 text-sm max-w-2xl leading-relaxed">
          Select your level, domain, and topic. MakerMind will formulate a unique technical architecture, bill of materials with INR pricing, and step-by-step schematics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* 1. Student Academic Level */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            Student Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LEVELS.map((lvl) => {
              const active = level === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`relative p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    active
                      ? "bg-slate-800 border-indigo-500 text-white shadow-md shadow-indigo-900/20"
                      : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <span className="text-sm font-medium">{lvl}</span>
                  {active && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Subject Area Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Subject Area Domain
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUBJECTS.map((sub) => {
              const Icon = sub.icon;
              const active = subject === sub.name;
              return (
                <button
                  key={sub.name}
                  type="button"
                  onClick={() => setSubject(sub.name)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                    active
                      ? "bg-slate-800 border-indigo-500 text-white shadow-lg shadow-indigo-900/20 ring-1 ring-indigo-500/30"
                      : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${sub.color} text-white shadow-md`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white leading-tight">
                        {sub.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {sub.desc}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Project Topic / Keywords Input */}
        <div>
          {/* Exhibition Prompts Discovery Banner */}
          {onOpenPrompts && (
            <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Need an Award-Winning Exhibition Idea?</div>
                  <div className="text-[11px] text-slate-400">Explore curated student science fair projects with working models & judge pitches</div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenPrompts}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <span>Browse Prompts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Project Concept or Topic
            </span>
            <span className="text-[11px] text-slate-500 font-normal">e.g. Smart Water Grid</span>
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Solar Powered Rover, IoT Air Purifier, Smart Traffic System, LPG Leakage Alert"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            required
          />

          {/* Quick Exhibition Ideas Pills */}
          <div className="mt-3 space-y-2">
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3 h-3 text-amber-400" />
              <span>Suggested Science Exhibition Ideas:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CURATED_EXHIBITION_PROMPTS.slice(0, 6).map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => handleCuratedPromptSelect(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs transition-all flex items-center gap-1.5 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                  <span className="truncate max-w-[220px]">{prompt.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Estimated Budget Range */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            Budget Target (INR)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUDGETS.map((bgt) => {
              const active = budget === bgt;
              return (
                <button
                  key={bgt}
                  type="button"
                  onClick={() => setBudget(bgt)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    active
                      ? "bg-slate-800 border-indigo-500 text-emerald-400 font-bold"
                      : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-600 text-sm"
                  }`}
                >
                  {bgt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Force Alternative Angle Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            <div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">Force New Hardware Perspective</div>
              <div className="text-xs text-slate-400">Guarantees a distinct microcontroller and sensor layout for repeat topics</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setForceNewAngle(!forceNewAngle)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              forceNewAngle ? "bg-indigo-600" : "bg-slate-800"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                forceNewAngle ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 group uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin text-white" />
              <span>{loadingMessage || "Synthesizing Blueprint..."}</span>
            </>
          ) : (
            <>
              <span>Build Blueprint</span>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </>
          )}
        </button>

        <div className="p-4 rounded-lg border border-dashed border-slate-800 bg-slate-900/30 text-[11px] text-slate-500 italic">
          MakerMind Engine ensures 100% unique logic variations for every request. No two blueprints are ever identical.
        </div>
      </form>

      {/* Embedded About & Specifications Panel */}
      <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              About MakerMind Engine & Technical Specifications
            </h3>
          </div>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-bold uppercase tracking-widest">
            v2.5 Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="font-bold text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Non-Repetitive Logic Matrix
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Every request dynamically calculates alternative microcontroller architectures (Arduino, Pico, ESP32, STM32) and pinouts so student submissions remain unique.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Itemized INR Bill of Materials
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Computes accurate component pricing in Indian Rupees (₹), complete with budget tiers, tool requirements, and component acquisition checklists.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Examiner Defense & AI Studio
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Includes lab examiner viva voce flashcards, step-by-step schematics, dynamic printable lab guides, and an AI prototype rendering studio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
