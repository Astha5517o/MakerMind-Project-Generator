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

  // Generate topic & domain specific components and title
  const { title, domainComponents, domainPrinciples, domainViva } = getTopicCustomizations(topicClean, inputs.subject, mcu.name, angleObj.tag, seed);

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

  // 1. Solar Tracker
  if (topic.includes("solar") || topic.includes("sun")) {
    title = "Dual-Axis Smart Solar Tracking Engine with LDR & Servo Control";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "LDR Light Dependent Resistor Module Array (4 Pcs)",
        qty: "1 Set",
        costINR: 120,
        purpose: "Detecting differential ambient light intensity for solar tracking",
        alternativeComponent: "BH1750 Digital Lux Sensor Array",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "SG90 Micro Servo Motors (2 Pcs - Pan/Tilt Axis)",
        qty: "2 Pcs",
        costINR: 320,
        purpose: "Dual-axis angular mechanical positioning of solar panel",
        alternativeComponent: "28BYJ-48 Stepper Motors with ULN2003 Drivers",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "6V 2W Monocrystalline Solar Panel + Voltage Sensor Module",
        qty: "1 Set",
        costINR: 280,
        purpose: "Energy generation and real-time output voltage telemetry",
        alternativeComponent: "5V Flexible Solar Cell Matrix",
        checked: false
      }
    ];
  } 
  // 2. Blind Stick / Visually Impaired Navigation
  else if (topic.includes("blind") || topic.includes("visually") || topic.includes("stick") || topic.includes("obstacle")) {
    title = "Microcontroller Smart Blind Stick with Ultrasonic Ranging & Haptic Feedback";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "HC-SR04 Ultrasonic Distance Sensor Module",
        qty: "2 Pcs",
        costINR: 180,
        purpose: "Detecting low-lying and head-height obstacles up to 400cm",
        alternativeComponent: "VL53L0X Time-of-Flight Laser Distance Sensor",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "Coin Vibration Motor (3V) & High-Decibel Active Buzzer",
        qty: "1 Set",
        costINR: 90,
        purpose: "Delivering haptic tactile vibration and acoustic distance warnings",
        alternativeComponent: "PWM Audio Transducer Speaker",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "Water Rain Sensor PCB Module",
        qty: "1 Pc",
        costINR: 70,
        purpose: "Alerting the user to puddles, wet surfaces, or rain",
        alternativeComponent: "Soil Moisture Conductivity Probe",
        checked: false
      }
    ];
  }
  // 3. Irrigation / Agriculture / Plant
  else if (topic.includes("irrigation") || topic.includes("soil") || topic.includes("plant") || topic.includes("agriculture") || topic.includes("farm")) {
    title = "Automated Smart Agriculture System with Capacitive Soil Sensor & Micro-Pump";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "Capacitive Soil Moisture Sensor (Corrosion-Resistant)",
        qty: "1 Pc",
        costINR: 130,
        purpose: "Measuring soil volumetric water content without electrode degradation",
        alternativeComponent: "Resistive Soil Moisture Probe with LM393 Comparator",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "5V Mini Submersible DC Water Pump + Silicone Tubing",
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
  // 4. Smart Dustbin / Waste Management
  else if (topic.includes("dustbin") || topic.includes("trash") || topic.includes("waste") || topic.includes("garbage")) {
    title = "Touchless Smart Dustbin with Automated Servo Lid & Volume Sensor";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "HC-SR04 Ultrasonic Ranging Module",
        qty: "2 Pcs",
        costINR: 180,
        purpose: "Hand proximity detection and bin fill-level distance monitoring",
        alternativeComponent: "Sharp GP2Y0A21YK0F IR Distance Sensor",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "SG90 Micro Servo Motor (1.8kg.cm)",
        qty: "1 Pc",
        costINR: 160,
        purpose: "Automated 90-degree opening and closing of dustbin lid",
        alternativeComponent: "MG996R High-Torque Metal Gear Servo",
        checked: false
      }
    ];
  }
  // 5. Gas Leakage / Fire / Air Quality Security
  else if (topic.includes("gas") || topic.includes("fire") || topic.includes("smoke") || topic.includes("pollution") || topic.includes("air")) {
    title = "Industrial Multi-Gas Leakage & Fire Alert Security System";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "MQ-2 / MQ-135 Air Quality & Hazardous Gas Sensor",
        qty: "1 Pc",
        costINR: 190,
        purpose: "Detecting combustible gas, LPG, smoke, and CO concentration levels",
        alternativeComponent: "MQ-5 Natural Gas & Methane Detector Probe",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "IR Flame Sensor Module (760nm - 1100nm)",
        qty: "1 Pc",
        costINR: 90,
        purpose: "Immediate optical detection of naked fire flames and thermal radiation",
        alternativeComponent: "Thermopile Non-Contact IR Sensor",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "Active Piezo Buzzer & Red/Green Warning LEDs",
        qty: "1 Set",
        costINR: 60,
        purpose: "High-decibel acoustic alarm and optical visual danger alerts",
        alternativeComponent: "12V Motor Siren Horn",
        checked: false
      }
    ];
  }
  // 6. Patient Health / Medical
  else if (topic.includes("health") || topic.includes("patient") || topic.includes("heart") || topic.includes("medical") || topic.includes("pulse")) {
    title = "IoT Patient Health Telemetry System with Pulse Oximeter & Thermal Sensor";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "MAX30102 Heart Rate & Pulse Oximeter (SpO2) Sensor",
        qty: "1 Pc",
        costINR: 320,
        purpose: "Optical photoplethysmography measuring heart rate and blood oxygen saturation",
        alternativeComponent: "Pulse Sensor Amp Module",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "DS18B20 Waterproof Digital Temperature Probe",
        qty: "1 Pc",
        costINR: 180,
        purpose: "High-accuracy human body temperature measurement with 1-Wire interface",
        alternativeComponent: "MLX90614 Contactless Medical IR Thermometer",
        checked: false
      }
    ];
  }
  // 7. Home Automation / Security / Door Lock
  else if (topic.includes("home") || topic.includes("door") || topic.includes("lock") || topic.includes("rfid") || topic.includes("security")) {
    title = "RFID & Keypad Smart Door Access Control System with Solenoid Lock";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "RC522 13.56MHz RFID Reader Module + Key Fobs",
        qty: "1 Set",
        costINR: 220,
        purpose: "Contactless cryptographic keycard authentication for authorized entry",
        alternativeComponent: "PN532 NFC Module Array",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "12V Micro Solenoid Door Lock Actuator Module",
        qty: "1 Pc",
        costINR: 380,
        purpose: "Electromechanical deadbolt locking and unlocking mechanism",
        alternativeComponent: "180 Degree High-Torque Servo Deadbolt",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "4x4 Matrix Membrane Keypad",
        qty: "1 Pc",
        costINR: 110,
        purpose: "PIN passcode entry override and secondary authentication",
        alternativeComponent: "Capacitive Touch Keypad TTP229",
        checked: false
      }
    ];
  }
  // 8. Robot / Line Follower / Vehicle
  else if (topic.includes("robot") || topic.includes("line") || topic.includes("car") || topic.includes("vehicle") || topic.includes("rover")) {
    title = "Autonomous Line Following Robot with Dual IR Transducers & H-Bridge Driver";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "TCRT5000 Dual IR Reflective Line Tracking Sensors",
        qty: "1 Pair",
        costINR: 110,
        purpose: "Detecting surface contrast differences between black line and white ground",
        alternativeComponent: "5-Channel IR Line Sensor Array Module",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "L298N Dual H-Bridge DC Motor Driver Board",
        qty: "1 Pc",
        costINR: 210,
        purpose: "Bidirectional high-current motor drive and differential steering control",
        alternativeComponent: "TB6612FNG Dual Motor Driver Carrier",
        checked: false
      },
      {
        id: `dom-3-${seed}`,
        name: "TT Dual Shaft Gearbox Motors (200 RPM) + Wheels",
        qty: "2 Sets",
        costINR: 190,
        purpose: "Mobile robotic chassis propulsion and differential steering",
        alternativeComponent: "N20 Metal Micro Gear Motors",
        checked: false
      }
    ];
  }
  // 9. Water Quality / Hydroponics / Pollution
  else if (topic.includes("water") || topic.includes("tds") || topic.includes("ph") || topic.includes("hydroponic")) {
    title = "IoT Smart Water Quality & TDS Analysis System with Analog Electrodes";
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "Analog Water TDS Meter Sensor Module (0-1000 ppm)",
        qty: "1 Pc",
        costINR: 380,
        purpose: "Measuring total dissolved solids and water purity electrical conductivity",
        alternativeComponent: "Turbidity Sensor Optical Clarity Probe",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "Analog pH Sensor Probe Kit (pH 0-14)",
        qty: "1 Kit",
        costINR: 720,
        purpose: "Precision chemical acidity and alkalinity measurement in fluid",
        alternativeComponent: "ORP Oxidation Reduction Potential Electrode Probe",
        checked: false
      }
    ];
  }
  // 10. Fallback / Generic Topic
  else {
    const formattedTopic = topicRaw.trim().replace(/\b\w/g, c => c.toUpperCase());
    title = `Microcontroller-Based ${formattedTopic} with Sensor Telemetry & Automation`;
    domainComponents = [
      {
        id: `dom-1-${seed}`,
        name: "HC-SR04 Ultrasonic / Analog Sensor Module",
        qty: "1 Pc",
        costINR: 150,
        purpose: `Primary environmental transducer feedback for ${formattedTopic}`,
        alternativeComponent: "VL53L0X Laser Ranging Transducer",
        checked: false
      },
      {
        id: `dom-2-${seed}`,
        name: "5V Relay / Motor Actuator Module",
        qty: "1 Pc",
        costINR: 120,
        purpose: `Automated output control mechanism for ${formattedTopic}`,
        alternativeComponent: "PWM Transistor Switch Module",
        checked: false
      }
    ];
  }

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

  return { title, domainComponents, domainPrinciples, domainViva };
}
