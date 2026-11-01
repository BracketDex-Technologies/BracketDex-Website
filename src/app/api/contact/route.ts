import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).optional().default(""),
});

const requests = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Please submit the form from this website." }, { status: 403 });
  }
  const forwarded = request.headers.get("x-forwarded-for") ?? "unknown";
  const address = forwarded.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  for (const [key, timestamps] of requests) {
    if (timestamps.every(timestamp => now - timestamp >= WINDOW_MS)) requests.delete(key);
  }
  const recent = (requests.get(address) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    return NextResponse.json({ error: "Please wait a few minutes before trying again." }, { status: 429 });
  }
  requests.set(address, [...recent, now]);

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return NextResponse.json({ error: "Enquiry delivery is unavailable. Please email us directly." }, { status: 503 });
  try {
    const { name, email, company, message } = parsed.data;
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, subject: "New BracketDex enquiry", from_name: "BracketDex website", name, email, company, message }),
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error("Delivery failed");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We could not send your enquiry. Please try again or email us directly." }, { status: 502 });
  }
}
