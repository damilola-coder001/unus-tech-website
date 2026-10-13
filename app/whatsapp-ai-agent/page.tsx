import type { Metadata } from "next";
import Link from "next/link";
import { meeting, contact, siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  title: "WhatsApp AI Agent",
  description: "A customized WhatsApp AI agent for businesses. Starting at $50.",
  alternates: { canonical: "/whatsapp-ai-agent" },
};
export default function WhatsAppAgentPage() {
  return (
    <>
      <section className="section" aria-labelledby="wa-hero-heading">
        <div className="container">
          <span className="eyebrow">New Service</span>
          <h1 id="wa-hero-heading">Your WhatsApp. Your AI. Your Business, Running Smarter.</h1>
          <p className="lead">Turn your WhatsApp into a smarter way to serve customers. Unus Technologies builds AI agents tailored to your business.</p>
          <div style={{marginTop:"1.5rem", fontSize:"1.15rem", color:"var(--color-gold)", fontWeight:700}}>Starting at $50</div>
          <div className="hero-actions" style={{justifyContent:"center", marginTop:"1.5rem"}}>
            <a className="button" href={meeting.bookingUrl} target="_blank" rel="noopener noreferrer">Book a Meeting</a>
            <a className="button button-secondary" href="#how-it-works">Explore How It Works</a>
          </div>
        </div>
      </section>
      
      <section className="section" aria-labelledby="wa-implementation-heading">
        <div className="container">
          <h2 id="wa-implementation-heading">Implementation details</h2>
          <p className="lead">How the agent is built depends on the agreed scope. Not every integration is available for every business.</p>
          <div className="grid-2" style={{marginTop: "1.5rem"}}>
            <div className="card">
              <h3>AI and conversation setup</h3>
              <p>We configure the agent with approved business information, conversation rules, and escalation conditions. The agent does not have open-ended access to external data beyond what is explicitly configured.</p>
            </div>
            <div className="card">
              <h3>WhatsApp Business connection</h3>
              <p>We guide setup through a supported WhatsApp Business account. Where a new number or account change is needed, this is discussed during discovery.</p>
            </div>
            <div className="card">
              <h3>Integrations</h3>
              <p>Supported integrations - such as calendars, order systems, or external APIs - are connected only when included in the agreed scope. Each requires separate configuration and testing.</p>
            </div>
            <div className="card">
              <h3>Testing and launch</h3>
              <p>Workflows are tested in a controlled environment before deployment. We confirm responses, escalations, and integrations work as expected before handover.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="wa-on-call-heading">
        <div className="container">
          <h2 id="wa-on-call-heading">Working through it on a call</h2>
          <p className="lead">The discovery call is the first step. It confirms whether the service fits the business before any scope is agreed.</p>
          <div className="grid-2" style={{marginTop: "1.5rem"}}>
            <div className="card">
              <h3>What we cover</h3>
              <p>We discuss the business, customer conversations, repetitive tasks, current WhatsApp setup, desired outcomes, and any relevant technical requirements.</p>
            </div>
            <div className="card">
              <h3>What happens after</h3>
              <p>If there is a fit, we confirm scope, quote, and timeline in writing. If there is not a good fit, we say so clearly. Nothing is committed during the call.</p>
            </div>
          </div>
        </div>
      </section>
<section className="section" aria-labelledby="wa-guarantee-heading">
        <div className="container">
          <h2 id="wa-guarantee-heading">30 Days to Make Sure It&apos;s Right for You.</h2>
          <p className="lead">Every eligible implementation comes with a 30-day money-back guarantee.</p>
          <p><Link href="/guarantee-terms">Full guarantee terms</Link></p>
        </div>
      </section>
    </>
  );
}
