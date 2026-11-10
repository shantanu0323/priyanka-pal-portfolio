import styles from "./Backdrop.module.less";

/** Fixed, page-wide ambient layers: grid, glow and film grain. */
export default function Backdrop() {
  return (
    <div className={styles.backdrop} aria-hidden>
      <div className={styles.grid} />
      <div className={styles.glow} />
      <div className={styles.grain} />
    </div>
  );
}
