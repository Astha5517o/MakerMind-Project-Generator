import React, { useState } from "react";
import { ProjectBlueprint, StudentLogEntry } from "../types";
import { 
  Award, 
  Presentation, 
  CheckSquare, 
  BookOpen, 
  Timer, 
  FileText, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Wrench, 
  Layers,
  CloudCheck
} from "lucide-react";

interface ExhibitionDossierTabProps {
  blueprint: ProjectBlueprint;
  onUpdateBlueprint?: (updates: Partial<ProjectBlueprint>) => void;
  isAuthenticated: boolean;
  onOpenAuth: () => void;
}

export const ExhibitionDossierTab: React.FC<ExhibitionDossierTabProps> = ({
  blueprint,
  onUpdateBlueprint,
  isAuthenticated,
  onOpenAuth
}) => {
  const dossier = blueprint.exhibitionDossier || {
    problemStatement: `Lack of real-time sensory automation and low-cost feedback in conventional ${blueprint.topicKeyword} setups.`,
    hypothesis: `Implementing a microcontroller with real-time transducers will automate response within 150ms and reduce manual intervention by over 80%.`,
    modelType: "Working Interactive Prototype" as const,
    displayBoardGuide: {
      abstract: `This science exhibition project titled "${blueprint.title}" demonstrates a practical, low-cost solution for ${blueprint.topicKeyword} using real-time STEM sensing.`,
      methodology: `Constructed using ${blueprint.materials[0]?.name || "sensors"} interfaced with a primary logic controller, featuring calibrated thresholds and safety cutoffs.`,
      keyObservations: `Empirical tests revealed high trigger precision, low current draw, and robust performance under variable ambient test conditions.`,
      realWorldImpact: `Offers a scalable, low-cost (₹${blueprint.estimatedTotalCostINR}) alternative for community and educational applications.`
    },
    twoMinuteJudgePitch: `Respected judges, our project is "${blueprint.title}". We addressed the challenge of ${blueprint.topicKeyword}. Our working model uses smart sensors and microcontrollers to achieve real-time automation. As we trigger the live demonstration now, you can observe...`,
    modelConstructionTips: [
      "Base Construction: Mount all modules on a clean 5mm white Sunboard or MDF sheet (30cm x 40cm).",
      "Wiring Aesthetics: Bundle all jumpers neatly with spiral wraps and color-code VCC (Red), GND (Black), and Signal (Yellow/Blue).",
      "Live Testing Zone: Keep an interactive test zone clearly marked for judges to trigger the sensors themselves."
    ],
    safetyChecklist: [
      "Install a central DC master switch with an inline 500mA protection fuse.",
      "Heat-shrink all bare solder wire connections.",
      "Bring a backup 9V/LiPo battery pack to prevent exhibition table power socket dependency."
    ]
  };

  // State for Checklist
  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    blueprint.exhibitionChecklist || {
      "workingModelFunctional": true,
      "displayBoardPrepared": false,
      "vivaQuestionsMemorized": false,
      "circuitDiagramPrinted": false,
      "backupBatteryCharged": true,
      "twoMinutePitchRehearsed": false
    }
  );

  // State for Student Logs
  const [logs, setLogs] = useState<StudentLogEntry[]>(
    blueprint.studentLogs || [
      {
        id: "log-init",
        timestamp: blueprint.createdAt || "Day 1",
        title: "Initial Circuit Assembly & Logic Test",
        notes: "Assembled breadboard prototype, validated 5V rail and calibrated sensor zero-point.",
        sensorReadings: "VCC: 5.01V | Current: 55mA | Sensor Threshold: 450"
      }
    ]
  );

  // New Log Entry Form
  const [newLogTitle, setNewLogTitle] = useState("");
  const [newLogNotes, setNewLogNotes] = useState("");
  const [newLogReadings, setNewLogReadings] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);

  // Copied toast state
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Pitch timer
  const [pitchSeconds, setPitchSeconds] = useState(120);
  const [timerRunning, setTimerRunning] = useState(false);

  const toggleChecklistItem = (key: string) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    if (onUpdateBlueprint) {
      onUpdateBlueprint({ exhibitionChecklist: updated });
    }
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle.trim()) return;

    const newEntry: StudentLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: newLogTitle.trim(),
      notes: newLogNotes.trim(),
      sensorReadings: newLogReadings.trim() || undefined
    };

    const updatedLogs = [newEntry, ...logs];
    setLogs(updatedLogs);
    setNewLogTitle("");
    setNewLogNotes("");
    setNewLogReadings("");
    setShowLogForm(false);

    if (onUpdateBlueprint) {
      onUpdateBlueprint({ studentLogs: updatedLogs });
    }
  };

  const handleDeleteLog = (id: string) => {
    const updatedLogs = logs.filter((l) => l.id !== id);
    setLogs(updatedLogs);
    if (onUpdateBlueprint) {
      onUpdateBlueprint({ studentLogs: updatedLogs });
    }
  };

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  // Timer effect
  React.useEffect(() => {
    let interval: any = null;
    if (timerRunning && pitchSeconds > 0) {
      interval = setInterval(() => setPitchSeconds((prev) => prev - 1), 1000);
    } else if (pitchSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, pitchSeconds]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner with Science Exhibition Context */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Science Exhibition & Prototype Exhibition Studio
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                Exhibition Ready
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Complete display board planner, 2-minute judge pitch, prototype construction specs, and experimental logbook
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handlePrintDossier}
            className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-indigo-400" />
            <span>Print Exhibition Dossier</span>
          </button>

          {!isAuthenticated && (
            <button
              onClick={onOpenAuth}
              className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <span>Login to Sync</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid: Display Board Planner & 2-Minute Pitch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Display Board Planner */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Presentation className="w-5 h-5 text-indigo-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Tri-Fold Exhibition Chart Paper / Display Board Draft
                </h4>
              </div>

              <button
                onClick={() => {
                  const fullDraft = `PROJECT TITLE: ${blueprint.title}\n\nABSTRACT:\n${dossier.displayBoardGuide.abstract}\n\nPROBLEM STATEMENT:\n${dossier.problemStatement}\n\nHYPOTHESIS:\n${dossier.hypothesis}\n\nMETHODOLOGY & CIRCUIT:\n${dossier.displayBoardGuide.methodology}\n\nOBSERVATIONS & DATA:\n${dossier.displayBoardGuide.keyObservations}\n\nSOCIETAL IMPACT:\n${dossier.displayBoardGuide.realWorldImpact}`;
                  copyToClipboard(fullDraft, "fullBoard");
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                {copiedSection === "fullBoard" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Full Board!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy All for Chart Paper</span>
                  </>
                )}
              </button>
            </div>

            {/* Display Board Quadrants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Abstract */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                    1. Project Abstract
                  </span>
                  <button
                    onClick={() => copyToClipboard(dossier.displayBoardGuide.abstract, "abstract")}
                    className="text-slate-500 hover:text-slate-300 p-1"
                  >
                    {copiedSection === "abstract" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {dossier.displayBoardGuide.abstract}
                </p>
              </div>

              {/* Problem & Hypothesis */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 uppercase tracking-wide">
                    2. Problem & Hypothesis
                  </span>
                  <button
                    onClick={() => copyToClipboard(`Problem: ${dossier.problemStatement}\nHypothesis: ${dossier.hypothesis}`, "prob")}
                    className="text-slate-500 hover:text-slate-300 p-1"
                  >
                    {copiedSection === "prob" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-200">Problem: </strong> {dossier.problemStatement}
                </p>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-200">Hypothesis: </strong> {dossier.hypothesis}
                </p>
              </div>

              {/* Methodology */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                    3. Methodology & Working Principle
                  </span>
                  <button
                    onClick={() => copyToClipboard(dossier.displayBoardGuide.methodology, "method")}
                    className="text-slate-500 hover:text-slate-300 p-1"
                  >
                    {copiedSection === "method" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {dossier.displayBoardGuide.methodology}
                </p>
              </div>

              {/* Real World Impact */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                    4. Results & Societal Impact
                  </span>
                  <button
                    onClick={() => copyToClipboard(dossier.displayBoardGuide.realWorldImpact, "impact")}
                    className="text-slate-500 hover:text-slate-300 p-1"
                  >
                    {copiedSection === "impact" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {dossier.displayBoardGuide.realWorldImpact}
                </p>
              </div>
            </div>
          </div>

          {/* Prototype Construction & Aesthetics Specs */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Wrench className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Exhibition Model & Prototype Construction Specifications
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Model Presentation Tips
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {dossier.modelConstructionTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Safety & Power Compliance
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {dossier.safetyChecklist.map((safe, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
                      <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{safe}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: 2-Minute Pitch & Exhibition Readiness Checklist */}
        <div className="space-y-6">
          {/* 2-Minute Judge Pitch Box with Rehearsal Timer */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-indigo-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  2-Minute Judge Pitch
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-emerald-400">
                  {Math.floor(pitchSeconds / 60)}:{(pitchSeconds % 60).toString().padStart(2, "0")}
                </span>
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    timerRunning
                      ? "bg-rose-600 text-white"
                      : "bg-indigo-600 text-white hover:bg-indigo-500"
                  }`}
                >
                  {timerRunning ? "Pause" : "Rehearse"}
                </button>
                <button
                  onClick={() => { setTimerRunning(false); setPitchSeconds(120); }}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans italic">
              "{dossier.twoMinuteJudgePitch}"
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Winning Presentation Formula:</div>
              <div>1. <strong className="text-indigo-300">Hook:</strong> State the problem in 20 seconds.</div>
              <div>2. <strong className="text-indigo-300">Working Model:</strong> Trigger sensor live in 40 seconds.</div>
              <div>3. <strong className="text-indigo-300">Impact:</strong> Explain cost & scale in 40 seconds.</div>
              <div>4. <strong className="text-indigo-300">Q&A:</strong> Invite judges to test prototype.</div>
            </div>
          </div>

          {/* Exhibition Readiness Checklist (Auto-Saved) */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Exhibition Checklist
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">
                {Object.values(checklist).filter(Boolean).length} / {Object.keys(checklist).length} Ready
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { key: "workingModelFunctional", label: "Working Prototype Tested (15m Run)" },
                { key: "displayBoardPrepared", label: "Tri-Fold Chart Board Pasted" },
                { key: "vivaQuestionsMemorized", label: "Viva Voce Q&A Rehearsed" },
                { key: "circuitDiagramPrinted", label: "Schematic & Pinout Diagram Printed" },
                { key: "backupBatteryCharged", label: "Backup 9V / LiPo Batteries Packed" },
                { key: "twoMinutePitchRehearsed", label: "2-Minute Judge Pitch Practiced" }
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={!!checklist[key]}
                    onChange={() => toggleChecklistItem(key)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-slate-900 border-slate-700"
                  />
                  <span className={`text-xs ${checklist[key] ? "text-slate-400 line-through" : "text-slate-200 font-medium"}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Student Experimental Logbook & Test Observations */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Student Prototype Logbook & Experimental Observations
              </h4>
              <p className="text-xs text-slate-400">
                Log real prototype testing sessions, sensor calibration values, and modifications
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Log Entry</span>
          </button>
        </div>

        {/* Log Input Form */}
        {showLogForm && (
          <form onSubmit={handleAddLog} className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Observation Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trial 2 - Sensor Threshold Calibration"
                  value={newLogTitle}
                  onChange={(e) => setNewLogTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sensor Readings / Multimeter Data</label>
                <input
                  type="text"
                  placeholder="e.g. Current: 45mA | Response: 120ms | Lux: 650"
                  value={newLogReadings}
                  onChange={(e) => setNewLogReadings(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Experiment Notes & Modifications</label>
              <textarea
                rows={2}
                placeholder="Describe what was tested, what worked, and any component adjustments made..."
                value={newLogNotes}
                onChange={(e) => setNewLogNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowLogForm(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Save to Cloud Logbook
              </button>
            </div>
          </form>
        )}

        {/* Existing Logs List */}
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 space-y-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold">
                    {log.timestamp}
                  </span>
                  <h5 className="text-xs font-bold text-white">{log.title}</h5>
                </div>

                <button
                  onClick={() => handleDeleteLog(log.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {log.notes && (
                <p className="text-xs text-slate-300 leading-relaxed">{log.notes}</p>
              )}

              {log.sensorReadings && (
                <div className="text-[11px] font-mono text-emerald-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800/80">
                  Telemetry: {log.sensorReadings}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
