import React, { useState } from "react";
import { ProjectBlueprint, TeamMember } from "../types";
import { 
  Users, 
  Plus, 
  Trash2, 
  UserCheck, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Code, 
  Wrench, 
  Sparkles, 
  FileText 
} from "lucide-react";

interface TeamTabProps {
  blueprint: ProjectBlueprint;
  onUpdateBlueprint?: (updates: Partial<ProjectBlueprint>) => void;
}

export const TeamTab: React.FC<TeamTabProps> = ({
  blueprint,
  onUpdateBlueprint
}) => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    if (blueprint.teamMembers && blueprint.teamMembers.length > 0) {
      return blueprint.teamMembers;
    }
    return [
      {
        id: "lead-1",
        name: "Project Lead / Lead Innovator",
        role: "Team Lead & Project Architect",
        gradeOrSchool: blueprint.level
      },
      {
        id: "member-2",
        name: "Hardware Co-Researcher",
        role: "Circuit & Hardware Lead",
        gradeOrSchool: blueprint.level
      }
    ];
  });

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<TeamMember["role"]>("Embedded Firmware Coder");
  const [newMemberSchool, setNewMemberSchool] = useState("");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: newMemberName.trim(),
      role: newMemberRole,
      gradeOrSchool: newMemberSchool.trim() || blueprint.level
    };

    const updated = [...members, newMember];
    setMembers(updated);
    setNewMemberName("");
    setNewMemberSchool("");

    if (onUpdateBlueprint) {
      onUpdateBlueprint({ teamMembers: updated });
    }
  };

  const handleRemoveMember = (id: string) => {
    const updated = members.filter(m => m.id !== id);
    setMembers(updated);
    if (onUpdateBlueprint) {
      onUpdateBlueprint({ teamMembers: updated });
    }
  };

  const getRoleIcon = (role: TeamMember["role"]) => {
    switch (role) {
      case "Team Lead & Project Architect":
        return <Award className="w-4 h-4 text-amber-400" />;
      case "Circuit & Hardware Lead":
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      case "Embedded Firmware Coder":
        return <Code className="w-4 h-4 text-indigo-400" />;
      case "Model Enclosure & Mechanical":
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case "Exhibition Defense & Poster Lead":
        return <FileText className="w-4 h-4 text-purple-400" />;
      default:
        return <Users className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Multi-Person Collaborative Engineering</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Project Research Team & Role Matrix
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Attribute contributors, circuit leads, programmers, and science fair presenters for: <strong className="text-slate-200">{blueprint.title}</strong>
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center shrink-0">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Team Size</span>
            <span className="text-xl font-black text-indigo-400">{members.length} Members</span>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member, index) => (
          <div 
            key={member.id}
            className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-white font-black text-sm">
                  #{index + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {member.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {member.gradeOrSchool || blueprint.level}
                  </span>
                </div>
              </div>

              {members.length > 1 && (
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title="Remove member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                {getRoleIcon(member.role)}
                <span>{member.role}</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded uppercase">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Team Member Form */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Add Co-Author or Technical Specialist</span>
        </h3>

        <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Scholar / Student Full Name"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 text-xs font-medium"
            required
          />

          <select
            value={newMemberRole}
            onChange={(e) => setNewMemberRole(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs font-medium"
          >
            <option value="Team Lead & Project Architect">Team Lead & Project Architect</option>
            <option value="Circuit & Hardware Lead">Circuit & Hardware Lead</option>
            <option value="Embedded Firmware Coder">Embedded Firmware Coder</option>
            <option value="Model Enclosure & Mechanical">Model Enclosure & Mechanical</option>
            <option value="Exhibition Defense & Poster Lead">Exhibition Defense & Poster Lead</option>
          </select>

          <input
            type="text"
            placeholder="Institution / Grade (Optional)"
            value={newMemberSchool}
            onChange={(e) => setNewMemberSchool(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 text-xs font-medium"
          />

          <button
            type="submit"
            className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </form>
      </div>
    </div>
  );
};
