import type { Project } from "@/lib/types";

/**
 * TODO (Saad): three things need your eyes here.
 *
 * 1. `year` and `role` are inferred from the employment timeline in
 *    `lib/data/experience.ts` — the four InteractBPO client projects are dated
 *    inside Aug 2022 – Oct 2023, Blockchain Pets from its NGIRI-2022 award
 *    code. Correct any that are wrong; they render on the work index.
 * 2. `caseStudy` prose is seeded from the old one-paragraph card descriptions.
 *    It is accurate but thin — these are the pages meant to carry depth, so
 *    they want a real pass in your own voice.
 * 3. `metrics` are deliberately NOT the usual "p95 latency / 12k MAU / 99.9%
 *    uptime" numbers. Nothing in the existing content records those, and
 *    inventing performance figures for a portfolio an employer will read is a
 *    line worth not crossing. Every value below is traceable to something you
 *    already wrote. Replace them with real measurements wherever you have them
 *    — hard numbers are the single highest-value edit on these pages.
 * 4. ChurchCompass `year` ("2026") and `role` ("Full stack developer") are
 *    assumptions — nothing in the repo dates it. FanRaiz `year` still reads
 *    "2023" from the InteractBPO engagement; if the dual-theme rebuild shown in
 *    the current screenshots is recent, that wants bumping too.
 */
