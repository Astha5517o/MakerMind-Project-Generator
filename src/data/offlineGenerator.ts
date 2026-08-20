import { ProjectBlueprint, GeneratorInputs, MaterialItem, AssemblyStep, ScientificPrinciple, VivaQuestion } from "../types";

// Microcontroller options matrix based on budget & level
const CONTROLLERS = [
  { name: "Arduino Uno R3 SMD", cost: 350, purpose: "Central logic controller & sensor interfacing", alt: "Arduino Nano V3" },
  { name: "ESP32 Wi-Fi + Bluetooth Dev Board", cost: 480, purpose: "Wireless telemetry & IoT cloud processing", alt: "ESP8266 NodeMCU" },
  { name: "Raspberry Pi Pico (RP2040)", cost: 380, purpose: "Dual-core microprocessing & PWM driver", alt: "STM32 Blue Pill" },
  { name: "ATtiny85 Microcontroller Dip-8", cost: 120, purpose: "Ultra-low cost minimal embedded controller", alt: "PIC16F84A IC" },
  { name: "ESP32-CAM AI Vision Module", cost: 650, purpose: "On-device image processing & stream server", alt: "Raspberry Pi Zero W" }
];

const POWER_SOURCES = [
  { name: "18650 Li-ion 3.7V Battery Pack with TP4056 BMS", cost: 280, purpose: "Rechargeable high-current power supply", alt: "9V Hi-Watt Heavy Duty Battery" },
  { name: "5V 2A USB Power Bank Module", cost: 320, purpose: "Stable 5V regulated power delivery", alt: "LM7805 Step-Down Converter + 12V Adapter" },
  { name: "6V 1W Solar Panel + 1N4007 Diode", cost: 190, purpose: "Renewable solar trickle charging circuit", alt: "Piezoelectric Energy Harvesting Element" }
];

const DISPLAY_UNITS = [
  { name: "0.96 inch I2C OLED Display (128x64)", cost: 220, purpose: "Visualizing real-time telemetry & menu states", alt: "16x2 Green Backlight LCD with I2C Backpack" },
  { name: "16x2 Alphanumeric LCD Module", cost: 140, purpose: "Text-based status logging and sensor output", alt: "4-Digit 7-Segment LED Display (TM1637)" },
  { name: "8x8 Neopixel LED Matrix Shield", cost: 290, purpose: "Color-coded visual alerts & status patterns", alt: "RGB LED 5mm Common Cathode Array" }
];

// Angle variations for dynamic non-repetitive blueprints
const ANGLES = [
  {
    tag: "Edge-AI & Local Micro-Processing Angle",
    focus: "emphasizes embedded machine intelligence, low-power threshold calculation, and local hardware decisions without cloud dependency.",
    arch: "Sensors -> Microcontroller -> On-board DSP algorithm -> Local Actuators & OLED display"
  },
  {
    tag: "IoT & Cloud Telemetry Angle",
    focus: "focuses on remote wireless data transmission, cloud dashboard analytics, and automated MQTT alert triggers.",
    arch: "Sensors -> ESP32 Gateway -> Wi-Fi AP -> Cloud MQTT Broker -> Web Dashboard & Mobile Alert"
  },
  {
    tag: "Analog-First Low Cost Biomimetic Angle",
    focus: "uses discrete op-amps, transistor switches, and biomimetic feedback loops to achieve zero-code, ultra-budget reliability.",
    arch: "Biological / Physical Transducer -> Op-Amp Comparator (LM358) -> Transistor Switch -> Relays"
  },
  {
    tag: "Solar-Hybrid Off-Grid Sustainable Angle",
    focus: "integrates renewable solar energy harvesting, supercapacitor buffering, and ultra-deep sleep low-power cycles.",
    arch: "Solar Cell -> Buck-Boost Charger -> Li-ion Battery -> Deep-Sleep Controller -> Energy-Efficient Load"
  },
  {
    tag: "Fail-Safe Industrial Safety & Redundancy Angle",
    focus: "incorporates dual sensor voting, acoustic & optical warnings, hardware watchdogs, and emergency cut-off solenoids.",
    arch: "Dual Sensor Cluster -> Watchdog MCU -> Optocoupler Isolation -> High Voltage Relay & Buzzer"
  }
];

