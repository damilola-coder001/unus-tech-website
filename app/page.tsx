import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { brand, meeting, problemsWeSolve, projects, services, approach } from "@/lib/site";
import { MeetingBand, MeetingCTA } from "@/components/MeetingCTA";
import { ProjectCard } from "@/components/ProjectEmbed";

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: brand.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow hero-enter">{brand.kicker}</span>
            <h1
              id="hero-heading"
              className="hero-enter"
              style={{ "--hero-delay": "90ms" } as CSSProperties}
            >
              {brand.tagline}
            </h1>
            <p
              className="lead hero-enter"
              style={{ "--hero-delay": "180ms" } as CSSProperties}
            >
              We build custom automation systems that save time, simplify
              operations, and help businesses do more with less friction.
            </p>
            <div
              className="hero-actions hero-enter"
              style={{ "--hero-delay": "270ms" } as CSSProperties}
            >
              <MeetingCTA compact />
              <Link className="button button-secondary" href="/work">
                Explore Our Work
              </Link>
            </div>
          </div>
          <div
            className="hero-art hero-enter-art"
            style={{ "--hero-delay": "150ms" } as CSSProperties}
          >
            <Image
              src={brand.logo}
              alt="Unus Technologies logo — Ideas × Code × Impact"
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 56rem) 100vw, 480px"
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="problems-heading">
        <div className="container">
          <span className="eyebrow">Problems we solve</span>
          <h2 id="problems-heading">
            Recognizable problems, solved practically
          </h2>
          <p className="lead">
            The same patterns show up in restaurants, shops, clinics, and
            offices. We solve them at the source.
          </p>
          <div className="grid-3">
            {problemsWeSolve.map((p) => (
              <div key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <span className="eyebrow">What we do</span>
          <h2 id="services-heading">Our services</h2>
          <p className="lead">
            Four services, one rule: the simplest technology that does the
            job well.
          </p>
          <div className="grid-2">
            {services.map((s) => (
              <div key={s.id} className="card">
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/services">Learn more about our services</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="work-heading">
        <div className="container">
          <span className="eyebrow">Proof of work</span>
          <h2 id="work-heading">Selected work</h2>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <p style={{ marginTop: "1rem" }}>
            <Link href="/work">See all of our work</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="approach-heading">
        <div className="container">
          <span className="eyebrow">How we work</span>
          <h2 id="approach-heading">Our approach</h2>
          <ol style={{ paddingLeft: "1.25rem", margin: 0 }}>
            {approach.map((a) => (
              <li key={a.step} style={{ marginBottom: "0.75rem" }}>
                <strong>{a.title}.</strong> {a.text}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MeetingBand />
    </>
  );
}