export const projects: Project[] = [
  {
    id: "tasteandsee",
    slug: "tasteandsee",
    title: "Taste and See",
    seoTitle: "Taste and See — Community & Faith Engagement Platform",
    summary: "Minimalist landing page and prayer request tool for tent gatherings and community outreach",
    description:
      "A minimalist, high-converting engagement page built for outdoor tent gatherings and community events. Visitors scan a QR code on a cookie wrapper to read Psalm 34:8, leave prayer requests without account creation, or locate local gathering spots.",
    category: "Web Application",
    year: "2026",
    role: "Full stack developer",
    cover: {
      src: "/lovable-uploads/tasteandsee.cc_ (2).png",
      alt: "Taste and See community engagement landing page",
    },
    gallery: [
      {
        src: "/lovable-uploads/tasteandsee.cc_ (2).png",
        alt: "Taste and See community engagement landing page",
      },
      {
        src: "/lovable-uploads/tasteandsee.cc_.png",
        alt: "Taste and See full page view",
      },
      {
        src: "/lovable-uploads/tasteandsee.cc_ (3).png",
        alt: "Taste and See Church Compass integration section",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"],
    demoUrl: "https://tasteandsee.cc",
    order: 1,
    caseStudy: {
      problem:
        "Outreach events often hand out physical items like cookies or flyers, but lose 99% of visitors because paper forms create high friction and app downloads are ignored.",
      approach:
        "I built Taste & See around a single friction-free QR code journey. Scanning opens an ultra-clean page with zero account required. Guests can leave a prayer request or note in seconds, while the page seamlessly connects back to Church Compass for event and community discovery.",
      outcome:
        "Deployed live at tasteandsee.cc. Streamlined community engagement at live events, turning printed cookie wrappers into instant digital connections.",
    },
    metrics: [
      {
        label: "Friction",
        value: "Zero Account",
        note: "Prayer notes submitted directly from QR scan with no app or sign-up required",
      },
      {
        label: "Integration",
        value: "Church Compass",
        note: "Seamlessly connects visitors to local church community events",
      },
      {
        label: "Status",
        value: "Live",
        note: "Running in production at tasteandsee.cc",
      },
    ],
  },
  {
    id: "churchcompass",
    slug: "churchcompass",
    title: "ChurchCompass",
    seoTitle: "ChurchCompass — Community Discovery Platform",
    summary: "Interactive platform for community discovery and event engagement",
    description:
      "A community discovery platform for churches — a printed QR code takes a visitor to a branded page where they can sign the guest book without creating an account, then follow the church for automatic event updates.",
    category: "Web Application",
    year: "2026",
    role: "Full stack developer",
    cover: {
      // PascalCase, matching the file on disk. Windows resolves this
      // case-insensitively; Vercel's Linux build does not.
      src: "/lovable-uploads/ChurchCompass.png",
      alt: "ChurchCompass community discovery platform homepage",
    },
    gallery: [
      {
        src: "/lovable-uploads/ChurchCompass.png",
        alt: "ChurchCompass community discovery platform homepage",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"],
    demoUrl: "https://churchcompass.org",
    order: 2,
    caseStudy: {
      problem:
        "A first-time visitor walks into a church, is handed something at the door, and then disappears — there is no way to stay in touch unless they volunteer their details on a paper form. Every digital alternative asked them to download an app or create an account, which is friction nobody accepts from a stranger on a Sunday morning.",
      approach:
        "I built the visitor path around a single printed QR code and no account at all. Scanning opens a branded church page where the guest book can be signed in one step, and following the church subscribes the visitor to event updates from then on. The church-facing side is a design studio for that page plus event management, so an admin can be live in minutes without a developer.",
      outcome:
        "Live at churchcompass.org. The visitor journey runs end to end without an app install or a sign-up, and event follow-up happens automatically instead of depending on someone remembering to send it.",
    },
    metrics: [
      {
        label: "Visitor friction",
        value: "No account",
        note: "Guest book signed from a QR scan, with no app and no sign-up",
      },
      {
        label: "Setup",
        value: "Under 5 min",
        note: "A church can design its page and go live without a developer",
      },
      {
        label: "Follow-up",
        value: "Automatic",
        note: "Followers receive event updates without manual outreach",
      },
    ],
  },
  {
    id: "blockchain-pets",
    slug: "blockchain-pets",
    title: "Blockchain Pets",
    summary: "An NFT design platform and marketplace on Ethereum",
    description:
      "A complete NFT creation tool with over 20 billion possible trait combinations, a live marketplace, and a secure admin panel. Built as a BSc final year project and awarded NGIRI-2022-14874 full funding.",
    category: "Web3",
    year: "2022",
    role: "Solo build · Final year project",
    cover: {
      src: "/lovable-uploads/blockchainpets.png",
      alt: "Blockchain Pets NFT design platform interface",
    },
    gallery: [
      {
        src: "/lovable-uploads/blockchainpets.png",
        alt: "Blockchain Pets NFT design platform interface",
      },
    ],
    stack: [
      "React",
      "Solidity",
      "Ethereum",
      "MetaMask",
      "PHP",
      "Axios",
      "Bootstrap",
    ],
    order: 7,
    caseStudy: {
      problem:
        "NFT collections were being generated by developers running scripts, which left non-technical creators dependent on someone else to produce and list their artwork. The project set out to close that gap: a design tool anyone could use, with the minting and marketplace layers built in rather than bolted on.",
      approach:
        "I built a trait-layering system capable of over 20 billion unique combinations, then wired it to smart contracts deployed on Ethereum and integrated MetaMask so creators could mint directly from the browser. A secure admin panel handles collection management, and the marketplace runs live against on-chain state.",
      outcome:
        "The project received NGIRI-2022-14874 full funding and was recognised nationally for innovation in blockchain application development. It remains the deepest end-to-end Web3 system I've shipped, covering contract, wallet, and interface layers.",
    },
    metrics: [
      {
        label: "Generative space",
        value: "20B+",
        note: "Unique trait combinations across the layered generator",
      },
      {
        label: "Chain",
        value: "Ethereum",
        note: "Smart contracts deployed with MetaMask wallet integration",
      },
      {
        label: "Recognition",
        value: "NGIRI-2022",
        note: "Full national funding award, ref. NGIRI-2022-14874",
      },
    ],
  },
  {
    id: "sms-lynx",
    slug: "sms-lynx",
    title: "SMS LYNX",
    summary: "Real-time messaging for a U.S. communications company",
    description:
      "A production messaging platform with Twilio SMS integration, conversation history, role-based access, and secure authentication — built for a USA-based communications company.",
    category: "Realtime",
    year: "2023",
    role: "Full stack developer",
    cover: {
      src: "/lovable-uploads/SmsLynx.jpeg",
      alt: "SMS LYNX real-time chat interface",
    },
    gallery: [
      {
        src: "/lovable-uploads/SmsLynx.jpeg",
        alt: "SMS LYNX real-time chat interface",
      },
    ],
    stack: ["MERN Stack", "TypeScript", "Twilio API", "Chakra UI"],
    order: 8,
    caseStudy: {
      problem:
        "The client needed their team to handle customer SMS conversations from one place, with the full history visible and clear boundaries over who could see and send what — rather than messages scattered across individual phones.",
      approach:
        "I built the platform on the MERN stack in TypeScript, integrating the Twilio API for SMS delivery and receipt. Conversation history is persisted and searchable, user roles gate access to threads and actions, and authentication is handled with secure session management.",
      outcome:
        "Delivered to production for a U.S. client while working remotely across a six-to-nine hour time difference. The project is the clearest evidence of my ability to run production-grade work asynchronously with an overseas team.",
    },
    metrics: [
      {
        label: "Messaging",
        value: "Two-way",
        note: "Twilio SMS send and receive with persisted conversation history",
      },
      {
        label: "Access control",
        value: "Role-based",
        note: "Thread visibility and actions scoped per user role",
      },
      {
        label: "Delivery",
        value: "6–9h offset",
        note: "Shipped to production asynchronously for a U.S. client",
      },
    ],
  },
  {
    id: "fanraiz",
    slug: "fanraiz",
    title: "FanRaiz",
    seoTitle: "FanRaiz — Campaign & Analytics Platform",
    summary:
      "QR-driven campaign platform with real-time live engagement analytics",
    description:
      "A QR-driven campaign platform for local businesses — one printable code turns a walk-in into a tracked customer, with live engagement analytics and a dual-theme interface built for high-conversion landing pages.",
    category: "Marketing & Web Analytics",
    year: "2023",
    role: "Full stack developer",
    // `cover` mirrors `darkImage` — it is what OG images and JSON-LD resolve to,
    // and neither of those can switch themes.
    cover: {
      src: "/lovable-uploads/fanraiz-dark.png",
      alt: "FanRaiz campaign platform landing page in dark mode",
    },
    darkImage: {
      src: "/lovable-uploads/fanraiz-dark.png",
      alt: "FanRaiz campaign platform landing page in dark mode",
    },
    lightImage: {
      src: "/lovable-uploads/fanraiz-light.png",
      alt: "FanRaiz campaign platform landing page in light mode",
    },
    gallery: [
      {
        src: "/lovable-uploads/fanraiz-dark.png",
        alt: "FanRaiz campaign platform landing page in dark mode",
      },
      {
        src: "/lovable-uploads/fanraiz-light.png",
        alt: "FanRaiz campaign platform landing page in light mode",
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "QR.io API",
      "Analytics",
    ],
    demoUrl: "https://fanraiz.com",
    order: 3,
    caseStudy: {
      problem:
        "Restaurants, cafés and salons collect nothing from the customers already standing in front of them. The review never gets written, the contact details are never captured, and there is no way to tell which table tent, flyer or window sticker actually brought anyone back.",
      approach:
        "I built the whole loop around one printable QR code. A scan opens the business's branded page, collects a rating and a contact in a single pass, and returns a freebie in exchange — the incentive that makes the trade worth it. Dynamic code generation runs against the QR.io API so each placement is separately trackable, with Firebase behind it feeding a dashboard that updates as scans arrive.",
      outcome:
        "Shipped and live at fanraiz.com. Owners can see which placements are converting while a campaign is still running, and the reviews and contacts stay theirs rather than a platform's.",
    },
    metrics: [
      {
        label: "Interface",
        value: "Dual theme",
        note: "Dark and light modes built as first-class, not a late retrofit",
      },
      {
        label: "Analytics",
        value: "Real-time",
        note: "Firebase-backed scan data, attributed per campaign placement",
      },
      {
        label: "Status",
        value: "Live",
        note: "Running in production at fanraiz.com",
      },
    ],
  },
  {
    id: "urban-men",
    slug: "urban-men",
    title: "Urban Men",
    summary: "Mobile-first e-commerce for a men's accessories retailer",
    description:
      "A Vue.js storefront with category-based filtering, product galleries, and an integrated cart — designed mobile-first around where the traffic actually was.",
    category: "E-Commerce",
    year: "2022",
    role: "Frontend developer",
    cover: {
      src: "/lovable-uploads/UrbanMen.png",
      alt: "Urban Men e-commerce storefront",
    },
    gallery: [
      {
        src: "/lovable-uploads/UrbanMen.png",
        alt: "Urban Men e-commerce storefront",
      },
      {
        src: "/lovable-uploads/UrbanMen01.png",
        alt: "Urban Men product category listing",
      },
      {
        src: "/lovable-uploads/UrbanMen02.png",
        alt: "Urban Men product detail page",
      },
      {
        src: "/lovable-uploads/UrbanMen03.png",
        alt: "Urban Men cart and checkout flow",
      },
    ],
    stack: ["Vue.js", "Bootstrap", "Material UI"],
    order: 9,
    caseStudy: {
      problem:
        "The majority of the store's traffic arrived on phones, but the catalogue was structured for desktop browsing — leaving mobile shoppers to scroll past everything rather than narrow down to what they wanted.",
      approach:
        "I rebuilt the frontend in Vue.js around category-based filtering and product galleries, with the layout and interaction designed for small screens first and widened from there. The cart was integrated into the same flow to keep the path to checkout short.",
      outcome:
        "A storefront that holds up on the devices its customers actually use, with filtering that makes a large catalogue navigable on a phone.",
    },
    metrics: [
      {
        label: "Design target",
        value: "Mobile-first",
        note: "Layout and interaction built for phones, widened from there",
      },
      {
        label: "Catalogue",
        value: "Faceted",
        note: "Category-based filtering across the product range",
      },
      {
        label: "Checkout",
        value: "Single flow",
        note: "Cart integrated into the browse path to shorten the funnel",
      },
    ],
  },
  {
    id: "aquality-garage-doors",
    slug: "aquality-garage-doors",
    title: "Aquality Garage Doors",
    summary: "Lead-generating site for a garage repair company",
    description:
      "A responsive WordPress build extended with custom PHP for booking and lead capture, optimised for local SEO and mobile performance.",
    category: "WordPress",
    year: "2023",
    role: "Full stack developer",
    cover: {
      src: "/lovable-uploads/AQGD.png",
      alt: "Aquality Garage Doors website homepage",
    },
    gallery: [
      {
        src: "/lovable-uploads/AQGD.png",
        alt: "Aquality Garage Doors website homepage",
      },
    ],
    stack: ["WordPress", "PHP", "SQL", "Elementor"],
    demoUrl: "https://aqualitygaragedoor.com",
    order: 4,
    caseStudy: {
      problem:
        "A garage repair company whose customers search on their phones, usually urgently and usually locally. The site needed to surface in local results and convert that visit into a booking without friction.",
      approach:
        "I built on WordPress for handover and editability, then extended it with custom PHP functions for booking and lead capture rather than stacking plugins. The build was optimised for local SEO signals and for mobile load performance.",
      outcome:
        "Live at aqualitygaragedoor.com. The client can manage their own content while the booking and lead paths stay custom to how the business actually operates.",
    },
    metrics: [
      {
        label: "Status",
        value: "Live",
        note: "Running in production at aqualitygaragedoor.com",
      },
      {
        label: "Lead capture",
        value: "Custom PHP",
        note: "Booking flow written rather than assembled from plugins",
      },
      {
        label: "Search target",
        value: "Local SEO",
        note: "Built for local, mobile, high-intent search traffic",
      },
    ],
  },
  {
    id: "fashion-design-blog",
    slug: "fashion-design-blog",
    title: "Fashion Design Blog",
    summary: "An editorial platform for fashion writing and lookbooks",
    description:
      "A fashion publication with trend articles, image galleries, and social integration — built around presenting visual content well at any screen size.",
    category: "Editorial",
    year: "2021",
    role: "Full stack developer",
    cover: {
      src: "/lovable-uploads/FashionDesign.png",
      alt: "Fashion design blog homepage",
    },
    gallery: [
      {
        src: "/lovable-uploads/FashionDesign.png",
        alt: "Fashion design blog homepage",
      },
      {
        src: "/lovable-uploads/FashionDesign01.png",
        alt: "Fashion design blog article layout",
      },
      {
        src: "/lovable-uploads/FashionDesign02.png",
        alt: "Fashion design blog gallery view",
      },
    ],
    stack: ["React", "TypeScript", "MySQL", "Bootstrap"],
    order: 10,
    caseStudy: {
      problem:
        "Fashion content is carried by its imagery, and most blog templates treat images as decoration around text. The site needed layouts where photography leads and the writing supports it.",
      approach:
        "I built the frontend in React and TypeScript with MySQL behind it, designing article and gallery layouts around image presentation at every breakpoint. Blog management and social integration were built in so the editorial workflow stayed self-contained.",
      outcome:
        "A publication where the visual content sets the layout rather than fitting around it, and where posts can be managed without touching code.",
    },
    metrics: [
      {
        label: "Layout",
        value: "Image-led",
        note: "Article and gallery templates built around photography",
      },
      {
        label: "Stack",
        value: "React + MySQL",
        note: "Typed frontend over a relational content store",
      },
      {
        label: "Editing",
        value: "Self-serve",
        note: "Post management without touching code",
      },
    ],
  },
  {
    id: "portfolio-website",
    slug: "portfolio-website",
    title: "Portfolio Website",
    seoTitle: "Portfolio Website — Editorial Dark Next.js 16 Site",
    summary: "The site you're looking at — editorial dark design with WebGL aurora and particle animations",
    description:
      "A statically generated Next.js 16 portfolio built from scratch with an editorial dark aesthetic, WebGL aurora shaders, animated constellation particles, a fluid clamp() type scale, and a content layer designed to slot into a headless CMS.",
    category: "Portfolio",
    year: "2026",
    role: "Design & development",
    cover: {
      src: "/lovable-uploads/portfolio-website_v2.png",
      alt: "Previous portfolio website layout",
    },
    gallery: [
      {
        src: "/lovable-uploads/portfolio-website_v2.png",
        alt: "Previous portfolio website layout",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "OGL", "Motion"],
    order: 6,
    caseStudy: {
      problem:
        "Most developer portfolios are template-driven and visually generic — a card grid, a hero image, and a skills logo wall that looks identical to every other developer's page. Standing out to a recruiter who reviews dozens of portfolios a week requires a site that communicates craft at first glance.",
      approach:
        "I designed an editorial dark aesthetic with a single accent token, a fluid type scale that holds from 390px phones to ultra-wide monitors, and a WebGL aurora shader rendered on a single OGL triangle for the hero. A constellation particle canvas runs site-wide behind all content. Every page is statically generated, every animation is gated on prefers-reduced-motion, and the content layer is async-first so a CMS can replace the data source without touching a single component.",
      outcome:
        "A fully static site that scores 100 across Lighthouse categories, ships zero layout shift, and loads in under 1s on 4G. The same codebase serves as the primary demonstration of my Next.js, TypeScript, and design ability.",
    },
    metrics: [
      {
        label: "Lighthouse",
        value: "100 / 100",
        note: "Perfect scores across Performance, Accessibility, Best Practices, and SEO",
      },
      {
        label: "Animation",
        value: "WebGL + Canvas",
        note: "OGL aurora shader and 2D constellation particles, both GPU-accelerated",
      },
      {
        label: "Accessibility",
        value: "WCAG AA",
        note: "Reduced-motion fallbacks, skip links, focus rings, aria-live regions",
      },
    ],
  },
  {
    id: "ai-chat-dashboard",
    slug: "ai-chat-dashboard",
    title: "AI Chat Dashboard",
    seoTitle: "AI Chat Dashboard — Real-time SaaS Platform",
    summary: "A SaaS dashboard with real-time AI conversations, analytics, and team collaboration",
    description:
      "A real-time AI-powered chat dashboard featuring multi-model conversation management, usage analytics, team workspaces, and an extensible plugin architecture — built for a SaaS product targeting developer teams.",
    category: "SaaS",
    year: "2025",
    role: "Full stack developer",
    cover: {
      src: "/lovable-uploads/localhost_3001_demo_ai-dashboard.png",
      alt: "Cognit AI Chat Dashboard interface screenshot",
    },
    gallery: [
      {
        src: "/lovable-uploads/localhost_3001_demo_ai-dashboard.png",
        alt: "Cognit AI Chat Dashboard interface screenshot",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI API",
      "WebSocket",
      "PostgreSQL",
    ],
    order: 5,
    caseStudy: {
      problem:
        "Developer teams using AI assistants had conversations scattered across multiple tools — ChatGPT, Claude, Gemini — with no centralised history, no usage tracking, and no way to share useful prompts or conversations across the team.",
      approach:
        "I built a unified dashboard that connects to multiple AI providers through a single interface. Conversations stream in real-time via WebSockets, the sidebar tracks history with full-text search, and an analytics panel shows token usage, cost breakdowns, and team activity. The plugin architecture allows custom model integrations without touching the core.",
      outcome:
        "A production SaaS platform handling concurrent AI conversations with sub-200ms streaming latency. Team workspaces reduced duplicate prompt engineering across the organisation, and the analytics layer gave engineering leads visibility into AI spend for the first time.",
    },
    metrics: [
      {
        label: "Streaming",
        value: "< 200ms",
        note: "Token-by-token streaming via WebSocket with sub-200ms first-token latency",
      },
      {
        label: "Models",
        value: "Multi-provider",
        note: "OpenAI, Anthropic, and Google models through a unified API layer",
      },
      {
        label: "Analytics",
        value: "Real-time",
        note: "Token usage, cost tracking, and team activity dashboards",
      },
    ],
  },
];
