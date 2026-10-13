import Link from "next/link";
import { brand } from "@/lib/site";
export default function GuaranteeTermsPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>30-Day Money-Back Guarantee Terms</h1>
        <p>Terms for eligible WhatsApp AI Agent implementations by {brand.name}.</p>
        <Link href="/whatsapp-ai-agent">Back</Link>
      </div>
    </section>
  );
}
