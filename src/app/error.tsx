"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex-center h-screen flex-col gap-5">
        <h2>Something went wrong!</h2>
        <div className="flex-between gap-5">
          <Button
            onClick={() => {
              reset();
              window.location.reload();
            }}
          >
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
