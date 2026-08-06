import React, { useState } from "react";
import { ProjectBlueprint, MaterialItem, UserProfile } from "../types";
import { 
  Sparkles, 
  RefreshCw, 
  Bookmark, 
  Printer, 
  Copy, 
  Check, 
  Clock, 
  BarChart3, 
  IndianRupee, 
  CheckSquare, 
  Square, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Lightbulb, 
  Code, 
  Layers, 
  Wrench, 
  Plus, 
  ChevronRight,
  ShieldAlert,
  Award,
  BookOpenCheck,
  CheckCircle2,
  Image as ImageIcon,
  Camera,
  Upload,
  Download,
  Maximize2,
  Trash2,
  User,
  X
} from "lucide-react";

interface BlueprintViewProps {
  blueprint: ProjectBlueprint;
  onRegenerateAngle: () => void;
  onSave: (blueprint: ProjectBlueprint) => void;
  isSaved: boolean;
  isRegenerating: boolean;
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({
  blueprint,
  onRegenerateAngle,
  onSave,
  isSaved,
  isRegenerating,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "materials" | "steps" | "principles" | "viva" | "extensions" | "images">("overview");
  const [copied, setCopied] = useState(false);
  const [materials, setMaterials] = useState<MaterialItem[]>(blueprint.materials);
  const [revealedViva, setRevealedViva] = useState<Record<string, boolean>>({});
  const [masteredViva, setMasteredViva] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Read User Profile for Report Author details
  const [userProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("makermind_user_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      name: "Astha",
      email: "astha5517o@gmail.com",
      institution: "National Institute of Technology / STEM Innovation Lab",
      rollNumber: "STEM-2026-8842",
      branch: "Electronics & Robotics Engineering",
      bio: "Passionate STEM builder and innovator.",
      preferredLevel: "College / Engineering"
    };
  });
  
  // Image Generation & Upload State
  const [images, setImages] = useState<string[]>(() => [
    ...(blueprint.generatedImages || []),
    ...(blueprint.uploadedImages || [])
  ]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedImageStyle, setSelectedImageStyle] = useState("3D Photorealistic Prototype");
  const [customImagePrompt, setCustomImagePrompt] = useState("");
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Custom material addition
  const [newMatName, setNewMatName] = useState("");
  const [newMatCost, setNewMatCost] = useState("");
  const [newMatPurpose, setNewMatPurpose] = useState("");
  const [showAddMat, setShowAddMat] = useState(false);

  // Image Generation Handler
  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const res = await fetch("/api/generate-project-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: customImagePrompt || `A detailed ${selectedImageStyle} of ${blueprint.title}`,
          title: blueprint.title,
          subject: blueprint.subject,
          materials: materials,
          style: selectedImageStyle
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.imageUrl) {
          const updated = [data.imageUrl, ...images];
          setImages(updated);
          blueprint.generatedImages = [data.imageUrl, ...(blueprint.generatedImages || [])];
          // Switch to images tab to show off result
          setActiveTab("images");
        }
      }
    } catch (err) {
      console.error("Image generation error:", err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Custom Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const updated = [result, ...images];
          setImages(updated);
          blueprint.uploadedImages = [result, ...(blueprint.uploadedImages || [])];
          setActiveTab("images");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    setImages(updated);
    if (blueprint.generatedImages) {
      blueprint.generatedImages = blueprint.generatedImages.filter((_, idx) => idx !== indexToRemove);
    }
  };

  // Toggle material checkbox
  const toggleMaterial = (id: string) => {
    setMaterials(prev => 
      prev.map(m => m.id === id ? { ...m, checked: !m.checked } : m)
    );
  };

  // Add custom material
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatName.trim()) return;
    const cost = parseFloat(newMatCost) || 0;
    const newItem: MaterialItem = {
      id: `mat-custom-${Date.now()}`,
      name: newMatName.trim(),
      qty: "1 Pc",
      costINR: cost,
      purpose: newMatPurpose.trim() || "Custom auxiliary component",
      alternativeComponent: "N/A",
      checked: false
    };
    setMaterials(prev => [...prev, newItem]);
    setNewMatName("");
    setNewMatCost("");
    setNewMatPurpose("");
    setShowAddMat(false);
  };

  // Live calculated total cost based on unchecked (or all) items
  const totalCost = materials.reduce((acc, m) => acc + m.costINR, 0);
  const remainingCost = materials.filter(m => !m.checked).reduce((acc, m) => acc + m.costINR, 0);

  // Toggle Viva Answer
  const toggleViva = (id: string) => {
    setRevealedViva(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMasteredViva = (id: string) => {
    setMasteredViva(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleStep = (stepNum: number) => {
    setCompletedSteps(prev => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  // Copy Blueprint Markdown
  const handleCopyMarkdown = () => {
    const markdown = `# ${blueprint.title}
**Angle**: ${blueprint.angleTag}
**Level**: ${blueprint.level} | **Subject**: ${blueprint.subject}
**Difficulty**: ${blueprint.difficulty} | **Build Time**: ${blueprint.buildTime} | **Total Cost**: ₹${totalCost}

## Overview
${blueprint.overview}

## Materials Checklist (INR)
${materials.map(m => `- [${m.checked ? 'x' : ' '}] **${m.name}** (${m.qty}) - ₹${m.costINR}: ${m.purpose}`).join('\n')}

## Step-by-Step Assembly Guide
${blueprint.assemblySteps.map(s => `### Step ${s.stepNumber}: ${s.title}\n${s.description}\n*Pro-Tip:* ${s.proTip || 'N/A'}`).join('\n\n')}

## Scientific Principles Explained
${blueprint.scientificPrinciples.map(p => `### ${p.title}\n${p.explanation}\n*Real-World Usage:* ${p.realWorldUsage}`).join('\n\n')}

## Viva Voce Q&A
${blueprint.vivaQuestions.map((v, i) => `**Q${i+1}: ${v.question}**\n*Answer:* ${v.answer}`).join('\n\n')}
`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner & Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {blueprint.angleTag}
              </span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full border border-indigo-500/30 font-bold uppercase tracking-widest">
                {blueprint.subject}
              </span>
              <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-widest ${
                blueprint.difficulty === "Advanced" 
                  ? "bg-rose-500/20 text-rose-400 border-rose-500/30" 
                  : blueprint.difficulty === "Intermediate"
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              }`}>
                Tier: {blueprint.difficulty}
              </span>
              <span className="text-[10px] bg-slate-950 text-slate-300 px-2.5 py-1 rounded-full border border-slate-800 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>Scholar: <strong className="text-white">{userProfile.name}</strong> ({userProfile.email})</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {blueprint.title}
            </h1>
            <p className="mt-2 text-slate-400 text-sm leading-relaxed max-w-3xl">
              {blueprint.overview}
            </p>

            {/* Metrics */}
            <div className="mt-5 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-0.5">Estimated Build Time</div>
                <div className="text-2xl font-mono text-indigo-400 font-bold">{blueprint.buildTime.toUpperCase()}</div>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-0.5">Estimated Budget</div>
                <div className="text-2xl font-mono text-emerald-400 font-bold">₹{totalCost}</div>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-0.5">Academic Level</div>
                <div className="text-sm font-bold text-slate-200 mt-1">{blueprint.level}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
            {/* Force Different Angle Button */}
            <button
              onClick={onRegenerateAngle}
              disabled={isRegenerating}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} />
              <span>{isRegenerating ? "Generating..." : "Try Different Technical Angle"}</span>
            </button>

            <div className="flex gap-2 w-full">
              <button
                onClick={() => onSave(blueprint)}
                className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                  isSaved
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                    : "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? "fill-emerald-400 text-emerald-400" : ""}`} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>

              <button
                onClick={handleCopyMarkdown}
                className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:border-slate-700 text-xs font-medium transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:border-slate-700 text-xs font-medium transition-all"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print</span>
              </button>

              <button
                onClick={() => setActiveTab("images")}
                className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-950/60 border border-indigo-800/80 text-indigo-300 hover:bg-indigo-900/80 text-xs font-medium transition-all"
              >
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Images ({images.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image Banner if available */}
        {images.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                Hardware Visualization & Concept Banner
              </span>
              <button
                onClick={() => setActiveTab("images")}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <span>View All ({images.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div 
              onClick={() => setActiveLightboxImage(images[0])}
              className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group cursor-pointer"
            >
              <img
                src={images[0]}
                alt={blueprint.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs text-white flex items-center gap-2">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Click to Expand</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>System Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab("images")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "images"
              ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          <ImageIcon className="w-4 h-4 text-indigo-400" />
          <span>Image & Schematics Studio ({images.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("materials")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "materials"
              ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          <Wrench className="w-4 h-4 text-amber-400" />
          <span>Components BOM (₹{totalCost})</span>
        </button>

        <button
          onClick={() => setActiveTab("steps")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "steps"
              ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          <Code className="w-4 h-4 text-indigo-400" />
          <span>Assembly Guide ({blueprint.assemblySteps.length} Steps)</span>
        </button>

        <button
          onClick={() => setActiveTab("principles")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "principles"
              ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          <BookOpenCheck className="w-4 h-4 text-purple-400" />
          <span>STEM Principles</span>
        </button>

        <button
          onClick={() => setActiveTab("viva")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "viva"
              ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          <HelpCircle className="w-4 h-4 text-pink-400" />
          <span>Viva Q&A Defense ({blueprint.vivaQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("extensions")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "extensions"
              ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Safety & Science Fair</span>
        </button>
      </div>

      {/* Tab 1: System Architecture & Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Block Diagram Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-indigo-500" />
              System Architecture & Signal Flow Block Diagram
            </h3>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
              {blueprint.blockDiagram}
            </pre>
          </div>

          {/* Tools Required */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-amber-500" />
              Required Maker Tools & Equipment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {blueprint.toolsRequired.map((tool, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bill of Materials (BOM) */}
      {activeTab === "materials" && (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-4 bg-emerald-500" />
                Materials Checklist
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Check off components as you acquire them. Total cost updates automatically in INR (₹).
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400">Total Estimated: </span>
                <strong className="text-emerald-400 font-bold">₹{totalCost}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400">Remaining to Buy: </span>
                <strong className="text-amber-400 font-bold">₹{remainingCost}</strong>
              </div>
            </div>
          </div>

          {/* Materials Table */}
          <div className="space-y-3">
            {materials.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleMaterial(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.checked
                    ? "bg-slate-950/40 border-slate-800/50 opacity-60"
                    : "bg-slate-950 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button className="mt-0.5 text-slate-400 hover:text-emerald-400">
                    {item.checked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${item.checked ? "line-through text-slate-500" : "text-white"}`}>
                        {item.name}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono">
                        {item.qty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{item.purpose}</p>
                    {item.alternativeComponent && (
                      <p className="text-[11px] text-indigo-400/90 mt-1">
                        💡 Alternative: <span className="underline">{item.alternativeComponent}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-extrabold text-emerald-400">
                    ₹{item.costINR}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Custom Component Section */}
          <div>
            {!showAddMat ? (
              <button
                onClick={() => setShowAddMat(true)}
                className="w-full py-3 rounded-xl border border-dashed border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-950 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add Custom Component / Tool to BOM</span>
              </button>
            ) : (
              <form onSubmit={handleAddMaterial} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-200">Add Custom Component</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Component Name (e.g. 5V Buzzer Module)"
                    value={newMatName}
                    onChange={(e) => setNewMatName(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Cost in INR (₹)"
                    value={newMatCost}
                    onChange={(e) => setNewMatCost(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="Purpose / Circuit role"
                    value={newMatPurpose}
                    onChange={(e) => setNewMatPurpose(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMat(false)}
                    className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                  >
                    Add Component
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Step-by-Step Assembly */}
      {activeTab === "steps" && (
        <div className="space-y-4">
          {blueprint.assemblySteps.map((step) => {
            const isDone = !!completedSteps[step.stepNumber];
            return (
              <div
                key={step.stepNumber}
                className={`bg-slate-900 border rounded-2xl p-6 transition-all ${
                  isDone ? "border-emerald-500/40 opacity-75" : "border-slate-800"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleStep(step.stepNumber)}
                      className="mt-1 shrink-0"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center font-extrabold text-xs text-slate-400">
                          {step.stepNumber}
                        </div>
                      )}
                    </button>

                    <div>
                      <h4 className={`text-base font-extrabold ${isDone ? "line-through text-slate-400" : "text-white"}`}>
                        Step {step.stepNumber}: {step.title}
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                        {step.description}
                      </p>

                      {step.proTip && (
                        <div className="mt-3 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span><strong>Maker Pro-Tip:</strong> {step.proTip}</span>
                        </div>
                      )}

                      {step.codeOrSchematicSnippet && (
                        <div className="mt-4">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                            <Code className="w-3.5 h-3.5 text-emerald-400" />
                            Wiring / Code Block
                          </div>
                          <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                            {step.codeOrSchematicSnippet}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 4: STEM Principles */}
      {activeTab === "principles" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blueprint.scientificPrinciples.map((principle, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-extrabold text-white">
                  {principle.title}
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {principle.explanation}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                  Industrial Real-World Usage:
                </span>
                <p className="text-xs text-slate-400 italic">
                  "{principle.realWorldUsage}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Viva Voce & Defense Q&A */}
      {activeTab === "viva" && (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-4 bg-rose-500" />
                Expert Viva Q&A
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Test yourself before presenting to lab examiners. Click to reveal answers and mark questions as mastered.
              </p>
            </div>
            <div className="text-xs text-emerald-400 font-bold bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Mastered: {Object.keys(masteredViva).filter(k => masteredViva[k]).length} / {blueprint.vivaQuestions.length}
            </div>
          </div>

          <div className="space-y-4">
            {blueprint.vivaQuestions.map((q, idx) => {
              const isRevealed = !!revealedViva[q.id || `viva-${idx}`];
              const isMastered = !!masteredViva[q.id || `viva-${idx}`];

              return (
                <div
                  key={q.id || idx}
                  className={`p-5 rounded-xl border transition-all ${
                    isMastered ? "bg-slate-950/40 border-emerald-500/30" : "bg-slate-950 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 text-xs font-bold">
                          Q{idx + 1}
                        </span>
                        <h4 className="text-sm sm:text-base font-extrabold text-white">
                          {q.question}
                        </h4>
                      </div>

                      {q.hint && (
                        <p className="text-xs text-slate-400 italic">
                          💡 Examiner Hint: {q.hint}
                        </p>
                      )}

                      {/* Revealed Answer Box */}
                      {isRevealed && (
                        <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2 animate-fadeIn">
                          <strong className="text-emerald-400 block uppercase tracking-wider text-[11px]">
                            Model Exam Answer:
                          </strong>
                          <p>{q.answer}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => toggleViva(q.id || `viva-${idx}`)}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        {isRevealed ? <EyeOff className="w-4 h-4 text-pink-400" /> : <Eye className="w-4 h-4 text-pink-400" />}
                        <span className="hidden sm:inline">{isRevealed ? "Hide Answer" : "Reveal Answer"}</span>
                      </button>

                      <button
                        onClick={() => toggleMasteredViva(q.id || `viva-${idx}`)}
                        className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isMastered
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">{isMastered ? "Mastered" : "Mark Mastered"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 6: Safety & Science Fair Extensions */}
      {activeTab === "extensions" && (
        <div className="space-y-6">
          {/* Safety Rules */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Critical STEM Laboratory Safety Guidelines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {blueprint.safetyTips.map((tip, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-red-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Science Fair Extensions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Science Exhibition & Lab Upgrade Ideas (Extra Credit)
            </h3>
            <div className="space-y-3">
              {blueprint.extensionIdeas.map((idea, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    +{idx + 1}
                  </span>
                  <span className="mt-1 leading-relaxed">{idea}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: AI Image & Schematics Creator Studio */}
      {activeTab === "images" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Generator Studio Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-indigo-500" />
                  AI Hardware Image & Schematic Studio
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Generate photorealistic prototype renders, CAD schematics, or upload your physical lab photos.
                </p>
              </div>
              
              {/* Upload Button */}
              <label className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shrink-0">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Upload Lab Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* AI Image Generation Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  1. Select Visualization Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    "3D Photorealistic Prototype",
                    "Technical Blueprint & CAD Layout",
                    "Circuit Schematic & Wiring Diagram",
                    "Futuristic Conceptual Art"
                  ].map((styleOption) => {
                    const active = selectedImageStyle === styleOption;
                    return (
                      <button
                        key={styleOption}
                        type="button"
                        onClick={() => setSelectedImageStyle(styleOption)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                          active
                            ? "bg-slate-800 border-indigo-500 text-white shadow-md shadow-indigo-900/20"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        {styleOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  2. Prompt Customization (Optional)
                </label>
                <input
                  type="text"
                  value={customImagePrompt}
                  onChange={(e) => setCustomImagePrompt(e.target.value)}
                  placeholder={`e.g. A clean working lab bench prototype of ${blueprint.title} with LED status indicators and neat wiring`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>

              <button
                type="button"
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isGeneratingImage ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Rendering AI Image...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Generate {selectedImageStyle}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              Blueprint Image Gallery ({images.length})
            </h4>

            {images.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 text-slate-500 space-y-3">
                <ImageIcon className="w-10 h-10 mx-auto text-slate-600" />
                <p className="text-xs font-medium">No images generated or uploaded yet for this blueprint.</p>
                <p className="text-[11px] text-slate-600">
                  Click <strong className="text-indigo-400">"Generate 3D Photorealistic Prototype"</strong> above to create a custom AI schematic or image.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video flex items-center justify-center shadow-lg"
                  >
                    <img
                      src={imgSrc}
                      alt={`Project Render ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Hover Overlay Controls */}
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => setActiveLightboxImage(imgSrc)}
                        className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-transform hover:scale-110"
                        title="View Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      <a
                        href={imgSrc}
                        download={`makermind-${blueprint.id}-image-${idx + 1}.png`}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white shadow-md transition-transform hover:scale-110"
                        title="Download Image"
                      >
                        <Download className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDeleteImage(idx)}
                        className="p-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white shadow-md transition-transform hover:scale-110"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-mono text-slate-300 border border-slate-800">
                      IMG_0{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            {/* Close button */}
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute -top-12 right-0 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Image */}
            <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl flex items-center justify-center">
              <img
                src={activeLightboxImage}
                alt="Full View"
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>

            {/* Footer download button */}
            <div className="mt-4 flex items-center gap-4">
              <a
                href={activeLightboxImage}
                download={`makermind-${blueprint.id}-full.png`}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Full Resolution</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
