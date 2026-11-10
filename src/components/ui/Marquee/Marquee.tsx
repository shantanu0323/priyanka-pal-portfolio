import { Sparkles } from "lucide-react";
import { cx } from "src/lib/cx";
import styles from "./Marquee.module.less";

type Props = {
  items: string[];
  reverse?: boolean;
  className?: string;
};

export default function Marquee({ items, reverse = false, className }: Props) {
  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span>{item}</span>
          <Sparkles className={styles.star} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cx(styles.marquee, reverse && styles.reverse, className)}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
