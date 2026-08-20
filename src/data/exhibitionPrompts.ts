import { SuggestedProjectPrompt } from "../types";

export const CURATED_EXHIBITION_PROMPTS: SuggestedProjectPrompt[] = [
  // 1. Healthcare & Assistive Tech
  {
    id: "prompt-med-1",
    title: "Smart Haptic Blind Sentry with Dual Ultrasonic Radar & Water Puddle Sensing",
    category: "Healthcare & Assistive Tech",
    tagline: "Assistive navigation stick providing tactile vibration zones for obstacles and wet terrain",
    problemAddressed: "Visually impaired individuals face high collision risks from head-height obstacles and slippery puddle surfaces that traditional white canes miss.",
    prototypeModelIdea: "A lightweight PVC/acrylic staff equipped with dual HC-SR04 ultrasonic sensors (knee-height & head-height), a rain sensor probe at the tip, and coin vibration motors embedded in the ergonomic handle.",
    exhibitionWinningFactor: "Tangible social impact; judges can blindfold themselves and test the haptic feedback in real-time.",
    difficulty: "Intermediate",
    suitabilityScore: 99,
    level: "High School (Class 11-12)",
    subject: "Robotics & Electronics",
    budget: "Low (Under ₹500)",
    suggestedMaterials: ["Arduino Nano", "HC-SR04 Sensor (x2)", "Coin Vibration Motor", "Rain Sensor Probe", "Buzzer", "9V Battery"],
    tags: ["Assistive Tech", "Haptics", "Social Good", "High School"]
  },
  {
    id: "prompt-med-2",
    title: "IoT Patient Telemetry Bed Sentry with MAX30102 Heart Rate & Fall Detection",
    category: "Healthcare & Assistive Tech",
    tagline: "Non-intrusive patient health monitor streaming pulse, SpO2, and sudden posture drop alerts to mobile",
    problemAddressed: "Hospital wards and homebound elderly patients require continuous vital signs tracking without expensive bulky clinical machines.",
    prototypeModelIdea: "A miniature bedside model with an MPU6050 accelerometer for sudden fall detection and a MAX30102 optical sensor for pulse/oxygen metrics displayed on an OLED and logged to a cloud dashboard.",
    exhibitionWinningFactor: "Combines biomedical optics with IoT emergency triggers; visually impressive live heartbeat waveform.",
    difficulty: "Advanced",
    suitabilityScore: 96,
    level: "College / Engineering",
    subject: "Computer Science & AI",
    budget: "Medium (₹500 - ₹2000)",
    suggestedMaterials: ["ESP32 NodeMCU", "MAX30102 Pulse Sensor", "MPU6050 Gyro", "0.96 inch OLED", "Buzzer", "LiPo Battery"],
    tags: ["Biomedical", "IoT", "Wearable", "Cloud Telemetry"]
  },

  // 2. Green Energy & Clean Tech
  {
    id: "prompt-green-1",
    title: "Dual-Axis Smart Solar Tracking Station with Real-Time Efficiency Telemetry",
    category: "Green Energy & Clean Tech",
    tagline: "Light-seeking solar photovoltaic mount delivering up to 35% higher energy yield than fixed panels",
    problemAddressed: "Fixed angle solar panels lose over 30% of potential solar radiation as the sun's trajectory shifts across azimuth and elevation angles throughout the day.",
    prototypeModelIdea: "A 3D-printed/sunboard pan-tilt gimbal powered by two SG90 servos, four partitioned LDRs measuring differential light, and a voltage sensor comparing tracking vs static generation.",
    exhibitionWinningFactor: "Dynamic mechanical movement; judges can shine a flashlight and watch the solar panel follow the beam immediately.",
    difficulty: "Intermediate",
    suitabilityScore: 98,
    level: "High School (Class 11-12)",
    subject: "Physics & Applied Mechanics",
    budget: "Medium (₹500 - ₹2000)",
    suggestedMaterials: ["Arduino Uno", "SG90 Servos (x2)", "LDR Resistors (x4)", "6V 2W Solar Panel", "INA219 / Voltage Sensor", "OLED Display"],
    tags: ["Solar", "Clean Energy", "Active Gimbal", "Mechanical"]
  },
  {
    id: "prompt-green-2",
    title: "Piezoelectric Energy Harvesting Floor Tiles for Footstep Power Generation",
    category: "Green Energy & Clean Tech",
    tagline: "Converts kinetic footfall pressure in high-traffic hallways into stored DC electrical energy",
    problemAddressed: "Massive amounts of human kinetic movement in schools, railway stations, and malls dissipate as wasted mechanical vibration.",
    prototypeModelIdea: "A scale floor tile constructed from acrylic springs and an array of 8 piezoelectric ceramic discs connected via bridge rectifiers and supercapacitors to power emergency LED exit signs.",
    exhibitionWinningFactor: "Interactive physical demonstration; judges step on the model tile and immediately witness capacitor charging and LED illumination.",
    difficulty: "Beginner",
    suitabilityScore: 95,
    level: "Middle School (Class 6-10)",
    subject: "Physics & Applied Mechanics",
    budget: "Low (Under ₹500)",
    suggestedMaterials: ["Piezoelectric Discs 27mm (x8)", "1N4007 Diodes (Bridge Rectifier)", "1000uF Electrolytic Capacitor", "LEDs", "Acrylic / Foam Board"],
    tags: ["Renewable", "Piezo", "Interactive", "Middle School"]
  },

  // 3. Smart Agriculture & Food Tech
  {
    id: "prompt-agri-1",
    title: "Automated Closed-Loop Drip Irrigation with Capacitive Soil Sentry & Weather Predictor",
    category: "Smart Agriculture",
    tagline: "Precision water conservation engine preventing overwatering through deep root moisture monitoring",
    problemAddressed: "Over 60% of agricultural fresh water is wasted globally due to conventional flood irrigation and timer-based systems that ignore actual soil moisture.",
    prototypeModelIdea: "A diorama farm field with live potted plants, corrosion-resistant capacitive soil moisture probes, a 5V submersible micro-pump with silicone drip lines, and DHT11 ambient humidity sensors.",
    exhibitionWinningFactor: "Live working hydraulic and electrical model; demonstrates tangible water conservation percentages.",
    difficulty: "Intermediate",
    suitabilityScore: 97,
    level: "High School (Class 11-12)",
    subject: "Environmental & Green Tech",
    budget: "Medium (₹500 - ₹2000)",
    suggestedMaterials: ["ESP32 / Arduino", "Capacitive Soil Sensor", "5V Mini Water Pump", "5V Relay Module", "DHT11 Sensor", "Clear Water Reservoir"],
    tags: ["Agriculture", "Water Saving", "Drip Irrigation", "Hydraulics"]
  },

  // 4. Waste Management & Environment
  {
    id: "prompt-waste-1",
    title: "Touchless AI-Assisted Smart Waste Segregator with Fill-Level Ultrasonic Sentry",
    category: "Waste Management & Eco",
    tagline: "Automated dual-chamber dustbin sorting wet vs dry trash with touch-free servo lid opening",
    problemAddressed: "Mixed domestic waste contaminates recyclable dry goods, causing landfills to produce toxic methane and leachate.",
    prototypeModelIdea: "A miniature dual-bin structure with an infrared proximity trigger for hands-free lid opening, moisture conductivity sensors on a tilt tray to segregate wet kitchen waste from dry plastics, and ultrasonic depth sensing.",
    exhibitionWinningFactor: "Direct hygiene solution suitable for smart cities; fun interactive testing with paper vs wet sponge.",
    difficulty: "Intermediate",
    suitabilityScore: 98,
    level: "Middle School (Class 6-10)",
    subject: "Robotics & Electronics",
    budget: "Medium (₹500 - ₹2000)",
    suggestedMaterials: ["Arduino Uno", "HC-SR04 (x2)", "SG90 Servo Motors (x2)", "Rain/Moisture Probe", "Buzzer", "MDF Board / Acrylic"],
    tags: ["Smart City", "Waste Segregation", "Automation", "Hygiene"]
  },

  // 5. Robotics & Automation
  {
    id: "prompt-robot-1",
    title: "Autonomous Obstacle-Navigating Fire-Extinguishing Rover with Flame Sentry",
    category: "Robotics & Automation",
    tagline: "Smart robotic rover detecting open flames, calculating proximity, and activating CO2/water jet suppression",
    problemAddressed: "Firefighters face fatal hazards entering chemically hazardous or structurally compromised burning structures during early response.",
    prototypeModelIdea: "A 2WD robotics chassis with an ultrasonic obstacle avoidance bumper, 3-point directional flame phototransistor array, and a 5V micro water spray pump with servo nozzle aiming.",
    exhibitionWinningFactor: "Exciting demonstration; can safely extinguish a small tea candle flame on judge command.",
    difficulty: "Advanced",
    suitabilityScore: 99,
    level: "High School (Class 11-12)",
    subject: "Robotics & Electronics",
    budget: "Medium (₹500 - ₹2000)",
    suggestedMaterials: ["Arduino Uno", "L298N Motor Driver", "TT Gear Motors + Chassis", "Flame Sensor Module (x3)", "5V Water Pump", "Relay"],
    tags: ["Robotics", "Firefighting", "Sensors", "Rover"]
  },

  // 6. Security, Disaster & Safety
  {
    id: "prompt-sec-1",
    title: "Industrial LPG Gas Leakage & Flame Sentry with Auto-Shutoff Solenoid & GSM Alert",
    category: "Safety & Disaster Management",
    tagline: "Early-warning gas safety system cutting off gas valves and sending emergency alarms before explosion limit",
    problemAddressed: "Domestic and restaurant kitchen LPG gas leaks lead to devastating cylinder explosions due to delayed human odor detection.",
    prototypeModelIdea: "A miniature kitchen simulator with an MQ-6 LPG/isobutane sensor, high-decibel piezo siren, exhaust fan relay trigger, and a servo-driven ball valve cut-off simulator.",
    exhibitionWinningFactor: "High safety value; can be demonstrated with a standard gas lighter (without flame) to trigger the safety sequence.",
    difficulty: "Intermediate",
    suitabilityScore: 97,
    level: "High School (Class 11-12)",
    subject: "Chemistry & Material Science",
    budget: "Medium (₹500 - ₹2000)",
    suggestedMaterials: ["MQ-6 / MQ-2 Sensor", "Arduino Nano", "SG90 Servo (Valve Cutoff)", "5V DC Exhaust Fan", "Piezo Buzzer", "LED Alert Array"],
    tags: ["Gas Safety", "Home Automation", "Disaster Prevention"]
  }
];
