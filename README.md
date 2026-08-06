# Muhammad Saad Zafar — Portfolio

🚀 **Live Site**: [muhammadsaadzafar.com](https://muhammadsaadzafar.com)

Statically generated Next.js site: an editorial landing page plus a case study
route for each project.

## 🛠️ Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript, `strict` |
| Styling | Tailwind CSS 3.4 |
| Animation | Motion (`motion/react`) — Framer Motion's current package name |
| Smooth scroll | Lenis (`lenis` — the renamed `@studio-freight/lenis`) |
| Type | Space Grotesk (display) · Inter (body) · JetBrains Mono (meta) |
| Icons | Lucide React |

## 🚀 Getting Started

```bash
npm install
npm run dev        # dev server on http://localhost:3000
```

| Command | |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm run start` | serve the production build |
| `npm run lint` | eslint |
| `npm run typecheck` | `tsc --noEmit` |

## 🔑 Environment

Copy `.env.example` to `.env.local` and fill in:

- `WEB3FORMS_ACCESS_KEY` — read only by `app/api/contact/route.ts`, server-side,
  so it never reaches the browser. Without it the contact form returns a clear
  "not configured" error instead of failing silently.

## 📝 Content

**No content is hardcoded in a page or component.** Everything is read through
the async getters in `lib/content.ts`:

```ts
getSiteSettings()  getProjects()   getProject(slug)  getAdjacentProject(slug)
getExperience()    getEducation()  getSkillGroups()  getCapabilities()
```

They currently resolve from typed data in `lib/data/*`. Because they are already
async and return plain serializable objects, moving to Sanity means rewriting
the bodies of `lib/content.ts` only — every call site already awaits its data
and never learns where it came from:

```ts
export async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch(groq`*[_type == "project"] | order(order asc){...}`);
}
```

To edit content today, change `lib/data/*`. Types live in `lib/types.ts`.

## 📂 Structure

```
app/
  layout.tsx                fonts, metadata, JSON-LD, chrome
  page.tsx                  landing (server component)
  projects/[slug]/page.tsx  case studies — generateStaticParams + generateMetadata
  api/contact/route.ts      Web3Forms proxy, honeypot + rate limit
  sitemap.ts robots.ts manifest.ts
  icon.tsx apple-icon.tsx opengraph-image.tsx   generated at build time
components/
  layout/      nav, footer, smooth-scroll, cursor, backdrop, scroll-progress
  sections/    hero, about (bento), experience, projects, project-card,
               stack, contact, contact-form
  case-study/  gallery, next-project
  ui/          action, logo, reveal, kinetic-text, magnetic,
               spotlight-card, social-buttons
lib/
  content.ts      the content API — the seam a CMS slots into
  stack-layers.ts groups a project's stack into architecture layers
  data/           typed content
  types.ts        content shapes
public/
  brand/            SZ logo mark
  lovable-uploads/  project screenshots
```

## 🎨 Design

Editorial dark: deep obsidian canvas (`#04060A`) on `#090D16` surfaces, electric
cyan (`#00F0FF`) as the only accent, 1px translucent hairline borders, mono
metadata labels, and a fluid `clamp()` type scale that holds from 390px to
ultra-wide.

The accent is a single token — change `--accent` in `app/globals.css` and the
whole site follows.

The cursor spotlight on bento and project cards is the `.spotlight` utility in
`globals.css`, driven by `--mx`/`--my` written directly to the node by
`components/ui/spotlight-card.tsx` — pointer position never enters React state,
which is what keeps it from re-rendering on every mousemove.

## ♿ Motion & accessibility

- All motion is gated on `prefers-reduced-motion`: reveals resolve to their
  final state rather than animating, and Lenis is skipped entirely.
- A `<noscript>` fallback in `app/layout.tsx` resolves the same reveals if the
  JS bundle never loads, so content is never permanently invisible.
- Skip-to-content link, `:focus-visible` rings on every interactive element,
  `aria-live` status on the contact form.

## 🎯 SEO

- Per-route `metadata` with canonicals — the landing page and all six case
  studies each have their own title, description, and OG image.
- JSON-LD: `Person` + `WebSite` site-wide, `CreativeWork` per case study.
- `app/sitemap.ts` generated from the content layer, so adding a project adds
  its URL automatically.
- Fully static: every page ships its content in the HTML response.

## 🌐 Social

- **LinkedIn**: [Muhammad Saad Zafar](https://www.linkedin.com/in/muhammad-saad-zafar-39017b189/)
- **GitHub**: [saadzafar2000](https://github.com/saadzafar2000)
- **Instagram**: [@saadzafar2000](https://www.instagram.com/saadzafar2000/)
- **X**: [@MSaadZafar2000](https://x.com/MSaadZafar2000)

## 📄 License

Private and proprietary. All rights reserved.

---

**Built by Muhammad Saad Zafar**
