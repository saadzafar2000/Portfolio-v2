import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  User,
  Code2,
  Brain,
  Mail,
  Menu,
  X,
  Briefcase,
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "#", label: "Home", icon: User },
    { href: "#about", label: "About Me", icon: User },
    { href: "#experience", label: "Experience", icon: Briefcase },
    { href: "#projects", label: "Projects", icon: Code2 },
    { href: "#technologies", label: "Skills", icon: Brain },
  ];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo with glowing effect */}
          <a href="#" className="relative group flex items-center justify-center">
            {/* Full logo glow effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-900 rounded-xl blur-2xl opacity-60 group-hover:opacity-90 transition-all duration-500"></div>
            </div>
            <img 
              src="/lovable-uploads/30f446db-e785-437c-9e74-cb7e2905180a.png" 
              alt="SZ Logo - Saad Zafar" 
              className="h-14 w-14 relative z-10 group-hover:scale-110 transition-transform duration-300" 
            />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            {/* Main Navigation */}
            <div className="flex px-8 py-2 bg-transparent rounded-full">
              <div className="flex space-x-8 items-center justify-center">
                {navItems.map((item) => (
                  <IslandNavLink key={item.href} href={item.href}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </IslandNavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Button
              className="px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
              asChild
            >
              <a href="#contact">
                <span className="relative flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </span>
              </a>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2 rounded-lg bg-gray-900/30 backdrop-blur-sm border border-white/10 hover:bg-gray-900/50 transition-all duration-300 group"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <motion.div
            className="absolute top-20 left-4 right-4 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Menu Header */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Navigation</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <MobileNavLink 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    icon={<item.icon className="w-5 h-5" />}
                  >
                    {item.label}
                  </MobileNavLink>
                </motion.div>
              ))}
              
              {/* Contact Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                className="px-4 py-3"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
};

const IslandNavLink = ({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode;
}) => {
  return (
    <a 
      href={href} 
      className="relative px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 group flex items-center"
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 opacity-0 group-hover:opacity-100 rounded-full blur-sm transition-all duration-300"></span>
      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
    </a>
  );
};

const MobileNavLink = ({ 
  href, 
  children,
  onClick,
  icon
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
}) => (
  <a 
    href={href} 
    onClick={onClick}
    className="group flex items-center gap-3 px-6 py-4 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
  >
    {/* Hover effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
    
    {/* Icon */}
    <div className="relative z-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
      {icon}
    </div>
    
    {/* Text */}
    <span className="relative z-10 font-medium group-hover:translate-x-1 transition-transform duration-300">
      {children}
    </span>
    
    {/* Arrow indicator */}
    <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </a>
);

export default Navbar;
