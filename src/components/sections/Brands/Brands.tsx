import { ArrowUpRight } from "lucide-react";
import Reveal from "src/components/ui/Reveal/Reveal";
import SectionHeading from "src/components/ui/SectionHeading/SectionHeading";
import { site } from "src/data/site";
import { asset } from "src/lib/asset";
import styles from "./Brands.module.less";

const { brands } = site;

export default function Brands() {
  return (
    <section className={styles.brands} aria-labelledby="brands-title">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow={brands.eyebrow}
          title={<span id="brands-title">{brands.title}</span>}
          description={brands.description}
        />
        <ul className={styles.grid}>
          {brands.items.map((b, i) => (
            <Reveal as="li" key={b.name} delay={i * 0.1}>
              <a href={b.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <img src={asset(b.photo.src)} alt={b.photo.alt} loading="lazy" />
                <div className={styles.overlay}>
                  <span className={styles.arrow} aria-hidden>
                    <ArrowUpRight />
                  </span>
                  <ul className={styles.results}>
                    {b.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <h3>{b.name}</h3>
                  <p>{b.type}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
