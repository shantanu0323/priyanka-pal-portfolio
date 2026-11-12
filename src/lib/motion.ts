import type { Transition, Variants } from "framer-motion";

/**
 * Central motion library. Tweak durations, easings and variants here
 * and every component that uses them picks up the change.
 */

export const ease = [0.22, 1, 0.36, 1] as const;

export const spring: Transition = { type: "spring", stiffness: 260, damping: 26 };
export const softSpring: Transition = { type: "spring", stiffness: 120, damping: 20, mass: 0.6 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

export const blurUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

export const tiltUp: Variants = {
  hidden: { opacity: 0, y: 60, rotate: 2, scale: 0.96 },
  visible: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { duration: 1, ease } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Line-by-line headline reveal: each line slides up from behind a mask. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease } },
};

export const presets = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight,
  blurUp,
  tiltUp,
} as const;
export type PresetName = keyof typeof presets;

export const viewportOnce = { once: true, margin: "-80px" } as const;
