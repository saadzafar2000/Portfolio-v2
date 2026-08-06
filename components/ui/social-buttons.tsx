import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Magnetic } from "@/components/ui/magnetic";
import type { SocialKind, SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialKind, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  twitter: Twitter,
  instagram: Instagram,
};

/**
 * Magnetic social buttons. Icon-only, so each carries an explicit accessible
 * name plus a visible label beneath at larger sizes.
 */
export function SocialButtons({
  socials,
  className,
}: {
  socials: SocialLink[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {socials.map((social) => {
        const Icon = ICONS[social.kind];
        const isMail = social.kind === "email";

        return (
          <li key={social.kind}>
            <Magnetic strength={0.4}>
              <a
                href={social.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                aria-label={`${social.label} — ${social.handle}`}
                className="group flex h-14 w-14 items-center justify-center rounded-2xl
                           border border-white/10 bg-canvas-raised/60 backdrop-blur-xl
                           transition-[color,border-color,box-shadow] duration-500 ease-editorial
                           hover:border-cyan-500/40 hover:text-accent
                           hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
              >
                <Icon
                  aria-hidden
                  className="h-5 w-5 transition-transform duration-500 ease-editorial group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </a>
            </Magnetic>
          </li>
        );
      })}
    </ul>
  );
}
