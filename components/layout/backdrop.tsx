"use client";

/**
 * Ambient background layer.
 *
 * Keeps the subtle static grain texture for depth over the WebGL Aurora Waves shader.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="grain absolute inset-0 opacity-80" />
    </div>
  );
}
