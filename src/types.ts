export type StudentLevel = 
  | "Middle School (Class 6-10)" 
  | "High School (Class 11-12)" 
  | "College / Engineering";

export type SupportedRegion = 
  | "global" 
  | "japan" 
  | "china" 
  | "usa" 
  | "india" 
  | "uk_europe" 
  | "germany";

export type SupportedLanguage = 
  | "en" 
  | "ja" 
  | "zh" 
  | "hi" 
  | "es" 
  | "de";

export type SupportedCurrency = 
  | "INR" 
  | "USD" 
  | "JPY" 
  | "CNY" 
  | "EUR" 
  | "GBP";

export interface TeamMember {
  id: string;
  name: string;
  role: "Team Lead & Project Architect" | "Circuit & Hardware Lead" | "Embedded Firmware Coder" | "Model Enclosure & Mechanical" | "Exhibition Defense & Poster Lead";
  email?: string;
  gradeOrSchool?: string;
}

export interface RoadmapMilestone {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  keyDeliverable: string;
  estimatedTime: string;
  completed?: boolean;
}

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

export interface StudentLogEntry {
  id: string;
  timestamp: string;
  title: string;
  notes: string;
  sensorReadings?: string;
}

export interface ExhibitionDossier {
  problemStatement: string;
  hypothesis: string;
  modelType: "Working Interactive Prototype" | "Display Demonstration Model" | "IoT Connected Sentry" | "Mechanical Simulation Model";
  displayBoardGuide: {
    abstract: string;
    methodology: string;
    keyObservations: string;
    realWorldImpact: string;
  };
  twoMinuteJudgePitch: string;
  modelConstructionTips: string[];
  safetyChecklist: string[];
}

export interface ImagePromptSuggestion {
  id: string;
  style: "3D Physical Prototype Model" | "Exploded CAD & Hardware Assembly" | "Science Exhibition Booth & Display Board" | "Cutaway Realistic Circuit & Transducer";
  title: string;
  prompt: string;
  negativePrompt?: string;
  recommendedAspect: "16:9" | "4:3" | "1:1";
  keyElementsHighlighted: string[];
}

export interface ProjectBlueprint {
  id: string;
  userId?: string;
  createdAt: string;
  updatedAt?: string;
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
  
  // Science Exhibition & Prototype Expansion
  exhibitionDossier?: ExhibitionDossier;
  studentNotes?: string;
  studentLogs?: StudentLogEntry[];
  exhibitionChecklist?: Record<string, boolean>;
  
  // AI Image Creation Prompts Tailored to the Idea
  imagePrompts?: ImagePromptSuggestion[];

  // Multi-person Team & Project Execution Roadmap
  teamMembersList?: TeamMember[];
  roadmapMilestones?: RoadmapMilestone[];
  region?: SupportedRegion;
  countryName?: string;
}

export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  institution?: string;
  gradeClass?: string;
  teamMembers?: string;
  rollNumber?: string;
  branch?: string;
  bio?: string;
  preferredLevel?: StudentLevel;
  preferredRegion?: SupportedRegion;
  preferredCurrency?: SupportedCurrency;
  preferredLanguage?: SupportedLanguage;
  createdAt?: string;
}

export interface GeneratorInputs {
  level: StudentLevel;
  subject: SubjectArea;
  topic: string;
  budget: BudgetRange;
  region?: SupportedRegion;
  countryName?: string;
}

export interface SuggestedProjectPrompt {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problemAddressed: string;
  prototypeModelIdea: string;
  exhibitionWinningFactor: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  suitabilityScore: number; // e.g. 98%
  level: StudentLevel;
  subject: SubjectArea;
  budget: BudgetRange;
  suggestedMaterials: string[];
  tags: string[];
}
