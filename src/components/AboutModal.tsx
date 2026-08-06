import React from "react";
import { 
  X, 
  Cpu, 
  Sparkles, 
  Zap, 
  Layers, 
  BookOpenCheck, 
  Wrench, 
  IndianRupee, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  Image as ImageIcon 
} from "lucide-react";

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Background Decorative Glows */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight bg-gradient-to-r from-indigo-400 via-emerald-400 to-white bg-clip-text text-transparent">
                  About MakerMind Engine
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold uppercase tracking-widest">
                  v2.5 Release
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic STEM School & College Project Blueprint Generator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 z-10">
          
          {/* Mission & Overview */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Core Philosophy & Mission
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>MakerMind</strong> is an intelligent STEM project blueprint generator designed to eliminate repeated, boilerplate academic projects for middle school, high school, and engineering students. By combining Gemini AI reasoning with an offline matrix generator, MakerMind produces lab-tested, unique hardware schematics, accurate INR component pricing, and examiner viva voce defense Q&A.
            </p>
          </div>

          {/* Key Capabilities Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Engine Capabilities & Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <Zap className="w-4 h-4" />
                  Zero-Repeat Logic Matrix
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Generates distinct microcontroller paradigms (Arduino, Raspberry Pi Pico, ESP32, STM32) and specialized sensor choices so students in the same class never submit identical projects.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <IndianRupee className="w-4 h-4" />
                  INR Bill of Materials (BOM)
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Provides exact itemized component costs in Indian Rupees (₹), categorized by budget tiers (Economy, Medium, Advanced) with interactive acquisition checkboxes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <BookOpenCheck className="w-4 h-4" />
                  Examiner Viva Voce Defense
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Prepares students for lab exams with interactive flashcard Q&A covering physics principles, EMF shielding, sensor calibration, and thermal dissipation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                  <ImageIcon className="w-4 h-4" />
                  AI Image & Schematic Studio
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Generates 3D photorealistic prototype renders, technical CAD blueprints, and circuit schematics on-the-fly, with support for uploading custom physical lab photos.
                </p>
              </div>

            </div>
          </div>

          {/* Academic Level Adaptability */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Designed for Academic Tiers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="font-bold text-white mb-1">Middle School (6th-10th)</div>
                <p className="text-[11px] text-slate-400">Focuses on intuitive breadboard wiring, safe low-voltage DC motors, solar panels, and fundamental science concepts.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="font-bold text-white mb-1">High School (11th-12th)</div>
                <p className="text-[11px] text-slate-400">Integrates basic microcontrollers (Arduino Uno, ESP8266), pulse width modulation (PWM), and analog sensor inputs.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="font-bold text-white mb-1">Engineering / College</div>
                <p className="text-[11px] text-slate-400">Incorporate edge-AI, IoT WebSockets, custom PCB trace considerations, PID control loops, and complex sensor arrays.</p>
              </div>
            </div>
          </div>

          {/* Engine Architecture & Offline Fallback */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/50 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-indigo-200">Dual-Mode Generation Architecture</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                MakerMind connects to server-side Google Gemini Flash models for live contextual intelligence. In case of network loss or API rate limits, the app seamlessly switches to the built-in dynamic SVG blueprint matrix, guaranteeing 100% uptime without interruption.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0 z-10">
          <div className="text-[11px] text-slate-500 font-mono">
            ENGINE VER: 2.5.0-PROD
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-md shadow-indigo-900/30"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
};
