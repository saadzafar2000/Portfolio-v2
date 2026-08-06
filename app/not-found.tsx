import type { Metadata } from "next";

import { Action } from "@/components/ui/action";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center py-32">
      <p className="label text-accent">404</p>
      <h1 className="mt-8 max-w-3xl font-display text-h1 font-bold text-balance">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-8 max-w-md text-lead text-ink-muted text-pretty">
        The link may be out of date, or the page may have moved. The projects
        index is a good place to pick back up.
      </p>
      <div className="mt-12 flex flex-wrap gap-3">
        <Action href="/" variant="solid" arrow={false}>
          Back home
        </Action>
        <Action href="/#projects" variant="outline" arrow={false}>
          View work
        </Action>
      </div>
    </section>
  );
}
