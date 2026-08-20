import React, { useState } from "react";
import { 
  SuggestedProjectPrompt, 
  StudentLevel, 
  SubjectArea, 
  BudgetRange, 
  GeneratorInputs 
} from "../types";
import { CURATED_EXHIBITION_PROMPTS } from "../data/exhibitionPrompts";
import { 
  X, 
  Sparkles, 
  Search, 
  Filter, 
  Award, 
  Cpu, 
  Leaf, 
  Zap, 
  HeartPulse, 
  Bot, 
  Flame, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  Layers,
  Wrench
} from "lucide-react";

interface PromptSuggesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (inputs: GeneratorInputs) => void;
}

export const PromptSuggesterModal: React.FC<PromptSuggesterModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  
  // Custom AI Brainstorming state
  const [aiInterestInput, setAiInterestInput] = useState("");
  const [aiPrompts, setAiPrompts] = useState<SuggestedProjectPrompt[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!isOpen) return null;

  const categories = [
    "All",
    "Healthcare & Assistive Tech",
    "Green Energy & Clean Tech",
    "Smart Agriculture",
    "Waste Management & Eco",
    "Robotics & Automation",
    "Safety & Disaster Management"
  ];

  // Combined prompt list (AI generated + Curated)
  const allPrompts = [...aiPrompts, ...CURATED_EXHIBITION_PROMPTS];

  // Filtered prompts
  const filteredPrompts = allPrompts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesLevel = selectedLevel === "All" || p.level === selectedLevel;
    const matchesSearch = 
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.suggestedMaterials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleGenerateAiPrompts = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInterestInput.trim()) return;

    setIsAiLoading(true);
    try {
      const res = await fetch("/api/suggest-prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentInterest: aiInterestInput,
          level: "High School (Class 11-12)",
          subject: "Robotics & Electronics",
          count: 3
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.prompts && data.prompts.length > 0) {
          setAiPrompts(data.prompts);
        }
      }
    } catch (err) {
      console.warn("AI Prompt Suggestion Error:", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleApplyPrompt = (prompt: SuggestedProjectPrompt) => {
    onSelectPrompt({
      level: prompt.level,
      subject: prompt.subject,
      topic: prompt.title,
      budget: prompt.budget
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl h-[88vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-emerald-950/50 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Science Exhibition Project Prompts & Idea Hub
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Judge-Approved Ideas
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore award-winning project ideas designed with working physical models and live demonstrations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Custom Prompt Suggester Banner */}
        <div className="p-4 sm:px-6 bg-slate-950/60 border-b border-slate-800/80 shrink-0">
          <form onSubmit={handleGenerateAiPrompts} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Sparkles className="absolute left-3.5 top-3 w-4 h-4 text-emerald-400" />
              <input
                type="text"
                placeholder="Ask AI for project prompts (e.g., 'solar energy for farming', 'drone disaster detection', 'helping elderly')..."
                value={aiInterestInput}
                onChange={(e) => setAiInterestInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={isAiLoading || !aiInterestInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer shrink-0"
            >
              {isAiLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Brainstorming...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Custom AI Prompts</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Filters and Category Pills */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search and Level Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Grades</option>
              <option value="Middle School (Class 6-10)">Middle School</option>
              <option value="High School (Class 11-12)">High School</option>
              <option value="College / Engineering">College / Engg</option>
            </select>
          </div>
        </div>

        {/* Prompts Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {filteredPrompts.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <Lightbulb className="w-12 h-12 mx-auto text-slate-600 opacity-50" />
              <p className="text-sm font-medium">No project prompts match your current filters.</p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); setSelectedLevel("All"); }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPrompts.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all group shadow-md"
                >
                  <div className="space-y-3">
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
                        {p.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        <Award className="w-3.5 h-3.5" />
                        <span>{p.suitabilityScore}% Suitability</span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {p.tagline}
                      </p>
                    </div>

                    {/* Problem & Prototype Blueprint Insight */}
                    <div className="space-y-2 text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                      <div>
                        <span className="font-semibold text-rose-400">Problem: </span>
                        <span className="text-slate-300">{p.problemAddressed}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-emerald-400">Exhibition Model: </span>
                        <span className="text-slate-300">{p.prototypeModelIdea}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-400">Judge Winning Factor: </span>
                        <span className="text-slate-300">{p.exhibitionWinningFactor}</span>
                      </div>
                    </div>

                    {/* Suggested Materials & Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.suggestedMaterials.slice(0, 4).map((mat, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px]">
                          {mat}
                        </span>
                      ))}
                      {p.suggestedMaterials.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 text-[10px]">
                          +{p.suggestedMaterials.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-4 mt-3 border-t border-slate-900 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500 font-medium">
                      Est. Budget: <span className="text-slate-300 font-semibold">{p.budget}</span>
                    </div>

                    <button
                      onClick={() => handleApplyPrompt(p)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <span>Build This Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
