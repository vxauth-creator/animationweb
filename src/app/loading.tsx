import { Loader } from "@/components/feedback/loader";

/**
 * Route-level loading state — shown while a server component / async page
 * resolves. Kept minimal and centered to avoid layout shift.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <Loader size="lg" label="Loading" />
    </div>
  );
}
