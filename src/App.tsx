/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  GeneratorInputs, 
  ProjectBlueprint 
} from "./types";
import { generateOfflineBlueprint } from "./data/offlineGenerator";
import { Navbar } from "./components/Navbar";
import { InputForm } from "./components/InputForm";
import { BlueprintView } from "./components/BlueprintView";
import { SavedDrawer } from "./components/SavedDrawer";
import { ComparisonModal } from "./components/ComparisonModal";
import { AboutModal } from "./components/AboutModal";
import { AboutMeModal } from "./components/AboutMeModal";
import { 
  Sparkles, 
  ArrowLeft, 
  Cpu, 
  Zap, 
  Layers, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function App() {
  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(null);
  const [savedBlueprints, setSavedBlueprints] = useState<ProjectBlueprint[]>([]);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutMeModalOpen, setAboutMeModalOpen] = useState(false);
  const [compareModalPair, setCompareModalPair] = useState<[ProjectBlueprint, ProjectBlueprint] | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Initializing Engine...");
  const [aiStatus, setAiStatus] = useState<"online" | "offline" | "checking">("checking");
  const [lastInputs, setLastInputs] = useState<GeneratorInputs | null>(null);
  const [angleNonceCounter, setAngleNonceCounter] = useState<number>(1);

  // Load saved blueprints from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("makermind_saved_blueprints");
      if (stored) {
        setSavedBlueprints(JSON.parse(stored));
      }
    } catch (err) {
      console.warn("Could not read saved blueprints from localStorage:", err);
    }

    // Check backend AI server health
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.geminiAvailable) {
          setAiStatus("online");
        } else {
          setAiStatus("offline");
        }
      })
      .catch(() => {
        setAiStatus("offline");
      });
  }, []);

  // Sync saved blueprints to localStorage
  const saveToLocalStorage = (list: ProjectBlueprint[]) => {
    try {
      localStorage.setItem("makermind_saved_blueprints", JSON.stringify(list));
    } catch (err) {
      console.warn("Could not write saved blueprints to localStorage:", err);
    }
  };

  // Generate Blueprint Handler
  const handleGenerate = async (inputs: GeneratorInputs, forceNewAngle: boolean = false) => {
    setIsLoading(true);
    setLastInputs(inputs);
    
    const nextNonce = angleNonceCounter + 1;
    setAngleNonceCounter(nextNonce);

    const loadingSteps = [
      "Connecting to STEM Knowledge Matrix...",
      "Formulating Non-Repetitive Technical Paradigm...",
      "Selecting Component BOM & INR Pricing...",
      "Drafting Step-by-Step Circuit Assembly Guide...",
      "Generating Examiner Viva Voce Q&A..."
    ];

    let stepIdx = 0;
    setLoadingMessage(loadingSteps[0]);
    const stepInterval = setInterval(() => {
      stepIdx = (stepIdx + 1) % loadingSteps.length;
      setLoadingMessage(loadingSteps[stepIdx]);
    }, 600);

    try {
      // Attempt Gemini Server API
      const res = await fetch("/api/generate-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inputs,
          angleNonce: nextNonce,
          forceNewAngle
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.blueprint) {
          const bp: ProjectBlueprint = {
            ...data.blueprint,
            id: `bp-ai-${Date.now()}`,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            level: inputs.level,
            subject: inputs.subject,
            topicKeyword: inputs.topic,
            materials: data.blueprint.materials.map((m: any, idx: number) => ({
              ...m,
              id: `mat-${idx}-${Date.now()}`,
              checked: false
            })),
            isAiGenerated: true
          };
          setBlueprint(bp);
          setIsLoading(false);
          clearInterval(stepInterval);
          return;
        }
      }

      // Fallback offline generator
      console.log("Using dynamic offline generator engine...");
      const fallbackBp = generateOfflineBlueprint(inputs, nextNonce);
      setBlueprint(fallbackBp);
    } catch (err) {
      console.warn("API Call Error, falling back to dynamic generator:", err);
      const fallbackBp = generateOfflineBlueprint(inputs, nextNonce);
      setBlueprint(fallbackBp);
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  // Regenerate with different angle for current topic
  const handleRegenerateAngle = () => {
    if (lastInputs) {
      handleGenerate(lastInputs, true);
    } else if (blueprint) {
      handleGenerate(
        {
          level: blueprint.level,
          subject: blueprint.subject,
          topic: blueprint.topicKeyword,
          budget: blueprint.budgetCategory
        },
        true
      );
    }
  };

  // Bookmark / Save Blueprint
  const handleToggleSave = (bp: ProjectBlueprint) => {
    const exists = savedBlueprints.some((b) => b.id === bp.id);
    let updated: ProjectBlueprint[];
    if (exists) {
      updated = savedBlueprints.filter((b) => b.id !== bp.id);
    } else {
      updated = [bp, ...savedBlueprints];
    }
    setSavedBlueprints(updated);
    saveToLocalStorage(updated);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedBlueprints.filter((b) => b.id !== id);
    setSavedBlueprints(updated);
    saveToLocalStorage(updated);
  };

  const handleClearAllSaved = () => {
    if (window.confirm("Are you sure you want to clear all saved project blueprints?")) {
      setSavedBlueprints([]);
      saveToLocalStorage([]);
    }
  };

  const isCurrentSaved = blueprint ? savedBlueprints.some((b) => b.id === blueprint.id) : false;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-pattern z-0" />

      {/* Top Navbar */}
      <Navbar
        savedCount={savedBlueprints.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
        onOpenAboutMe={() => setAboutMeModalOpen(true)}
        onReset={() => setBlueprint(null)}
        aiStatus={aiStatus}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10">
        {!blueprint ? (
          /* Form View */
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <InputForm
              onSubmit={(inputs, forceNewAngle) => handleGenerate(inputs, forceNewAngle)}
              isLoading={isLoading}
              loadingMessage={loadingMessage}
            />
          </div>
        ) : (
          /* Output Dashboard View */
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setBlueprint(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
                <span>Create Another Blueprint</span>
              </button>

              <div className="text-xs text-slate-400 font-medium">
                Blueprint ID: <span className="text-slate-200 font-mono">{blueprint.id}</span>
              </div>
            </div>

            <BlueprintView
              blueprint={blueprint}
              onRegenerateAngle={handleRegenerateAngle}
              onSave={handleToggleSave}
              isSaved={isCurrentSaved}
              isRegenerating={isLoading}
            />
          </div>
        )}
      </main>

      {/* Slide-over Saved Library Drawer */}
      <SavedDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedBlueprints={savedBlueprints}
        onSelectBlueprint={(bp) => setBlueprint(bp)}
        onDeleteBlueprint={handleDeleteSaved}
        onClearAll={handleClearAllSaved}
        onCompareBlueprints={(bp1, bp2) => {
          setCompareModalPair([bp1, bp2]);
          setSavedDrawerOpen(false);
        }}
      />

      {/* Side-by-Side Comparison Modal */}
      {compareModalPair && (
        <ComparisonModal
          bp1={compareModalPair[0]}
          bp2={compareModalPair[1]}
          onClose={() => setCompareModalPair(null)}
        />
      )}

      {/* About Engine Specs Modal */}
      {aboutModalOpen && (
        <AboutModal onClose={() => setAboutModalOpen(false)} />
      )}

      {/* About Me / Maker Profile Modal */}
      {aboutMeModalOpen && (
        <AboutMeModal
          onClose={() => setAboutMeModalOpen(false)}
          savedBlueprints={savedBlueprints}
          onSelectBlueprint={(bp) => setBlueprint(bp)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">MakerMind STEM Engine</span>
            <span className="text-slate-500">•</span>
            <span>Zero-Repeat Project Generator</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setAboutModalOpen(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer underline underline-offset-4"
            >
              About & Engine Specs
            </button>
            <span>•</span>
            <span>Built with React, Tailwind CSS & Google Gemini</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
