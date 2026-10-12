import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" aria-labelledby="not-found-heading">
      <div className="container">
        <h1 id="not-found-heading">Page not found</h1>
        <p>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <p>
          <Link href="/">Return to the homepage</Link>
        </p>
      </div>
    </section>
  );
}
