import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

/**
 * POST /api/contact — real submission flow.
 *
 * 1. Validates the payload server-side (same rules as the client).
 * 2. If RESEND_API_KEY + CONTACT_TO_EMAIL are set, forwards the inquiry
 *    via the Resend API. Secrets stay server-side — never exposed to the client.
 * 3. Otherwise logs the submission server-side and returns success, so the
 *    form is honest about what happened (see `forwarded` in the response).
 *
 * Setup: copy .env.example to .env.local and fill in the two variables.
 */
export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { process: "Invalid request body." } },
      { status: 400 },
    );
  }

  const payload: ContactPayload = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    company: String(body.company ?? ""),
    industry: String(body.industry ?? ""),
    process: String(body.process ?? ""),
    currentHandling: String(body.currentHandling ?? ""),
    outcome: String(body.outcome ?? ""),
    budget: String(body.budget ?? ""),
    timeline: String(body.timeline ?? ""),
    website: String(body.website ?? ""),
  };

  const errors = validateContact(payload);
  // Don't reveal the honeypot field to the client.
  if (errors.website) {
    return NextResponse.json({ ok: true, forwarded: false });
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Website inquiry <onboarding@resend.dev>",
        to,
        reply_to: payload.email,
        subject: `Project inquiry from ${payload.name} (${payload.company})`,
        text: [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Company: ${payload.company}`,
          `Industry: ${payload.industry || "—"}`,
          "",
          "Process to improve:",
          payload.process,
          "",
          `Current handling: ${payload.currentHandling || "—"}`,
          `Desired outcome: ${payload.outcome || "—"}`,
          `Budget: ${payload.budget || "—"}`,
          `Timeline: ${payload.timeline || "—"}`,
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("Contact forwarding failed:", await res.text());
      return NextResponse.json(
        {
          ok: false,
          errors: {
            process:
              "We couldn't send your inquiry just now. Please try again, or email us directly once our address is listed.",
          },
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, forwarded: true });
  }

  // No forwarding configured: accept + log honestly. The client tells the
  // visitor the message was received but email delivery isn't wired up yet.
  console.log("Contact inquiry received (email forwarding not configured):", {
    ...payload,
    website: undefined,
  });
  return NextResponse.json({ ok: true, forwarded: false });
}
