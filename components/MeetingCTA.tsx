import { meeting } from "@/lib/site";

/**
 * Primary conversion CTA. Reads its label, supporting copy, and destination
 * from `meeting` in lib/site.ts — to change the booking link, edit
 * `bookingUrl` / `bookingUrlConfigured` there. Nothing else needs to change.
 */
export function MeetingCTA({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <span className="cta-eyebrow">{meeting.eyebrow}</span>
      <a
        className="button"
        href={meeting.bookingUrl}
        {...(meeting.bookingUrlConfigured
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {meeting.label}
      </a>
      {!compact && !meeting.bookingUrlConfigured && (
        <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
          Online booking is being set up — this button will link to our
          calendar once the booking URL is configured.
        </p>
      )}
    </div>
  );
}

export function MeetingBand() {
  return (
    <section className="section" aria-labelledby="meeting-heading">
      <div className="container">
        <div className="meeting-band">
          <h2 id="meeting-heading">{meeting.heading}</h2>
          <p className="lead">{meeting.supportingCopy}</p>
          <MeetingCTA compact />
        </div>
      </div>
    </section>
  );
}
