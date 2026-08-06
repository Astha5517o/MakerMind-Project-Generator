import { SubjectArea, StudentLevel, BudgetRange } from "../types";

export interface PresetTopic {
  title: string;
  subject: SubjectArea;
  level: StudentLevel;
  budget: BudgetRange;
  iconName: string;
  tagline: string;
}

export const PRESET_TOPICS: PresetTopic[] = [
  {
    title: "Solar Powered Water Purifier",
    subject: "Environmental & Green Tech",
    level: "High School (Class 11-12)",
    budget: "Medium (₹500 - ₹2000)",
    iconName: "Sun",
    tagline: "Distillation & UV sterilization powered by off-grid solar energy"
  },
  {
    title: "Smart Traffic Light System",
    subject: "Robotics & Electronics",
    level: "Middle School (Class 6-10)",
    budget: "Low (Under ₹500)",
    iconName: "TrafficLight",
    tagline: "Adaptive signal timers based on IR vehicle density detection"
  },
  {
    title: "IoT Air Quality & Smog Monitor",
    subject: "Computer Science & AI",
    level: "College / Engineering",
    budget: "Medium (₹500 - ₹2000)",
    iconName: "Wind",
    tagline: "Real-time PM2.5 / MQ135 sensor data streamed to cloud dashboard"
  },
  {
    title: "Biometric Lab Security Lock",
    subject: "Computer Science & AI",
    level: "High School (Class 11-12)",
    budget: "Advanced (₹2000+)",
    iconName: "Fingerprint",
    tagline: "Fingerprint sensor + solenoid door latch with buzzer security"
  },
  {
    title: "Electromagnetic Coil Gun Launcher",
    subject: "Physics & Applied Mechanics",
    level: "College / Engineering",
    budget: "Medium (₹500 - ₹2000)",
    iconName: "Zap",
    tagline: "Lorentz force coil acceleration with pulse capacitor discharge"
  },
  {
    title: "Plastic Waste Eco-Pyrolysis Reactor",
    subject: "Chemistry & Material Science",
    level: "High School (Class 11-12)",
    budget: "Medium (₹500 - ₹2000)",
    iconName: "Flame",
    tagline: "Thermal degradation of waste plastic into liquid hydrocarbon fuel"
  },
  {
    title: "Autonomous Obstacle Navigating Rover",
    subject: "Robotics & Electronics",
    level: "College / Engineering",
    budget: "Advanced (₹2000+)",
    iconName: "Bot",
    tagline: "Ultrasonic HC-SR04 scanning servo with L298N motor driver logic"
  },
  {
    title: "Automatic Smart Irrigation System",
    subject: "Environmental & Green Tech",
    level: "Middle School (Class 6-10)",
    budget: "Low (Under ₹500)",
    iconName: "Droplets",
    tagline: "Moisture sensor threshold triggering 5V mini submersible pump"
  }
];
