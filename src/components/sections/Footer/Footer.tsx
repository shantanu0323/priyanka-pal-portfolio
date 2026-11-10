import { ArrowUp } from "lucide-react";
import Instagram from "src/components/ui/InstagramIcon/InstagramIcon";
import { site } from "src/data/site";
import styles from "./Footer.module.less";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>{site.footer.copyright}</p>
        <div className={styles.links}>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram aria-hidden /> {site.instagramHandle}
          </a>
          <a href="#top">
            {site.footer.backToTop} <ArrowUp aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
