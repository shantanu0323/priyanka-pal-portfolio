import { motion } from "framer-motion";
import { lineReveal, stagger, viewportOnce } from "src/lib/motion";
import { cx } from "src/lib/cx";
import styles from "./WordReveal.module.less";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

/** Splits text into words that slide up one after another from behind a mask. */
export default function WordReveal({ text, as = "h2", className, delay = 0 }: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={cx(styles.words, className)}
      aria-label={text}
      variants={stagger(0.06, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={styles.mask} aria-hidden>
          <motion.span className={styles.word} variants={lineReveal}>
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
