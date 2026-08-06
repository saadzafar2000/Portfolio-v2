"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * useSyncExternalStore rather than useEffect + setState: matchMedia is exactly
 * the "external store" this hook is for, it avoids a cascading render on mount,
 * and it keeps responding when the match changes — so toggling reduced motion
 * in DevTools takes effect immediately instead of needing a reload.
 *
 * Returns false during SSR, so anything gated on this must degrade to "off".
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const usePointerFine = () => useMediaQuery("(pointer: fine)");

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
