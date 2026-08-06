import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-pads an index for the editorial "01 /" run-in labels. */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}
