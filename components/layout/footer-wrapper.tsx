"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function FooterWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/demo")) return null;
  return <>{children}</>;
}
