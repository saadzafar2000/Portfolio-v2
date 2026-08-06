import { Reveal } from "@/components/ui/reveal";
import type { SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * The hero's availability ledger — the handful of facts a Werkstudent screener
 * or a freelance lead checks before reading anything else, stated plainly.
 *
 * Deliberately not a SpotlightCard. The direction here is hairlines and
 * whitespace rather than glow surfaces, and the ambient backdrop wash already
 * occupies this column; a bordered card on top of it would read as clutter.
 */
export function HeroLedger({
  site,
  className,
}: {
  site: SiteSettings;
  className?: string;
}) {
  const rows = [{ label: "Based in", value: site.location }, ...site.heroFacts];

  return (
    <Reveal y={16} delay={0.5} className={className}>
      <div className="border-t border-white/10 pt-6">
        <p className="label">Role</p>
        <p className="mt-4 text-lead text-ink text-balance">
          {site.role}
        </p>

        <dl className="mt-8">
          {rows.map(({ label, value }) => (
            <div
              key={label}
              className={cn(
                "flex items-baseline justify-between gap-6",
                "border-t border-white/10 py-3.5",
              )}
            >
              <dt className="label shrink-0">{label}</dt>
              <dd className="text-right text-sm text-ink text-pretty">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
