import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getServerEnv } from "@/lib/env";
import { ContactSchema } from "@/lib/schemas/contact";

export const runtime = "nodejs";

// TODO: add @upstash/ratelimit (or similar) once we see real spam volume.
// MVP keeps the surface minimal — honeypot + Zod validation only.

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  // Honeypot — silently accept and discard so bots can't probe success.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;

  let env;
  try {
    env = getServerEnv();
  } catch (error) {
    console.error("[contact] env validation failed:", error);
    return NextResponse.json(
      { error: "Server is not configured to send mail" },
      { status: 500 },
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const fromAddress = env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const timestamp = new Date().toISOString();

  const text = `New portfolio contact

From:    ${name} <${email}>
Time:    ${timestamp}

${message}
`;

  const html = `<!doctype html>
<html><body style="font-family: -apple-system, system-ui, sans-serif; color: #0a0a0a; line-height: 1.6;">
  <h2 style="margin: 0 0 16px;">New portfolio contact</h2>
  <table cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
    <tr><td style="padding-right: 12px; color: #71717a;">From</td><td><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</td></tr>
    <tr><td style="padding-right: 12px; color: #71717a;">Time</td><td>${timestamp}</td></tr>
  </table>
  <pre style="white-space: pre-wrap; font-family: inherit; font-size: 14px; padding: 16px; background: #fafafa; border-left: 3px solid #d97706; border-radius: 4px;">${escapeHtml(message)}</pre>
</body></html>`;

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Portfolio: ${name}`,
      text,
      html,
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
