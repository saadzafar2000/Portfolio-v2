import { Clock } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { KineticText } from "@/components/ui/kinetic-text";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { SiteSettings } from "@/lib/types";

export function Contact({ site }: { site: SiteSettings }) {
  return (
    <section id="contact" className="section shell">
      <div className="flex items-center gap-4">
        <span className="label text-accent">05</span>
        <span aria-hidden className="h-px flex-1 bg-line/10 sm:max-w-24" />
        <span className="label">Contact</span>
      </div>

      <h2 className="mt-6 max-w-4xl font-display text-h2 font-bold text-balance">
        <KineticText
          lines={["Let's build something", "exceptional together."]}
        />
      </h2>

      <div className="mt-16 grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <SpotlightCard className="h-full p-7 lg:p-9">
            <ContactForm email={site.email} />
          </SpotlightCard>
        </Reveal>

        <div className="grid gap-4 lg:col-span-5">
          <Reveal delay={0.06}>
            <SpotlightCard className="p-7 lg:p-9">
              <p className="label">Direct Connect</p>
              {site.email ? (
                <a
                  href={`mailto:${site.email}`}
                  className="link-wipe mt-5 inline-block text-lead text-ink transition-colors duration-500 ease-editorial hover:text-accent"
                >
                  {site.email}
                </a>
              ) : (
                <a
                  href="https://www.linkedin.com/in/muhammad-saad-zafar-39017b189/"
                  target="_blank"
                  rel="noreferrer"
                  className="link-wipe mt-5 inline-block text-lead text-ink transition-colors duration-500 ease-editorial hover:text-accent"
                >
                  LinkedIn Profile →
                </a>
              )}
              <p className="mt-6 text-sm text-ink-muted text-pretty">
                Hiring for a Werkstudent or full-time role, or scoping a
                freelance build? Either way, tell me what you need shipped. I
                reply to everything — usually within a day.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.12}>
            <SpotlightCard className="p-7 lg:p-9">
              <p className="label">Response time</p>
              <p className="mt-5 flex items-center gap-3 text-lead text-ink">
                <Clock aria-hidden className="h-5 w-5 text-accent" />
                Within 24 hours
              </p>
              <p className="mt-4 text-sm text-ink-muted text-pretty">
                I reply to every enquiry — usually the same day. For urgent
                builds, reach me directly by email.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.18}>
            <SpotlightCard className="p-7 lg:p-9">
              <p className="label">Based in</p>
              <p className="mt-5 text-lead text-ink">{site.location}</p>
              <p className="mt-2 text-sm text-ink-muted text-pretty">
                On-site or hybrid for Werkstudent and full-time roles in
                Germany. Remote freelance worldwide — I&rsquo;ve delivered
                across Europe and the U.S.
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
