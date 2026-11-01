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
  return NextResponse.json({ ok: true });
}
