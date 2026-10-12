import type { Metadata } from "next";
import { contact, meeting } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { MeetingCTA } from "@/components/MeetingCTA";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about the process you'd like to improve. Send a project inquiry or book a free 20-minute meeting to discuss your operations.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section" aria-labelledby="contact-heading">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1 id="contact-heading">Let&apos;s discuss your operations</h1>
          <p className="lead">
            Tell us about the process you&apos;d like to improve. We read
            every inquiry and respond personally.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Contact options">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2>Send an inquiry</h2>
              <ContactForm />
            </div>
            <div>
              <h2>Prefer to talk first?</h2>
              <p>{meeting.supportingCopy}</p>
              <MeetingCTA compact />
              {contact.email || contact.phone || contact.location ? (
                <div style={{ marginTop: "1.5rem" }}>
                  <h3>Direct contact</h3>
                  {contact.email ? <p>Email: {contact.email}</p> : null}
                  {contact.phone ? <p>Phone: {contact.phone}</p> : null}
                  {contact.location ? <p>{contact.location}</p> : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
