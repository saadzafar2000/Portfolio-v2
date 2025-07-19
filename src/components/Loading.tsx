import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingProps {
  onLoadingComplete: () => void;
}

const Loading = ({ onLoadingComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after a brief delay
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 500);

    // Animate progress bar
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          // Complete loading after a brief pause
          setTimeout(() => {
            onLoadingComplete();
          }, 800);
          return 100;
        }
        // Simulate realistic loading with variable speed
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => {
      clearTimeout(textTimer);
      clearInterval(progressTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative mx-auto w-24 h-24 mb-6">
            {/* Outer glow ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full animate-ping"></div>

            {/* Logo container */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <img 
                src="/lovable-uploads/30f446db-e785-437c-9e74-cb7e2905180a.png" 
                alt="SZ Logo - Saad Zafar" 
                className="w-20 h-20 object-contain filter drop-shadow-2xl" 
              />
            </div>
          </div>
        </motion.div>

        {/* Name and Title */}
        {showText && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 text-transparent bg-clip-text animate-pulse">
                Muhammad Saad Zafar
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-gray-300 font-medium"
            >
              Full Stack Developer
            </motion.p>
          </motion.div>
        )}

        {/* Loading Bar Container */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative max-w-md mx-auto"
        >
          {/* Loading Bar Background */}
          <div className="w-full h-2 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-700/30 overflow-hidden">
            {/* Animated Loading Bar */}
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-full relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-500/50 blur-sm"></div>
            </motion.div>
          </div>

          {/* Progress Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-center"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <p className="text-gray-400 text-sm animate-pulse">
            Loading portfolio...
          </p>
        </motion.div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
