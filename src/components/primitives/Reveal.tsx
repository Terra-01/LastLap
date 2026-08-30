"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.44, 0, 0.56, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** vertical offset of the "from" state, in px */
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  y = 40,
  delay = 0,
  duration = 0.45,
  once = true,
}: RevealProps) {
  // The tree is identical on server + client (no reduced-motion branching here,
  // which would cause a hydration mismatch). Reduced motion is handled globally
  // via <MotionConfig reducedMotion="user"> in providers, which skips transform
  // animations for those users while keeping the markup stable.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
