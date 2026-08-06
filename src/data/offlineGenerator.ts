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
  const topicClean = inputs.topic.trim() || "Smart Automated System";
  
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

  // Generate subject specific components
  const subjectComponents = getSubjectComponents(inputs.subject, seed);
  
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
    ...subjectComponents,
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

  // Dynamic Assembly Steps
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
      title: "Sensor Transducer Interfacing & Signal Conditioning",
      description: `Integrate the ${subjectComponents[0]?.name || "Primary Sensor Transducer"}. Connect digital/analog output to the designated ADC channel on ${mcu.name}.`,
      proTip: "Use a simple exponential moving average filter in code to eliminate high-frequency sensor noise.",
      codeOrSchematicSnippet: `float rawVal = analogRead(A0);\nfloat filteredVal = (0.2 * rawVal) + (0.8 * prevVal);`
    },
    {
      stepNumber: 4,
      title: "Actuator & Output Driver Integration",
      description: `Connect the driver circuit for ${subjectComponents[1]?.name || "Output Load"}. Ensure ground leads of the MCU and external power supply are tied together (Common Ground).`,
      proTip: "Always insert a flyback diode (1N4007) across relay or motor coils to prevent back-EMF damaging microchips.",
      codeOrSchematicSnippet: `digitalWrite(RELAY_PIN, HIGH); // Engage load\ndelay(1000); // Pulse delay`
    },
    {
      stepNumber: 5,
      title: "Firmware Flashing, Calibration & Operational Testing",
      description: `Upload the control firmware onto ${mcu.name}. Run test routines to calibrate threshold values under varying environmental conditions.`,
      proTip: "Print diagnostic telemetry to the Serial Monitor at 115200 baud for step-by-step debugging.",
      codeOrSchematicSnippet: `void setup() {\n  Serial.begin(115200);\n  pinMode(ACTUATOR_PIN, OUTPUT);\n}\nvoid loop() {\n  // Core control loop executing ${angleObj.tag}\n}`
    }
  ];

  // Scientific principles
  const scientificPrinciples: ScientificPrinciple[] = getScientificPrinciples(inputs.subject, topicClean, angleObj.tag);

  // Viva Questions
  const vivaQuestions: VivaQuestion[] = getVivaQuestions(inputs.subject, topicClean, mcu.name, angleObj.tag, seed);

  // Block diagram text
  const blockDiagram = `+-------------------------------------------------------------+
|              MAKERMIND SYSTEM ARCHITECTURE DIAGRAM          |
+-------------------------------------------------------------+
 [ ${power.name} ] 
        | (VCC / GND)
        v
 [ ${subjectComponents[0]?.name || "Primary Sensor"} ] ---(Analog/Digital Signal)---> [ ${mcu.name} ]
                                                             |
                                                             +---(I2C Data)---> [ ${display.name} ]
                                                             |
                                                             +---(Control Pin)---> [ ${subjectComponents[1]?.name || "Relay Actuator"} ]
+-------------------------------------------------------------+
| Operational Paradigm: ${angleObj.tag} |
+-------------------------------------------------------------+`;

  return {
    id: `blueprint-${seed}`,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    title: `${topicClean}: ${angleObj.tag.replace(" Angle", "")} v${(seed % 5) + 1}.0`,
    angleTag: angleObj.tag,
    overview: `This project blueprint delivers a cutting-edge implementation of "${topicClean}" tailored for ${inputs.level}. Designed around the ${angleObj.tag}, this iteration ${angleObj.focus} It optimizes component costs while ensuring robust real-world lab reproducibility.`,
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
    scientificPrinciples,
    vivaQuestions,
    blockDiagram,
    safetyTips: [
      "Always disconnect external DC/AC power before modifying breadboard jumper connections.",
      "Ensure proper diode polarity (cathode bar towards positive VCC) when wiring relays.",
      "Do not exceed the maximum current draw per GPIO pin (typically 20mA for AVR, 12mA for ESP32).",
      "Wear eye safety protection when operating hot glue guns, soldering irons, or cutting component pins."
    ],
    extensionIdeas: [
      "Add a Bluetooth HC-05 module to enable mobile smartphone telemetry and manual control overrides.",
      "Implement deep sleep power modes to extend battery lifespan up to 6 months for field deployment.",
      "Integrate an micro-SD card logger module (SPI bus) to record long-term sensor data for statistical analysis.",
      "Connect an IoT cloud server (Blynk / Thingspeak / Adafruit IO) to plot real-time graphical analytics."
    ],
    isAiGenerated: false
  };
}

