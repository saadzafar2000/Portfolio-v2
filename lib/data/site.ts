import type { SiteSettings } from "@/lib/types";

export const site: SiteSettings = {
  name: "Muhammad Saad Zafar",
  role: "Full Stack & Web3 Engineer",
  // Country-level on purpose. The city is deliberately not published; the
  // university in lib/data/education.ts carries the regional signal instead.
  location: "Germany",
  email: "",
  tagline: "Full-stack engineer building Web3 and Next.js products.",
  bioShort:
    "Full Stack & Web3 Engineer based in Germany, with over 4 years of experience shipping web applications for international clients and U.S. startups. Open to Werkstudent, full-time and freelance work.",
  bioLong: [
    "I am a Full Stack & Web3 Engineer based in Germany, currently pursuing my MSc degree. I specialize in building high-performance web applications using Next.js, React, TypeScript, and smart contract integrations on Ethereum. I have over 4 years of hands-on experience shipping products for international clients and U.S. startups. I am open to Werkstudent and full-time roles in Germany, as well as freelance contracts worldwide.",
    "My route here started with a BSc in Software Engineering and ended with a fully funded, award-winning final year project: Blockchain Pets, an NFT design and marketplace platform built on Ethereum.",
    "Since then I've worked across real-time chat systems, QR-based marketing tools, and e-commerce platforms — spanning both frontend and backend using the MERN stack, Vue.js, and TypeScript.",
    "The MSc in High Integrity Systems deepens that with secure, reliable software architecture — the grounding I bring to systems that have to keep running once they ship.",
  ],
  // Hero renders `{availability} · {location}`, so these two fields compose the
  // full badge without repeating "Germany". Footer renders availability alone.
  availability: "Available for Werkstudent, Freelance & Full-time",
  jobTitles: [
    "Full Stack Engineer",
    "Werkstudent Developer",
    "Freelance Software Engineer",
  ],
  // The facts a recruiter checks first, in the order they check them. The
  // location row is rendered from `location` above and is not repeated here.
  heroFacts: [
    { label: "Experience", value: "4+ years" },
    { label: "Currently", value: "MSc High Integrity Systems" },
    { label: "Focus", value: "Next.js · TypeScript · Solidity" },
  ],
  resumeUrl: "/Saad_Full_Stack.pdf",
  url: "https://muhammadsaadzafar.com",
  socials: [
    {
      kind: "github",
      label: "GitHub",
      handle: "github.com/saadzafar2000",
      href: "https://github.com/saadzafar2000",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      handle: "linkedin.com/in/muhammad-saad-zafar",
      href: "https://www.linkedin.com/in/muhammad-saad-zafar-39017b189/",
    },
    {
      kind: "twitter",
      label: "X",
      handle: "@MSaadZafar2000",
      href: "https://x.com/MSaadZafar2000",
    },
    {
      kind: "instagram",
      label: "Instagram",
      handle: "@saadzafar2000",
      href: "https://www.instagram.com/saadzafar2000/",
    },
  ],
  seo: {
    title: "Muhammad Saad Zafar — Full Stack Engineer & Werkstudent | Germany",
    description:
      "Full Stack & Web3 Engineer based in Germany. Specializing in Next.js, React, TypeScript, and Smart Contracts. Available for Werkstudent and full-time roles in Germany, and freelance web development worldwide.",
    // Ordered by intent, not by volume: the Werkstudent terms are the ones with
    // a hiring decision behind them.
    keywords: [
      "Werkstudent Full Stack Germany",
      "Working Student Developer Germany",
      "Freelance Web3 Developer",
      "Full Stack Engineer Next.js",
      "React Developer Germany",
      "Muhammad Saad Zafar",
      "Next.js Developer",
      "TypeScript Engineer",
      "Smart Contract Developer",
      "Web3 Developer Germany",
    ],
  },
};
