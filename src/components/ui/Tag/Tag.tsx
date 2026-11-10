import type { ReactNode } from "react";
import { cx } from "src/lib/cx";
import styles from "./Tag.module.less";

type Props = {
  children: ReactNode;
  tone?: "default" | "pear";
  className?: string;
};

export default function Tag({ children, tone = "default", className }: Props) {
  return <span className={cx(styles.tag, styles[tone], className)}>{children}</span>;
}
