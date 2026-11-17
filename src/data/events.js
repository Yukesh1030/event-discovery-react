// Central Event Dataset for STACKLY Platform
import event1Img from "../assets/events/event-1.webp";
import event2Img from "../assets/events/event-2.webp";
import event3Img from "../assets/events/event-3.webp";
import event4Img from "../assets/events/event-4.webp";
import event5Img from "../assets/events/event-5.webp";
import event6Img from "../assets/events/event-6.webp";
import event7Img from "../assets/events/event-7.webp";
import event8Img from "../assets/events/event-8.webp";
import event9Img from "../assets/events/event-9.webp";
import event10Img from "../assets/events/event-10.webp";
import event11Img from "../assets/events/event-11.webp";
import event12Img from "../assets/events/event-12.webp";

export const initialEvents = [
  {
    id: 1,
    title: "Google Cloud & AI Developer Summit",
    category: "Technology",
    date: "2026-12-12",
    time: "09:30 AM - 04:30 PM IST",
    location: "Bengaluru, India",
    venue: "Google Developer Space, Outer Ring Road, Bengaluru",
    image: event1Img,
    description:
      "Join premier cloud architects, Google Developer Experts, and AI researchers for an intensive full-day summit. Explore generative AI on Google Cloud Vertex AI, multi-modal Gemini applications, distributed training architectures, and production-grade Kubernetes deployments.",
    agenda: [
      "Keynote: Generative AI Ecosystem in 2027",
      "Architecting Enterprise Cloud Run & Vertex AI Solutions",
      "Hands-on Lab: Fine-Tuning Open & Frontier Models",
      "Panel Discussion: Scaling Resilient Cloud Infrastructure",
      "Networking & Community Project Showcase"
    ],
    speaker: {
      name: "Dr. Arvind Ramesh",
      role: "Principal Cloud Solutions Architect",
      organization: "Google Cloud"
    },
    seats: 120,
    featured: true,
    price: "Free Pass",
    tags: ["Cloud", "AI", "Kubernetes", "DevOps"]
  },
  {
    id: 2,
    title: "React Next-Gen & Fullstack Conference",
    category: "Technology",
    date: "2026-11-28",
    time: "10:00 AM - 05:00 PM IST",
    location: "Hyderabad, India",
    venue: "HITEC City Convention Center, Hall 3, Hyderabad",
    image: event2Img,
    description:
      "A deep dive into modern frontend engineering with React 19, Server Components, Vite tooling, and fullstack edge architectures. Learn state management patterns, fluid motion animations, and performance profiling from lead web engineers.",
    agenda: [
      "Mastering React 19 Actions and Optimistic Updates",
      "Modern Bundling: Vite, Rolldown, and Instant HMR",
      "Component-Driven Architecture & Scalable Design Systems",
      "Micro-Frontends & Edge Rendering Deep Dive",
      "Interactive Code Review & Q&A Session"
    ],
    speaker: {
      name: "Pooja Sundaram",
      role: "Staff Frontend Engineer",
      organization: "Vercel Ecosystem"
    },
    seats: 85,
    featured: true,
    price: "Free Pass",
    tags: ["React", "JavaScript", "Frontend", "Vite"]
  },
  {
    id: 3,
    title: "DevOps & Cloud-Native Kubernetes Camp",
    category: "Technology",
    date: "2026-12-05",
    time: "10:00 AM - 04:00 PM IST",
    location: "Pune, India",
    venue: "TechPark Auditorium, Viman Nagar, Pune",
    image: event3Img,
    description:
      "Level up your infrastructure engineering skills with hands-on labs covering container orchestration, GitOps with ArgoCD, OpenTelemetry observability, and Zero-Trust cloud security.",
    agenda: [
      "Building Self-Healing Kubernetes Clusters",
      "GitOps Workflows with ArgoCD & Helm",
      "Observability Stacks: Prometheus, Grafana, OpenTelemetry",
      "Automated Security Scans & CI/CD Hardening"
    ],
    speaker: {
      name: "Karan Verma",
      role: "Head of Infrastructure",
      organization: "CloudOps Matrix"
    },
    seats: 60,
    featured: false,
    price: "Free Pass",
    tags: ["DevOps", "Kubernetes", "Docker", "GitOps"]
  },
  {
    id: 4,
    title: "Cybersecurity & Ethical Hacking Masterclass",
    category: "Technology",
    date: "2026-12-20",
    time: "02:00 PM - 07:00 PM IST",
    location: "Online / Virtual",
    venue: "Live Interactive Discord & Zoom Sandbox",
    image: event4Img,
    description:
      "A fast-paced interactive masterclass focusing on offensive security, web vulnerability assessments, penetration testing techniques, API security bypasses, and ethical defense strategies.",
    agenda: [
      "OWASP Top 10 API Security Dissections",
      "Live Reconnaissance & Threat Surface Mapping",
      "Hands-on Capture The Flag (CTF) Challenge",
      "Hardening Modern Cloud Endpoints"
    ],
    speaker: {
      name: "Devendra Rao",
      role: "Senior Security Researcher & Bug Hunter",
      organization: "DefSec Labs"
    },
    seats: 150,
    featured: false,
    price: "Free Pass",
    tags: ["Security", "Ethical Hacking", "Cloud", "APIs"]
  },
  {
    id: 5,
    title: "Global Startup Founders & VC Summit",
    category: "Business",
    date: "2026-12-08",
    time: "09:00 AM - 06:00 PM IST",
    location: "Mumbai, India",
    venue: "Bandra Kurla Complex (BKC) Grand Ballroom, Mumbai",
    image: event5Img,
    description:
      "Connect with early-stage investors, unicorn founders, and venture capitalists. Explore seed funding dynamics, sustainable unit economics, cross-border expansion, and founder mental resilience in high-growth startups.",
    agenda: [
      "State of Indian Tech & Global Venture Capital 2027",
      "Navigating Seed to Series A: Pitching What Matters",
      "Live Shark-Tank Style Founder Pitches",
      "Roundtable: Bootstrapped vs VC-Backed Scale",
      "Exclusive Investor Matchmaking Mixer"
    ],
    speaker: {
      name: "Ananya Singhania",
      role: "Managing Partner",
      organization: "Apex Horizon Ventures"
    },
    seats: 90,
    featured: true,
    price: "Free Pass",
    tags: ["Startups", "Venture Capital", "Fundraising", "Leadership"]
  },
  {
    id: 6,
    title: "Product Management & Growth Bootcamp",
    category: "Business",
    date: "2026-11-30",
    time: "10:30 AM - 04:30 PM IST",
    location: "Delhi NCR, India",
    venue: "Cyber City Conference Center, Gurugram, Delhi NCR",
    image: event6Img,
    description:
      "Designed for PMs, growth leads, and founders seeking repeatable customer acquisition and retention strategies. Discover how to build viral product loops, conduct customer research that yields real signals, and leverage PLG metrics.",
    agenda: [
      "Product-Led Growth (PLG) Mechanics & Flywheels",
      "User Retention & Churn Reduction Frameworks",
      "Data-Driven Roadmapping with OKRs",
      "Interactive Product Tear-down Session"
    ],
    speaker: {
      name: "Rohan Malhotra",
      role: "VP of Product",
      organization: "ScaleUp Technologies"
    },
    seats: 45,
    featured: false,
    price: "Free Pass",
    tags: ["Product", "Growth", "Business", "Analytics"]
  },
  {
    id: 7,
    title: "Fintech Innovation & Web3 Forum",
    category: "Business",
    date: "2026-12-18",
    time: "10:00 AM - 05:00 PM IST",
    location: "Bengaluru, India",
    venue: "Leela Palace Convention Hall, Bengaluru",
    image: event7Img,
    description:
      "Explore the next decade of digital transactions, Account Aggregator networks, CBDCs, cross-border UPI rails, and decentralized settlement protocols with leading regulators and fintech innovators.",
    agenda: [
      "The Evolution of UPI: Global Interoperability",
      "Account Aggregators and Embedded Credit Rails",
      "Next-Gen Fraud Detection with Real-time ML",
      "Decentralized Finance & Regulatory Compliances"
    ],
    speaker: {
      name: "Meera Krishnan",
      role: "Chief Innovation Officer",
      organization: "PayCore Global"
    },
    seats: 75,
    featured: false,
    price: "Free Pass",
    tags: ["Fintech", "Banking", "Web3", "Business"]
  },
  {
    id: 8,
    title: "UI/UX Design Systems & Motion Masterclass",
    category: "Design",
    date: "2026-12-02",
    time: "10:00 AM - 04:30 PM IST",
    location: "Bengaluru, India",
    venue: "Design Hub Studios, Indiranagar, Bengaluru",
    image: event8Img,
    description:
      "Master the craft of scalable design systems, tokenized design-to-code pipelines, micro-interactions, and accessible typography. Learn how world-class design teams build interfaces that feel effortless and tactile.",
    agenda: [
      "Building Design Tokens that Sync Across Web & Mobile",
      "The Physics of Motion: Bézier Curves & Micro-interactions",
      "Inclusive Design & WCAG AAA Compliance in Practice",
      "Hands-on Figma Workshop: Advanced Auto Layout & Variables"
    ],
    speaker: {
      name: "Tanvi Sheth",
      role: "Design Director",
      organization: "Studio Minimal"
    },
    seats: 50,
    featured: true,
    price: "Free Pass",
    tags: ["Design", "UI/UX", "Figma", "Motion"]
  },
  {
    id: 9,
    title: "Brand Identity & Creative Typography Lab",
    category: "Design",
    date: "2026-12-14",
    time: "11:00 AM - 04:00 PM IST",
    location: "Mumbai, India",
    venue: "Art & Media Center, Lower Parel, Mumbai",
    image: event9Img,
    description:
      "Explore the intersection of Swiss modernist typography, brand personality, generative branding, and editorial layout design. Learn to create memorable visual identities that stand out in crowded digital markets.",
    agenda: [
      "History and Anatomy of Modern Typefaces",
      "Typography as Brand Voice: Case Studies",
      "Grid Systems, Hierarchy, and Negative Space",
      "Crafting Expressive Logotypes and Visual Guidelines"
    ],
    speaker: {
      name: "Vikramaditya Shah",
      role: "Creative Director & Type Designer",
      organization: "Foundry Nine"
    },
    seats: 40,
    featured: false,
    price: "Free Pass",
    tags: ["Typography", "Branding", "Creative", "Art"]
  },
  {
    id: 10,
    title: "Figma to Code: Spatial 3D Interfaces",
    category: "Design",
    date: "2026-12-22",
    time: "02:00 PM - 06:30 PM IST",
    location: "Online / Virtual",
    venue: "Virtual Live Interactive Stream",
    image: event10Img,
    description:
      "Bridging the divide between product designers and creative coders. Learn how to transform static Figma mockups into interactive 3D WebGL experiences using Three.js, React Three Fiber, and WebXR shaders.",
    agenda: [
      "Introduction to Spatial Canvas & 3D Math for Designers",
      "Figma Assets Export and GLTF Optimization",
      "Lighting, Materials, and Post-processing with R3F",
      "Interactive 3D Landing Page Build From Scratch"
    ],
    speaker: {
      name: "Siddharth Joshi",
      role: "Creative Technologist",
      organization: "SpatialCraft"
    },
    seats: 110,
    featured: false,
    price: "Free Pass",
    tags: ["3D", "WebGL", "Figma", "Creative Code"]
  },
  {
    id: 11,
    title: "STEM Educators & EdTech Leadership Summit",
    category: "Education",
    date: "2026-12-10",
    time: "09:30 AM - 04:30 PM IST",
    location: "Chennai, India",
    venue: "IIT Madras Research Park Auditorium, Chennai",
    image: event11Img,
    description:
      "Bringing together school principals, university deans, edtech founders, and pedagogy researchers to reimagine STEM learning, AI-assisted tutoring, and experiential science education.",
    agenda: [
      "Personalized Learning with Adaptive AI Tutors",
      "Integrating Computational Thinking in K-12",
      "Gamified Learning Environments & Hands-on Robotics",
      "Policy, Equity & Bridging the Digital Divide"
    ],
    speaker: {
      name: "Dr. Revathi Balakrishnan",
      role: "Professor of Educational Technology",
      organization: "National Institute of Pedagogy"
    },
    seats: 70,
    featured: true,
    price: "Free Pass",
    tags: ["Education", "EdTech", "STEM", "Teaching"]
  },
  {
    id: 12,
    title: "Data Science & Machine Learning Academy",
    category: "Education",
    date: "2026-12-16",
    time: "10:00 AM - 05:00 PM IST",
    location: "Hyderabad, India",
    venue: "T-Hub Phase 2 Conference Hall, Hyderabad",
    image: event12Img,
    description:
      "An intensive masterclass designed for university students, educators, and aspiring data scientists. Learn exploratory data analysis, PyTorch neural networks, evaluation metrics, and responsible AI practices.",
    agenda: [
      "Python Data Science Stack: Pandas, NumPy & Scikit-Learn",
      "Deep Learning Foundations with PyTorch",
      "Model Interpretability, Bias & Fairness in AI",
      "Capstone Project: End-to-End Prediction Pipeline"
    ],
    speaker: {
      name: "Gaurav Sen",
      role: "Lead Machine Learning Scientist",
      organization: "NeuralData Labs"
    },
    seats: 95,
    featured: false,
    price: "Free Pass",
    tags: ["Data Science", "Python", "Machine Learning", "AI"]
  }
];

// Helper to get initial seat counts or load from localStorage
const STORAGE_SEATS_KEY = "stackly_event_seats";

export const getStoredSeats = () => {
  try {
    const stored = localStorage.getItem(STORAGE_SEATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.warn("Failed to read seats from localStorage", err);
  }
  // Initialize from initialEvents
  const initialMap = {};
  initialEvents.forEach((ev) => {
    initialMap[ev.id] = ev.seats;
  });
  try {
    localStorage.setItem(STORAGE_SEATS_KEY, JSON.stringify(initialMap));
  } catch {
    // ignore
  }
  return initialMap;
};

export const updateStoredSeatCount = (eventId, delta) => {
  try {
    const seatsMap = getStoredSeats();
    const current = seatsMap[eventId] ?? 0;
    const updated = Math.max(0, current + delta);
    seatsMap[eventId] = updated;
    localStorage.setItem(STORAGE_SEATS_KEY, JSON.stringify(seatsMap));
    return updated;
  } catch (err) {
    console.error("Failed to update seat count", err);
    return null;
  }
};
