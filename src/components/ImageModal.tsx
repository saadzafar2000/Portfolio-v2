import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  title: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  images,
  currentIndex,
  title,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!isOpen || images.length === 0) return null;

  const hasMultipleImages = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-8 sm:-top-12 -right-2 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            {/* Previous Button */}
            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={onNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/50 rounded-full backdrop-blur-sm">
              <span className="text-white text-xs sm:text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </>
        )}

        {/* Image with responsive sizing */}
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="max-w-[95vw] max-h-[85vh] sm:max-w-[90vw] sm:max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl bg-white/5"
        />
      </div>
    </div>
  );
};

export default ImageModal;
