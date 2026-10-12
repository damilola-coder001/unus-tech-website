/**
 * Central content configuration for the Unus Technologies website.
 *
 * EDIT HERE when you need to:
 * - Change a heading, CTA label, or the meeting link  -> `brand`, `meeting`
 * - Add / edit a service                              -> `services`
 * - Supply the two real project URLs                  -> `projects` (`previewUrl`, `externalUrl`)
 * - Update nav labels or contact details               -> `navigation`, `contact`
 * - Add social links once they exist                   -> `socials`
 *
 * Page components read from this module; avoid hard-coding copy in pages.
 */

export const brand = {
  name: "Unus Technologies",
  shortName: "Unus",
  tagline: "Less busywork. More business.",
  /** Brand artwork (square poster). Used in the hero, footer, favicon, OG image. */
  logo: "/logo.png",
  /** Top tagline from the logo: "Ideas × Code × Impact". */
  kicker: "Ideas × Code × Impact",
  /** Bottom tagline from the logo. */
  motto: "Built for what's next",
  description:
    "We design and build custom automation systems that simplify operations, save time, and help businesses focus on what matters.",
  footerBlurb:
    "A business automation and technology agency. We build custom systems that save time, reduce manual work, and help businesses run more smoothly.",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const meeting = {
  /** Small label rendered directly above the CTA. */
  eyebrow: "For free",
  label: "Book a 30-Minute Meeting",
  heading: "What is slowing your business down?",
  supportingCopy:
    "Let's discuss your current processes, identify opportunities for improvement, and determine whether automation is the right next step.",
  /**
   * Calendly booking link. The MeetingCTA component reads this value,
   * so no component changes are needed.
   */
  bookingUrl: "https://calendly.com/unustechnologies/30min",
  bookingUrlConfigured: true,
} as const;

export interface Service {
  id: string;
  title: string;
  summary: string;
  problems: string[];
  useCases: string[];
  whenNotForYou: string;
}

export const services: Service[] = [
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    summary:
      "We remove repetitive manual steps from your daily operations so routine work happens reliably, without constant coordination.",
    problems: [
      "Repetitive manual work that eats into every day",
      "Orders and requests that need too much human coordination",
      "Scheduling and communication bottlenecks",
    ],
    useCases: [
      "Order intake and status notifications",
      "Automatic reminders and follow-ups",
      "Routine reporting without manual collation",
    ],
    whenNotForYou:
      "If a process runs rarely, changes constantly, or already takes only minutes, automating it may cost more than it saves.",
  },
  {
    id: "business-applications",
    title: "Custom Business Applications",
    summary:
      "We build web applications and internal systems shaped around how your business actually works, instead of generic software you have to work around.",
    problems: [
      "Off-the-shelf tools that don't fit your process",
      "Spreadsheets stretched beyond what they can safely do",
      "Poor visibility into routine operations",
    ],
    useCases: [
      "Online ordering and booking systems",
      "Operational dashboards",
      "Client onboarding and document workflows",
    ],
    whenNotForYou:
      "If an existing product already fits your workflow well, we will say so. There is no reason to build what you can buy.",
  },
  {
    id: "system-integration",
    title: "System Integration",
    summary:
      "We connect the tools you already use so information flows between them instead of being retyped, reconciled, or lost.",
    problems: [
      "Disconnected tools and duplicate data entry",
      "Stock, sales, or booking figures that never agree",
      "Manual copying between systems",
    ],
    useCases: [
      "Inventory updates and stock alerts",
      "Order fulfilment across sales channels",
      "Invoicing synced with your records",
    ],
    whenNotForYou:
      "If you only use one or two tools and the overlap is small, a simple export routine may be enough.",
  },
  {
    id: "ai-solutions",
    title: "AI-Powered Solutions",
    summary:
      "We apply AI where it provides genuine, measurable value, and we will tell you plainly when it doesn't.",
    problems: [
      "Unstructured requests that are hard to route or triage",
      "Large volumes of routine messages to sort and answer",
      "Knowledge buried in documents nobody can search",
    ],
    useCases: [
      "Drafting routine replies for human review",
      "Sorting and summarising incoming requests",
      "Searchable internal knowledge bases",
    ],
    whenNotForYou:
      "If a simple rule or checklist solves the problem reliably, AI would only add cost and uncertainty.",
  },
];

export type ProjectStatus = "concept" | "in-progress" | "live";

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  /** URL embedded in the preview iframe. Leave "" until the real URL is supplied. */
  previewUrl: string;
  /** URL opened by the "Open project" link. Leave "" until supplied. */
  externalUrl: string;
  /**
   * Set to false when the target is known to refuse framing (verified via
   * its X-Frame-Options / CSP headers). The preview then renders the
   * external-link fallback immediately instead of attempting an iframe.
   * Defaults to true.
   */
  allowEmbed?: boolean;
  status: ProjectStatus;
}

/**
 * Portfolio projects. Copy here comes from the live sites themselves —
 * keep each entry honest: only describe what the project actually does.
 * `allowEmbed: false` marks targets verified to refuse framing.
 */
