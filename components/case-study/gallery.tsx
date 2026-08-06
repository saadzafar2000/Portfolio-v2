"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GalleryImage } from "@/lib/types";
import { ordinal } from "@/lib/utils";

export function Gallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? current
          : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [openIndex, close, step]);

  if (images.length === 0) return null;

  const active = openIndex === null ? null : images[openIndex];

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={(event) => {
                lastTrigger.current = event.currentTarget;
                setOpenIndex(index);
              }}
              aria-label={`View image ${index + 1} of ${images.length}: ${image.alt}`}
              className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 transition-colors duration-500 ease-editorial hover:border-cyan-500/40"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={750}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]"
              />
              <span className="label absolute left-4 top-4 rounded-full border border-white/20 bg-canvas/90 px-2.5 py-1 text-ink backdrop-blur-md">
                {ordinal(index)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — image viewer`}
            tabIndex={-1}
            className="fixed inset-0 z-[75] flex items-center justify-center bg-canvas/95 p-4 backdrop-blur-xl sm:p-10"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-colors duration-500 ease-editorial hover:border-cyan-500/40 hover:text-accent"
            >
              <X className="h-4 w-4" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 transition-colors duration-500 ease-editorial hover:border-cyan-500/40 hover:text-accent sm:left-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 transition-colors duration-500 ease-editorial hover:border-cyan-500/40 hover:text-accent sm:right-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            <figure className="max-h-full w-full max-w-6xl">
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                width={2000}
                height={1250}
                sizes="100vw"
                className="max-h-[78vh] w-full rounded-2xl border border-white/10 object-contain"
                priority
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-ink-muted">
                <span className="text-pretty">{active.alt}</span>
                <span className="label whitespace-nowrap text-ink-muted">
                  {ordinal(openIndex!)} / {ordinal(images.length - 1)}
                </span>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
