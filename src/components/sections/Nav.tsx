"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/content";
import { Container } from "@/components/primitives/Container";
import { cn } from "@/lib/utils";

const EASE = [0.44, 0, 0.56, 1] as const;

const menuContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
};
const menuItem = {
  hidden: { opacity: 0, x: -24 },
  visible: (rest: number) => ({ opacity: rest, x: 0, transition: { duration: 0.22, ease: EASE } }),
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ease-brand",
        open
          ? "border-transparent bg-transparent"
          : scrolled
            ? "border-hairline bg-night/90 backdrop-blur-md"
            : "border-transparent bg-transparent",
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 -z-10 h-[100svh] w-full bg-night"
          >
            <Container className="flex h-full flex-col justify-center">
              <motion.nav variants={menuContainer} initial="hidden" animate="visible" className="flex flex-col gap-1">
                {nav.menuLinks.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    custom={Math.max(1 - i * 0.1, 0.34)}
                    variants={menuItem}
                    whileHover={{ opacity: 1, x: 8, transition: { duration: 0.12, ease: EASE } }}
                    style={{ marginLeft: `${i * 1.4}rem` }}
                    className="t-h3 w-fit py-2 text-foreground"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </motion.nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <Container>
        <div className="flex h-16 items-center justify-between">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="relative z-10 font-heading text-[20px] font-semibold tracking-[-0.04em] text-foreground"
          >
            {nav.logo}
          </a>

          <div className="flex items-center gap-6 lg:gap-10">
            <nav className={cn("items-center gap-9", open ? "hidden" : "hidden lg:flex")}>
              {nav.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="t-small text-foreground/90 transition-colors duration-200 ease-brand hover:text-brand"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {!open && (
              <a
                href={nav.cta.href}
                className="hidden rounded-[2px] border border-hairline px-4 py-2 t-small text-foreground transition-colors duration-200 ease-brand hover:border-brand hover:text-brand lg:inline-flex"
              >
                {nav.cta.label}
              </a>
            )}

            <button
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-brand lg:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
