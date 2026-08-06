import { Resend } from "resend";
import { NextResponse } from "next/server";

/**
 * Contact form handler using Resend.
 *
 * Environment Variables required in Vercel:
 * - RESEND_API_KEY: Your Resend API key (starts with `re_...`)
 * - CONTACT_TO: The personal email address where you want to receive inquiries.
 * - RESEND_FROM (optional): Sender address (defaults to `Portfolio Contact <onboarding@resend.dev>`)
 */

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

/** In-memory rate limiting */
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [entry, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entry);
    }
  }

  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const destinationEmail = process.env.CONTACT_TO;

  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set.");
    return NextResponse.json(
      {
        message:
          "The contact form isn't configured yet. Please connect via social links.",
      },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Honeypot field
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return NextResponse.json({ message: "Message sent." }, { status: 200 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  if (
    !name ||
    name.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 200 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { message: "Please check the fields and try again." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        message:
          "That's a few messages in quick succession — try again shortly.",
      },
      { status: 429 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const fromAddress =
      process.env.RESEND_FROM ||
      "Portfolio Contact <contact@muhammadsaadzafar.com>";
    const toAddress = destinationEmail || "sz9077089@gmail.com";

    const data = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: `${name} <${email}>`,
      subject: `Portfolio Enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (data.error) {
      console.error("Resend API error:", data.error);
      return NextResponse.json(
        { message: data.error.message || "Could not send email." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Thanks — your message has been sent!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json(
      { message: "Couldn't send that right now. Please try again later." },
      { status: 502 },
    );
  }
}
