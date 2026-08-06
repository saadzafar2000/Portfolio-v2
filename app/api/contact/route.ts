import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

/**
 * Contact proxy.
 *
 * Sends over SMTP using the mailbox that already backs contact@ — no third-party
 * form relay, no extra account, and mail arrives from the site's own domain.
 * Credentials are server-only and never cross to the browser.
 *
 * `replyTo` carries the visitor's address, so hitting Reply in the inbox answers
 * them directly rather than the site's own mailbox.
 */

// nodemailer needs Node APIs (net/tls); it cannot run on the Edge runtime.
export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

/**
 * In-memory rate limit. Adequate for a single-instance personal site; a
 * multi-instance deploy would want shared storage behind this.
 */
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

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 500) {
    for (const [entry, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entry);
    }
  }

  return false;
}

/** The message body is attacker-controlled; it must not be able to inject markup. */
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
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT ?? 465);

  if (!host || !user || !password) {
    console.error("SMTP_HOST, SMTP_USER or SMTP_PASSWORD is not set");
    return NextResponse.json(
      {
        message: "The contact form isn't configured. Please email me directly.",
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

  // Honeypot filled in means a bot. Return success so it learns nothing.
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

  /**
   * Rate limit only what reaches the mail server. Counting rejected payloads
   * here would lock someone out for a minute after three email typos, and
   * invalid requests cost nothing upstream anyway.
   */
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
    const transporter = nodemailer.createTransport({
      host,
      port,
      // 465 is implicit TLS; 587 upgrades with STARTTLS.
      secure: port === 465,
      auth: { user, pass: password },
      // Without these a hung mail server would hold the function open until the
      // platform's own timeout kills it, and the visitor just watches a spinner.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transporter.sendMail({
      // Must be the authenticated mailbox — most providers reject a From they
      // did not issue. The visitor's address goes in replyTo instead.
      from: `"Portfolio enquiry" <${user}>`,
      to: process.env.CONTACT_TO ?? user,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ message: "Message sent." }, { status: 200 });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json(
      { message: "Couldn't send that. Please try again, or email me directly." },
      { status: 502 },
    );
  }
}
