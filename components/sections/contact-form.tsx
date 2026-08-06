"use client";

import { useState } from "react";

import { Action } from "@/components/ui/action";
import { cn } from "@/lib/utils";

type Status = { type: "idle" | "success" | "error"; message: string };

const FIELD_CLASS =
  "w-full border-b border-white/10 bg-transparent py-3.5 text-base text-ink outline-none transition-colors duration-500 ease-editorial placeholder:text-ink-faint focus:border-accent aria-[invalid=true]:border-red-400/70";

export function ContactForm({ email: contactEmail }: { email: string }) {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please add a valid email address.";
    }
    if (values.message.trim().length < 10) {
      next.message = "A little more detail would help.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!validate()) {
      setStatus({
        type: "error",
        message: "Please check the highlighted fields.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          // Honeypot — real people leave this empty.
          company: formData.get("company") ?? "",
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: "Thanks — your message is through. I'll get back to you soon.",
      });
      setValues({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Couldn't send that. Please try again, or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div>
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(FIELD_CLASS, "mt-2")}
          placeholder="Your name"
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(FIELD_CLASS, "mt-2")}
          placeholder="you@company.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(FIELD_CLASS, "mt-2 resize-none")}
          placeholder="What are you building?"
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot. Hidden from people and from assistive tech alike. */}
      <div className="absolute h-px w-px overflow-hidden opacity-0" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Action type="submit" variant="solid" disabled={isSubmitting} arrow={false}>
          {isSubmitting ? "Sending…" : "Send message"}
        </Action>

        <p
          aria-live="polite"
          className={cn(
            "text-sm text-pretty",
            status.type === "success" && "text-accent",
            status.type === "error" && "text-red-400",
            status.type === "idle" && "text-ink-muted",
          )}
        >
          {status.message}
          {/* A failed send must never be a dead end — offer the address that
              always works, whatever went wrong upstream. */}
          {status.type === "error" && contactEmail && (
            <>
              {" "}
              <a
                href={`mailto:${contactEmail}`}
                className="link-wipe text-ink transition-colors duration-500 ease-editorial hover:text-accent"
              >
                {contactEmail}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
