/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { 
  GeneratorInputs, 
  ProjectBlueprint 
} from "./types";
import { generateOfflineBlueprint } from "./data/offlineGenerator";
import { useAuth } from "./context/AuthContext";
import { 
  saveProjectToFirestore, 
  getUserProjects, 
  deleteProjectFromFirestore 
} from "./lib/firestoreService";
import { Navbar } from "./components/Navbar";
import { InputForm } from "./components/InputForm";
import { BlueprintView } from "./components/BlueprintView";
import { SavedDrawer } from "./components/SavedDrawer";
import { ComparisonModal } from "./components/ComparisonModal";
import { AboutModal } from "./components/AboutModal";
import { AboutMeModal } from "./components/AboutMeModal";
import { AuthModal } from "./components/AuthModal";
import { PromptSuggesterModal } from "./components/PromptSuggesterModal";
import { GoogleAIFooter } from "./components/GoogleAIFooter";
import { 
  Sparkles, 
  ArrowLeft, 
  Cpu, 
  Zap, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  CloudCheck,
  Award,
  Lightbulb
} from "lucide-react";

export default function App() {
  const { user, userProfile, authLoading } = useAuth();
  
  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(null);
  const [savedBlueprints, setSavedBlueprints] = useState<ProjectBlueprint[]>([]);
  
  // Modals state
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutMeModalOpen, setAboutMeModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [promptsModalOpen, setPromptsModalOpen] = useState(false);
  const [compareModalPair, setCompareModalPair] = useState<[ProjectBlueprint, ProjectBlueprint] | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Initializing Engine...");
  const [aiStatus, setAiStatus] = useState<"online" | "offline" | "checking">("checking");
  const [lastInputs, setLastInputs] = useState<GeneratorInputs | null>(null);
  const [angleNonceCounter, setAngleNonceCounter] = useState<number>(1);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  // Load saved blueprints when user changes or on mount
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (user && !user.isAnonymous) {
        setIsCloudSyncing(true);
        try {
          const cloudProjects = await getUserProjects(user.uid);
          if (isMounted) {
            if (cloudProjects.length > 0) {
              setSavedBlueprints(cloudProjects);
              // Also update local storage as backup cache
              localStorage.setItem("makermind_saved_blueprints", JSON.stringify(cloudProjects));
            } else {
              // If cloud is empty, check if there are local projects to migrate
              const localStored = localStorage.getItem("makermind_saved_blueprints");
              if (localStored) {
                const localList: ProjectBlueprint[] = JSON.parse(localStored);
                if (localList.length > 0) {
                  setSavedBlueprints(localList);
                  // Sync local projects to user's new cloud account
                  for (const p of localList) {
                    await saveProjectToFirestore(user.uid, p).catch(console.warn);
                  }
                }
              }
            }
          }
        } catch (err) {
          console.warn("Error fetching cloud projects:", err);
        } finally {
          if (isMounted) setIsCloudSyncing(false);
        }
      } else {
        // Guest or non-logged in: load from localStorage
        try {
          const stored = localStorage.getItem("makermind_saved_blueprints");
          if (stored && isMounted) {
            setSavedBlueprints(JSON.parse(stored));
          }
        } catch (err) {
          console.warn("Could not read saved blueprints from localStorage:", err);
        }
      }
    }

    loadData();

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

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Sync saved blueprints to localStorage & Cloud
  const persistBlueprints = async (list: ProjectBlueprint[]) => {
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
      "Configuring Science Exhibition Display Board & Dossier...",
      "Selecting Component BOM & INR Pricing...",
      "Drafting Step-by-Step Assembly & Prototype Guide...",
      "Generating Examiner Viva Voce & 2-Min Pitch..."
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

  // Bookmark / Save Blueprint (Cloud + Local)
  const handleToggleSave = async (bp: ProjectBlueprint) => {
    const exists = savedBlueprints.some((b) => b.id === bp.id);
    let updated: ProjectBlueprint[];
    
    if (exists) {
      updated = savedBlueprints.filter((b) => b.id !== bp.id);
      if (user && !user.isAnonymous) {
        deleteProjectFromFirestore(user.uid, bp.id).catch(console.warn);
      }
    } else {
      updated = [bp, ...savedBlueprints];
      if (user && !user.isAnonymous) {
        saveProjectToFirestore(user.uid, bp).catch(console.warn);
      }
    }
    setSavedBlueprints(updated);
    persistBlueprints(updated);
  };

  // Update Blueprint in-place (for experimental logs, checklist changes)
  const handleUpdateBlueprint = async (updates: Partial<ProjectBlueprint>) => {
    if (!blueprint) return;
    const updatedBp = { ...blueprint, ...updates };
    setBlueprint(updatedBp);

    // If it is saved, update the saved item and push to cloud
    const isSaved = savedBlueprints.some(b => b.id === blueprint.id);
    if (isSaved) {
      const updatedList = savedBlueprints.map(b => b.id === blueprint.id ? updatedBp : b);
      setSavedBlueprints(updatedList);
      persistBlueprints(updatedList);
      if (user && !user.isAnonymous) {
        saveProjectToFirestore(user.uid, updatedBp).catch(console.warn);
      }
    }
  };

  const handleDeleteSaved = async (id: string) => {
    const updated = savedBlueprints.filter((b) => b.id !== id);
    setSavedBlueprints(updated);
    persistBlueprints(updated);
    if (user && !user.isAnonymous) {
      deleteProjectFromFirestore(user.uid, id).catch(console.warn);
    }
  };

  const handleClearAllSaved = async () => {
    if (window.confirm("Are you sure you want to clear all saved project blueprints?")) {
      if (user && !user.isAnonymous) {
        for (const bp of savedBlueprints) {
          await deleteProjectFromFirestore(user.uid, bp.id).catch(console.warn);
        }
      }
      setSavedBlueprints([]);
      persistBlueprints([]);
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
        onOpenPrompts={() => setPromptsModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
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
              onOpenPrompts={() => setPromptsModalOpen(true)}
            />
          </div>
        ) : (
          /* Output Dashboard View */
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setBlueprint(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
                <span>Create Another Blueprint</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPromptsModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Idea Hub</span>
                </button>

                <div className="text-xs text-slate-400 font-medium">
                  Blueprint ID: <span className="text-slate-200 font-mono">{blueprint.id}</span>
                </div>
              </div>
            </div>

            <BlueprintView
              blueprint={blueprint}
              onRegenerateAngle={handleRegenerateAngle}
              onSave={handleToggleSave}
              isSaved={isCurrentSaved}
              isRegenerating={isLoading}
              onUpdateBlueprint={handleUpdateBlueprint}
              isAuthenticated={!!user && !user.isAnonymous}
              onOpenAuth={() => setAuthModalOpen(true)}
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

      {/* Science Exhibition Prompt Suggester Modal */}
      <PromptSuggesterModal
        isOpen={promptsModalOpen}
        onClose={() => setPromptsModalOpen(false)}
        onSelectPrompt={(inputs) => handleGenerate(inputs, false)}
      />

      {/* Student Sign In / Sign Up Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
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

      {/* Google AI Showcase Footer */}
      <GoogleAIFooter />
    </div>
  );
}
