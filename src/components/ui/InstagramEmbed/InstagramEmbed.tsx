import { ArrowUpRight } from "lucide-react";
import Instagram from "src/components/ui/InstagramIcon/InstagramIcon";
import { useEffect, useRef, useState } from "react";
import { cx } from "src/lib/cx";
import styles from "./InstagramEmbed.module.less";

type Props = {
  code: string;
  kind: "reel" | "p";
  title: string;
  linkLabel?: string;
  className?: string;
};

/** Instagram embed iframe that only mounts once it's near the viewport. */
export default function InstagramEmbed({
  code,
  kind,
  title,
  linkLabel = "Watch on Instagram",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const url = `https://www.instagram.com/${kind}/${code}/`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cx(styles.embed, className)}>
      <div ref={ref} className={styles.frame}>
        {!loaded && (
          <div className={styles.skeleton} aria-hidden>
            <Instagram />
          </div>
        )}
        {visible && (
          <iframe
            src={`${url}embed`}
            title={`${title} on Instagram`}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; web-share"
            className={cx(styles.iframe, loaded && styles.loaded)}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      <a className={styles.link} href={url} target="_blank" rel="noopener noreferrer">
        {linkLabel} <ArrowUpRight />
      </a>
    </div>
  );
}
