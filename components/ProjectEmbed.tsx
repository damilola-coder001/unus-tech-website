"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/site";

/**
 * Lazy-loading embed for an externally hosted project.
 *
 * - The iframe is only created once the preview scrolls near the viewport
 *   (IntersectionObserver) — never on initial page render.
 * - Shows a skeleton while loading and a graceful fallback if the embed
 *   fails (e.g. the target sends X-Frame-Options / frame-ancestors DENY)
 *   or if no URL has been configured yet.
 * - Sandboxed restrictively: no scripts need our trust; the frame gets
 *   same-origin + forms + popups only where compatible. Tighten further per
 *   project if the embedded app works without them.
 */
export function ProjectEmbed({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || nearViewport) return;
    if (typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [nearViewport]);

  // If the iframe never fires `load` (typical when framing is refused),
  // fall back to the external link after a timeout.
  useEffect(() => {
    if (!nearViewport || loaded || failed) return;
    const timer = setTimeout(() => setFailed(true), 12000);
    return () => clearTimeout(timer);
  }, [nearViewport, loaded, failed]);

  if (!project.previewUrl || project.allowEmbed === false) {
    return (
      <div className="embed-frame" aria-label={`${project.title} preview`}>
        <div className="embed-placeholder">
          {project.externalUrl ? (
            <>
              <p>
                <strong>View the live project.</strong>
              </p>
              <p>
                {project.allowEmbed === false
                  ? "This project blocks embedding, so it opens directly instead of previewing here."
                  : "We are preparing this project's live preview. In the meantime, you can open it directly."}
              </p>
              <p>
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open {project.title} in a new tab
                </a>
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Interactive preview coming soon.</strong>
              </p>
              <p>
                We are preparing this project&apos;s live preview. Check back
                shortly.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div className="embed-frame">
        {!nearViewport || (!loaded && !failed) ? (
          <div
            className="embed-loading"
            aria-hidden={nearViewport && !failed ? true : undefined}
          >
            <div className="embed-skeleton" role="status" aria-label="Loading project preview" />
            {!nearViewport ? (
              <p>Preview loads as you scroll.</p>
            ) : (
              <p>Loading preview…</p>
            )}
          </div>
        ) : null}
        {nearViewport && !failed ? (
          <iframe
            src={project.previewUrl}
            title={`${project.title} — interactive preview`}
            loading="lazy"
            sandbox="allow-same-origin allow-forms allow-popups"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="clipboard-write"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        ) : null}
        {failed ? (
          <div className="embed-placeholder">
            <p>
              <strong>This project can&apos;t be previewed here.</strong>
            </p>
            <p>
              The project blocks embedding, or the preview failed to load. You
              can still open it directly.
            </p>
            {project.externalUrl ? (
              <p>
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open {project.title} in a new tab
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project" aria-labelledby={`${project.slug}-title`}>
      <p className="project-meta">Status: {project.status.replace("-", " ")}</p>
      <h3 id={`${project.slug}-title`}>{project.title}</h3>
      <p>{project.summary}</p>
      <ProjectEmbed project={project} />
      {project.externalUrl ? (
        <p style={{ marginTop: "0.75rem" }}>
          <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
            Open {project.title} in a new tab
          </a>
        </p>
      ) : null}
    </article>
  );
}
