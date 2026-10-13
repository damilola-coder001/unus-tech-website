"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { meeting } from "@/lib/site";
export function WhatsAppPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const d = sessionStorage.getItem("wa-popup-dismissed");
    if (d) { setDismissed(true); return; }
    const t = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = useCallback(() => { setVisible(false); setDismissed(true); sessionStorage.setItem("wa-popup-dismissed", "1"); }, []);
  useEffect(() => { if (!visible) return; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, [visible]);
  if (!visible || dismissed) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Offer" style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(7,7,8,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "var(--color-bg-raised)", border: "1px solid var(--color-line)", borderRadius: "12px", maxWidth: "28rem", width: "100%", padding: "2rem", position: "relative", boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}>
        <button onClick={dismiss} aria-label="Close" style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "none", border: "1px solid var(--color-line)", borderRadius: "6px", padding: "0.35rem 0.65rem", cursor: "pointer" }}>Close</button>
        <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)" }}>NEW FROM UNUS TECHNOLOGIES</span>
        <h3 style={{ fontSize: "1.25rem", margin: "0.5rem 0 0.75rem", lineHeight: 1.25 }}>Your WhatsApp Could Be Doing More.</h3>
        <p style={{ fontSize: "0.95rem", color: "var(--color-ink-soft)", marginBottom: "1rem" }}>Meet your custom WhatsApp AI agent. Answer customer questions, handle enquiries, manage bookings, and automate repetitive tasks.</p>
        <div style={{ fontWeight: 700, color: "var(--color-gold)", marginBottom: "0.25rem" }}>Starting at $50</div>
        <div style={{ fontSize: "0.85rem", color: "var(--color-muted)", marginBottom: "1.25rem" }}>Backed by our 30-day money-back guarantee.</div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a className="button" href={meeting.bookingUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Book a Meeting</a>
          <Link href="/whatsapp-ai-agent" className="button button-secondary" style={{ textDecoration: "none" }}>Explore the Package</Link>
        </div>
      </div>
    </div>
  );
}
