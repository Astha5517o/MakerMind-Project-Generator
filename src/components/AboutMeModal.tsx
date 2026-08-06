import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  School, 
  IdCard, 
  BookOpen, 
  Sparkles, 
  Save, 
  Check, 
  Award, 
  Bookmark, 
  Cpu, 
  X,
  Edit3,
  Layers
} from "lucide-react";
import { UserProfile, StudentLevel, ProjectBlueprint } from "../types";

interface AboutMeModalProps {
  onClose: () => void;
  savedBlueprints: ProjectBlueprint[];
  onSelectBlueprint?: (bp: ProjectBlueprint) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Astha",
  email: "astha5517o@gmail.com",
  institution: "National Institute of Technology / STEM Innovation Lab",
  rollNumber: "STEM-2026-8842",
  branch: "Electronics & Robotics Engineering",
  bio: "Passionate STEM builder and innovator. Specializing in embedded systems, IoT automation, zero-repeat hardware blueprints, and examiner lab defense.",
  preferredLevel: "College / Engineering"
};

export const AboutMeModal: React.FC<AboutMeModalProps> = ({ 
  onClose, 
  savedBlueprints,
  onSelectBlueprint 
}) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("makermind_user_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "activity">("profile");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    localStorage.setItem("makermind_user_profile", JSON.stringify(formData));
    setIsEditing(false);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-white text-xl">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight">
                  About Me & Maker Profile
                </h2>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-bold uppercase tracking-widest">
                  Verified Innovator
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {profile.email}
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

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 shrink-0 z-10">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "profile"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30"
                : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Maker Details</span>
          </button>

          <button
            onClick={() => setActiveTab("activity")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "activity"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30"
                : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>My Lab Portfolio ({savedBlueprints.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 z-10">

          {activeTab === "profile" && (
            <div className="space-y-6">
              
              {/* Notification Banner */}
              {isSavedNotice && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              {/* Profile View or Edit Form */}
              {!isEditing ? (
                <div className="space-y-6">
                  {/* Info Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        Full Name / Student Name
                      </div>
                      <div className="text-base font-bold text-white">{profile.name}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-400" />
                        Email Address
                      </div>
                      <div className="text-base font-bold text-white font-mono">{profile.email}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-amber-400" />
                        Institution / College
                      </div>
                      <div className="text-sm font-semibold text-slate-200">{profile.institution}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                        <IdCard className="w-3.5 h-3.5 text-purple-400" />
                        Student Roll No / ID
                      </div>
                      <div className="text-sm font-semibold text-slate-200 font-mono">{profile.rollNumber}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 sm:col-span-2">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                        Branch / Stream & Preferred Tier
                      </div>
                      <div className="text-sm font-semibold text-slate-200 flex flex-wrap items-center gap-3 mt-1">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-indigo-300">
                          {profile.branch}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                          {profile.preferredLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      Academic & Maker Bio
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{profile.bio}"
                    </p>
                  </div>

                  {/* Edit Trigger */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        setFormData(profile);
                        setIsEditing(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit My Profile</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Edit Form */
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Institution / College
                      </label>
                      <input
                        type="text"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Roll Number / Student ID
                      </label>
                      <input
                        type="text"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Branch / Stream
                      </label>
                      <input
                        type="text"
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Maker Bio
                      </label>
                      <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Profile Details</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Saved Project Blueprints ({savedBlueprints.length})
              </h4>

              {savedBlueprints.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-slate-950 border border-dashed border-slate-800 text-slate-500 space-y-2">
                  <Bookmark className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-xs font-medium">No saved blueprints in your profile library yet.</p>
                  <p className="text-[11px] text-slate-600">Generate a blueprint and click "Save Blueprint" to store it here.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {savedBlueprints.map((bp) => (
                    <div
                      key={bp.id}
                      onClick={() => {
                        if (onSelectBlueprint) onSelectBlueprint(bp);
                        onClose();
                      }}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {bp.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                          <span className="text-emerald-400 font-mono">₹{bp.estimatedTotalCostINR}</span>
                          <span>•</span>
                          <span>{bp.subject}</span>
                          <span>•</span>
                          <span className="text-slate-500">{bp.createdAt}</span>
                        </div>
                      </div>
                      <span className="text-xs text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">
                        View Blueprint →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0 z-10">
          <div className="text-[11px] text-slate-500 font-mono">
            AUTHOR ID: {profile.email}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
