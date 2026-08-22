import React, { useState } from "react";
import { 
  GeneratorInputs, 
  StudentLevel, 
  SubjectArea, 
  BudgetRange,
  SupportedRegion,
  SupportedCurrency,
  SupportedLanguage,
  TeamMember
} from "../types";
import { PRESET_TOPICS, PresetTopic } from "../data/presetTopics";
import { CURATED_EXHIBITION_PROMPTS } from "../data/exhibitionPrompts";
import { 
  REGIONS_CONFIG, 
  CURRENCIES_CONFIG, 
  DEFAULT_ROADMAP_MILESTONES,
  UI_TRANSLATIONS 
} from "../data/internationalization";
import { 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Coins, 
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
  ArrowRight,
  Globe,
  Users,
  Plus,
  Trash2,
  CheckCircle,
  HelpCircle,
  Clock,
  ShieldCheck,
  Compass,
  FileCheck
} from "lucide-react";

interface InputFormProps {
  onSubmit: (inputs: GeneratorInputs, forceNewAngle: boolean) => void;
  isLoading: boolean;
  loadingMessage: string;
  onOpenPrompts?: () => void;
  currentRegion: SupportedRegion;
  onSelectRegion: (region: SupportedRegion) => void;
  currentCurrency: SupportedCurrency;
  onSelectCurrency: (currency: SupportedCurrency) => void;
  currentLanguage: SupportedLanguage;
}

const SUBJECTS: { name: SubjectArea; icon: any; color: string; desc: string }[] = [
  { 
    name: "Robotics & Electronics", 
    icon: Bot, 
    color: "from-blue-500 to-indigo-600",
    desc: "Microcontrollers, Actuators, PCB & Circuit Sensors"
  },
  { 
    name: "Computer Science & AI", 
    icon: Cpu, 
    color: "from-purple-500 to-pink-600",
    desc: "Machine Learning, Edge-AI, IoT Telemetry & APIs"
  },
  { 
    name: "Physics & Applied Mechanics", 
    icon: Zap, 
    color: "from-amber-500 to-orange-600",
    desc: "Electromagnetics, Kinetic Energy, Fluid & Optics"
  },
  { 
    name: "Environmental & Green Tech", 
    icon: Leaf, 
    color: "from-emerald-500 to-teal-600",
    desc: "Solar Energy, Filtration, Air Quality & Sustainability"
  },
  { 
    name: "Chemistry & Material Science", 
    icon: FlaskConical, 
    color: "from-cyan-500 to-blue-600",
    desc: "Pyrolysis, Polymers, Electrochemistry & TDS / pH"
  }
];

