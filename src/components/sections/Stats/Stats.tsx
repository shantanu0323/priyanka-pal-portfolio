import { Eye, Heart, MapPin, Users } from "lucide-react";
import Counter from "src/components/ui/Counter/Counter";
import Reveal from "src/components/ui/Reveal/Reveal";
import SectionHeading from "src/components/ui/SectionHeading/SectionHeading";
import { site } from "src/data/site";
import { cx } from "src/lib/cx";
import styles from "./Stats.module.less";

const { stats } = site;
const icons = [Eye, Heart, MapPin, Users];

export default function Stats() {
  return (
    <section id="stats" className={styles.stats}>
      <div className={styles.inner}>
        <SectionHeading
          eyebrow={stats.eyebrow}
          index="03"
          title={stats.title}
          description={stats.description}
        />
        <ul className={styles.grid}>
          {stats.items.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal as="li" key={s.label} delay={i * 0.08} className={styles.cell}>
                <div className={cx(styles.card, i === 0 && styles.featured)}>
                  <Icon className={styles.icon} aria-hidden />
                  <span className={styles.value}>
                    <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </span>
                  <span className={styles.label}>{s.label}</span>
                </div>
              </Reveal>
            );
          })}
        </ul>
        <p className={styles.note}>{stats.note}</p>
      </div>
    </section>
  );
}
