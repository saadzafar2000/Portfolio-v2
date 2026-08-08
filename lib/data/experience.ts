import type { ExperienceItem } from "@/lib/types";

/** Most recent first. */
export const experience: ExperienceItem[] = [
  {
    id: "freelance-developer",
    title: "Freelance Full Stack Developer",
    company: "Freelance",
    location: "Remote / Germany",
    start: "Nov 2024",
    end: "Present",
    description:
      "Architecting and delivering production web applications, SaaS platforms, and digital products for clients independently.",
    achievements: [
      "Built and deployed high-converting Next.js 16 web applications with WebGL and Tailwind CSS",
      "Engineered real-time AI dashboards featuring multi-provider WebSocket streaming",
      "Developed friction-free QR community discovery platforms operating live in production",
      "Provided end-to-end full stack development from design systems to cloud deployment",
    ],
  },
  {
    id: "interactbpo",
    title: "Full Stack Developer",
    company: "InteractBPO",
    location: "Rawalpindi, Pakistan",
    start: "Aug 2022",
    end: "Oct 2023",
    description:
      "Built and maintained production web applications for USA-based clients, working remotely across time zones.",
    achievements: [
      "Built scalable web applications using the MERN stack, React, and Vue.js",
      "Integrated third-party APIs including Twilio, Firebase, and QR.io",
      "Delivered 6+ production-ready applications for the U.S. market",
      "Collaborated with international teams across a six-to-nine hour time difference",
    ],
  },
  {
    id: "cartel-international",
    title: "Front End Developer",
    company: "Cartel International",
    location: "Rawalpindi, Pakistan",
    start: "Jan 2020",
    end: "Aug 2022",
    description:
      "Designed and built dynamic user interfaces using React, Bootstrap, and jQuery, improving site responsiveness and engagement.",
    achievements: [
      "Created responsive web interfaces using React and modern CSS frameworks",
      "Developed interactive applications with persistent data storage",
      "Integrated external APIs for weather data and other services",
      "Designed landing pages optimised for conversion",
    ],
  },
];
