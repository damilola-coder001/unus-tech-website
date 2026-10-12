import type { Metadata } from "next";
import { MeetingBand } from "@/components/MeetingCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our philosophy: understand the process before automating it, choose appropriate technology, and build for maintainability and reliability.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Understand before automating",
    text: "We study how work actually gets done before changing anything. Automating a broken process only produces broken results faster.",
  },
  {
    title: "Appropriate technology",
    text: "We choose the simplest tool that solves the problem well, instead of adding complexity for its own sake.",
  },
  {
    title: "Built around your workflow",
    text: "Your business shouldn't reshape itself around our software. We build around the way your team already works.",
  },
  {
    title: "Maintainable and reliable",
    text: "We design for the long term: systems that are easy to run, easy to fix, and easy to extend.",
  },
  {
    title: "Automation as improvement",
    text: "We treat automation as a way to improve work itself: less friction, fewer errors, more time for what matters. Not a trend to follow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section" aria-labelledby="about-heading">
        <div className="container">
          <span className="eyebrow">About us</span>
          <h1 id="about-heading">Practical automation, honestly built</h1>
          <p className="lead">
            We are Unus Technologies, a business automation and technology
            agency. We help restaurants, retailers, healthcare providers, and
            professional service companies save time and run more smoothly
            through custom systems built around their real operations.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-heading">
        <div className="container">
          <h2 id="principles-heading">What guides our work</h2>
          <p className="lead">Five principles behind every system we ship.</p>
          <div className="grid-2">
            {principles.map((p) => (
              <div key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MeetingBand />
    </>
  );
}
