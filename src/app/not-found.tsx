import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      className="bd-landing flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground"
      id="main-content"
    >
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <nav aria-label="Helpful pages" className="flex flex-wrap justify-center gap-3">
        <Button asChild><Link href="/">Back to home</Link></Button>
        <Button asChild variant="outline"><Link href="/services">Services</Link></Button>
        <Button asChild variant="outline"><Link href="/projects">Projects</Link></Button>
        <Button asChild variant="outline"><Link href="/contact">Contact</Link></Button>
      </nav>
    </main>
  );
}
