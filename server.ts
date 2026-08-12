import { GoogleGenAI, Type } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateOfflineBlueprint } from "./src/data/offlineGenerator";

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini SDK lazily / safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Retry helper for handling temporary 503 / 429 model capacity spikes
async function callGeminiWithRetry<T>(fn: () => Promise<T>, maxRetries = 2, initialDelayMs = 1200): Promise<T> {
  let attempt = 0;
  let delay = initialDelayMs;
  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      attempt++;
      const errMsg = String(err?.message || err);
      const isTransient =
        err?.status === 503 ||
        err?.status === 429 ||
        err?.code === 503 ||
        err?.code === 429 ||
        errMsg.includes("high demand") ||
        errMsg.includes("UNAVAILABLE") ||
        errMsg.includes("RESOURCE_EXHAUSTED") ||
        errMsg.includes("503") ||
        errMsg.includes("overloaded");

      if (isTransient && attempt <= maxRetries) {
        console.warn(`Gemini API high demand (attempt ${attempt}/${maxRetries + 1}). Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 1.5;
      } else {
        throw err;
      }
    }
  }
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiAvailable: !!process.env.GEMINI_API_KEY });
});

// API Blueprint Generator
app.post("/api/generate-blueprint", async (req, res) => {
  const { level, subject, topic, budget, angleNonce, forceNewAngle } = req.body;

  try {
    const ai = getGeminiClient();

    if (!ai) {
      console.log("No GEMINI_API_KEY configured, serving offline engine blueprint...");
      const fallbackBp = generateOfflineBlueprint(
        { level, subject, topic, budget },
        angleNonce
      );
      return res.json({ success: true, blueprint: fallbackBp, isFallback: true });
    }

    const prompt = `Generate an authoritative, highly customized, and accurate STEM project blueprint tailored specifically to the user's topic:
- Target Topic / Concept: "${topic || "Smart Automated System"}"
- Academic Level: ${level || "High School / Class 11-12"}
- Subject Discipline: ${subject || "Robotics & Electronics"}
- Budget Category: ${budget || "Medium / ₹500 - ₹2000"}
- Innovation Seed / Variation Nonce: ${angleNonce || Date.now()}
- Force New Perspective: ${forceNewAngle ? "YES - explore a completely distinct technical mechanism or sensor topology" : "NO"}

STRICT ACCURACY & TITLE MANDATES:
1. TITLE: Create an ACCURATE, specific, formal academic project title that explicitly mentions the user's exact topic "${topic}" and key hardware/technique used. (e.g. For "solar tracker" -> "Dual-Axis Solar Tracker with LDR Sensors & Servo Optimization"; for "blind stick" -> "Microcontroller-Based Smart Blind Stick with Ultrasonic Sensing & Haptic Feedback"). DO NOT output generic titles like "Smart System" or "Project v1.0".
2. OVERVIEW: Write a 3-4 sentence project overview directly explaining how this project solves the specific real-world problem of "${topic}".
3. MATERIALS / BOM: Choose 5-8 REAL, domain-specific components with accurate Indian Rupee (₹) pricing explicitly required for "${topic}" (e.g. if water quality -> pH sensor / turbidity sensor; if security -> PIR / solenoid / buzzer; if vehicle -> motors / driver / chassis).
4. ASSEMBLY STEPS: Provide 5 detailed step-by-step assembly instructions with pin wiring and code/circuit snippets specifically for "${topic}".
5. SCIENTIFIC PRINCIPLES: Detail 3 fundamental scientific principles governing how "${topic}" operates.
6. VIVA VOCE QUESTIONS: Provide 5 lab examiner questions and complete answers directly testing concepts related to "${topic}".
7. ASCII BLOCK DIAGRAM: Provide an ASCII signal flow diagram connecting the specific sensors and actuators used for "${topic}".`;

    const response = await callGeminiWithRetry(() =>
      ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are MakerMind, a world-class STEM project architect and engineering professor. Your duty is to generate ACCURATE, custom, specific, and realistic STEM project blueprints based on the user's specific project topic. NEVER return generic boilerplate or repeated titles. Each project MUST have a unique, precise, academic title that directly incorporates the user's specific topic, hardware components, and technical approach.",
          temperature: 0.85,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Unique descriptive title for the project" },
              angleTag: { type: Type.STRING, description: "Short 3-5 word angle tag e.g. Edge-AI & Ultrasonic Fusion" },
              overview: { type: Type.STRING, description: "High-level summary of what the project accomplishes and why it is unique" },
              difficulty: { type: Type.STRING, description: "Beginner, Intermediate, or Advanced" },
              buildTime: { type: Type.STRING, description: "Estimated time to construct e.g. 4-6 Hours" },
              budgetCategory: { type: Type.STRING, description: "Budget range matching requested" },
              estimatedTotalCostINR: { type: Type.NUMBER, description: "Total calculated cost in INR" },
              materials: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    qty: { type: Type.STRING },
                    costINR: { type: Type.NUMBER },
                    purpose: { type: Type.STRING },
                    alternativeComponent: { type: Type.STRING }
                  },
                  required: ["name", "qty", "costINR", "purpose"]
                }
              },
              toolsRequired: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              assemblySteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNumber: { type: Type.NUMBER },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    proTip: { type: Type.STRING },
                    codeOrSchematicSnippet: { type: Type.STRING }
                  },
                  required: ["stepNumber", "title", "description"]
                }
              },
              scientificPrinciples: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    realWorldUsage: { type: Type.STRING }
                  },
                  required: ["title", "explanation"]
                }
              },
              vivaQuestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING },
                    hint: { type: Type.STRING }
                  },
                  required: ["question", "answer"]
                }
              },
              blockDiagram: { type: Type.STRING, description: "ASCII or text block diagram representing signal flow or mechanical layout" },
              safetyTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              extensionIdeas: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: [
              "title",
              "angleTag",
              "overview",
              "difficulty",
              "buildTime",
              "budgetCategory",
              "estimatedTotalCostINR",
              "materials",
              "toolsRequired",
              "assemblySteps",
              "scientificPrinciples",
              "vivaQuestions",
              "blockDiagram",
              "safetyTips",
              "extensionIdeas"
            ]
          }
        }
      })
    );

    const jsonText = response.text || "{}";
    const parsedData = JSON.parse(jsonText);
    return res.json({ success: true, blueprint: parsedData, isFallback: false });
  } catch (err: any) {
    console.warn("Gemini Generation Notice (falling back to offline generator):", err?.message || err);
    // Serve high quality offline generated blueprint seamlessly
    const fallbackBp = generateOfflineBlueprint(
      { level, subject, topic, budget },
      angleNonce
    );
    return res.json({
      success: true,
      blueprint: fallbackBp,
      isFallback: true,
      notice: "High model demand detected; generated using MakerMind local STEM engine."
    });
  }
});

// Helper SVG Generator for Fallback Circuit Blueprint
function generateFallbackSvgBlueprint(title: string, style: string, materialsSummary: string): string {
  const sanitize = (str: string) => str.replace(/[<>&"]/g, '');
  const cleanTitle = sanitize(title || "STEM Project Prototype");
  const cleanSummary = sanitize(materialsSummary || "Microcontroller, Sensors, Power Module");
  
  const isBlueprintStyle = style.includes("Blueprint") || style.includes("Schematic");
  const bgGradStart = isBlueprintStyle ? "#0f172a" : "#020617";
  const bgGradEnd = isBlueprintStyle ? "#1e1b4b" : "#090d16";
  const lineCol = isBlueprintStyle ? "#38bdf8" : "#818cf8";
  const accentCol = isBlueprintStyle ? "#38bdf8" : "#10b981";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradStart}" />
        <stop offset="100%" stop-color="${bgGradEnd}" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${lineCol}" stroke-opacity="0.12" stroke-width="1"/>
      </pattern>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    <!-- Outer Frame -->
    <rect x="30" y="30" width="1140" height="615" fill="none" stroke="${lineCol}" stroke-opacity="0.3" stroke-width="2" rx="12" />
    <rect x="40" y="40" width="1120" height="595" fill="none" stroke="${lineCol}" stroke-opacity="0.15" stroke-width="1" rx="8" />

    <!-- Corner Accents -->
    <path d="M 30 60 L 30 30 L 60 30" fill="none" stroke="${accentCol}" stroke-width="3" />
    <path d="M 1170 60 L 1170 30 L 1140 30" fill="none" stroke="${accentCol}" stroke-width="3" />
    <path d="M 30 615 L 30 645 L 60 645" fill="none" stroke="${accentCol}" stroke-width="3" />
    <path d="M 1170 615 L 1170 645 L 1140 645" fill="none" stroke="${accentCol}" stroke-width="3" />

    <!-- Center Hardware Graphic -->
    <g transform="translate(600, 320)" filter="url(#glow)">
      <!-- Main Controller IC -->
      <rect x="-140" y="-100" width="280" height="200" rx="16" fill="#0f172a" stroke="${accentCol}" stroke-width="3"/>
      <text x="0" y="-40" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="18" font-weight="bold">MAIN STEM CONTROLLER</text>
      <text x="0" y="-10" text-anchor="middle" fill="${accentCol}" font-family="sans-serif" font-size="14" font-weight="bold">${cleanTitle.slice(0, 32)}</text>
      <rect x="-100" y="20" width="200" height="50" rx="8" fill="#1e293b" stroke="${lineCol}" stroke-opacity="0.5" stroke-width="1" />
      <text x="0" y="50" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="12">STATUS: SYSTEM OK // 3.3V REG</text>

      <!-- Pin Traces & IC Pins -->
      <!-- Left Pins -->
      <line x1="-220" y1="-60" x2="-140" y2="-60" stroke="${lineCol}" stroke-width="3" stroke-dasharray="6 3" />
      <line x1="-220" y1="-20" x2="-140" y2="-20" stroke="${lineCol}" stroke-width="3" />
      <line x1="-220" y1="20" x2="-140" y2="20" stroke="${lineCol}" stroke-width="3" />
      <line x1="-220" y1="60" x2="-140" y2="60" stroke="${lineCol}" stroke-width="3" stroke-dasharray="6 3" />

      <!-- Right Pins -->
      <line x1="140" y1="-60" x2="220" y2="-60" stroke="${lineCol}" stroke-width="3" />
      <line x1="140" y1="-20" x2="220" y2="-20" stroke="${lineCol}" stroke-width="3" stroke-dasharray="6 3" />
      <line x1="140" y1="20" x2="220" y2="20" stroke="${lineCol}" stroke-width="3" />
      <line x1="140" y1="60" x2="220" y2="60" stroke="${lineCol}" stroke-width="3" />

      <!-- Peripheral Modules -->
      <!-- Left Sensor Box -->
      <rect x="-380" y="-90" width="160" height="180" rx="12" fill="#090d16" stroke="${lineCol}" stroke-width="2" />
      <circle cx="-300" cy="-30" r="28" fill="#1e1b4b" stroke="${accentCol}" stroke-width="2" />
      <text x="-300" y="-25" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="12" font-weight="bold">SENSOR</text>
      <text x="-300" y="45" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="11">Telemetry Input</text>

      <!-- Right Output Module Box -->
      <rect x="220" y="-90" width="160" height="180" rx="12" fill="#090d16" stroke="${lineCol}" stroke-width="2" />
      <rect x="250" y="-50" width="100" height="50" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="2" />
      <text x="300" y="-20" text-anchor="middle" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold">ACTUATOR</text>
      <text x="300" y="45" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="11">PWM Control Output</text>
    </g>

    <!-- Header Specs Table -->
    <rect x="60" y="60" width="450" height="85" rx="10" fill="#020617" fill-opacity="0.8" stroke="${lineCol}" stroke-opacity="0.3" stroke-width="1" />
    <text x="80" y="88" fill="${accentCol}" font-family="monospace" font-size="13" font-weight="bold">MAKERMIND HARDWARE ARCHITECTURE</text>
    <text x="80" y="112" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="extrabold">${cleanTitle.slice(0, 42)}</text>
    <text x="80" y="132" fill="#94a3b8" font-family="sans-serif" font-size="11">BOM: ${cleanSummary.slice(0, 55)}</text>

    <!-- Footer Stamp -->
    <rect x="850" y="550" width="290" height="70" rx="8" fill="#020617" fill-opacity="0.9" stroke="${accentCol}" stroke-width="1.5" />
    <text x="865" y="575" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold">SPECIFICATION: HARDWARE v2.5</text>
    <text x="865" y="595" fill="${accentCol}" font-family="monospace" font-size="11">STYLE: ${sanitize(style.toUpperCase())}</text>
    <text x="865" y="612" fill="#64748b" font-family="monospace" font-size="9">GENERATED VIA MAKERMIND ENGINE</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// API Image Generator for Project Concept/Schematic
app.post("/api/generate-project-image", async (req, res) => {
  try {
    const { prompt, title, subject, materials, style } = req.body;

    const ai = getGeminiClient();

    const selectedStyle = style || "3D Photorealistic Prototype";
    const promptText = `A high quality, clear, professional ${selectedStyle} image of a STEM hardware engineering project: "${title || "STEM Project"}".
Subject: ${subject || "Electronics & Robotics"}.
Key components featured: ${Array.isArray(materials) ? materials.slice(0, 5).map((m: any) => m.name || m).join(", ") : "Microcontroller, Sensors, Breadboard, Wiring"}.
Detailed prompt instructions: ${prompt || "Realistic working maker prototype on a clean lab workbench with organized components, LED status lights, neat wiring."}.
Style: ${selectedStyle}, ultra detailed, clean lighting, focus on engineering precision, 16:9 aspect ratio.`;

    if (ai) {
      try {
        console.log("Generating image with Gemini model: gemini-3.1-flash-lite-image...");
        const imgResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-image",
          contents: {
            parts: [
              {
                text: promptText,
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9",
            },
          },
        });

        let imageUrl: string | null = null;
        if (imgResponse.candidates?.[0]?.content?.parts) {
          for (const part of imgResponse.candidates[0].content.parts) {
            if (part.inlineData) {
              const mime = part.inlineData.mimeType || "image/jpeg";
              imageUrl = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }

        if (imageUrl) {
          return res.json({
            success: true,
            imageUrl,
            style: selectedStyle,
            isAiGenerated: true,
          });
        }
      } catch (imagenErr: any) {
        console.warn("Gemini image generation error, falling back to SVG blueprint artist:", imagenErr?.message || imagenErr);
      }
    }

    // Fallback SVG blueprint image
    const materialsSummary = Array.isArray(materials)
      ? materials.slice(0, 4).map((m: any) => m.name || m).join(", ")
      : "Arduino/RPi, Sensors, Actuators";
    const fallbackSvg = generateFallbackSvgBlueprint(title, selectedStyle, materialsSummary);

    res.json({
      success: true,
      imageUrl: fallbackSvg,
      style: selectedStyle,
      isFallbackSvg: true,
    });
  } catch (err: any) {
    console.error("Image generation route error:", err);
    res.status(500).json({
      error: err?.message || "Failed to generate project image",
      useFallback: true,
    });
  }
});

// Vite middleware in dev mode
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MakerMind Server running on http://localhost:${PORT}`);
  });
}

startServer();
