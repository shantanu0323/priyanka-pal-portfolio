import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./Counter.module.less";

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
};

export default function Counter({ value, suffix = "", duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, reduce]);

  return (
    <span ref={ref} className={styles.counter}>
      0{suffix}
    </span>
  );
}
