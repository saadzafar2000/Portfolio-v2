import type { SkillGroup } from "@/lib/types";

const devicon = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

/**
 * `icon` is carried through from the previous build. The Stack section renders
 * these typographically rather than as a logo grid, so the URLs are currently
 * unused at render time — they're kept because they're real content, and a
 * Sanity `skill` document would hold the same field.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      {
        name: "JavaScript",
        icon: devicon("javascript"),
        docs: "https://developer.mozilla.org/docs/Web/JavaScript",
        needsPlate: false,
      },
      {
        name: "TypeScript",
        icon: devicon("typescript"),
        docs: "https://www.typescriptlang.org/docs/",
        needsPlate: false,
      },
      {
        name: "Python",
        icon: devicon("python"),
        docs: "https://docs.python.org/3/",
        needsPlate: false,
      },
      {
        name: "Java",
        icon: devicon("java"),
        docs: "https://docs.oracle.com/en/java/",
        needsPlate: false,
      },
      {
        name: "C++",
        icon: devicon("cplusplus"),
        docs: "https://isocpp.org/std/the-standard",
        needsPlate: false,
      },
      {
        name: "C#",
        icon: devicon("csharp"),
        docs: "https://docs.microsoft.com/en-us/dotnet/csharp/",
        needsPlate: false,
      },
      {
        name: "HTML5",
        icon: devicon("html5"),
        docs: "https://developer.mozilla.org/docs/Web/HTML",
        needsPlate: false,
      },
      {
        name: "CSS3",
        icon: devicon("css3"),
        docs: "https://developer.mozilla.org/docs/Web/CSS",
        needsPlate: false,
      },
    ],
  },
  {
    label: "Frontend",
    items: [
      {
        name: "React",
        icon: devicon("react"),
        docs: "https://react.dev/",
        needsPlate: false,
      },
      {
        name: "Next.js",
        icon: devicon("nextjs"),
        docs: "https://nextjs.org/docs",
        needsPlate: true,
      },
      {
        name: "Angular",
        icon: devicon("angularjs"),
        docs: "https://angular.io/docs",
        needsPlate: false,
      },
      {
        name: "Tailwind CSS",
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
        docs: "https://tailwindcss.com/docs",
        needsPlate: false,
      },
      {
        name: "Redux",
        icon: devicon("redux"),
        docs: "https://redux.js.org/",
        needsPlate: false,
      },
      {
        name: "Bootstrap",
        icon: devicon("bootstrap"),
        docs: "https://getbootstrap.com/",
        needsPlate: false,
      },
      {
        name: "Material UI",
        icon: devicon("materialui"),
        docs: "https://mui.com/",
        needsPlate: false,
      },
      {
        name: "jQuery",
        icon: devicon("jquery"),
        docs: "https://api.jquery.com/",
        needsPlate: false,
      },
    ],
  },
  {
    label: "Backend",
    items: [
      {
        name: "Node.js",
        icon: devicon("nodejs"),
        docs: "https://nodejs.org/en/docs",
        needsPlate: false,
      },
      {
        name: "Express.js",
        icon: devicon("express"),
        docs: "https://expressjs.com/",
        needsPlate: true,
      },
      {
        name: "PHP",
        icon: devicon("php"),
        docs: "https://www.php.net/docs.php",
        needsPlate: false,
      },
      {
        name: "Django",
        icon: devicon("django", "plain"),
        docs: "https://docs.djangoproject.com/",
        needsPlate: true,
      },
      {
        name: "TensorFlow",
        icon: devicon("tensorflow"),
        docs: "https://www.tensorflow.org/learn",
        needsPlate: false,
      },
      {
        name: "FastAPI",
        icon: devicon("fastapi"),
        docs: "https://fastapi.tiangolo.com/",
        needsPlate: false,
      },
      {
        name: "GraphQL",
        icon: devicon("graphql", "plain"),
        docs: "https://graphql.org/learn/",
        needsPlate: false,
      },
      {
        name: "REST",
        icon: "https://img.icons8.com/ios/50/ffffff/api.png",
        docs: "https://restfulapi.net/",
        needsPlate: false,
      },
    ],
  },
  {
    label: "Database",
    items: [
      {
        name: "MongoDB",
        icon: devicon("mongodb"),
        docs: "https://www.mongodb.com/docs/",
        needsPlate: false,
      },
      {
        name: "PostgreSQL",
        icon: devicon("postgresql"),
        docs: "https://www.postgresql.org/docs/",
        needsPlate: false,
      },
      {
        name: "MySQL",
        icon: devicon("mysql"),
        docs: "https://dev.mysql.com/doc/",
        needsPlate: false,
      },
      {
        name: "SQLite",
        icon: devicon("sqlite"),
        docs: "https://www.sqlite.org/docs.html",
        needsPlate: false,
      },
      {
        name: "Redis",
        icon: devicon("redis"),
        docs: "https://redis.io/docs/",
        needsPlate: false,
      },
      {
        name: "Supabase",
        icon: "https://avatars.githubusercontent.com/u/54469796?s=200&v=4",
        docs: "https://supabase.com/docs",
        needsPlate: false,
      },
      {
        name: "Firebase",
        icon: devicon("firebase", "plain"),
        docs: "https://firebase.google.com/docs",
        needsPlate: false,
      },
    ],
  },
  {
    label: "DevOps & Cloud",
    items: [
      {
        name: "Docker",
        icon: devicon("docker"),
        docs: "https://docs.docker.com/",
        needsPlate: false,
      },
      {
        name: "AWS",
        icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        docs: "https://docs.aws.amazon.com/",
        needsPlate: true,
      },
      {
        name: "Azure",
        icon: devicon("azure"),
        docs: "https://docs.microsoft.com/en-us/azure/",
        needsPlate: false,
      },
      {
        name: "Git",
        icon: devicon("git"),
        docs: "https://git-scm.com/doc",
        needsPlate: false,
      },
      {
        name: "Vercel",
        icon: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
        docs: "https://vercel.com/docs",
        needsPlate: true,
      },
      {
        name: "Netlify",
        icon: "https://www.netlify.com/v3/img/components/logomark.png",
        docs: "https://docs.netlify.com/",
        needsPlate: false,
      },
      {
        name: "Jenkins",
        icon: devicon("jenkins"),
        docs: "https://www.jenkins.io/doc/",
        needsPlate: false,
      },
      {
        name: "Linux",
        icon: devicon("linux"),
        docs: "https://www.kernel.org/doc/html/latest/",
        needsPlate: true,
      },
    ],
  },
];
