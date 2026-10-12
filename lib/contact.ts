export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  industry: string;
  process: string;
  currentHandling: string;
  outcome: string;
  budget: string;
  timeline: string;
  /** Honeypot — must stay empty. */
  website: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (input.website) errors.website = "Invalid submission.";
  if (input.name.trim().length < 2)
    errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(input.email.trim()))
    errors.email = "Please enter a valid business email.";
  if (input.company.trim().length < 2)
    errors.company = "Please enter your company or business name.";
  if (input.process.trim().length < 10)
    errors.process =
      "Please describe the process in a little more detail (at least a sentence or two).";
  // outcome, currentHandling, budget, timeline, industry are optional.
  return errors;
}
