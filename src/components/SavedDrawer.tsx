import React, { useState } from "react";
import { ProjectBlueprint } from "../types";
import { 
  X, 
  Trash2, 
  ExternalLink, 
  Search, 
  Bookmark, 
  Sparkles, 
  ArrowRight,
  Columns
} from "lucide-react";

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedBlueprints: ProjectBlueprint[];
  onSelectBlueprint: (bp: ProjectBlueprint) => void;
  onDeleteBlueprint: (id: string) => void;
  onClearAll: () => void;
  onCompareBlueprints: (bp1: ProjectBlueprint, bp2: ProjectBlueprint) => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedBlueprints,
  onSelectBlueprint,
  onDeleteBlueprint,
  onClearAll,
  onCompareBlueprints,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  if (!isOpen) return null;

  const filtered = savedBlueprints.filter(bp => 
    bp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bp.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bp.angleTag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCompareSelect = (id: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const handleRunCompare = () => {
    if (selectedForCompare.length === 2) {
      const bp1 = savedBlueprints.find(b => b.id === selectedForCompare[0]);
      const bp2 = savedBlueprints.find(b => b.id === selectedForCompare[1]);
      if (bp1 && bp2) {
        onCompareBlueprints(bp1, bp2);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bookmark className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-extrabold text-white">
                Saved Blueprints ({savedBlueprints.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar & Actions */}
          <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-950/40">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by topic, subject, or angle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {selectedForCompare.length === 2 && (
              <button
                onClick={handleRunCompare}
                className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Columns className="w-4 h-4" />
                <span>Compare Selected Blueprints Side-by-Side</span>
              </button>
            )}
          </div>

          {/* Blueprints List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">
                  {savedBlueprints.length === 0
                    ? "No saved blueprints yet. Generate a blueprint and click 'Save'!"
                    : "No saved blueprints match your search term."}
                </p>
              </div>
            ) : (
              filtered.map((bp) => {
                const isSelectedForCompare = selectedForCompare.includes(bp.id);
                return (
                  <div
                    key={bp.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isSelectedForCompare
                        ? "bg-slate-800 border-indigo-500 shadow-md ring-1 ring-indigo-500/30"
                        : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                          {bp.subject} • {bp.angleTag}
                        </span>
                        <h4 className="text-sm font-extrabold text-white leading-snug">
                          {bp.title}
                        </h4>
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                          <span>₹{bp.estimatedTotalCostINR}</span>
                          <span>•</span>
                          <span>{bp.difficulty}</span>
                          <span>•</span>
                          <span>{bp.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => toggleCompareSelect(bp.id)}
                          title="Select for Side-by-Side Comparison"
                          className={`p-1.5 rounded-lg border text-[11px] font-semibold transition-all ${
                            isSelectedForCompare
                              ? "bg-indigo-500 border-indigo-400 text-white"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          <Columns className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            onSelectBlueprint(bp);
                            onClose();
                          }}
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                          title="Open Blueprint"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteBlueprint(bp.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {savedBlueprints.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Tip: Select 2 items to compare
              </span>
              <button
                onClick={onClearAll}
                className="text-xs text-red-400 hover:underline font-medium"
              >
                Clear All Saved
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
