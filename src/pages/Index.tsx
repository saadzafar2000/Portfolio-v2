import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Features from '@/components/Features';
import CustomScrollbar from '@/components/CustomScrollbar';
import Technologies from '@/components/Technologies';
import Loading from '@/components/Loading';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CustomScrollbar />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Features />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
