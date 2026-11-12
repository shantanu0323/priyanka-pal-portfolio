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

// Instagram's embed layout breaks below this width, so narrower cards render it here and scale down.
const MIN_WIDTH = 326;
const FALLBACK_HEIGHT = 560;

/** Instagram embed iframe that only mounts once it's near the viewport. */
export default function InstagramEmbed({
  code,
  kind,
  title,
  linkLabel = "Watch on Instagram",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(MIN_WIDTH);
  const [height, setHeight] = useState(FALLBACK_HEIGHT);
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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The embed posts its rendered height so the frame can fit it without clipping or a scrollbar.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://www.instagram.com") return;
      if (e.source !== iframeRef.current?.contentWindow) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        const h = data?.type === "MEASURE" ? Number(data.details?.height) : NaN;
        if (h > 0) setHeight(h);
      } catch {
        // Not a message we understand.
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const scale = width > 0 ? Math.min(1, width / MIN_WIDTH) : 1;
  const innerWidth = scale < 1 ? MIN_WIDTH : width;

  return (
    <div className={cx(styles.embed, className)}>
      <div ref={ref} className={styles.frame} style={{ height: height * scale }}>
        {!loaded && (
          <div className={styles.skeleton} aria-hidden>
            <Instagram />
          </div>
        )}
        {visible && (
          <iframe
            ref={iframeRef}
            src={`${url}embed`}
            title={`${title} on Instagram`}
            loading="lazy"
            scrolling="no"
            allow="encrypted-media; picture-in-picture; web-share"
            className={cx(styles.iframe, loaded && styles.loaded)}
            style={{ width: innerWidth, height, transform: `scale(${scale})` }}
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
