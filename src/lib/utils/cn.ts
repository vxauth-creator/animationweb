import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` — class-name composer.
 *
 * Combines `clsx` (conditional class composition) with `tailwind-merge`
 * (intelligent dedupe of conflicting Tailwind utilities). Use everywhere
 * a `className` prop is built dynamically.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
