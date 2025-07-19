import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  keyAchievements: string[];
  isLeft: boolean;
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "InteractBPO",
    location: "Rawalpindi, Pakistan",
    duration: "Aug 2022 – Oct 2023",
    isLeft: true,
    description: "Developed and maintained multiple production-grade web applications for USA-based clients, collaborating remotely across time zones.",
    keyAchievements: [
      "Built scalable web applications using MERN stack, React, and Vue.js",
      "Integrated third-party APIs including Twilio, Firebase, and QR.io",
      "Collaborated with international teams across different time zones",
      "Delivered 6+ production-ready applications for U.S. market",
      "Implemented responsive designs with modern UI frameworks",
      "Customized WordPress solutions with advanced PHP functionality"
    ]
  },
  {
    id: 2,
    title: "Front End Developer",
    company: "Cartel International",
    location: "Rawalpindi, Pakistan",
    duration: "Jan 2020 – Aug 2022",
    isLeft: false,
    description: "Designed and developed dynamic user interfaces using React, Bootstrap, and jQuery, enhancing site responsiveness and engagement.",
    keyAchievements: [
      "Created responsive web interfaces using React and modern CSS frameworks",
      "Developed interactive applications with persistent data storage",
      "Integrated external APIs for weather data and other services",
      "Built portfolio and showcase websites for professional networking",
      "Implemented user authentication and local storage solutions",
      "Designed landing pages optimized for conversion and user experience"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="section-title">
          💼 Work Experience
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Professional journey building innovative solutions for global clients
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Mobile/Tablet: Single column layout */}
        <div className="block lg:hidden space-y-8">
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="glass-card rounded-xl border-muted shadow-xl hover:border-blue-400 transition-all group">
                <CardContent className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-400 font-medium mb-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm sm:text-base">{experience.company}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {experience.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {experience.duration}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-sm text-blue-300">
                      {experience.description}
                    </p>
                  </div>

                  {/* Key Achievements */}
                  <div className="space-y-3">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide">Key Achievements</h4>
                    <div className="grid gap-2">
                      {experience.keyAchievements.map((achievement, achievementIndex) => (
                        <motion.div
                          key={achievementIndex}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: achievementIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {achievement}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Timeline layout */}
        <div className="hidden lg:block">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 shadow-lg rounded-full"></div>
          
          <div className="space-y-24">
            {experienceData.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: experience.isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  experience.isLeft ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-4 border-background z-10 shadow-lg"></div>
                
                {/* Experience Card */}
                <div className={`w-5/12 ${experience.isLeft ? 'pr-8' : 'pl-8'}`}>
                  <Card className="glass-card rounded-xl border-muted shadow-xl hover:border-blue-400 transition-all group">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                          {experience.title}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-400 font-medium mb-1">
                          <Briefcase className="w-4 h-4" />
                          {experience.company}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {experience.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {experience.duration}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-sm text-blue-300">
                          {experience.description}
                        </p>
                      </div>

                      {/* Key Achievements */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Key Achievements</h4>
                        {experience.keyAchievements.map((achievement, achievementIndex) => (
                          <motion.div
                            key={achievementIndex}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: achievementIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {achievement}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Branch Line */}
                <div className={`absolute top-1/2 w-8 h-0.5 bg-gradient-to-r ${
                  experience.isLeft 
                    ? 'right-1/2 from-blue-400 to-transparent' 
                    : 'left-1/2 from-transparent to-blue-400'
                }`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;