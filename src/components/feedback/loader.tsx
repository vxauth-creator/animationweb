import { cn } from "@/lib/utils/cn";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
} as const;

/**
 * `<Loader>` — minimal accent-bordered spinner.
 *
 * Pure CSS animation (no JS) so it stays cheap during route transitions.
 * Includes an SR-only label for assistive technology.
 */
export const Loader = ({ size = "md", label = "Loading", className }: LoaderProps) => {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span
        className={cn(
          "animate-spin rounded-full border-(--border-strong) border-t-(--color-accent-cyan)",
          sizes[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
};
