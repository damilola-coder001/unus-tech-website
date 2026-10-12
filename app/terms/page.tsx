import type { Metadata } from "next";
import Link from "next/link";
import { brand, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms under which ${brand.name} provides this website and its services.`,
};

export default function TermsPage() {
  return (
    <section className="section" aria-labelledby="terms-heading">
      <div className="container">
        <span className="eyebrow">Legal</span>
        <h1 id="terms-heading">Terms of service</h1>
        <p>
          These terms cover your use of this website and any project inquiry
          you send through it. By using the site, you agree to them. If
          anything here is unclear, <Link href="/contact">ask us</Link>.
        </p>
        <h2>What this site is</h2>
        <p>
          This is the marketing and contact site for {brand.name}. Project
          previews link out to separately hosted work. Anything you build with
          us is covered by its own written agreement, which takes precedence
          over these terms where they differ.
        </p>
        <h2>Inquiries</h2>
        <p>
          When you send an inquiry, you confirm the details you share are
          accurate and yours to share. We respond personally to genuine
          inquiries and we are under no obligation to take on any particular
          project.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not misuse this site. That includes attempting to disrupt it,
          harvest addresses from it, or submit spam or unlawful content through
          the contact form. Submissions that trip our spam checks are discarded
          silently.
        </p>
        <h2>Content and ownership</h2>
        <p>
          Everything on this site, including copy, layout, and brand artwork,
          belongs to {brand.name} unless stated otherwise. You may link to our
          pages. You may not copy our content or artwork for commercial use
          without written permission.
        </p>
        <h2>Liability</h2>
        <p>
          This site is provided as is, without warranties of any kind. To the
          extent the law allows, {brand.name} is not liable for loss arising
          from your use of the site or from reliance on its content.
        </p>
        <h2>Changes and questions</h2>
        <p>
          We may update these terms as the business evolves. Continued use of
          the site after a change means you accept the updated terms. Questions
          about these terms or our{" "}
          <Link href="/privacy">privacy policy</Link>
          {contact.email ? (
            <>
              {" "}
              can go to{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </>
          ) : (
            " can go through the contact page"
          )}
          .
        </p>
      </div>
    </section>
  );
}
