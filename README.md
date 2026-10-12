# Unus Technologies — Website

Marketing website for **Unus Technologies**, a business automation and
technology agency. Built with Next.js (App Router), React, and TypeScript.
No database, CMS, or auth — content lives in typed configuration.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run typecheck
```

## Where to edit common things

| What to change | Where |
|---|---|
| Headings, hero copy, CTA labels | `lib/site.ts` (`brand`, `meeting`) |
| **Meeting-booking URL** | `lib/site.ts` → `meeting.bookingUrl`, then set `bookingUrlConfigured: true`. The `MeetingCTA` component picks it up everywhere automatically. Currently a documented placeholder (`#book-a-meeting`). |
| **The two project URLs** | `lib/site.ts` → `projects[i].previewUrl` + `externalUrl`, plus `title`/`summary`/`problem`/`solution`/`features`. Empty strings render a “preview coming soon” fallback — nothing else changes. |
| Add / edit a service | `lib/site.ts` → `services` (footer links update automatically) |
| Nav labels / routes | `lib/site.ts` → `navigation` |
| Contact details, social links | `lib/site.ts` → `contact`, `socials` (empty = section hidden) |
| Colors, fonts, spacing | `app/globals.css` (`:root` tokens at the top) |
| Pages | `app/page.tsx`, `app/services/page.tsx`, `app/work/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx` |
| Reusable pieces | `components/` (`SiteHeader`, `SiteFooter`, `MeetingCTA`, `ProjectEmbed`, `ContactForm`) |

## Contact form

`POST /api/contact` (`app/api/contact/route.ts`) validates server-side
(shared rules in `lib/contact.ts`), applies a honeypot spam check, and then:

- If `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set (see `.env.example`),
  forwards the inquiry via the Resend API. Secrets stay server-side.
- Otherwise logs the submission and tells the visitor honestly that inbox
  delivery isn’t wired up yet — no false success message.

```bash
cp .env.example .env.local   # then fill in the values
```

## Known limitations

- **Iframe embeds:** a target site can refuse embedding via
  `X-Frame-Options` or CSP `frame-ancestors`. This cannot be bypassed —
  `ProjectEmbed` detects the failure (load timeout) and falls back to an
  external “Open project” link without breaking the page. If a supplied
  project URL refuses framing, fill in `externalUrl` and leave `previewUrl`
  set anyway; visitors still get a clean fallback.
- **Booking:** until a real provider URL is configured, the meeting CTA
  points at a placeholder anchor and notes that booking is being set up.
