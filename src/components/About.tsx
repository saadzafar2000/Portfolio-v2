import { Card, CardContent } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  type: 'education' | 'experience' | 'award';
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: "2024 - Present",
    title: "MSc in High Integrity Systems, Frankfurt University of Applied Sciences",
    description: "Expanding expertise in secure and reliable software architectures, aligning technical abilities with the evolving needs of industry-grade, safety-critical systems.",
    type: "education"
  },
  {
    id: 2,
    year: "2020 - 2024",
    title: "BSc in Software Engineering",
    description: "Graduated with distinction. Final year project 'Blockchain Pets' - a complete NFT design and marketplace platform built with Web3 technologies.",
    type: "education"
  }
];

const About = () => {
  return (
    <section id="about" className="section-container">
      <h2 className="section-title">About Me</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
        {/* Bio */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="h-full glass-card rounded-xl border-muted">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">About Muhammad Saad Zafar</h3>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <p className="text-muted-foreground">
                  I'm a passionate <span className="font-semibold text-blue-400">Full Stack Developer</span> currently based in Frankfurt, Germany, with over 4 years of professional experience crafting innovative digital products for diverse industries and clients—including U.S.-based businesses.
                </p>
                <p className="text-muted-foreground">
                  My journey began with a BSc in Software Engineering, culminating in a fully funded, award-winning final year project—<span className="font-semibold text-blue-400">Blockchain Pets</span>—a complete NFT design and marketplace platform built with Web3 technologies.
                </p>
                <p className="text-muted-foreground">
                  From real-time chat systems to QR-code-based marketing tools and e-commerce platforms, my development experience spans both <span className="font-semibold text-blue-400">frontend and backend technologies</span> using the MERN stack, Vue.js, and TypeScript.
                </p>
                <p className="text-muted-foreground">
                  What sets me apart: <span className="font-semibold text-blue-400">Hands-on Blockchain development</span>, international experience with USA clients, academic excellence, and passion for cutting-edge tech.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Timeline */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Education</h3>
          </div>
          <div className="relative">
            <div className="absolute left-2.5 sm:left-3 top-5 bottom-5 w-0.5 sm:w-1 bg-gradient-to-b from-blue-400 to-purple-500 shadow-lg rounded-full"></div>
            
            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {timelineData.map((item, idx) => (
                <div key={item.id} className="relative pl-10 sm:pl-16 flex items-start group">
                  <div className="absolute left-0 top-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-background z-10 shadow-lg group-hover:scale-110 transition">
                  </div>
                  <Card className="glass-card rounded-xl border-muted shadow-xl group-hover:border-blue-400 transition-all w-full">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                        {item.year}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">{item.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line mb-3">
                        {item.description}
                      </p>
                      {item.id === 2 && (
                        <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-medium text-blue-300">
                            NGIRI-2022-14874 Funding Award
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkIcon = () => (
  <svg 
    className="w-5 h-5 text-white" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
    />
  </svg>
);

const GraduationIcon = () => (
  <svg 
    className="w-5 h-5 text-white" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19.916 4.626a.75.75 0 01-.025 1.042l-7.25 6.5a.75.75 0 01-1 0l-7.25-6.5a.75.75 0 011.025-1.042L12 10.168l6.591-5.584a.75.75 0 01.975.042z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M3.75 5.25h1.5M20.25 5.25h-1.5M3.75 18.75h1.5M20.25 18.75h-1.5M9 18.75v-4.5M12 18.75v-4.5M15 18.75v-4.5M1.5 12.75h21" 
    />
  </svg>
);

const AwardIcon = () => (
  <svg 
    className="w-5 h-5 text-white" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
    />
  </svg>
);

export default About;
