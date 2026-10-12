"use client";

import { useState } from "react";
import { contact } from "@/lib/site";
import { validateContact, type ContactErrors } from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; forwarded: boolean }
  | { kind: "error"; message: string };

const initial = {
  name: "",
  email: "",
  company: "",
  industry: "",
  process: "",
  currentHandling: "",
  outcome: "",
  budget: "",
  timeline: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function set<K extends keyof typeof initial>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clientErrors = validateContact(values);
    // Honeypot trips silently succeed client-side too.
    if (clientErrors.website && Object.keys(clientErrors).length === 1) {
      setStatus({ kind: "sent", forwarded: false });
      return;
    }
    delete clientErrors.website;
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus({ kind: "sent", forwarded: data.forwarded === true });
        setValues(initial);
      } else {
        setErrors(data.errors ?? {});
        setStatus({
          kind: "error",
          message:
            data.errors?.process ??
            "Something went wrong. Please check the form and try again.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn't send your inquiry just now. Please try again in a moment.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="form-status" data-tone="success" role="status">
        <p>
          <strong>Thank you. Your inquiry was received.</strong>
        </p>
        <p>
          {status.forwarded ? (
            "We will get back to you shortly."
          ) : contact.email ? (
            <>
              Our inbox connection is still being set up, so to be safe,
              please also email us directly at{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>. We
              don&apos;t want to miss you.
            </>
          ) : (
            "Our inbox connection is still being set up, so to be safe, please also reach out once our email address is listed here. We don't want to miss you."
          )}
        </p>
      </div>
    );
  }

  const field = (
    id: keyof typeof initial,
    label: string,
    opts?: { optional?: boolean; type?: string; textarea?: boolean; hint?: string },
  ) => (
    <div className="form-field">
      <label htmlFor={id}>
        {label}{" "}
        {opts?.optional ? <span className="optional">(optional)</span> : null}
      </label>
      {opts?.textarea ? (
        <textarea
          id={id}
          value={values[id]}
          onChange={(e) => set(id, e.target.value)}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={opts?.type ?? "text"}
          value={values[id]}
          onChange={(e) => set(id, e.target.value)}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
          autoComplete={
            id === "name" ? "name" : id === "email" ? "email" : undefined
          }
        />
      )}
      {errors[id] ? (
        <p className="field-error" id={`${id}-error`} role="alert">
          {errors[id]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      {status.kind === "error" ? (
        <div className="form-status" data-tone="error" role="alert">
          {status.message}
        </div>
      ) : null}
      <div className="grid-2">
        {field("name", "Name")}
        {field("email", "Business email", { type: "email" })}
      </div>
      <div className="grid-2">
        {field("company", "Company or business name")}
        {field("industry", "Industry", { optional: true })}
      </div>
      {field("process", "What process would you like to improve?", {
        textarea: true,
      })}
      {field("currentHandling", "How do you currently handle it?", {
        optional: true,
        textarea: true,
      })}
      {field("outcome", "What outcome are you hoping for?", {
        optional: true,
        textarea: true,
      })}
      <div className="grid-2">
        {field("budget", "Budget range", { optional: true })}
        {field("timeline", "Timeline", { optional: true })}
      </div>
      {/* Honeypot: hidden from sighted users and assistive tech. */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="button"
        disabled={status.kind === "sending"}
      >
        {status.kind === "sending" ? "Sending…" : "Send inquiry"}
      </button>
      <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
        {contact.privacyNotice}
      </p>
    </form>
  );
}
