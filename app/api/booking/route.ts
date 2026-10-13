import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Meeting request:", body);
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (apiKey && to) {
      await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: "Meeting <onboarding@resend.dev>", to, reply_to: body.email || "", subject: `Meeting: ${body.name || ""}`, text: JSON.stringify(body, null, 2) }) });
    }
    return NextResponse.json({ ok: true, forwarded: !!(apiKey && to) });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
}
