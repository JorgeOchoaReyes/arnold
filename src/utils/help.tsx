import { Phone, CodeIcon, PersonStanding } from "lucide-react";

export const Mock_Interviewers = [
  {
    id: 1,
    name: "Technical Interview",
    description: "Assesses coding, problem-solving, and CS fundamentals.",
    image: "technical-interview.jpg",
    icon: <CodeIcon size={48} />,
    src: "/technical.svg",
  },
  {
    id: 2,
    name: "Behavioral Interview",
    description: "Evaluates soft skills, teamwork, and past work experiences.",
    image: "behavioral-interview.jpg",
    icon: <PersonStanding size={48} />,
    src: "/behavior.svg",
  },
  {
    id: 3,
    name: "Phone Interview",
    description: "Screens basic skills and communication before on-site.",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
    src: "/phone.svg",
  },
  {
    id: 4,
    name: "Technical Focus Interviewer",
    description: "Deeply probes technical expertise in algorithms and design.",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
    src: "/tech.svg",
  },
  {
    id: 5,
    name: "Friendly Interviewer",
    description: "Creates a relaxed space to showcase best abilities.",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
    src: "/friendly.svg",
  },
  {
    id: 6,
    name: "Aggressive Interviewer",
    description: "Tests problem-solving under pressure with hard questions.",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
    src: "/aggresive.svg",
  },
  {
    id: 7,
    name: "Negative Interviewer",
    description: "Gauges resilience and handles difficult scenarios.",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
    src: "/negative.svg",
  },
  {
    id: 8,
    name: "Helpful Interviewer",
    description: "Guides and hints to understand problem-solving process.",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
    src: "/helpful.svg",
  },
];

export const coloring = {
  "hard": "#ff0000",
  "medium": "#ff9900",  
  "easy": "#00ff00",
  "technical focused": "#0000ff",
  "behavioral": "#ff00ff",
  "foundations": "#00ffff",
  "neutral feedback": "#ffff00",
};

export const companyColorsAndIcons = {
  "Google": {
    color: "#4285F4",
    icon: "google",
  },
  "Microsoft": {
    color: "#F25022", 
  },
  "Apple": {
    color: "#A2AAAD", 
  },
  "Amazon": {
    color: "#FF9900", 
  },
  "Meta": {
    color: "#4267B2", 
  }, 
};
 
export const contrastColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
};