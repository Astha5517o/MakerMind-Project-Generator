export type StudentLevel = 
  | "Middle School (Class 6-10)" 
  | "High School (Class 11-12)" 
  | "College / Engineering";

export type SubjectArea = 
  | "Computer Science & AI"
  | "Physics & Applied Mechanics"
  | "Chemistry & Material Science"
  | "Environmental & Green Tech"
  | "Robotics & Electronics";

export type BudgetRange = 
  | "Low (Under ₹500)"
  | "Medium (₹500 - ₹2000)"
  | "Advanced (₹2000+)";

export interface MaterialItem {
  id: string;
  name: string;
  qty: string;
  costINR: number;
  purpose: string;
  alternativeComponent?: string;
  checked?: boolean;
}

export interface AssemblyStep {
  stepNumber: number;
  title: string;
  description: string;
  proTip?: string;
  codeOrSchematicSnippet?: string;
}

export interface ScientificPrinciple {
  title: string;
  explanation: string;
  realWorldUsage: string;
}

export interface VivaQuestion {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  userKnown?: boolean;
}

export interface ProjectBlueprint {
  id: string;
  createdAt: string;
  title: string;
  angleTag: string;
  overview: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  buildTime: string;
  budgetCategory: BudgetRange;
  estimatedTotalCostINR: number;
  level: StudentLevel;
  subject: SubjectArea;
  topicKeyword: string;
  materials: MaterialItem[];
  toolsRequired: string[];
  assemblySteps: AssemblyStep[];
  scientificPrinciples: ScientificPrinciple[];
  vivaQuestions: VivaQuestion[];
  blockDiagram: string;
  safetyTips: string[];
  extensionIdeas: string[];
  generatedImages?: string[];
  uploadedImages?: string[];
  isAiGenerated?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  institution: string;
  rollNumber: string;
  branch: string;
  bio: string;
  preferredLevel: StudentLevel;
}

export interface GeneratorInputs {
  level: StudentLevel;
  subject: SubjectArea;
  topic: string;
  budget: BudgetRange;
}
