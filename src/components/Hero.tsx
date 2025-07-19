import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedText from "./AnimatedText";
import {
  Github,
  Linkedin,
  Eye,
  FileText,
  X,
  Download,
  Mail,
} from "lucide-react";

const Hero = () => {
  const handleResumeView = () => {
    window.open("/Saad_Full_Stack.pdf", "_blank");
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Saad_Full_Stack.pdf";
    link.download = "Muhammad_Saad_Zafar_Resume.pdf";
    link.click();
  };

  const handleContactClick = () => {
    window.location.href = "mailto:msaadzafar2000@gmail.com";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-36 px-4 sm:px-6">
      <div className="container mx-auto z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block">Hi, I'm Muhammad Saad Zafar</span>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Full Stack Developer 
            </span>
          </motion.h1>

          <motion.h2
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="block mb-2">I specialize in</span>
            <AnimatedText
              text={[
                "Blockchain & MERN Stack development",
                "Scalable Web applications",
                "React & TypeScript solutions",
                "Web3 & Smart Contracts",
              ]}
              className="text-blue-400 font-medium"
            />
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base mb-8 sm:mb-10 text-gray-500 max-w-2xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Germany-based Full Stack Developer with proven experience delivering
            scalable, high-impact web applications for global clients, including
            projects for the U.S. market. Currently pursuing MSc in High
            Integrity Systems in Frankfurt.
          </motion.p>

          {/* Social Icons above buttons */}
          <motion.div
            className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <a
              href="https://github.com/saadzafar2000"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative p-2.5 sm:p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100"></div>
                <Github className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-saad-zafar-39017b189/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative p-2.5 sm:p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100"></div>
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </div>
            </a>
            <button onClick={handleContactClick} className="group">
              <div className="relative p-2.5 sm:p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100"></div>
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </div>
            </button>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Button className="py-4 sm:py-6 px-6 sm:px-8 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 text-sm sm:text-base">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              <a href="#projects">My Work</a>
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex-1 sm:flex-none py-4 sm:py-6 px-4 sm:px-8 border-blue-500/30 text-blue-400 hover:bg-blue-900/20 flex items-center justify-center gap-2 text-sm sm:text-base"
                onClick={handleResumeView}
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                Resume
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="py-4 sm:py-6 px-3 sm:px-3 border-blue-500/30 text-blue-400 hover:bg-blue-900/20 flex-shrink-0"
                onClick={handleResumeDownload}
                title="Download Resume"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 sm:mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="animate-bounce p-2 bg-blue-900/30 rounded-full border border-blue-500/20">
              <a href="#technologies" className="text-blue-400">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
