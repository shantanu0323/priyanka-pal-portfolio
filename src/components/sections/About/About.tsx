import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef } from "react";
import Reveal from "src/components/ui/Reveal/Reveal";
import SectionHeading from "src/components/ui/SectionHeading/SectionHeading";
import Tag from "src/components/ui/Tag/Tag";
import { site } from "src/data/site";
import { asset } from "src/lib/asset";
import styles from "./About.module.less";

const { about } = site;

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  return (
    <section id="about" className={styles.about}>
      <div className={styles.grid}>
        <div ref={ref} className={styles.media}>
          <motion.div className={styles.portrait} style={{ y }}>
            <img src={asset(about.photo.src)} alt={about.photo.alt} loading="lazy" />
          </motion.div>
          <motion.div className={styles.polaroid} style={{ y: ySmall }}>
            <img
              src={asset(about.photoSecondary.src)}
              alt={about.photoSecondary.alt}
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className={styles.text}>
          <SectionHeading eyebrow={about.eyebrow} index="01" title={about.title} />
          <div className={styles.paragraphs}>
            {about.paragraphs.map((p, i) => (
              <Reveal key={p} delay={i * 0.08}>
                <p className={i === 0 ? styles.lead : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <blockquote className={styles.quote}>
              <Quote aria-hidden />
              {about.quote}
            </blockquote>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className={styles.facts} aria-label="Quick facts">
              {about.facts.map((f) => (
                <li key={f}>
                  <Tag>{f}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