function getSubjectComponents(subject: string, seed: number): MaterialItem[] {
  switch (subject) {
    case "Computer Science & AI":
      return [
        {
          id: `sub-1-${seed}`,
          name: seed % 2 === 0 ? "HC-SR04 Ultrasonic Distance Sensor" : "DHT22 Precision Temp & Humidity Sensor",
          qty: "1 Pc",
          costINR: 120,
          purpose: "Capturing environment sensor inputs for machine learning classifier",
          alternativeComponent: "VL53L0X Time-of-Flight Laser Ranging Sensor",
          checked: false
        },
        {
          id: `sub-2-${seed}`,
          name: "5V 1-Channel Optocoupler Relay Module",
          qty: "1 Pc",
          costINR: 90,
          purpose: "Triggering external high-power indicator or buzzer alarm",
          alternativeComponent: "TIP120 NPN Darlington Transistor Driver",
          checked: false
        }
      ];
    case "Physics & Applied Mechanics":
      return [
        {
          id: `sub-1-${seed}`,
          name: seed % 2 === 0 ? "50kg Load Cell Strain Gauge + HX711 ADC Module" : "Piezoelectric Force Sensor Disc Array",
          qty: "1 Set",
          costINR: 240,
          purpose: "Converting mechanical strain & force into high-resolution digital voltage signals",
          alternativeComponent: "Flex Pressure Resistive Transducer (FSR402)",
          checked: false
        },
        {
          id: `sub-2-${seed}`,
          name: "SG90 Micro Servo Motor (1.8kg.cm Torque)",
          qty: "1 Pc",
          costINR: 160,
          purpose: "Precision angular positional control and mechanical release gate",
          alternativeComponent: "28BYJ-48 Stepper Motor + ULN2003 Driver Board",
          checked: false
        }
      ];
    case "Chemistry & Material Science":
      return [
        {
          id: `sub-1-${seed}`,
          name: seed % 2 === 0 ? "Analog pH Sensor Probe Module (0-14 pH)" : "MQ-135 Air Quality & Gas Detection Sensor",
          qty: "1 Unit",
          costINR: 750,
          purpose: "Continuous ionic concentration monitoring and chemical threshold measurement",
          alternativeComponent: "Turbidity Water Clarity Optical Sensor Probe",
          checked: false
        },
        {
          id: `sub-2-${seed}`,
          name: "12V Micro Peristaltic Dosing Pump",
          qty: "1 Pc",
          costINR: 420,
          purpose: "Precision automated volumetric chemical reagent liquid dosing",
          alternativeComponent: "5V Mini Submersible DC Water Pump",
          checked: false
        }
      ];
    case "Environmental & Green Tech":
      return [
        {
          id: `sub-1-${seed}`,
          name: seed % 2 === 0 ? "Capacitive Soil Moisture Sensor (Corrosion Resistant)" : "BH1750 Digital Ambient Light Intensity Lux Sensor",
          qty: "1 Pc",
          costINR: 110,
          purpose: "Monitoring soil water dielectric constant without probe degradation",
          alternativeComponent: "Resistive Soil Moisture Probe Pair",
          checked: false
        },
        {
          id: `sub-2-${seed}`,
          name: "5V Mini DC Submersible Water Pump (3W)",
          qty: "1 Pc",
          costINR: 180,
          purpose: "Controlled eco-irrigation fluid transport",
          alternativeComponent: "12V Solenoid Water Valve 1/2 inch",
          checked: false
        }
      ];
    case "Robotics & Electronics":
    default:
      return [
        {
          id: `sub-1-${seed}`,
          name: seed % 2 === 0 ? "L298N Dual H-Bridge Motor Driver Board" : "MPU6050 6-DOF Gyroscope & Accelerometer Module",
          qty: "1 Pc",
          costINR: 210,
          purpose: "Bi-directional high-current DC motor control and speed modulation",
          alternativeComponent: "TB6612FNG Compact Dual Motor Driver",
          checked: false
        },
        {
          id: `sub-2-${seed}`,
          name: "TT Dual Shaft Gearbox Motors (200 RPM) + Wheels",
          qty: "2 Pcs",
          costINR: 190,
          purpose: "Robotic chassis movement propulsion",
          alternativeComponent: "N20 Micro Metal Gear Motor 12V",
          checked: false
        }
      ];
  }
}