export const projects: Project[] = [
  {
    id: "novamart-support-os",
    title: "NovaMart Support OS",
    slug: "novamart-support-os",
    summary:
      "AI customer support automation platform for a fictional retailer: a customer portal, an agent workspace, and an admin command center in one Next.js app. Built as a demo.",
    problem:
      "Support teams juggle order tracking, returns, billing disputes, and routine questions across disconnected tools, with no shared view of the customer or the conversation.",
    solution:
      "A single support OS: customers self-serve order tracking, 30-day return eligibility checks with prepaid labels, duplicate-charge reporting, and CSAT ratings through an AI chat assistant; agents take over escalated chats with full customer context and an AI copilot (intent + confidence, summaries, suggested replies); admins get resolution/CSAT analytics, a conversations audit explorer, activity timeline, knowledge-base CRUD, and a mock email mailbox.",
    features: [
      "Customer portal with AI chat, returns, billing reports & CSAT",
      "Agent workspace with human takeover and AI Support Copilot",
      "Admin command center with analytics, audit explorer & knowledge base",
      "11-category intent classifier with confidence and risk scoring",
      "8 authorization-enforced server tools. The LLM never touches the DB directly",
    ],
    previewUrl: "https://novamart-support-os.vercel.app/",
    externalUrl: "https://novamart-support-os.vercel.app/",
    status: "live",
  },
  {
    id: "equora",
    title: "Equora",
    slug: "equora",
    summary:
      "Institutional lending on Solana against tokenized equities: borrow USDC without selling shares. Designed and built for a hackathon.",
    problem:
      "Holders of tokenized equities who need cash have to sell shares, ending their market upside and triggering taxable events.",
    solution:
      "A Solana lending protocol front-end where holders borrow USDC up to 75% against custody-backed equity tokens (AAPLx, NVDAx, TSLAx and more), with sub-second Pyth pricing, Kamino execution, a borrowing-power simulator, and a positions dashboard with health monitoring.",
    features: [
      "Borrowing-power simulator",
      "Live protocol diagnostics",
      "Positions dashboard with collateral health monitoring",
      "Phantom, Solflare & Backpack wallet support",
      "Bank Lombard vs on-chain loan comparison",
    ],
    previewUrl: "https://equorafinance.vercel.app/",
    externalUrl: "https://equorafinance.vercel.app/",
    // Verified: responds with `X-Frame-Options: DENY`, so no live embed.
    allowEmbed: false,
    status: "live",
  },
  {
    id: "noir",
    title: "Noir and Co",
    slug: "noir",
    summary:
      "E-commerce website and app for Noir and Co, a clothing brand selling its own line: browse the collection, shop the cart, and check out, with an AI assistant on hand. Designed and built with a group.",
    problem:
      "A clothing brand selling its own products needs a home of its own online: one place where customers can browse the collection, buy directly, and manage their accounts. The brand stays in control of the experience from first click to checkout.",
    solution:
      "A complete single-brand storefront planned and built as a team: a responsive front end for browsing, cart, and checkout; accounts with separate access for customers, admins, and a super admin; a MySQL database behind it all; and an AI chatbot that draws on information in the app, tailored to each user. Our part of the build was the front end, the database, and planning the deployment to a live domain, documented throughout against Computer Science concepts.",
    features: [
      "Responsive storefront: browse, cart & checkout",
      "Customer, admin & super-admin accounts",
      "MySQL database behind the application",
      "AI chatbot with in-app knowledge, tailored per user",
      "Deployment plan to a live domain",
    ],
    previewUrl: "https://noir-73fy.onrender.com",
    externalUrl: "https://noir-73fy.onrender.com",
    status: "live",
  },
];

export const approach = [
  {
    step: "1",
    title: "Understand",
    text: "We learn how your business runs today and where time is actually lost.",
  },
  {
    step: "2",
    title: "Identify",
    text: "We pinpoint the inefficiencies and opportunities worth acting on.",
  },
  {
    step: "3",
    title: "Design",
    text: "We design a solution that fits your workflow: no more, no less.",
  },
  {
    step: "4",
    title: "Build & integrate",
    text: "We build the system and connect it with the tools you already use.",
  },
  {
    step: "5",
    title: "Test, deploy & improve",
    text: "We test carefully, launch, and keep refining based on real use.",
  },
] as const;

export const problemsWeSolve = [
  {
    title: "Repetitive manual work",
    text: "Tasks your team repeats every day that a system could handle quietly in the background.",
  },
  {
    title: "Orders needing too much coordination",
    text: "Orders, bookings, and requests that only move forward when someone chases them.",
  },
  {
    title: "Disconnected tools",
    text: "The same information typed into two or three systems that never quite agree.",
  },
  {
    title: "Scheduling bottlenecks",
    text: "Appointments, shifts, and follow-ups coordinated over phone calls and messages.",
  },
  {
    title: "Poor operational visibility",
    text: "No clear, current picture of orders, stock, or workload when you need one.",
  },
  {
    title: "Processes that don't scale",
    text: "Workflows that held together at one size and strain at the next.",
  },
] as const;

export const contact = {
  /** Shown on the contact page. Leave empty until official details are confirmed. */
  email: "unustechnologies@gmail.com",
  phone: "",
  location: "",
  privacyNotice:
    "We use the details you share only to respond to your inquiry. We never sell or share your information, and you can ask us to delete it at any time.",
} as const;

export interface SocialLink {
  label: string;
  href: string;
}

/** Social profiles shown under "Contact" in the footer. Empty = only email shows. */
export const socials: SocialLink[] = [
  {
    label: "UnusTechnologies",
    href: "https://www.facebook.com/share/1ExPGyMNmx/",
  },
];

/**
 * Canonical site URL for metadata, sitemap, and Open Graph tags.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists. Until then,
 * production on Vercel resolves automatically and local dev uses localhost.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
