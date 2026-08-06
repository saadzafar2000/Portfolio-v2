import { cn } from "@/lib/utils";

/**
 * The pinging availability dot.
 *
 * The wrapper is exactly one line tall (`1lh`) and centres the dot inside
 * itself, so the dot lands on the FIRST line of the label beside it even when
 * that label wraps. The previous inline version relied on `items-center` on the
 * parent, which centres against the whole wrapped block — leaving the dot
 * floating between two lines wherever the availability string ran long.
 *
 * Parents must use `items-start`.
 *
 * Decorative: the adjacent text already reads "Available for …".
 */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex h-[1lh] w-2.5 shrink-0 items-center justify-center",
        className,
      )}
    >
      <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-accent opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
    </span>
  );
}
