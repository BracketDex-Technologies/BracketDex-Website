import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your enquiry has been sent to BracketDex Technologies. Our team will review your requirements and get back to you.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
      <p className="bd-scene-label">Message sent</p>
      <h1 className="text-4xl font-semibold tracking-tight">Thanks — we’ll take it from here.</h1>
      <p className="max-w-xl text-muted-foreground">Your enquiry has been sent. We’ll review your requirement and get back to you.</p>
      <Link className="rounded-md bg-primary px-5 py-3 text-primary-foreground" href="/">Back to BracketDex</Link>
    </main>
  );
}
