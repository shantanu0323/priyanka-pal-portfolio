import { motion } from "framer-motion";
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

export default function Reveal({
  children,
  preset = "fadeUp",
  delay = 0,
  className,
  as = "div",
}: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={cx(styles.reveal, className)}
      variants={presets[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
