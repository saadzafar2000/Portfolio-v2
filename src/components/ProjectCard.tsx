import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  status?: string;
  statusColor?: string;
  statusGlow?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onImageClick: (images: string[], currentIndex: number, title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = project.images
    ? [project.image, ...project.images]
    : [project.image];
  const hasMultipleImages = allImages.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const openPreview = () => {
    onImageClick(allImages, currentImageIndex, project.title);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          delay: index * 0.1,
        },
      }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full group"
    >
      <Card className="overflow-hidden transition-all duration-300 h-full flex flex-col bg-gray-900/70 border-gray-800 rounded-xl relative project-card-hover card-shadow-effect">
        {/* Simple but visible shadow effect */}
        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-xl transition-all duration-300 blur-md scale-150 group-hover:scale-100 -z-10"></div>

        <div
          className="overflow-hidden h-40 sm:h-48 relative group/slider cursor-pointer"
          onClick={openPreview}
        >
          <img
            src={allImages[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>

          {/* Zoom Icon */}
          <div className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-10">
            <ZoomIn className="w-4 h-4 text-white" />
          </div>

          {/* Image Slider Controls */}
          {hasMultipleImages && (
            <>
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-10"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-blue-400 w-4"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl font-semibold text-white">
            {project.title}
          </CardTitle>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
            {project.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-gray-800/50 text-blue-300 border-blue-500/20 px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="flex-grow p-4 sm:p-6 pt-0">
          <CardDescription className="text-sm text-gray-400 leading-relaxed">
            {project.description}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 pt-2 p-4 sm:p-6">
          {project.demoUrl && (
            <Button
              asChild
              className={`w-full px-4 sm:px-8 py-2 rounded-full text-sm sm:text-base ${
                project.status
                  ? project.statusColor || ""
                  : "bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
              }`}
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.status ? project.status : "Live Demo"}
              </a>
            </Button>
          )}

          {project.githubUrl && (
            <Button
              asChild
              className="w-full px-4 sm:px-8 py-2 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white focus:ring-2 focus:ring-gray-400 hover:shadow-xl transition duration-200 text-sm sm:text-base"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
