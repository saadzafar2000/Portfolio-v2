import type { Route } from "next";
import Link from "next/link";

import { BackToTop } from "@/components/layout/back-to-top";
import { Logo } from "@/components/ui/logo";
import { SocialButtons } from "@/components/ui/social-buttons";
import { StatusDot } from "@/components/ui/status-dot";
import { getSiteSettings } from "@/lib/content";

const QUICK_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#stack", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

export async function Footer() {
  const site = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo name={site.name} />
            <p className="mt-6 max-w-sm font-display text-lead font-bold text-balance">
              {site.tagline}
            </p>
            <p className="mt-6 flex items-start gap-2.5 text-sm text-ink-muted text-pretty">
              <StatusDot />
              {site.availability}
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <p className="label">Index</p>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Route}
                    className="link-wipe text-sm text-ink-muted transition-colors duration-500 ease-editorial hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="label">Elsewhere</p>
            <SocialButtons socials={site.socials} className="mt-5" />
            <p className="mt-6 text-sm text-ink-muted">{site.location}</p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p className="font-mono text-label uppercase tracking-[0.14em]">
            Next.js · TypeScript · Tailwind
          </p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
