import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import Button from "src/components/ui/Button/Button";
import Reveal from "src/components/ui/Reveal/Reveal";
import SectionHeading from "src/components/ui/SectionHeading/SectionHeading";
import { mailto, site } from "src/data/site";
import { cx } from "src/lib/cx";
import styles from "./Packages.module.less";

const { packages, contact } = site;

export default function Packages() {
  return (
    <section id="packages" className={styles.packages}>
      <div className={styles.inner}>
        <SectionHeading
          eyebrow={packages.eyebrow}
          index="05"
          title={packages.title}
          description={packages.description}
        />
        <ul className={styles.grid}>
          {packages.items.map((p, i) => (
            <Reveal as="li" key={p.name} preset="blurUp" delay={i * 0.1} className={styles.cell}>
              <div className={cx(styles.card, p.highlight && styles.highlight)}>
                {p.highlight && (
                  <span className={styles.badge}>
                    <Sparkles aria-hidden /> {packages.highlightLabel}
                  </span>
                )}
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.price}>
                  <small>{p.priceNote}</small>
                  {p.price}
                </p>
                <ul className={styles.features}>
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  href={mailto(`${contact.emailSubject} – ${p.name}`)}
                  variant={p.highlight ? "primary" : "ghost"}
                  icon={<ArrowUpRight />}
                  className={styles.button}
                >
                  {p.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
