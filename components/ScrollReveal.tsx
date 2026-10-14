"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll reveal (progressive enhancement, no markup changes).
 *
 * How it works:
 * - A synchronous head script sets `html[data-js="true"]` before first
 *   paint; CSS hides the targets below ONLY when that attribute is present
 *   (and only under `prefers-reduced-motion: no-preference`), so no-JS and
 *   reduced-motion visitors always see full content with zero flash.
 * - This component then observes those targets and adds `is-visible` as
 *   each enters the viewport. Grid children get a small stagger delay,
 *   cleared after the reveal so card hover motion stays snappy.
 * - Re-runs on pathname change because the layout (and this component)
 *   persists across App Router client-side navigations.
 */
const TARGETS = [
  ".card",
  ".project",
  ".meeting-band",
  ".section .container > .eyebrow",
  ".section .container > h1",
  ".section .container > h2",
  ".section .container > p.lead",
].join(", ");

const STAGGER_MS = 70;
const MAX_STAGGER = 8;

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document;

    // Stagger cards inside grids so they cascade rather than pop together.
    root.querySelectorAll(".grid-2, .grid-3").forEach((grid) => {
      Array.from(grid.children).forEach((child, i) => {
        (child as HTMLElement).dataset.revealDelay = String(
          Math.min(i, MAX_STAGGER) * STAGGER_MS,
        );
      });
    });

    const els = Array.from(
      root.querySelectorAll<HTMLElement>(TARGETS),
    ).filter((el) => !el.classList.contains("is-visible"));

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          if (delay > 0) el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          io.unobserve(el);
          if (delay > 0) {
            timers.push(
              window.setTimeout(() => {
                el.style.transitionDelay = "";
              }, delay + 800),
            );
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
