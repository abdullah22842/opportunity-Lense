"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { budgetRanges, projectTypes } from "@/data/contact";
import {
  emptyEnquiry,
  MESSAGE_MAX,
  submitEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
  type SubmitResult,
} from "@/lib/contact";

/**
 * Enquiry form.
 *
 * Accessibility notes:
 * - Every control has a real <label>, not a placeholder standing in for one.
 * - Errors are tied to their input with aria-describedby and aria-invalid,
 *   and surfaced together in a live region at the top on submit.
 * - Focus moves to the first invalid control, so keyboard and screen-reader
 *   users land on the problem rather than hunting for it.
 * - Fields validate on submit, then re-validate as you type once they've
 *   errored — no scolding someone mid-way through their first attempt.
 */
export function ContactForm({
  defaultProjectType = "",
}: {
  /** Pre-selects the project type, e.g. when arriving from a service card. */
  defaultProjectType?: string;
}) {
  const formId = useId();
  const [values, setValues] = useState<EnquiryValues>({
    ...emptyEnquiry,
    projectType: defaultProjectType,
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  function update<K extends keyof EnquiryValues>(
    name: K,
    value: EnquiryValues[K]
  ) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Only re-check after a failed submit, so typing isn't interrupted.
    if (submitted) setErrors(validateEnquiry(next));
  }

  function describedBy(name: keyof EnquiryValues, extra?: string) {
    const ids = [errors[name] ? errorId(name) : null, extra ?? null].filter(
      Boolean
    );
    return ids.length ? ids.join(" ") : undefined;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setResult(null);

    const found = validateEnquiry(values);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(
        `#${CSS.escape(fieldId(firstInvalid))}`
      );
      el?.focus();
      return;
    }

    setPending(true);
    const outcome = await submitEnquiry(values);
    setPending(false);
    setResult(outcome);

    if (outcome.status === "sent") {
      setValues({ ...emptyEnquiry, projectType: defaultProjectType });
      setSubmitted(false);
      setErrors({});
    }
  }

  const errorList = Object.entries(errors);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${formId}-heading`}
      className="card p-6 sm:p-8"
    >
      <div className="relative z-10">
        <h2 id={`${formId}-heading`} className="text-xl! font-semibold">
          Send an enquiry
        </h2>

        {/* Status region — announced whenever it changes */}
        <div aria-live="polite" className="empty:hidden">
          {submitted && errorList.length > 0 && (
            <div
              role="alert"
              className="mt-5 rounded-[var(--radius-sm)] border border-[#e0616a]/40 bg-[#e0616a]/8 p-4"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <TriangleAlert className="size-4 shrink-0 text-[#e0616a]" />
                {errorList.length === 1
                  ? "One field needs attention"
                  : `${errorList.length} fields need attention`}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                {errorList.map(([name, message]) => (
                  <li key={name}>
                    <a
                      href={`#${fieldId(name)}`}
                      className="underline underline-offset-2 hover:text-cyan"
                    >
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result?.status === "sent" && (
            <div className="mt-5 flex items-start gap-2 rounded-[var(--radius-sm)] border border-cyan/40 bg-cyan/8 p-4 text-sm text-ink-soft">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan" />
              <p>Thanks — your enquiry is in. We&apos;ll be in touch shortly.</p>
            </div>
          )}

          {result?.status === "not-configured" && (
            <div className="mt-5 flex items-start gap-2 rounded-[var(--radius-sm)] border border-line bg-surface-2 p-4 text-sm text-ink-soft">
              <Info className="mt-0.5 size-4 shrink-0 text-muted" />
              <p>
                This form isn&apos;t connected yet, so nothing was sent. Contact
                details will be published here shortly.
              </p>
            </div>
          )}

          {result?.status === "error" && (
            <div
              role="alert"
              className="mt-5 flex items-start gap-2 rounded-[var(--radius-sm)] border border-[#e0616a]/40 bg-[#e0616a]/8 p-4 text-sm text-ink-soft"
            >
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[#e0616a]" />
              <p>{result.message}</p>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor={fieldId("name")} className="field-label">
              Name
            </label>
            <input
              id={fieldId("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
              className="field-control"
            />
            {errors.name && (
              <span id={errorId("name")} className="field-error">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor={fieldId("email")} className="field-label">
              Email
            </label>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              className="field-control"
            />
            {errors.email && (
              <span id={errorId("email")} className="field-error">
                {errors.email}
              </span>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor={fieldId("company")} className="field-label">
              Company / Organisation{" "}
              <span className="field-optional">(optional)</span>
            </label>
            <input
              id={fieldId("company")}
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={describedBy("company")}
              className="field-control"
            />
            {errors.company && (
              <span id={errorId("company")} className="field-error">
                {errors.company}
              </span>
            )}
          </div>

          {/* Project type */}
          <div>
            <label htmlFor={fieldId("projectType")} className="field-label">
              Project type
            </label>
            <select
              id={fieldId("projectType")}
              name="projectType"
              required
              value={values.projectType}
              onChange={(e) => update("projectType", e.target.value)}
              aria-invalid={errors.projectType ? true : undefined}
              aria-describedby={describedBy("projectType")}
              className="field-control"
            >
              <option value="">Select one</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <span id={errorId("projectType")} className="field-error">
                {errors.projectType}
              </span>
            )}
          </div>

          {/* Budget */}
          <div className="sm:col-span-2">
            <label htmlFor={fieldId("budget")} className="field-label">
              Budget range <span className="field-optional">(optional)</span>
            </label>
            <select
              id={fieldId("budget")}
              name="budget"
              value={values.budget}
              onChange={(e) => update("budget", e.target.value)}
              aria-describedby={describedBy("budget", `${formId}-budget-hint`)}
              className="field-control"
            >
              <option value="">Prefer not to say</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <span id={`${formId}-budget-hint`} className="field-hint">
              A rough band helps us suggest a sensible scope. It isn&apos;t a
              commitment.
            </span>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label htmlFor={fieldId("message")} className="field-label">
              Message
            </label>
            <textarea
              id={fieldId("message")}
              name="message"
              required
              rows={6}
              maxLength={MESSAGE_MAX}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy(
                "message",
                `${formId}-message-hint`
              )}
              className="field-control"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              {errors.message ? (
                <span id={errorId("message")} className="field-error">
                  {errors.message}
                </span>
              ) : (
                <span id={`${formId}-message-hint`} className="field-hint">
                  What are you trying to build, and what does success look like?
                </span>
              )}
              <span className="field-hint" aria-hidden="true">
                {values.message.length}/{MESSAGE_MAX}
              </span>
            </div>
          </div>
        </div>

        {/* Honeypot — hidden from people, tempting to bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor={fieldId("website")}>Leave this field empty</label>
          <input
            id={fieldId("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send Enquiry"}
            {!pending && <ArrowRight className="size-4" />}
          </Button>
          <p className="text-sm text-muted">
            We&apos;ll only use your details to reply to this enquiry.
          </p>
        </div>
      </div>
    </form>
  );
}
