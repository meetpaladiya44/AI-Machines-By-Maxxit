"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const STAGGER_DELAY = 0.2;
const FALL_DURATION = 0.5;
const FALL_OFFSET_Y = -160;
const BOUNCE_EASE = [0.34, 1.45, 0.64, 1] as const;

export const fallingContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER_DELAY,
    },
  },
};

export const fallingItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: FALL_OFFSET_Y,
    scale: 0.92,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: FALL_DURATION,
      ease: BOUNCE_EASE,
    },
  },
};

export const fallingItemReducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};

export function FallingStagger({
  children,
  className,
  amount = 0.15,
  once = false,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={fallingContainerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function FallingStaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={reduce ? fallingItemReducedVariants : fallingItemVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}