function getScientificPrinciples(subject: string, topic: string, angleTag: string): ScientificPrinciple[] {
  return [
    {
      title: "Transducer Signal Conditioning & Voltage Conversion",
      explanation: "Sensors operate by converting physical parameters (light, temperature, pressure, sound) into proportional electrical resistance or voltage outputs. Operational amplifiers and ADC (Analog-to-Digital Converters) map these analog continuums into digital quantization steps.",
      realWorldUsage: "Used extensively in industrial PLC automation, medical ECG monitors, and automotive engine control units (ECU)."
    },
    {
      title: "Pulse-Width Modulation (PWM) & Duty Cycle Power Control",
      explanation: "Instead of delivering partial voltage, PWM rapidly switches a digital output between full ON (5V/3.3V) and full OFF (0V) at high frequencies. The ratio of active ON time to total pulse period (Duty Cycle) regulates effective average power delivered to motors or LEDs.",
      realWorldUsage: "Core principle behind electric vehicle speed controllers, variable-frequency industrial drives, and LED dimmers."
    },
    {
      title: "Closed-Loop Feedback Control System Dynamics",
      explanation: `The system continuously samples sensor inputs, compares them against a programmed setpoint threshold, and modulates actuator outputs (${angleTag}) to minimize error.`,
      realWorldUsage: "Applied in building HVAC climate thermostats, aircraft autopilot flight control, and automated chemical bioreactors."
    }
  ];
}

function getVivaQuestions(subject: string, topic: string, mcuName: string, angleTag: string, seed: number): VivaQuestion[] {
  return [
    {
      id: `viva-1-${seed}`,
      question: `What is the core working principle of your project "${topic}" under the ${angleTag}?`,
      answer: `The system senses real-world environmental physical parameters using specialized sensor transducers, conditions the electrical signal, feeds it into the ADC of ${mcuName}, and evaluates threshold logic to trigger appropriate actuators or alerts while logging data.`,
      hint: "Explain the input-processing-output pipeline clearly."
    },
    {
      id: `viva-2-${seed}`,
      question: `Why did you select ${mcuName} instead of a standard analog circuit or a basic 555 timer chip?`,
      answer: `${mcuName} offers programmable logic, multi-channel ADC/PWM pins, easy re-configurability without re-soldering, and support for digital communications protocols (I2C/SPI/UART), allowing advanced features like display output and threshold calibration.`,
      hint: "Highlight flexibility, accuracy, and digital interface capabilities."
    },
    {
      id: `viva-3-${seed}`,
      question: "What is the purpose of placing a flyback diode across inductive relay/motor coils?",
      answer: "When an inductive load is switched off rapidly, collapsing magnetic fields induce a high reverse voltage spike (Back-EMF). The flyback diode provides a safe dissipation path, protecting sensitive microcontroller transistors from voltage breakdown.",
      hint: "Think about Lenz's Law and Back-EMF magnetic collapse."
    },
    {
      id: `viva-4-${seed}`,
      question: "How do you handle sensor signal noise and false triggering in code?",
      answer: "We employ digital filtering techniques such as Moving Average Filtering or hysteresis thresholds (setting separate upper ON and lower OFF trigger points) so transient spikes do not cause rapid chatter in actuators.",
      hint: "Mention software hysteresis or exponential smoothing filters."
    },
    {
      id: `viva-5-${seed}`,
      question: "If budget was increased by 2x, what hardware upgrades would you implement?",
      answer: "We would upgrade to high-precision industrial sensors (e.g. LiDAR or capacitive stainless probes), add an ESP32 for cloud IoT telemetry, and incorporate an OLED graphical user interface with rechargeable lithium battery BMS backup.",
      hint: "Discuss scalability, IoT cloud analytics, and precision hardware."
    }
  ];
}
