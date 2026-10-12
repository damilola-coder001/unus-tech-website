import type { Metadata } from "next";
import { projects } from "@/lib/site";
import { MeetingBand } from "@/components/MeetingCTA";
import { ProjectCard } from "@/components/ProjectEmbed";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected projects from Unus Technologies. Each project shows the problem, the solution, and a live interactive preview where available.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="section" aria-labelledby="work-heading">
        <div className="container">
          <span className="eyebrow">Portfolio</span>
          <h1 id="work-heading">Our work</h1>
          <p className="lead">
            Real systems we have designed and built. Previews load as you
            scroll, and every project can be opened directly.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Projects">
        <div className="container">
          {projects.map((project) => (
            <section key={project.id} aria-label={project.title}>
              <ProjectCard project={project} />
              <div className="grid-2" style={{ marginTop: "1rem" }}>
                <div>
                  <h3>The problem</h3>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <h3>The solution</h3>
                  <p>{project.solution}</p>
                  {project.features.length > 0 ? (
                    <>
                      <h3>Features</h3>
                      <ul>
                        {project.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <MeetingBand />
    </>
  );
}
