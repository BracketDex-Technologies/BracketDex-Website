import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center"
      id="main-content"
    >
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