export function generateOfflineBlueprint(
  inputs: GeneratorInputs,
  angleIndexOverride?: number
): ProjectBlueprint {
  const seed = Date.now() + Math.floor(Math.random() * 10000);
  const topicClean = inputs.topic.trim() || "Automated Smart System";
  
  // Choose angle dynamically or force next angle
  const angleIdx = angleIndexOverride !== undefined 
    ? angleIndexOverride % ANGLES.length 
    : Math.floor(Math.random() * ANGLES.length);
  const angleObj = ANGLES[angleIdx];

  // Pick controller based on budget / seed
  const mcuIndex = (seed + angleIdx) % CONTROLLERS.length;
  const mcu = CONTROLLERS[mcuIndex];
  
  const powerIndex = (seed + 2) % POWER_SOURCES.length;
  const power = POWER_SOURCES[powerIndex];

  const displayIndex = (seed + 3) % DISPLAY_UNITS.length;
  const display = DISPLAY_UNITS[displayIndex];

  // Generate topic & domain specific components, title, and tailored image prompts
  const { title, domainComponents, domainPrinciples, domainViva, domainImagePrompts } = getTopicCustomizations(topicClean, inputs.subject, mcu.name, angleObj.tag, seed);

  const materials: MaterialItem[] = [
    {
      id: `mat-mcu-${seed}`,
      name: mcu.name,
      qty: "1 Pc",
      costINR: mcu.cost,
      purpose: mcu.purpose,
      alternativeComponent: mcu.alt,
      checked: false
    },
    ...domainComponents,
    {
      id: `mat-pwr-${seed}`,
      name: power.name,
      qty: "1 Set",
      costINR: power.cost,
      purpose: power.purpose,
      alternativeComponent: power.alt,
      checked: false
    },
    {
      id: `mat-disp-${seed}`,
      name: display.name,
      qty: "1 Pc",
      costINR: display.cost,
      purpose: display.purpose,
      alternativeComponent: display.alt,
      checked: false
    },
    {
      id: `mat-wire-${seed}`,
      name: "Breadboard (830 Point) + Jumper Wires (M-M, M-F, F-F)",
      qty: "1 Kit",
      costINR: 150,
      purpose: "Solderless circuit prototyping and signal interconnects",
      alternativeComponent: "Zero PCB + 26AWG Hookup Wire",
      checked: false
    }
  ];

  const estimatedTotalCostINR = materials.reduce((sum, m) => sum + m.costINR, 0);

  // Dynamic Assembly Steps tailored to the topic
  const assemblySteps: AssemblyStep[] = [
    {
      stepNumber: 1,
      title: "Subsystem Power & Voltage Regulation Setup",
      description: `Connect the ${power.name} to the power rails of your breadboard. Verify 5V and 3.3V power rails using a digital multimeter before wiring sensitive ICs.`,
      proTip: "Place a 100uF electrolytic capacitor across the power rails to smooth voltage spikes caused by inductive loads.",
      codeOrSchematicSnippet: `[${power.name}] ---> (+5V Rail) === (100uF Cap) === (GND Rail)`
    },
    {
      stepNumber: 2,
      title: `Microcontroller & ${display.name} Bus Wiring`,
      description: `Mount the ${mcu.name} on the breadboard. Wire the I2C pins (SDA to Pin A4/GPIO21, SCL to Pin A5/GPIO22) to the ${display.name}.`,
      proTip: "Ensure 4.7k ohm pull-up resistors are enabled on the I2C lines if using long hookup cables.",
      codeOrSchematicSnippet: `#include <Wire.h>\n#include <Adafruit_GFX.h>\n// Initializing I2C bus at 400kHz\nWire.begin();`
    },
    {
      stepNumber: 3,
      title: `${domainComponents[0]?.name || "Primary Sensor"} Interfacing & Signal Conditioning`,
      description: `Integrate the ${domainComponents[0]?.name || "Primary Sensor Transducer"}. Wire its signal lead to the analog/digital GPIO pin of ${mcu.name} and configure input pinmode.`,
      proTip: "Use a simple exponential moving average filter in software to eliminate high-frequency noise spikes.",
      codeOrSchematicSnippet: `float rawVal = analogRead(A0);\nfloat filteredVal = (0.2 * rawVal) + (0.8 * prevVal);`
    },
    {
      stepNumber: 4,
      title: `${domainComponents[1]?.name || "Actuator Module"} Output Driver Integration`,
      description: `Connect the driver circuit for ${domainComponents[1]?.name || "Actuator Module"}. Ensure ground leads of the MCU and power supply are tied together (Common Ground).`,
      proTip: "Always insert a flyback diode (1N4007) across inductive relay or motor coils to prevent back-EMF spikes.",
      codeOrSchematicSnippet: `digitalWrite(ACTUATOR_PIN, HIGH); // Trigger output load\ndelay(500);`
    },
    {
      stepNumber: 5,
      title: "Firmware Flashing, Threshold Calibration & Final Field Test",
      description: `Upload the control firmware onto ${mcu.name}. Run diagnostic routines to calibrate threshold trigger values for ${topicClean}.`,
      proTip: "Print diagnostic telemetry to the Serial Monitor at 115200 baud for step-by-step debugging.",
      codeOrSchematicSnippet: `void setup() {\n  Serial.begin(115200);\n  pinMode(ACTUATOR_PIN, OUTPUT);\n}\nvoid loop() {\n  // Core logic loop for ${topicClean}\n}`
    }
  ];

  // Block diagram text
  const blockDiagram = `+-------------------------------------------------------------+
|              MAKERMIND SYSTEM ARCHITECTURE DIAGRAM          |
+-------------------------------------------------------------+
 [ ${power.name} ] 
        | (VCC / GND)
        v
 [ ${domainComponents[0]?.name || "Primary Sensor"} ] ---(Signal Input)---> [ ${mcu.name} ]
                                                             |
                                                             +---(I2C Bus)---> [ ${display.name} ]
                                                             |
                                                             +---(Control Output)---> [ ${domainComponents[1]?.name || "Actuator Module"} ]
+-------------------------------------------------------------+
| System Paradigm: ${angleObj.tag} |
+-------------------------------------------------------------+`;

  return {
    id: `blueprint-${seed}`,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    title,
    angleTag: angleObj.tag,
    overview: `This project blueprint provides an accurate, lab-tested implementation of "${topicClean}" tailored for ${inputs.level}. Designed around the ${angleObj.tag}, this project ${angleObj.focus} It optimizes component costs while ensuring high scientific clarity and practical buildability.`,
    difficulty: inputs.level.includes("College") ? "Advanced" : inputs.level.includes("High School") ? "Intermediate" : "Beginner",
    buildTime: inputs.level.includes("College") ? "6-8 Hours" : inputs.level.includes("High School") ? "4-5 Hours" : "2-3 Hours",
    budgetCategory: inputs.budget,
    estimatedTotalCostINR,
    level: inputs.level,
    subject: inputs.subject,
    topicKeyword: topicClean,
    materials,
    toolsRequired: [
      "Digital Multimeter (DMM)",
      "Soldering Iron (25W) & Lead-Free Solder Wire",
      "Wire Stripper & Cutter",
      "Hot Glue Gun & Acrylic Mounting Plate",
      "Micro-USB / Type-C Data Cable",
      "Safety Goggles & ESD Wrist Strap"
    ],
    assemblySteps,
    scientificPrinciples: domainPrinciples,
    vivaQuestions: domainViva,
    blockDiagram,
    safetyTips: [
      "Always disconnect external DC/AC power before modifying breadboard jumper connections.",
      "Ensure proper diode polarity (cathode bar towards positive VCC) when wiring relays.",
      "Do not exceed the maximum current draw per GPIO pin (typically 20mA for AVR, 12mA for ESP32).",
      "Wear eye safety protection when operating hot glue guns, soldering irons, or cutting component pins."
    ],
    extensionIdeas: [
      `Add a Bluetooth HC-05 or Wi-Fi module to enable smartphone telemetry for ${topicClean}.`,
      "Implement deep sleep power modes to extend battery operating life for field deployment.",
      "Integrate an SD card logging shield to record continuous long-term sensor datasets.",
      "Connect an IoT web dashboard (Blynk / Adafruit IO) to monitor real-time graphs remotely."
    ],
    imagePrompts: domainImagePrompts,
    exhibitionDossier: {
      problemStatement: `Conventional setups in ${topicClean} suffer from inefficiency, manual dependency, and lack of real-time sensory telemetry during real-world operation.`,
      hypothesis: `If ${mcu.name} is configured with automated closed-loop sensor feedback, the system will respond within 150ms, improving reliability and reducing manual intervention by over 80%.`,
      modelType: "Working Interactive Prototype",
      displayBoardGuide: {
        abstract: `This project presents an empirical, low-cost implementation of "${title}" tailored for science fairs and exhibitions. It demonstrates practical STEM principles through interactive physical testing.`,
        methodology: `The working model incorporates ${domainComponents[0]?.name || "Sensor Transducers"} interfaced with ${mcu.name} through calibrated signal conditioning and automated actuation.`,
        keyObservations: `Tests demonstrated consistent sensor trigger accuracy under diverse ambient lighting/noise conditions with an average current consumption under 250mA.`,
        realWorldImpact: `Provides an affordable (< ₹${estimatedTotalCostINR}), scalable solution for grass-root automation and educational demonstration.`
      },
      twoMinuteJudgePitch: `Respected Judges, our science exhibition project is titled "${title}". We addressed the pressing challenge of ${topicClean}. Our prototype uses ${mcu.name} combined with ${domainComponents[0]?.name || "smart sensors"} to create an automated, real-time response system. As you can observe in this live test...`,
      modelConstructionTips: [
        "Base Frame: Mount all components on a rigid 5mm white foam/sunboard (30cm x 40cm) for neat presentation.",
        "Wiring Aesthetics: Use colored spiral wire wrap and zip-ties to bundle jumpers; clearly label VCC, GND, and Signal pins.",
        "Indicator Status: Install bright 5mm status LEDs (Green = System Ready, Red = Alert Triggered) visible from 5 meters.",
        "Interactive Trigger: Place an easily accessible push button or sensor target zone so judges can test the working model themselves."
      ],
      safetyChecklist: [
        "Include a central DC rocker power switch with an inline 500mA fast-blow fuse.",
        "Insulate all 5V/12V exposed solder joints with heat-shrink tubing.",
        "Provide a backup 9V / 18650 battery pack in case exhibition table power sockets are unavailable."
      ]
    },
    studentNotes: `Science Exhibition Preparation Notes for ${title}:\n- Tested sensor calibration with 5 trial runs.\n- Chart paper layout finalized with Problem, Hypothesis, Flowchart, and BOM.\n- Ready for live judge demonstration.`,
    studentLogs: [
      {
        id: `log-1-${seed}`,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        title: "Baseline Sensor Calibration & Power Rails Test",
        notes: "Verified steady 5.02V rail voltage. Zero-offset threshold set in firmware.",
        sensorReadings: "VCC: 5.02V | Idle Current: 42mA | Signal Delay: ~12ms"
      }
    ],
    exhibitionChecklist: {
      "workingModelFunctional": true,
      "displayBoardPrepared": false,
      "vivaQuestionsMemorized": true,
      "circuitDiagramPrinted": false,
      "backupBatteryCharged": true,
      "twoMinutePitchRehearsed": false
    },
    isAiGenerated: false
  };
}

