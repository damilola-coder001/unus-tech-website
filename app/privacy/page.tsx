import type { Metadata } from "next";
import { brand, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${brand.name} handles information shared through this website.`,
};

export default function PrivacyPage() {
  return (
    <section className="section" aria-labelledby="privacy-heading">
      <div className="container">
        <span className="eyebrow">Legal</span>
        <h1 id="privacy-heading">Privacy policy</h1>
        <p>
          {brand.name} collects only the information you choose to share with
          us — typically your name, email address, company details, and a
          description of the process you&apos;d like to improve.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your details solely to respond to your inquiry and discuss a
          potential project. {contact.privacyNotice}
        </p>
        <h2>What we don&apos;t do</h2>
        <p>
          We don&apos;t sell, rent, or share your information with third
          parties for marketing. We don&apos;t run advertising trackers on
          this site.
        </p>
        <h2>Your rights</h2>
        <p>
          You can ask us at any time what information we hold about you, and
          ask us to correct or delete it.
        </p>
      </div>
    </section>
  );
}
