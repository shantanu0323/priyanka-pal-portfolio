import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./Counter.module.less";

type Props = {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
};

export default function Counter({ value, suffix = "", decimals = 0, duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    const format = (v: number) => `${v.toFixed(decimals)}${suffix}`;
    if (reduce) {
      node.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, decimals, duration, reduce]);

  return (
    <span ref={ref} className={styles.counter} aria-label={`${value}${suffix}`}>
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
