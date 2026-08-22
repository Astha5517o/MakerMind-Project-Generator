import { SupportedRegion, SupportedLanguage, SupportedCurrency, StudentLevel, RoadmapMilestone } from "../types";

export interface RegionDetail {
  id: SupportedRegion;
  countryName: string;
  nativeName: string;
  flag: string;
  defaultCurrency: SupportedCurrency;
  defaultLanguage: SupportedLanguage;
  scienceFairName: string;
  hardwareSourcingHub: string;
  gradeLevels: {
    levelKey: StudentLevel;
    localLabel: string;
    subLabel: string;
    gradeRange: string;
    description: string;
  }[];
}

export const REGIONS_CONFIG: Record<SupportedRegion, RegionDetail> = {
  global: {
    id: "global",
    countryName: "Global / Universal (IB, Cambridge & International)",
    nativeName: "International STEM Standards",
    flag: "🌐",
    defaultCurrency: "USD",
    defaultLanguage: "en",
    scienceFairName: "International Science & Engineering Fair (ISEF / Global STEM)",
    hardwareSourcingHub: "Mouser, DigiKey, SparkFun & Local Hobby Stores",
    gradeLevels: [
      {
        levelKey: "Middle School (Class 6-10)",
        localLabel: "Junior / Middle School",
        subLabel: "Grades 6–8 (Ages 11–14)",
        gradeRange: "Grades 6–8",
        description: "Foundational sensor circuits, simple microcontrollers & safe voltage DC experimentation."
      },
      {
        levelKey: "High School (Class 11-12)",
        localLabel: "Senior High School",
        subLabel: "Grades 9–12 / 11–12 (Ages 14–18)",
        gradeRange: "Grades 9–12 / 11–12",
        description: "Advanced embedded C/C++, automated feedback loops, IoT sensors & telemetry."
      },
      {
        levelKey: "College / Engineering",
        localLabel: "University & Higher Engineering",
        subLabel: "Undergraduate / Technical Degree",
        gradeRange: "B.S. / B.Eng / Polytechnic",
        description: "Industrial grade signal conditioning, PCB architecture, edge computing & research."
      }
    ]
  },
  japan: {
    id: "japan",
    countryName: "Japan (日本)",
    nativeName: "日本・文部科学省 (MEXT) 基準",
    flag: "🇯🇵",
    defaultCurrency: "JPY",
    defaultLanguage: "ja",
    scienceFairName: "日本学生科学賞 / 学生科学展 / モノづくり自由研究",
    hardwareSourcingHub: "秋月電子通商 (Akizuki), 千石電商 (Sengoku), スイッチサイエンス (Switch Science)",
    gradeLevels: [
      {
        levelKey: "Middle School (Class 6-10)",
        localLabel: "Junior High School (中学校)",
        subLabel: "1年生〜3年生 (Grades 7–9 / 中学)",
        gradeRange: "中学校 1〜3年",
        description: "理科・技術家庭科の電子回路、基礎センサ計測、安全なプロトタイプ制作。"
      },
      {
        levelKey: "High School (Class 11-12)",
        localLabel: "Senior High School (高等学校・高校)",
        subLabel: "高校1年〜3年 / 11・12年生 (Grades 10–12)",
        gradeRange: "高校 1〜3年 (11/12年生相当)",
        description: "マイコン制御 (Arduino/ESP32)、データ遠隔監視、科学コンテスト向け本格ハードウェア。"
      },
      {
        levelKey: "College / Engineering",
        localLabel: "Technical College & University (高専・大学)",
        subLabel: "高等専門学校 (KOSEN 1〜5年) / 大学工学部",
        gradeRange: "高専・大学 (学士・工学)",
        description: "回路CAD設計、組み込みRTOS、高精度トランスデューサ解析、学術発表レベル。"
      }
    ]
  },
  china: {
    id: "china",
    countryName: "China (中国)",
    nativeName: "中国中小学及高校科技创新体系",
    flag: "🇨🇳",
    defaultCurrency: "CNY",
    defaultLanguage: "zh",
    scienceFairName: "全国青少年科技创新大赛 (CASTIC) / 宋庆龄少年儿童发明奖",
    hardwareSourcingHub: "立创商城 (SZLCSC), 淘宝/天猫电子元器件, 嘉立创 (JLCPCB)",
    gradeLevels: [
      {
        levelKey: "Middle School (Class 6-10)",
        localLabel: "Junior Middle School (初级中学 / 初中)",
        subLabel: "七年级至九年级 (Grades 7–9 / 初一至初三)",
        gradeRange: "初中 (7–9年级)",
        description: "青少年创客入门、图形化编程与基础物理电学传感器实物制作。"
      },
      {
        levelKey: "High School (Class 11-12)",
        localLabel: "Senior High School (高级中学 / 高中)",
        subLabel: "高一至高三 / 11-12年级 (Grades 10–12)",
        gradeRange: "高中 (10–12年级 / 11-12级)",
        description: "全国科技大赛标准的微控制器闭环控制、物联网遥测与严谨科研立项。"
      },
      {
        levelKey: "College / Engineering",
        localLabel: "University & Engineering College (高等院校 / 本科)",
        subLabel: "工科本科 / 高职专科 / 电子信息类",
        gradeRange: "大学工科 / 本科生",
        description: "PCB制板、高精度工业传感器校准、边缘计算与软硬件集成论文级项目。"
      }
    ]
  },
  usa: {
    id: "usa",
    countryName: "United States (USA)",
    nativeName: "US NGSS & AP STEM Framework",
    flag: "🇺🇸",
    defaultCurrency: "USD",
    defaultLanguage: "en",
    scienceFairName: "Regeneron ISEF / Science Olympiad / 3M Young Scientist",
    hardwareSourcingHub: "Adafruit, SparkFun, DigiKey, Mouser Electronics",
    gradeLevels: [
      {
        levelKey: "Middle School (Class 6-10)",
        localLabel: "Middle School (Junior High)",
        subLabel: "Grades 6th – 8th (Ages 11–14)",
        gradeRange: "Grades 6–8",
        description: "Hands-on physical computing, Breadboard circuits, Micro:bit & simple sensing."
      },
      {
        levelKey: "High School (Class 11-12)",
        localLabel: "Senior High School (AP / Honors STEM)",
        subLabel: "Grades 9th – 12th / Junior & Senior (11–12)",
        gradeRange: "Grades 9–12 (11/12th)",
        description: "Arduino C++, Closed-loop PID actuators, ISEF-grade research design and defense."
      },
      {
        levelKey: "College / Engineering",
        localLabel: "Undergraduate / Engineering College",
        subLabel: "B.S. Electrical / Computer / MechE",
        gradeRange: "University Undergrad",
        description: "Custom PCB milling, RTOS, mathematical simulation, and capstone engineering."
      }
    ]
  },
  india: {
    id: "india",
    countryName: "India (Bharat)",
    nativeName: "CBSE / ICSE / State Board & AICTE",
    flag: "🇮🇳",
    defaultCurrency: "INR",
    defaultLanguage: "en",
    scienceFairName: "INSPIRE Awards - MANAK / CBSE Science Exhibition / SIH Hackathon",
    hardwareSourcingHub: "Robu.in, Evelta, QuartzComponents, SP Road / Lamington Rd",
    gradeLevels: [
      {
        levelKey: "Middle School (Class 6-10)",
        localLabel: "Middle & Secondary School",
        subLabel: "Classes 6th to 10th (Ages 11–15)",
        gradeRange: "Class 6–10",
        description: "Fundamental Ohm's law, IC breadboards, Arduino Uno basics & working working models."
      },
      {
        levelKey: "High School (Class 11-12)",
        localLabel: "Senior Secondary / High School (+2)",
        subLabel: "Classes 11th & 12th / Junior College",
        gradeRange: "Class 11–12 (+2 Science)",
        description: "Microcontroller automation, sensor calibration, and CBSE Investigatory Project Reports."
      },
      {
        levelKey: "College / Engineering",
        localLabel: "B.Tech / B.E. Engineering College",
        subLabel: "1st to 4th Year Engineering & Polytechnic",
        gradeRange: "B.Tech / Diploma / Degree",
        description: "Major/Minor capstone project, industrial IoT telemetry, schematic PCB layout & IEEE format."
      }
    ]
  },
  uk_europe: {
    id: "uk_europe",
    countryName: "United Kingdom & Europe",
    nativeName: "UK National Curriculum (GCSE & A-Levels)",
    flag: "🇬🇧",
    defaultCurrency: "GBP",
    defaultLanguage: "en",
    scienceFairName: "The Big Bang Fair / EU Contest for Young Scientists (EUCYS)",
    hardwareSourcingHub: "Pimoroni, Farnell / element14, RS Components UK",
    gradeLevels: [
      {
        levelKey: "Middle School (Class 6-10)",
        localLabel: "Secondary School (Key Stage 3 & 4)",
        subLabel: "Years 7 to 11 (GCSE Level, Ages 11–16)",
        gradeRange: "Years 7–11 (GCSE)",
        description: "Design & Technology (D&T) prototyping, BBC micro:bit, basic sensors."
      },
      {
        levelKey: "High School (Class 11-12)",
        localLabel: "Sixth Form / Senior High School",
        subLabel: "Years 12 & 13 (A-Levels / BTEC / T-Levels)",
        gradeRange: "Years 12–13 (A-Level 11/12th)",
        description: "Applied Physics & Electronics, embedded C, data telemetry, scientific methodology."
      },
      {
        levelKey: "College / Engineering",
        localLabel: "University & Higher Engineering (BEng/MEng)",
        subLabel: "Undergraduate Degree & Apprenticeship",
        gradeRange: "BEng / MEng / BSc",
        description: "Full-scale electromechanical systems, mixed-signal hardware, and thesis verification."
      }
    ]
  },
  germany: {
    id: "germany",
    countryName: "Germany / DACH (Deutschland)",
    nativeName: "Deutsches Schul- und Hochschulsystem",
    flag: "🇩🇪",
    defaultCurrency: "EUR",
    defaultLanguage: "de",
    scienceFairName: "Jugend forscht / Schüler experimentieren",
    hardwareSourcingHub: "Conrad Electronic, Reichelt Elektronik, Watterott",
    gradeLevels: [
      {
        levelKey: "Middle School (Class 6-10)",
        localLabel: "Sekundarstufe I (Mittelstufe)",
        subLabel: "Klassen 5 bis 10 (Realschule / Gymnasium)",
        gradeRange: "Klasse 5–10",
        description: "Grundlagen der Elektrotechnik, Arduino-Einstieg, physikalische Messmodelle."
      },
      {
        levelKey: "High School (Class 11-12)",
        localLabel: "Gymnasiale Oberstufe (Klasse 11–12/13)",
        subLabel: "Abiturstufe / 11. & 12. Schuljahr",
        gradeRange: "Klasse 11–12/13 (Abitur)",
        description: "Jugend forscht Wettbewerbsstandards, Sensor-Regelkreise, ESP32-IoT-Telemetrie."
      },
      {
        levelKey: "College / Engineering",
        localLabel: "Hochschule & Technische Universität (TU)",
        subLabel: "Bachelor of Science / B.Eng.",
        gradeRange: "TU / FH Bachelor",
        description: "Hardware-in-the-Loop, PCB-Entwicklung, wissenschaftliche Abschlussarbeit."
      }
    ]
  }
};

