import { Cpu, Zap, Code2 } from "lucide-react";

// Single source of truth for projects.
// Used by the home page cards (ProjectsSection) and the full Projects page.
export const projects = [
  {
    id: "spark-logic-kit",
    title: "Spark Logic Kit",
    subtitle: "Interactive STEM Education Kit",
    description:
      "A unique interactive STEM kit built from the ground up to teach younger students the concepts of electrical and computer engineering. Designed to be hands-on and engaging, bridging the gap between theory and real-world circuit application.",
    longDescription:
      "Typically, students receive little to no exposure to Electrical and Computer Engineering concepts at a middle/high-school level. " +
      "Inspired by Snap Circuits and digital logic test programs, S.P.A.R.K. Logic kit is built to introduce computer logic without relying on previous experience. " +
      "The kit includes custom-designed PCBs with guided experiments, a Python-based microcontroller for visualizing data in real time, and a 3D-printed grid board and enclosures. " +
      "The entire system is built around plug-in logic blocks and a microcontroller that reads the circuit's inputs and shows the results on a small display.",
    thumbnail: "/projects/R4_00634.webp",
    images: [
      "/projects/R4_00634.webp",
      "/projects/0001.webp",
      "/projects/ANDLogicBrick.webp",
      "/projects/ORLogicBrick.webp",
      "/projects/IMG_2188.webp",
    ],
    captions: [
      "Final assembled kit",
      "3D render of the kit",
      "AND logic brick",
      "OR logic brick",
      "Student testing the kit",
    ],
    tags: ["Embedded Systems", "PCB Design", "Python", "PSpice", "Fusion 360", "Circuit Design"],
    highlights: [
      "Custom PCB designed from scratch with Fusion 360",
      "Python GUI for real-time information and visualization",
      "3D printed enclosure with snap-fit assembly",
      "Suitable for students ages 9–18",
    ],
    category: "Hardware",
    icon: Cpu,
    demoUrl: null,
  },
  {
    id: "wifi-smart-car",
    title: "Wi-Fi Controlled Smart Car",
    subtitle: "Autonomous & Remote Vehicle",
    description:
      "A small Wi-Fi controlled car with built-in functions to draw shapes, follow a path, and perform danger detection using ultrasonic sensors.",
    longDescription:
      "Built entirely from custom hardware and firmware, the Smart Car uses a dual H-bridge motor driver, an ESP32 microcontroller, and a custom PCB that integrates power regulation, sensor interfacing, and motor control. The firmware is written in C/C++ and exposes a REST API over Wi-Fi, allowing control from any browser on the local network.",
    thumbnail: "/projects/carAngledview.webp",
    images: ["/projects/carAngledview.webp", "/projects/carFromTop.webp", "/projects/carProjectSide.webp"],
    captions: [
      "Car powered up via computer",
      "Display board and ESP32 from top view",
      "Side view of the car",
    ],
    tags: ["Embedded Systems", "PCB Design", "C/C++", "Fusion 360", "Circuit Design"],
    highlights: [
      "ESP32-based Wi-Fi control via local REST API",
      "Ultrasonic sensor for obstacle avoidance",
      "Custom motor driver PCB",
      "Autonomous shape-drawing mode via dead reckoning",
    ],
    category: "Robotics",
    icon: Zap,
    demoUrl: null,
  },
  {
    id: "ai-content-analysis",
    title: "AI Content Analysis Platform",
    subtitle: "Web-Based Analysis Tool",
    description:
      "A web-based platform that analyzes uploaded data points against a pre-made codebook using AI models, providing structured insights and summaries.",
    longDescription:
      "A full-stack web application that integrates AI APIs to process and analyze text and media content. The platform features a clean dashboard for viewing analysis results, a Python backend for orchestrating API calls, and a lightweight frontend for user interaction.",
    thumbnail: "/projects/landingPage.webp",
    images: [
      "/projects/landingPage.webp",
      "/projects/after_annotation.webp",
      "/projects/after_discussion.webp",
      "/projects/metricWebsiteAI.webp",
      "/projects/discussion_performance.webp",
    ],
    captions: [
      "Landing page of the website",
      "After a round of independent analysis by agents",
      "A round of discussions between the agents",
      "Reliability of event analysis after training rounds",
      "Post-discussion agreement",
    ],
    tags: ["Python", "FastAPI", "Web Design"],
    highlights: [
      "AI-powered text analysis pipeline",
      "Python FastAPI backend",
      "Responsive web dashboard",
      "Structured JSON output for downstream use",
    ],
    category: "Software",
    icon: Code2,
    demoUrl: null,
  },
];