export const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  isLoading,
  loadingMessage,
  onOpenPrompts,
  currentRegion,
  onSelectRegion,
  currentCurrency,
  onSelectCurrency,
  currentLanguage
}) => {
  const regionConfig = REGIONS_CONFIG[currentRegion] || REGIONS_CONFIG.global;
  const currencyConfig = CURRENCIES_CONFIG[currentCurrency] || CURRENCIES_CONFIG.INR;
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  const [level, setLevel] = useState<StudentLevel>("High School (Class 11-12)");
  const [subject, setSubject] = useState<SubjectArea>("Robotics & Electronics");
  const [topic, setTopic] = useState<string>("");
  const [budget, setBudget] = useState<BudgetRange>("Medium (₹500 - ₹2000)");
  const [forceNewAngle, setForceNewAngle] = useState<boolean>(false);
  const [activeRoadmapStage, setActiveRoadmapStage] = useState<number>(1);

  // Multi-person Team Configuration
  const [showTeamSection, setShowTeamSection] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "lead-1", name: "", role: "Team Lead & Project Architect", gradeOrSchool: "" }
  ]);

  const handleAddTeamMember = () => {
    if (teamMembers.length >= 5) return;
    setTeamMembers([
      ...teamMembers,
      {
        id: `member-${Date.now()}`,
        name: "",
        role: "Circuit & Hardware Lead",
        gradeOrSchool: ""
      }
    ]);
  };

  const handleRemoveTeamMember = (id: string) => {
    if (teamMembers.length <= 1) return;
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
  };

  const handleUpdateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setTeamMembers(
      teamMembers.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

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
        budget,
        region: currentRegion,
        countryName: regionConfig.countryName
      },
      forceNewAngle
    );
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* 🚀 HIGH-IMPACT HERO & REAL PROJECT ROADMAP BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Glowing Decorative Backdrop Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-emerald-400 via-amber-400 to-teal-400" />

        <div className="relative z-10 space-y-6">
          {/* International Curricula & System Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Hardware Execution Blueprint</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 text-[10px] font-semibold">
              <Globe className="w-3 h-3 text-indigo-400" />
              <span>Supported: 🇯🇵 Japan (高校 11/12) • 🇨🇳 China (高中) • 🇺🇸 USA (ISEF) • 🇮🇳 India (CBSE) • 🌐 Global (IB)</span>
            </div>
          </div>

          {/* Main Hero Heading */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              REAL STEM PROJECT BLUEPRINT &{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                EXECUTION ROADMAP
              </span>
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Design, engineer, and defend award-winning STEM projects. MakerMind calculates exact hardware BOMs, circuit schematics, embedded firmware, 3D prototype prompts, and examiner defense dossiers tailored to your local school curriculum.
            </p>
          </div>

          {/* 🌟 5-STAGE REAL PROJECT ROADMAP INTERACTIVE ACCELERATOR */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {t.roadmapTitle || "5-Stage Real Project Execution Roadmap"}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Click any stage to preview its deliverables
              </span>
            </div>

            {/* 5-Step Roadmap Milestone Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {DEFAULT_ROADMAP_MILESTONES.map((m) => {
                const isActive = activeRoadmapStage === m.stageNumber;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveRoadmapStage(m.stageNumber)}
                    className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                      isActive
                        ? "bg-slate-800/95 border-emerald-500/80 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                        isActive ? "bg-emerald-500 text-slate-950" : "bg-slate-900 text-slate-400"
                      }`}>
                        Stage {m.stageNumber}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">
                        {m.estimatedTime}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-200 line-clamp-1">
                      {m.title.split(":")[1]?.trim() || m.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {m.keyDeliverable}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detailed Deliverable Banner */}
            {DEFAULT_ROADMAP_MILESTONES.find(m => m.stageNumber === activeRoadmapStage) && (
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fadeIn">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white font-bold block">
                      {DEFAULT_ROADMAP_MILESTONES[activeRoadmapStage - 1].title}
                    </strong>
                    <span className="text-slate-400 text-[11px]">
                      {DEFAULT_ROADMAP_MILESTONES[activeRoadmapStage - 1].subtitle}
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold shrink-0">
                  Deliverable: {DEFAULT_ROADMAP_MILESTONES[activeRoadmapStage - 1].keyDeliverable}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🛠️ BLUEPRINT GENERATOR FORM */}
      <div className="w-full bg-slate-900/50 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: Country & Curriculum Selection */}
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>1. Select Country & Educational System</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                Fair Standard: {regionConfig.scienceFairName}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {(Object.keys(REGIONS_CONFIG) as SupportedRegion[]).map((rKey) => {
                const reg = REGIONS_CONFIG[rKey];
                const active = currentRegion === rKey;
                return (
                  <button
                    key={rKey}
                    type="button"
                    onClick={() => {
                      onSelectRegion(rKey);
                      onSelectCurrency(reg.defaultCurrency);
                      onSelectLanguage(reg.defaultLanguage);
                    }}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      active
                        ? "bg-slate-800 border-indigo-500 text-white shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500/40"
                        : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-2xl leading-none">{reg.flag}</span>
                    <span className="text-xs font-bold truncate max-w-full">
                      {reg.countryName.split(" ")[0]}
                    </span>
                    <span className="text-[9px] text-slate-500 truncate max-w-full">
                      {reg.defaultCurrency}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Region Curriculum Sourcing Hint */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-base">{regionConfig.flag}</span>
                <span>
                  <strong>Curriculum:</strong> {regionConfig.nativeName}
                </span>
              </div>
              <div className="hidden sm:block text-[11px] text-slate-500">
                <strong>Components:</strong> {regionConfig.hardwareSourcingHub}
              </div>
            </div>
          </div>

          {/* SECTION 2: Academic Level (Dynamically Localized for Japan/China/USA/India) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>2. Academic Level & Grade Tier</span>
              </label>
              <span className="text-[11px] text-emerald-400 font-semibold">
                Curriculum: {regionConfig.countryName.split("(")[0].trim()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {regionConfig.gradeLevels.map((g) => {
                const active = level === g.levelKey;
                return (
                  <button
                    key={g.levelKey}
                    type="button"
                    onClick={() => setLevel(g.levelKey)}
                    className={`relative p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                      active
                        ? "bg-slate-800/95 border-indigo-500 text-white shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500/30"
                        : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-indigo-300">
                          {g.gradeRange}
                        </span>
                        {active && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      
                      <div className="text-sm font-black text-white mt-1">
                        {g.localLabel}
                      </div>

                      <div className="text-[11px] text-slate-400 font-medium">
                        {g.subLabel}
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400/90 leading-relaxed border-t border-slate-800/80 pt-2">
                      {g.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Subject Discipline Area */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>3. Subject Discipline Domain</span>
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
                    className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                      active
                        ? "bg-slate-800/95 border-indigo-500 text-white shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/30"
                        : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${sub.color} text-white shadow-md shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">
                          {sub.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {sub.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: Project Concept or Topic */}
          <div className="space-y-3">
            {/* Exhibition Prompts Discovery Banner */}
            {onOpenPrompts && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-emerald-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Need an Award-Winning Exhibition Idea?</div>
                    <div className="text-[11px] text-slate-400">Explore curated student science fair projects with working models & judge pitches</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenPrompts}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <span>Browse Prompts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>4. Project Concept / Research Problem</span>
              </span>
              <span className="text-[11px] text-slate-500 font-normal">e.g. Smart Water Grid</span>
            </label>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Ultrasonic Radar Sentry, IoT Air Quality Purifier, Smart Traffic Grid, Solar Tracker, Hydrological Sensor"
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm font-medium"
              required
            />

            {/* Quick Exhibition Ideas Pills */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3 h-3 text-amber-400" />
                <span>Suggested Science Fair Ideas:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CURATED_EXHIBITION_PROMPTS.slice(0, 6).map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => handleCuratedPromptSelect(prompt)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-indigo-950/70 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs transition-all flex items-center gap-1.5 text-left group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                    <span className="truncate max-w-[220px]">{prompt.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 5: Estimated Budget Target (Multi-Currency) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-400" />
                <span>5. Target Budget Category ({currencyConfig.code} {currencyConfig.symbol})</span>
              </label>
              <div className="text-[11px] text-slate-400">
                1 INR ≈ {currencyConfig.format(1000)} per ₹1,000
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: "Low (Under ₹500)" as BudgetRange, label: `Low (Under ${currencyConfig.format(500)})`, desc: "Budget friendly school project" },
                { key: "Medium (₹500 - ₹2000)" as BudgetRange, label: `Medium (${currencyConfig.format(500)} - ${currencyConfig.format(2000)})`, desc: "Standard microcontroller & display" },
                { key: "Advanced (₹2000+)" as BudgetRange, label: `Advanced (${currencyConfig.format(2000)}+)`, desc: "Multi-sensor IoT & industrial grade" }
              ].map((b) => {
                const active = budget === b.key;
                return (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => setBudget(b.key)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      active
                        ? "bg-slate-800 border-indigo-500 text-white shadow-md shadow-indigo-950/40 ring-1 ring-indigo-500/30"
                        : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold text-emerald-400">{b.label}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{b.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 6: Multi-Person Team Members & Roles (Collapsible) */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-indigo-400" />
                <div>
                  <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Collaborative Team Members & Roles (Optional)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Include co-authors, hardware leads, and presenters on the final science fair dossier
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowTeamSection(!showTeamSection)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                {showTeamSection ? "Hide Team" : `Configure Team (${teamMembers.length})`}
              </button>
            </div>

            {showTeamSection && (
              <div className="space-y-3 pt-3 border-t border-slate-800/80 animate-fadeIn">
                {teamMembers.map((member, index) => (
                  <div key={member.id} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center gap-2.5 text-xs">
                    <span className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 text-[10px] font-bold shrink-0">
                      Member #{index + 1}
                    </span>

                    <input
                      type="text"
                      placeholder="Student / Scholar Name"
                      value={member.name}
                      onChange={(e) => handleUpdateTeamMember(member.id, "name", e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 text-xs"
                    />

                    <select
                      value={member.role}
                      onChange={(e) => handleUpdateTeamMember(member.id, "role", e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-indigo-500 text-xs"
                    >
                      <option value="Team Lead & Project Architect">Team Lead & Architect</option>
                      <option value="Circuit & Hardware Lead">Circuit & Hardware Lead</option>
                      <option value="Embedded Firmware Coder">Embedded Firmware Coder</option>
                      <option value="Model Enclosure & Mechanical">Model Enclosure & Mech</option>
                      <option value="Exhibition Defense & Poster Lead">Exhibition Defense & Pitch</option>
                    </select>

                    {teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTeamMember(member.id)}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                {teamMembers.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddTeamMember}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-dashed border-slate-700 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Team Member</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Force Alternative Angle Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
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
              className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
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
            className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-black py-4 sm:py-5 rounded-2xl shadow-xl shadow-indigo-950/60 transition-all flex items-center justify-center gap-2.5 group uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-white" />
                <span>{loadingMessage || "Synthesizing STEM Blueprint..."}</span>
              </>
            ) : (
              <>
                <span>{t.generateButton || "Synthesize Complete STEM Blueprint"}</span>
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform text-amber-300" />
              </>
            )}
          </button>

          <div className="p-3.5 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 text-[11px] text-slate-500 text-center">
            {regionConfig.nativeName} • Universal Zero-Repeat Verification • Cloud Synchronized
          </div>
        </form>

      </div>
    </div>
  );
};
