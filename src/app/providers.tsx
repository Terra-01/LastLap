"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion settings. `reducedMotion="user"` makes Framer Motion skip
 * transform/layout animations for visitors who prefer reduced motion, while
 * keeping the rendered markup identical on server and client (SSR-safe).
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
