import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cx } from "src/lib/cx";
import styles from "./TiltCard.module.less";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

/** 3D tilt toward the cursor with a pear spotlight that follows it. */
export default function TiltCard({ children, className, maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springCfg = { stiffness: 180, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springCfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springCfg);
  const spotX = useTransform(px, (v) => `${v * 100}%`);
  const spotY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX} ${spotY}, rgba(218, 249, 75, 0.14), transparent 60%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={styles.perspective}>
      <motion.div
        ref={ref}
        className={cx(styles.card, className)}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY }}
      >
        <motion.div className={styles.spotlight} style={{ background: spotlight }} aria-hidden />
        <div className={styles.content}>{children}</div>
      </motion.div>
    </div>
  );
}
