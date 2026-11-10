import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, lineReveal, stagger, viewportOnce } from "src/lib/motion";
import { cx } from "src/lib/cx";
import styles from "./SectionHeading.module.less";

type Props = {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <motion.header
      className={cx(styles.heading, styles[align], className)}
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.p className={styles.eyebrow} variants={fadeUp}>
        {index && <span className={styles.index}>{index}</span>}
        <span className={styles.rule} />
        {eyebrow}
      </motion.p>
      <h2 className={styles.title}>
        <span className={styles.mask}>
          <motion.span className={styles.line} variants={lineReveal}>
            {title}
          </motion.span>
        </span>
      </h2>
      {description && (
        <motion.p className={styles.description} variants={fadeUp}>
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