// Topic parser and customization generator
function getTopicCustomizations(
  topicRaw: string, 
  subject: string, 
  mcuName: string, 
  angleTag: string, 
  seed: number
) {
  const topic = topicRaw.toLowerCase();

  let title = "";
  let domainComponents: MaterialItem[] = [];

  let domainImagePrompts: Array<{
    id: string;
    style: "3D Physical Prototype Model" | "Exploded CAD & Hardware Assembly" | "Science Exhibition Booth & Display Board" | "Cutaway Realistic Circuit & Transducer";
    title: string;
    prompt: string;
    negativePrompt?: string;
    recommendedAspect: "16:9" | "4:3" | "1:1";
    keyElementsHighlighted: string[];
  }> = [];

  // 1. Solar Tracker
  if (topic.includes("solar") || topic.includes("sun") || topic.includes("photovoltaic")) {
    title = "Dual-Axis Smart Solar Tracking Engine with LDR Array & Servo Control";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "LDR Light Dependent Resistor Module Array (4 Quadrants)",
        qty: "1 Set",
        costINR: 120,
        purpose: "Detecting differential ambient light intensity for solar tracking",
        alternativeComponent: "BH1750 Digital Lux Sensor Array",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "SG90 / MG90S Metal Gear Micro Servo Motors (Pan/Tilt Axis)",
        qty: "2 Pcs",
        costINR: 320,
        purpose: "Dual-axis angular mechanical positioning of solar panel",
        alternativeComponent: "28BYJ-48 Stepper Motors with ULN2003 Drivers",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "6V 2W Monocrystalline Solar Panel + INA219 Current Sensor",
        qty: "1 Set",
        costINR: 280,
        purpose: "Energy generation and real-time output voltage/current telemetry",
        alternativeComponent: "5V Flexible Solar Cell Matrix",
        checked: false
      }
    ];
  } 
  // 2. Blind Stick / Visually Impaired Navigation
  else if (topic.includes("blind") || topic.includes("visually") || topic.includes("stick") || topic.includes("obstacle")) {
    title = "Microcontroller Smart Blind Walking Stick with Ultrasonic Sensing & Haptic Feedback";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "HC-SR04 Ultrasonic Distance Sensor Module (Dual Head/Knee Mount)",
        qty: "2 Pcs",
        costINR: 180,
        purpose: "Detecting low-lying potholes and head-height obstacles up to 400cm",
        alternativeComponent: "VL53L0X Time-of-Flight Laser Distance Sensor",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "Coin Vibration Motor (3V) & High-Decibel Active Buzzer",
        qty: "1 Set",
        costINR: 90,
        purpose: "Delivering haptic tactile vibration to the handle and acoustic distance warnings",
        alternativeComponent: "PWM Audio Transducer Speaker",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "Water Rain Puddle Conductivity Sensor PCB Probe",
        qty: "1 Pc",
        costINR: 70,
        purpose: "Alerting the user to puddles, wet slippery surfaces, or rain",
        alternativeComponent: "Soil Moisture Conductivity Probe",
        checked: false
      }
    ];
  }
  // 3. Irrigation / Agriculture / Plant / Hydroponics
  else if (topic.includes("irrigation") || topic.includes("soil") || topic.includes("plant") || topic.includes("agriculture") || topic.includes("farm") || topic.includes("hydroponic")) {
    title = "Automated Precision Agriculture & Drip Irrigation System with Capacitive Moisture Sensor";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "Capacitive Soil Moisture Sensor (Corrosion-Resistant V1.2)",
        qty: "1 Pc",
        costINR: 130,
        purpose: "Measuring soil volumetric water content without electrode degradation",
        alternativeComponent: "Resistive Soil Moisture Probe with LM393 Comparator",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "5V Mini Submersible DC Water Pump + Silicone Delivery Tubing",
        qty: "1 Set",
        costINR: 190,
        purpose: "Automated precision water delivery upon low soil moisture threshold",
        alternativeComponent: "12V Solenoid Water Valve Module",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "5V 1-Channel Optocoupler Relay Driver Module",
        qty: "1 Pc",
        costINR: 80,
        purpose: "Safely switching high-current DC pump motor from MCU digital pin",
        alternativeComponent: "IRF520 MOSFET Driver Module",
        checked: false
      }
    ];
  }
  // 4. Smart Dustbin / Waste Segregation
  else if (topic.includes("dustbin") || topic.includes("trash") || topic.includes("waste") || topic.includes("garbage")) {
    title = "Touchless Smart Dustbin with Automated Servo Lid & Ultrasonic Volume Telemetry";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "HC-SR04 Ultrasonic Distance Sensor Module",
        qty: "2 Pcs",
        costINR: 180,
        purpose: "Front proximity sensing for touchless lid opening and interior fill-level monitoring",
        alternativeComponent: "Sharp GP2Y0A21YK0F IR Distance Sensor",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "SG90 / MG995 High-Torque Servo Motor",
        qty: "1 Pc",
        costINR: 160,
        purpose: "Smooth 90-degree automated opening and closing of the dustbin flap",
        alternativeComponent: "DC Gear Motor with Cam Mechanism",
        checked: false
      }
    ];
  }
  // 5. Gas Leakage / Fire / Air Quality / Smoke
  else if (topic.includes("gas") || topic.includes("fire") || topic.includes("smoke") || topic.includes("lpg") || topic.includes("pollution") || topic.includes("air")) {
    title = "IoT Hazardous LPG Gas Leakage & Fire Alarm Safety System";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "MQ-2 / MQ-6 Combustible LPG & Methane Gas Sensor",
        qty: "1 Pc",
        costINR: 190,
        purpose: "Detecting gas concentration in PPM with internal SnO2 heating coil",
        alternativeComponent: "MQ-135 Hazardous Air Quality Sensor",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "Infrared Optical Flame Detection Sensor Module (760nm-1100nm)",
        qty: "1 Pc",
        costINR: 90,
        purpose: "Instant optical detection of open flame radiation within 100cm",
        alternativeComponent: "Thermopile Non-Contact IR Sensor",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "High-Decibel Active Alarm Buzzer & High-Output Exhaust DC Fan",
        qty: "1 Set",
        costINR: 140,
        purpose: "Acoustic emergency alert and automatic room gas ventilation",
        alternativeComponent: "12V Solenoid Gas Cut-off Valve",
        checked: false
      }
    ];
  }
  // 6. Hydraulic Robotic Arm / Mechanics
  else if (topic.includes("hydraulic") || topic.includes("arm") || topic.includes("crane") || topic.includes("pneumatic")) {
    title = "Multi-Axis Syringe Hydraulic Robotic Arm with Fluid Mechanics & Gripper";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "Medical-Grade Polypropylene Luer Lock Syringes (10ml & 20ml x 8 Pcs)",
        qty: "1 Kit",
        costINR: 160,
        purpose: "Master-slave hydraulic cylinders transmitting fluid pressure via Pascal's Law",
        alternativeComponent: "Pneumatic Miniature Air Cylinders",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "Non-Toxic Colored Fluid & Flexible Silicone Hydraulic Tubing (2 Meters)",
        qty: "1 Set",
        costINR: 90,
        purpose: "Closed-loop hydrostatic pressure transfer medium with color-coded axes",
        alternativeComponent: "Mineral Oil Hydraulic Medium",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "Laser-Cut Acrylic / MDF Multi-Linkage Arm Chassis & End-Effector Gripper",
        qty: "1 Kit",
        costINR: 350,
        purpose: "3-DOF mechanical skeleton enabling base rotation, elbow lift, and claw grasping",
        alternativeComponent: "3D Printed PLA Mechanical Links",
        checked: false
      }
    ];
  }
  // 7. Seismograph / Earthquake Alarm
  else if (topic.includes("earthquake") || topic.includes("seismic") || topic.includes("vibration") || topic.includes("accelerometer")) {
    title = "High-Sensitivity Digital Seismograph & Seismic Wave Early Warning System";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "ADXL345 3-Axis Digital Accelerometer / SW-420 Vibration Sensor",
        qty: "1 Pc",
        costINR: 220,
        purpose: "High-resolution measurement of P-wave ground acceleration (±16g)",
        alternativeComponent: "Piezoelectric Vibration Film Element",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "Suspended Inertial Mass Pendulum + Laser Reflection Transducer",
        qty: "1 Kit",
        costINR: 140,
        purpose: "Physical mechanical inertial reference for analog seismic oscillation",
        alternativeComponent: "Electromagnetic Geophone Coil",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "Emergency Strobe LED + High-Intensity Alarm Horn",
        qty: "1 Set",
        costINR: 110,
        purpose: "Immediate acoustic and visual emergency evacuation alert",
        alternativeComponent: "Wireless LoRa Broadcast Module",
        checked: false
      }
    ];
  }
  // 8. Water Filtration / Purification
  else if (topic.includes("water filter") || topic.includes("purifier") || topic.includes("filtration") || topic.includes("clean water")) {
    title = "Multi-Stage Eco Water Filtration System with Activated Carbon & UV Sterilization";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "Graded Multi-Stage Filter Media (Fine Sand, Gravel, Zeolite, Activated Carbon)",
        qty: "1 Set",
        costINR: 240,
        purpose: "Physical adsorption of heavy metals, chlorine, odors, and particulate sediment",
        alternativeComponent: "Ultrafiltration Hollow Fiber Membrane",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "254nm Ultraviolet (UV-C) Germicidal Sterilizer LED Module",
        qty: "1 Pc",
        costINR: 320,
        purpose: "Disrupting bacterial and viral DNA for pathogen-free purification",
        alternativeComponent: "Ozone Gas Generator Tube",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "Analog TDS Purity Probe & Turbidity Clarity Sensor",
        qty: "1 Kit",
        costINR: 390,
        purpose: "Real-time verification of post-filtration water electrical conductivity and clarity",
        alternativeComponent: "Conductivity Bridge Cell",
        checked: false
      }
    ];
  }
  // 9. Smart Traffic / Speed Radar
  else if (topic.includes("traffic") || topic.includes("speed") || topic.includes("radar") || topic.includes("road")) {
    title = "Smart Density-Based Traffic Management & Doppler Speed Radar System";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "HB100 10.525GHz Microwave Doppler Radar Sensor Module",
        qty: "1 Pc",
        costINR: 320,
        purpose: "Non-contact measurement of moving vehicle speed via Doppler frequency shift",
        alternativeComponent: "Dual Laser Break-Beam Infrared Gates",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "4-Way Traffic Signal LED Light Modules (Red, Yellow, Green x 4)",
        qty: "1 Set",
        costINR: 180,
        purpose: "Dynamic signal duration regulation based on lane vehicular queue density",
        alternativeComponent: "WS2812B RGB Addressable Signal Tower",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "Lane Proximity IR Density Sensor Cluster",
        qty: "4 Pairs",
        costINR: 160,
        purpose: "Detecting vehicle backup queue length on all four intersection arms",
        alternativeComponent: "Inductive Loop Ground Coil Simulator",
        checked: false
      }
    ];
  }
  // 10. Patient Health / Medical / Pulse
  else if (topic.includes("health") || topic.includes("patient") || topic.includes("heart") || topic.includes("medical") || topic.includes("pulse")) {
    title = "IoT Patient Vital Telemetry Station with Pulse Oximeter & Medical IR Thermometer";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "MAX30102 Optical Heart Rate & SpO2 Blood Oxygen Sensor",
        qty: "1 Pc",
        costINR: 320,
        purpose: "Photoplethysmography monitoring of pulse rate and arterial hemoglobin oxygenation",
        alternativeComponent: "Analog Pulse Sensor Amp Module",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "MLX90614 Contactless Infrared Medical Body Temperature Sensor",
        qty: "1 Pc",
        costINR: 480,
        purpose: "Instant optical forehead and skin thermal measurement with I2C precision",
        alternativeComponent: "DS18B20 Waterproof Digital Probe",
        checked: false
      }
    ];
  }
  // 11. Fallback / Custom Domain-Aligned Topic
  else {
    const formattedTopic = topicRaw.trim().replace(/\b\w/g, c => c.toUpperCase());
    title = `Advanced ${formattedTopic} STEM Model with Smart Transducers & Telemetry`;
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: `Calibrated Transducer Sensor Module for ${formattedTopic}`,
        qty: "1 Pc",
        costINR: 190,
        purpose: `Detecting primary environmental parameter and physical input for ${formattedTopic}`,
        alternativeComponent: "Precision Analog Transducer Probe",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: `Automated Output Actuator / Driver Module for ${formattedTopic}`,
        qty: "1 Pc",
        costINR: 160,
        purpose: `Executing mechanical, thermal, or electrical response for ${formattedTopic}`,
        alternativeComponent: "Solid State Relay / MOSFET Switch",
        checked: false
      }
    ];
  }

  // Generate 4 tailored Image Creation Prompts for this exact topic & title
  domainImagePrompts = [
    {
      id: `img-prompt-1-${seed}`,
      style: "3D Physical Prototype Model",
      title: "Physical Working Prototype Model (Exhibition Ready)",
      prompt: `A hyper-realistic studio product photograph of a working STEM student exhibition prototype: "${title}". Mounted on a clean white 5mm acrylic baseboard with rounded edges. Clearly visible components include ${domainComponents.map(m => m.name.split('(')[0].trim()).join(", ")}, ${mcuName}, neat spiral-wrapped wiring, glowing status LEDs, illuminated OLED display showing live data. Soft overhead lab lighting, crisp macro depth of field, 8k resolution, clean background.`,
      recommendedAspect: "16:9",
      keyElementsHighlighted: [
        "Clean Acrylic Baseboard & Mounting",
        domainComponents[0]?.name.split('(')[0].trim() || "Main Sensor",
        mcuName,
        "Color-coded Cable Harness & OLED"
      ]
    },
    {
      id: `img-prompt-2-${seed}`,
      style: "Exploded CAD & Hardware Assembly",
      title: "Exploded 3D Engineering & CAD Assembly Schematic",
      prompt: `An exploded isometric 3D CAD technical rendering of "${title}". Shows the outer translucent acrylic chassis, structural standoffs, PCB board with ${mcuName}, ${domainComponents[0]?.name.split('(')[0].trim()}, mechanical linkages, battery bay, and fastening screws floating in aligned axis. Clean technical blueprint background with measurement dimension lines and component callout labels.`,
      recommendedAspect: "16:9",
      keyElementsHighlighted: [
        "Exploded Axis Breakdown",
        "Translucent Enclosure",
        "Hardware Fasteners & Standoffs",
        "PCB Trace Alignment"
      ]
    },
    {
      id: `img-prompt-3-${seed}`,
      style: "Science Exhibition Booth & Display Board",
      title: "Science Fair Award-Winning Demonstration Booth",
      prompt: `A vibrant, high-energy photo of a high-school / college science exhibition competition booth featuring "${title}". In the foreground, the working physical model is active with demonstration lights and sample test items. In the background, a neat 3-panel trifold display poster board with title "${title}", hypothesis, circuit diagram, and graphs. Bright exhibition hall lighting, award-winning student STEM atmosphere.`,
      recommendedAspect: "16:9",
      keyElementsHighlighted: [
        "3-Panel Trifold Poster Board",
        "Active Working Tabletop Model",
        "Science Fair Judging Setup",
        "Observation Charts"
      ]
    },
    {
      id: `img-prompt-4-${seed}`,
      style: "Cutaway Realistic Circuit & Transducer",
      title: "Close-Up Circuitry & Transducer Interface",
      prompt: `A detailed macro close-up view focusing on the primary sensor and micro-controller interface of "${title}". Shows ${domainComponents[0]?.name.split('(')[0].trim()} wired with gold-plated pins, surface-mount resistors, miniature power regulator, and active status indicator LEDs. Beautiful bokeh, clean electronics lab photography.`,
      recommendedAspect: "4:3",
      keyElementsHighlighted: [
        "Macro Sensor Detail",
        "IC Pin Interconnects",
        "SMD Component Traces",
        "Indicator LED Glow"
      ]
    }
  ];

  // Domain Principles
  const domainPrinciples: ScientificPrinciple[] = [
    {
      title: "Physical Transducer Signal Conditioning & ADC Quantization",
      explanation: `Physical parameters in "${title}" are converted into proportional electrical voltages or resistances by specialized sensors. The ADC inside ${mcuName} converts these continuous analog signals into digital values for logic processing.`,
      realWorldUsage: "Underpins industrial process control, automotive engine diagnostics, and medical monitoring devices."
    },
    {
      title: "Pulse-Width Modulation (PWM) & Actuator Power Regulation",
      explanation: "Instead of variable analog voltages, PWM switches digital pins rapidly between 0V and 5V. The duty cycle determines average power, controlling motor speed, servo angles, or LED illumination.",
      realWorldUsage: "Standard power efficiency method used in electric vehicle motor controllers and solar inverter power stages."
    },
    {
      title: `Closed-Loop Feedback Control System Execution (${angleTag})`,
      explanation: `The microcontroller continuously samples input sensor data, calculates threshold deviations, and executes corrective output actions to maintain system stability under ${angleTag}.`,
      realWorldUsage: "Applied in building HVAC thermostats, automated flight control, and industrial robotics."
    }
  ];

  // Domain Viva Questions
  const domainViva: VivaQuestion[] = [
    {
      id: `viva-1-${seed}`,
      question: `What is the core working principle of your project "${title}"?`,
      answer: `The system collects physical inputs using specialized sensors, conditions the electrical signals, processes the data through the digital logic of ${mcuName}, and triggers corresponding actuators or alerts under the ${angleTag} paradigm.`,
      hint: "Explain the input sensing -> logic calculation -> output actuation pipeline."
    },
    {
      id: `viva-2-${seed}`,
      question: `Why did you select ${mcuName} for controlling "${title}"?`,
      answer: `${mcuName} provides fast processing, multi-channel ADC/PWM GPIO pins, easy re-configurability via code without re-wiring, and reliable digital communication protocols like I2C and SPI.`,
      hint: "Highlight flexibility, processing speed, and digital interface support."
    },
    {
      id: `viva-3-${seed}`,
      question: "How do you protect sensitive microchip GPIO pins from inductive voltage spikes?",
      answer: "We connect flyback diodes (e.g. 1N4007) across inductive loads like relays or motor coils. When power is cut, collapsing magnetic fields generate high reverse Back-EMF spikes, which the diode safely dissipates.",
      hint: "Discuss Back-EMF magnetic collapse and flyback protection diodes."
    },
    {
      id: `viva-4-${seed}`,
      question: "How do you prevent false triggering and sensor noise in software?",
      answer: "We implement software hysteresis (setting separate upper ON and lower OFF trigger limits) and digital moving average filtering so transient environmental spikes do not cause chatter.",
      hint: "Mention hysteresis thresholds and digital moving average filters."
    },
    {
      id: `viva-5-${seed}`,
      question: "If given a higher research budget, what advanced upgrades would you integrate?",
      answer: "We would add an ESP32 micro-gateway for real-time cloud IoT dashboard telemetry, upgrade to industrial-grade calibrated sensors, and add a rechargeable Li-ion BMS battery backup.",
      hint: "Discuss IoT cloud monitoring, industrial accuracy, and battery management."
    }
  ];

  return { title, domainComponents, domainPrinciples, domainViva, domainImagePrompts };
}
