import { motion } from "framer-motion";
import React from "react";

const techGroups = [
  {
    label: "Languages",
    items: [
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        docs: "https://developer.mozilla.org/docs/Web/JavaScript",
        isDark: false,
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        docs: "https://www.typescriptlang.org/docs/",
        isDark: false,
      },
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        docs: "https://docs.python.org/3/",
        isDark: false,
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        docs: "https://docs.oracle.com/en/java/",
        isDark: false,
      },
      {
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        docs: "https://isocpp.org/std/the-standard",
        isDark: false,
      },
      {
        name: "C#",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        docs: "https://docs.microsoft.com/en-us/dotnet/csharp/",
        isDark: false,
      },
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        docs: "https://developer.mozilla.org/docs/Web/HTML",
        isDark: false,
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        docs: "https://developer.mozilla.org/docs/Web/CSS",
        isDark: false,
      },
    ],
  },
  {
    label: "Frontend",
    items: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        docs: "https://react.dev/",
        isDark: false,
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        docs: "https://nextjs.org/docs",
        isDark: true,
      },
      {
        name: "Angular",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        docs: "https://angular.io/docs",
        isDark: false,
      },
      {
        name: "Tailwind CSS",
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
        docs: "https://tailwindcss.com/docs",
        isDark: false,
      },
      {
        name: "Redux",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        docs: "https://redux.js.org/",
        isDark: false,
      },
      {
        name: "Bootstrap",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        docs: "https://getbootstrap.com/",
        isDark: false,
      },
      {
        name: "Material UI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
        docs: "https://mui.com/",
        isDark: false,
      },
      {
        name: "jQuery",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
        docs: "https://api.jquery.com/",
        isDark: false,
      },
    ],
  },
  {
    label: "Backend",
    items: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        docs: "https://nodejs.org/en/docs",
        isDark: false,
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        docs: "https://expressjs.com/",
        isDark: true,
      },
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        docs: "https://www.php.net/docs.php",
        isDark: false,
      },
      {
        name: "Django",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        docs: "https://docs.djangoproject.com/",
        isDark: true,
      },
      {
        name: "TensorFlow",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        docs: "https://www.tensorflow.org/learn",
        isDark: false,
      },
      {
        name: "FastAPI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        docs: "https://fastapi.tiangolo.com/",
        isDark: false,
      },
      {
        name: "GraphQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        docs: "https://graphql.org/learn/",
        isDark: false,
      },
      {
        name: "REST",
        icon: "https://img.icons8.com/ios/50/ffffff/api.png",
        docs: "https://restfulapi.net/",
        isDark: false,
      },
    ],
  },
  {
    label: "Database",
    items: [
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        docs: "https://www.mongodb.com/docs/",
        isDark: false,
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        docs: "https://www.postgresql.org/docs/",
        isDark: false,
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        docs: "https://dev.mysql.com/doc/",
        isDark: false,
      },
      {
        name: "SQLite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
        docs: "https://www.sqlite.org/docs.html",
        isDark: false,
      },
      {
        name: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        docs: "https://redis.io/docs/",
        isDark: false,
      },
      {
        name: "Supabase",
        icon: "https://avatars.githubusercontent.com/u/54469796?s=200&v=4",
        docs: "https://supabase.com/docs",
        isDark: false,
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        docs: "https://firebase.google.com/docs",
        isDark: false,
      },
    ],
  },
  {
    label: "DevOps & Cloud",
    items: [
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        docs: "https://docs.docker.com/",
        isDark: false,
      },
      {
        name: "AWS",
        icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        docs: "https://docs.aws.amazon.com/",
        isDark: true,
      },
      {
        name: "Azure",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        docs: "https://docs.microsoft.com/en-us/azure/",
        isDark: false,
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        docs: "https://git-scm.com/doc",
        isDark: false,
      },
      {
        name: "Vercel",
        icon: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
        docs: "https://vercel.com/docs",
        isDark: true,
      },
      {
        name: "Netlify",
        icon: "https://www.netlify.com/v3/img/components/logomark.png",
        docs: "https://docs.netlify.com/",
        isDark: false,
      },
      {
        name: "Jenkins",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
        docs: "https://www.jenkins.io/doc/",
        isDark: false,
      },
      {
        name: "Linux",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        docs: "https://www.kernel.org/doc/html/latest/",
        isDark: true,
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
    },
  },
};

