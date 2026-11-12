import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "src/components/ui/Reveal/Reveal";
import SectionHeading from "src/components/ui/SectionHeading/SectionHeading";
import { site } from "src/data/site";
import { asset } from "src/lib/asset";
import { cx } from "src/lib/cx";
import { ease } from "src/lib/motion";
import styles from "./Gallery.module.less";

const { gallery } = site;
const items = gallery.items;

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const isOpen = open !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    []
  );

  // Lock scroll while open and hand focus back to the photo that opened the lightbox.
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
      openerRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, step]);

  const current = open === null ? null : items[open];

  // The strip is rendered twice so the loop can wrap seamlessly; the copy is hidden from AT.
  const row = (copy: boolean) => (
    <ul className={styles.row} aria-hidden={copy || undefined}>
      {items.map((p, i) => (
        <li key={p.src} className={cx(styles.item, p.wide && styles.wide)}>
          <figure>
            <button
              type="button"
              className={styles.photo}
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setOpen(i);
              }}
              tabIndex={copy ? -1 : undefined}
            >
              <img src={asset(p.src)} alt={copy ? "" : p.alt} loading="lazy" />
            </button>
            <figcaption>{p.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.head}>
        <SectionHeading
          eyebrow={gallery.eyebrow}
          index="03"
          title={gallery.title}
          description={gallery.description}
        />
      </div>

      <Reveal className={styles.marquee}>
        <div className={cx(styles.track, open !== null && styles.paused)}>
          {row(false)}
          {row(true)}
        </div>
      </Reveal>

      <AnimatePresence>
        {current && (
          <motion.div
            ref={dialogRef}
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              key={current.src}
              className={styles.lightboxFigure}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={asset(current.src)} alt={current.alt} />
              <figcaption>{current.caption}</figcaption>
            </motion.figure>
            <button
              type="button"
              className={cx(styles.lbButton, styles.close)}
              onClick={() => setOpen(null)}
              aria-label={gallery.closeLabel}
              autoFocus
            >
              <X />
            </button>
            <button
              type="button"
              className={cx(styles.lbButton, styles.prev)}
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={gallery.prevLabel}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className={cx(styles.lbButton, styles.next)}
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={gallery.nextLabel}
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
