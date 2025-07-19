import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { Project } from './ProjectCard';
import ImageModal from './ImageModal';
import GlowingEffectDemo from "./ui/glowing-effect-demo";

// Featured projects data
const projectsData: Project[] = [
  {
    id: 1,
    title: "Blockchain Pets – NFT Design Platform",
    description: "Final Year Project (BSc), awarded NGIRI-2022-14874 full funding. Built a complete NFT creation tool with 20+ billion combinations. Deployed smart contracts on Ethereum & integrated with MetaMask. Developed a secure admin panel and live marketplace. Recognized nationally for innovation in blockchain application development.",
    image: "/lovable-uploads/blockchainpets.png",
    tags: ["React", "Solidity", "MetaMask", "PHP", "Bootstrap", "Axios", "Ethereum"],
    demoUrl: undefined,
    githubUrl: undefined
  },
  {
    id: 2,
    title: "Urban Men – Men's Accessories E-Commerce",
    description: "Developed frontend with category-based filtering and product galleries. Integrated cart system and responsive UI/UX for mobile-first users. Built with Vue.js for optimal performance and user experience.",
    image: "/lovable-uploads/UrbanMen.png",
    images: ["/lovable-uploads/UrbanMen01.png", "/lovable-uploads/UrbanMen02.png", "/lovable-uploads/UrbanMen03.png"],
    tags: ["Vue.js", "Bootstrap", "Material UI"],
    demoUrl: undefined,
    githubUrl: undefined
  },
  {
    id: 3,
    title: "AqualityGarageDoors – WordPress Site",
    description: "Created a sleek, responsive site for garage repair company. Extended WordPress with custom PHP functions for booking & lead capture. Optimized for local SEO and mobile performance.",
    image: "/lovable-uploads/AQGD.png",
    tags: ["WordPress", "PHP", "SQL", "Elementor"],
    demoUrl: "https://aqualitygaragedoor.com",
    githubUrl: undefined
  },
  {
    id: 4,
    title: "SMS LYNX – Real-Time Chat for U.S. Client",
    description: "Built for a USA-based communications company. Real-time messaging with Twilio SMS integration. Implemented conversation history, user roles, and secure login. Proven ability to work across time zones and deliver production-grade apps.",
    image: "/lovable-uploads/SmsLynx.jpeg",
    images: ["/lovable-uploads/SmsLynx01.jpeg", "/lovable-uploads/SmsLynx02.jpeg", "/lovable-uploads/SmsLynx03.jpeg"],
    tags: ["MERN Stack", "TypeScript", "Chakra UI", "Twilio API"],
    demoUrl: undefined,
    githubUrl: undefined
  },
  {
    id: 5,
    title: "FanRaiz – QR-Based Marketing App",
    description: "Built a real-time QR code platform for marketing campaigns. Designed for event-based client targeting and engagement tracking. Features dynamic QR generation and comprehensive analytics dashboard.",
    image: "/lovable-uploads/Fanraiz.png",
    images: ["/lovable-uploads/Fanraiz02.png"],
    tags: ["React", "Firebase", "QR.io API"],
    demoUrl: "https://fanraiz.com/",
    githubUrl: undefined
  },
  {
    id: 6,
    title: "Fashion Design Blog Website",
    description: "Developed a modern fashion blog website featuring elegant design showcases, trend articles, and style inspiration. Built with responsive design principles and optimized for fashion content presentation. Features include blog management, image galleries, and social media integration.",
    image: "/lovable-uploads/FashionDesign.png",
    images: ["/lovable-uploads/FashionDesign01.png", "/lovable-uploads/FashionDesign02.png"],
    tags: ["React", "MySQL", "TypeScript", "Bootstrap"],
    demoUrl: undefined,
    githubUrl: undefined
  }
];

const Projects = () => {
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (images: string[], currentIndex: number, title: string) => {
    setModalImages(images);
    setModalCurrentIndex(currentIndex);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
    setModalCurrentIndex(0);
    setModalTitle('');
  };

  const nextImage = () => {
    setModalCurrentIndex((prev) => (prev + 1) % modalImages.length);
  };

  const prevImage = () => {
    setModalCurrentIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  return (
    <section id="projects" className="section-container relative">
      <h2 className="section-title mb-8">Projects</h2>
      
      {/* Project Description */}
      <motion.div 
        className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Explore a curated list of my most impactful web and blockchain projects. Each demonstrates technical depth, problem-solving, and real-world value—especially through collaborations with USA-based teams and startups.
        </p>
      </motion.div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            onImageClick={openModal}
          />
        ))}
      </div>

      {/* Micro Projects Section - Hidden for now */}
      {/* <div className="mt-16">
        <h3 className="section-title mb-8">Micro Projects</h3>
        <GlowingEffectDemo />
      </div> */}

      {/* Global Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        images={modalImages}
        currentIndex={modalCurrentIndex}
        title={modalTitle}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

export default Projects;