const Technologies = () => {
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>(
    {}
  );

  const handleImageError = (techName: string) => {
    setImageErrors((prev) => ({ ...prev, [techName]: true }));
  };

  return (
    <section id="technologies" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="section-title">Technologies I Work With</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Cutting-edge tools and frameworks for building the future
        </p>
      </motion.div>
      <div className="w-full max-w-7xl mx-auto">
        {/* Mobile: Clean grid layout per category */}
        <div className="block sm:hidden space-y-10">
          {techGroups.map((group, groupIndex) => (
            <motion.div 
              key={group.label} 
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                {group.label}
              </h3>
              <motion.div
                className="grid grid-cols-4 gap-3 px-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {group.items.map((tech, index) => (
                  <motion.a
                    key={tech.name}
                    href={tech.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center group no-underline"
                    variants={itemVariants}
                    whileTap={{ scale: 0.95 }}
                    custom={index}
                  >
                    <div className="relative p-2 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.08)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 w-12 h-12 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      {!imageErrors[tech.name] ? (
                        <div
                          className={`w-7 h-7 flex items-center justify-center rounded-lg relative z-10 ${
                            tech.isDark ? "bg-white/90 p-0.5" : ""
                          }`}
                        >
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className={`w-full h-full object-contain filter transition-all duration-300 ${
                              tech.isDark
                                ? "drop-shadow-none"
                                : "drop-shadow-[0_0_6px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            }`}
                            onError={() => handleImageError(tech.name)}
                          />
                        </div>
                      ) : (
                        <div className="w-7 h-7 flex items-center justify-center border-2 border-blue-500/40 rounded-lg bg-black/30 text-blue-400 font-bold text-xs z-10">
                          {tech.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="mt-2 text-xs text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-center leading-tight">
                      {tech.name}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tablet: 2 columns */}
        <div className="hidden sm:block lg:hidden">
          <div className="grid grid-cols-1 gap-y-12">
            {techGroups.map((group, groupIndex) => (
              <motion.div 
                key={group.label} 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  {group.label}
                </h3>
                <motion.div
                  className="grid grid-cols-4 gap-6 max-w-md"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {group.items.map((tech) => (
                    <motion.a
                      key={tech.name}
                      href={tech.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center group no-underline"
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <div className="relative p-2 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.08)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 w-14 h-14 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100"></div>
                        {!imageErrors[tech.name] ? (
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-lg relative z-10 ${
                              tech.isDark ? "bg-white/90 p-1" : ""
                            }`}
                          >
                            <motion.img
                              src={tech.icon}
                              alt={tech.name}
                              className={`w-full h-full object-contain filter transition-all duration-300 ${
                                tech.isDark
                                  ? "drop-shadow-none"
                                  : "drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                              }`}
                              onError={() => handleImageError(tech.name)}
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center border-2 border-blue-500/40 rounded-lg bg-black/30 text-blue-400 font-bold text-sm z-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300">
                            {tech.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <motion.span
                        className="mt-2 text-xs text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-center"
                      >
                        {tech.name}
                      </motion.span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: 5 columns */}
        <div className="hidden lg:grid grid-cols-5 gap-y-16 gap-x-12">
          {techGroups.map((group) => (
            <div key={group.label} className="flex flex-col items-center h-full">
              <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                {group.label}
              </h3>
              <motion.div
                className="grid grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {group.items.map((tech) => (
                  <motion.a
                    key={tech.name}
                    href={tech.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center group no-underline"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.08,
                      rotateY: 5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <div className="relative p-2 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.08)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100"></div>
                      {!imageErrors[tech.name] ? (
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-lg relative z-10 ${
                            tech.isDark ? "bg-white/90 p-1" : ""
                          }`}
                        >
                          <motion.img
                            src={tech.icon}
                            alt={tech.name}
                            className={`w-full h-full object-contain filter transition-all duration-300 ${
                              tech.isDark
                                ? "drop-shadow-none"
                                : "drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            onError={() => handleImageError(tech.name)}
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center border-2 border-blue-500/40 rounded-lg bg-black/30 text-blue-400 font-bold text-lg z-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300">
                          {tech.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <motion.span
                      className="mt-1 text-xs text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech.name}
                    </motion.span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
