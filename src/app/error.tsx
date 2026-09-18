"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center"
      id="main-content"
    >
      <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred. You can try again or head back to the homepage.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
