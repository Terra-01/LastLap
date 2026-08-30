import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { AccentCTA } from "@/components/primitives/AccentCTA";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page took a wrong turn. Head back to the start line.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center">
      <Container>
        <div className="flex max-w-xl flex-col items-start gap-6 py-24">
          <Link
            href="/"
            className="font-heading text-xl tracking-tight text-foreground transition-colors duration-200 ease-brand hover:text-brand"
          >
            {site.name}
          </Link>
          <span className="t-eyebrow uppercase tracking-[0.2em] text-brand">Error 404</span>
          <h1 className="t-display">You took a wrong turn.</h1>
          <p className="t-body max-w-md text-muted-foreground">
            This page isn&apos;t on the grid. It either never existed or it moved. Let&apos;s
            get you back to the start line.
          </p>
          <AccentCTA label="Back to home" href="/" className="mt-2" />
        </div>
      </Container>
    </main>
  );
}