export const CURRENCIES_CONFIG: Record<SupportedCurrency, {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  inrMultiplier: number; // 1 INR to this currency
  format: (costINR: number) => string;
}> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    inrMultiplier: 1.0,
    format: (costINR: number) => `₹${Math.round(costINR).toLocaleString("en-IN")}`
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    inrMultiplier: 0.012,
    format: (costINR: number) => `$${(costINR * 0.012).toFixed(2)}`
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen (日本円)",
    inrMultiplier: 1.82,
    format: (costINR: number) => `¥${Math.round(costINR * 1.82).toLocaleString("ja-JP")}`
  },
  CNY: {
    code: "CNY",
    symbol: "¥",
    name: "Chinese Yuan (人民币)",
    inrMultiplier: 0.086,
    format: (costINR: number) => `¥${(costINR * 0.086).toFixed(1)}`
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    inrMultiplier: 0.011,
    format: (costINR: number) => `€${(costINR * 0.011).toFixed(2)}`
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    inrMultiplier: 0.0094,
    format: (costINR: number) => `£${(costINR * 0.0094).toFixed(2)}`
  }
};

export const DEFAULT_ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    id: "stage-1-concept",
    stageNumber: 1,
    title: "Stage 1: Scientific Hypothesis & System Architecture",
    subtitle: "Define the problem, specify input/output transducers & state mathematical hypothesis.",
    keyDeliverable: "Approved Project Proposal, Sensor Selection Table & Signal Flow Block Diagram.",
    estimatedTime: "3–5 Hours",
    completed: true
  },
  {
    id: "stage-2-bom",
    stageNumber: 2,
    title: "Stage 2: Hardware Procurement & Component Sourcing",
    subtitle: "Review Bill of Materials (BOM), verify operating voltages (3.3V/5V) & source components.",
    keyDeliverable: "Complete Component Kit with datasheets and verified pinout diagrams.",
    estimatedTime: "1–2 Days",
    completed: false
  },
  {
    id: "stage-3-circuit",
    stageNumber: 3,
    title: "Stage 3: Breadboard Circuit Wiring & Transducer Interfacing",
    subtitle: "Assemble sensor breakout boards, H-bridge motor drivers, and ensure common GND wiring.",
    keyDeliverable: "Smoke-tested breadboard circuit with regulated power rail & active indicator LEDs.",
    estimatedTime: "4–6 Hours",
    completed: false
  },
  {
    id: "stage-4-firmware",
    stageNumber: 4,
    title: "Stage 4: Embedded Firmware Programming & Calibration",
    subtitle: "Write microcontroller loop, implement ADC sampling filters, and display live telemetry.",
    keyDeliverable: "Flashed firmware running closed-loop logic with calibrated threshold responses.",
    estimatedTime: "6–10 Hours",
    completed: false
  },
  {
    id: "stage-5-exhibition",
    stageNumber: 5,
    title: "Stage 5: Physical Enclosure, Trifold Display & Judge Defense",
    subtitle: "Mount prototype on acrylic/wood baseboard, prepare 3-panel display poster & practice viva.",
    keyDeliverable: "Exhibition-ready working model, laminated 2-minute judge pitch, and logbook.",
    estimatedTime: "1–2 Days",
    completed: false
  }
];

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    appTitle: "MakerMind STEM Lab",
    appSubtitle: "Real-World STEM Project Blueprint & Execution Roadmap",
    buildBlueprint: "BUILD YOUR STEM BLUEPRINT",
    heroDescription: "An end-to-end execution roadmap and architecture engine for students, makers, and educators worldwide. Generate verifiable BOM, circuits, embedded firmware, 3D model prompts, and science fair defense dossiers.",
    selectRegion: "Target Region & Educational System",
    studentLevel: "Academic Level",
    subjectDomain: "Subject Discipline",
    projectTopic: "Project Concept / Problem Topic",
    budgetRange: "Target Budget",
    generateButton: "Synthesize Complete STEM Blueprint",
    generatingBlueprint: "Synthesizing Hardware Architecture...",
    exhibitionPrompts: "Exhibition Prompts",
    savedBlueprints: "Saved Projects",
    roadmapTitle: "5-Stage Real Project Execution Roadmap",
    bomTab: "Bill of Materials",
    assemblyTab: "Assembly Guide",
    circuitTab: "Circuit Diagram",
    principlesTab: "Scientific Principles",
    vivaTab: "Examiner Viva Voce",
    exhibitionTab: "Exhibition & Judge Pitch",
    imagesTab: "AI Model Prompts",
    teamTab: "Team Collaboration",
    shareDossier: "Share / Export Project",
    switchCurrency: "Currency"
  },
  ja: {
    appTitle: "MakerMind STEM 工学ラボ",
    appSubtitle: "本格的なSTEM科学研究・プロトタイプ制作ロードマップ",
    buildBlueprint: "STEM プロジェクト設計図を作成",
    heroDescription: "世界中の学生・メイカー・教育者のための実践的エンジニアリング設計エンジン。日本の中学・高校（11/12年生）・高専・大学のカリキュラムに対応し、電子回路、マイコン制御コード、3D模型プロンプト、科学展プレゼン資料を一括生成します。",
    selectRegion: "地域・教育制度を選択",
    studentLevel: "学年・学習段階",
    subjectDomain: "専門分野",
    projectTopic: "研究テーマ・解決したい課題",
    budgetRange: "予算目安",
    generateButton: "完全なSTEM設計図を生成する",
    generatingBlueprint: "ハードウェア構成と回路を設計中...",
    exhibitionPrompts: "科学コンテストのお手本",
    savedBlueprints: "保存済みプロジェクト",
    roadmapTitle: "5段階の実践的モノづくりロードマップ",
    bomTab: "部品リスト (BOM)",
    assemblyTab: "組み立て手順",
    circuitTab: "回路・配線図",
    principlesTab: "科学的原理",
    vivaTab: "審査員口頭試問 (Viva)",
    exhibitionTab: "展示発表・2分間ピッチ",
    imagesTab: "AI模型生成プロンプト",
    teamTab: "チーム共同開発",
    shareDossier: "プロジェクトを共有・出力",
    switchCurrency: "通貨設定"
  },
  zh: {
    appTitle: "MakerMind 创客科技实验室",
    appSubtitle: "真实STEM科技创新项目全流程蓝图与实施路线图",
    buildBlueprint: "定制您的STEM科技项目蓝图",
    heroDescription: "专为全球中小学及高校学生打造的科研与创客孵化引擎。支持初中、高中（11/12年级）及大学工程标准，自动生成精确硬件物料BOM、嵌入式源码、3D模型图提示词及科技创新大赛答辩指南。",
    selectRegion: "目标国家与学制体系",
    studentLevel: "学段等级",
    subjectDomain: "学科领域",
    projectTopic: "创新课题 / 实际问题",
    budgetRange: "预算区间",
    generateButton: "一键生成完整STEM项目蓝图",
    generatingBlueprint: "正在构建硬件拓扑与闭环电路...",
    exhibitionPrompts: "科技竞赛精选课题",
    savedBlueprints: "已保存项目",
    roadmapTitle: "五阶段科技创新项目落地路线图",
    bomTab: "物料清单 (BOM)",
    assemblyTab: "装配步骤",
    circuitTab: "电路与引脚图",
    principlesTab: "科学原理",
    vivaTab: "答辩问答 (Viva)",
    exhibitionTab: "展位与2分钟答辩",
    imagesTab: "AI模型生成提示词",
    teamTab: "团队协同开发",
    shareDossier: "分享与导出项目",
    switchCurrency: "币种切换"
  },
  hi: {
    appTitle: "MakerMind STEM रिसर्च लैब",
    appSubtitle: "वास्तविक STEM प्रोजेक्ट ब्लूप्रिंट एवं निर्माण रोडमैप",
    buildBlueprint: "अपना STEM प्रोजेक्ट ब्लूप्रिंट तैयार करें",
    heroDescription: "छात्रों और शिक्षकों के लिए सम्पूर्ण हार्डवेयर ब्लूप्रिंट इंजन। वास्तविक कंपोनेंट BOM, सर्किट डायग्राम, माइक्रो-कंट्रोलर कोडिंग, 3D मॉडल प्रॉम्प्ट्स और विज्ञान प्रदर्शनी जज डिफेन्स गाइड प्राप्त करें।",
    selectRegion: "क्षेत्र एवं शिक्षा प्रणाली",
    studentLevel: "कक्षा स्तर (Student Level)",
    subjectDomain: "विषय (Subject Discipline)",
    projectTopic: "प्रोजेक्ट का विषय / समस्या",
    budgetRange: "अनुमानित बजट",
    generateButton: "संपूर्ण STEM ब्लूप्रिंट बनाएं",
    generatingBlueprint: "हार्डवेयर सर्किट डिज़ाइन हो रहा है...",
    exhibitionPrompts: "प्रदर्शनी प्रॉम्प्ट्स",
    savedBlueprints: "सहेजे गए प्रोजेक्ट",
    roadmapTitle: "5-चरण प्रोजेक्ट निर्माण रोडमैप",
    bomTab: "कंपोनेंट सूची (BOM)",
    assemblyTab: "निर्माण मार्गदर्शिका",
    circuitTab: "सर्किट डायग्राम",
    principlesTab: "वैज्ञानिक सिद्धांत",
    vivaTab: "परीक्षक मौखिक प्रश्न (Viva)",
    exhibitionTab: "प्रदर्शनी एवं जज पिच",
    imagesTab: "AI मॉडल प्रॉम्प्ट्स",
    teamTab: "टीम सहयोग",
    shareDossier: "प्रोजेक्ट शेयर / एक्सपोर्ट",
    switchCurrency: "मुद्रा (Currency)"
  },
  es: {
    appTitle: "MakerMind Laboratorio STEM",
    appSubtitle: "Hoja de Ruta y Planos para Proyectos STEM Reales",
    buildBlueprint: "CREA TU PLANO DE PROYECTO STEM",
    heroDescription: "Motor de ingeniería y proyectos reales para estudiantes y creadores. Genera lista de materiales (BOM), diagramas de circuitos, código embebido, prompts para modelos 3D y defensa para ferias de ciencias.",
    selectRegion: "Región y Sistema Educativo",
    studentLevel: "Nivel Académico",
    subjectDomain: "Disciplina Científica",
    projectTopic: "Tema o Problema del Proyecto",
    budgetRange: "Presupuesto Objetivo",
    generateButton: "Generar Plano Completo",
    generatingBlueprint: "Diseñando arquitectura de hardware...",
    exhibitionPrompts: "Temas de Feria",
    savedBlueprints: "Proyectos Guardados",
    roadmapTitle: "Hoja de Ruta de 5 Fases para Proyectos Reales",
    bomTab: "Lista de Materiales (BOM)",
    assemblyTab: "Guía de Ensamblaje",
    circuitTab: "Diagrama de Circuitos",
    principlesTab: "Principios Científicos",
    vivaTab: "Preguntas del Evaluador (Viva)",
    exhibitionTab: "Stand y Pitch de 2 Minutos",
    imagesTab: "Prompts de Modelos AI",
    teamTab: "Trabajo en Equipo",
    shareDossier: "Compartir / Exportar",
    switchCurrency: "Moneda"
  },
  de: {
    appTitle: "MakerMind STEM Labor",
    appSubtitle: "Realer STEM-Projektbauplan & 5-Phasen-Fahrplan",
    buildBlueprint: "STEM-PROJEKTPLAN ERSTELLEN",
    heroDescription: "Ganzheitlicher Entwicklungsplan für Schüler, Studenten und Jugend forscht Teilnehmer. Erstellt verifizierte Stücklisten (BOM), Schaltpläne, Mikrocontroller-Code, 3D-Modell-Prompts und Jury-Präsentationshilfen.",
    selectRegion: "Region & Bildungssystem",
    studentLevel: "Schulstufe / Niveau",
    subjectDomain: "Fachbereich",
    projectTopic: "Projektthema / Problemstellung",
    budgetRange: "Zielbudget",
    generateButton: "Kompletten STEM-Plan generieren",
    generatingBlueprint: "Hardware-Architektur wird berechnet...",
    exhibitionPrompts: "Wettbewerbs-Themen",
    savedBlueprints: "Gespeicherte Projekte",
    roadmapTitle: "5-Stufen-Fahrplan zur Projektrealisierung",
    bomTab: "Stückliste (BOM)",
    assemblyTab: "Bauanleitung",
    circuitTab: "Schaltplan & Verdrahtung",
    principlesTab: "Wissenschaftliche Grundlagen",
    vivaTab: "Jury-Fragen & Kolloquium (Viva)",
    exhibitionTab: "Messestand & 2-Minuten-Pitch",
    imagesTab: "AI-Modell-Prompts",
    teamTab: "Team-Kollaboration",
    shareDossier: "Projekt exportieren",
    switchCurrency: "Währung"
  }
};
