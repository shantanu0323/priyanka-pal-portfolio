import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { presets, viewportOnce, type PresetName } from "src/lib/motion";
import styles from "./Reveal.module.less";
import { cx } from "src/lib/cx";

type Props = {
  children: ReactNode;
  preset?: PresetName;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
};

// MotionConfig's reducedMotion only skips transforms; filter would still animate.
// The fallback resets it instantly so the pre-rendered blur never sticks.
const reducedFade: Variants = {
  hidden: { opacity: 0, filter: "blur(0px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, filter: { duration: 0 } },
  },
};
const reducedFallback: Partial<Record<PresetName, Variants>> = {
  blurUp: reducedFade,
};

const withDelay = (variants: Variants, delay: number): Variants => {
  const visible = variants.visible;
  if (!delay || typeof visible !== "object") return variants;
  return {
    ...variants,
    visible: { ...visible, transition: { ...visible.transition, delay } },
  };
};

export default function Reveal({
  children,
  preset = "fadeUp",
  delay = 0,
  className,
  as = "div",
}: Props) {
  const reduceMotion = useReducedMotion();
  const variants = (reduceMotion && reducedFallback[preset]) || presets[preset];
  const Tag = motion[as];
  return (
    <Tag
      className={cx(styles.reveal, className)}
      variants={withDelay(variants, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Tag>
  );
}
