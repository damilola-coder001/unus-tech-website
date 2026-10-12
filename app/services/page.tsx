import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/site";
import { MeetingBand } from "@/components/MeetingCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Workflow automation, custom business applications, system integration, and AI-powered solutions: what each service solves, and when each may not be for you.",
  alternates: { canonical: "/services" },
};

const industries = [
  {
    title: "Restaurants",
    text: "Online ordering, pickup and delivery workflows, order notifications, and operational dashboards.",
  },
  {
    title: "Retail and supermarkets",
    text: "Inventory updates, order fulfilment, stock alerts, and sales reporting.",
  },
  {
    title: "Healthcare",
    text: "Appointment scheduling, reminders, and administrative automation with suitable privacy and access controls.",
  },
  {
    title: "Professional services",
    text: "Client onboarding, scheduling, document workflows, invoicing, and follow-ups.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1 id="services-heading">What we build, and why</h1>
          <p className="lead">
            We solve operational problems with the simplest technology that
            does the job well. Below is what each service covers, including
            when it may not be the right choice.
          </p>
        </div>
      </section>

      {services.map((service) => (
        <section
          key={service.id}
          id={service.id}
          className="section"
          aria-labelledby={`${service.id}-heading`}
        >
          <div className="container">
            <h2 id={`${service.id}-heading`}>{service.title}</h2>
            <p className="lead">{service.summary}</p>
            <div className="grid-2">
              <div className="card">
                <h3>Problems it addresses</h3>
                <ul>
                  {service.problems.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <h3>Example use cases</h3>
                <ul>
                  {service.useCases.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3>When it may not be for you</h3>
                <p>{service.whenNotForYou}</p>
                <p>
                  <Link href="/contact">
                    Discuss a {service.title.toLowerCase()} project
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section" aria-labelledby="industries-heading">
        <div className="container">
          <h2 id="industries-heading">Who we help</h2>
          <p className="lead">
            We work across industries. These are examples of the kinds of
            systems we can build, rather than claims about work already
            delivered.
          </p>
          <div className="grid-2">
            {industries.map((i) => (
              <div key={i.title} className="card">
                <h3>{i.title}</h3>
                <p>{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MeetingBand />
    </>
  );
}
