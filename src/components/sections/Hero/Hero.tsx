import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { useRef } from "react";
import Button from "src/components/ui/Button/Button";
import Tag from "src/components/ui/Tag/Tag";
import TiltCard from "src/components/ui/TiltCard/TiltCard";
import { site } from "src/data/site";
import { asset } from "src/lib/asset";
import { ease, fadeUp, lineReveal, stagger } from "src/lib/motion";
import styles from "./Hero.module.less";

const { hero, name } = site;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const [main, second, third] = hero.photos;

  return (
    <section id="top" ref={ref} className={styles.hero}>
      <motion.div
        className={styles.copy}
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp}>
          <Tag tone="pear">
            <span className={styles.pulse} aria-hidden />
            {hero.eyebrow}
          </Tag>
        </motion.div>

        <h1 className={styles.title}>
          <span className={styles.mask}>
            <motion.span className={styles.line} variants={lineReveal}>
              {name.first}
            </motion.span>
          </span>
          <span className={styles.mask}>
            <motion.span className={styles.line} variants={lineReveal}>
              <em>{name.last}</em>.
            </motion.span>
          </span>
        </h1>

        <motion.p className={styles.headline} variants={fadeUp}>
          {hero.headline}
        </motion.p>
        <motion.p className={styles.supporting} variants={fadeUp}>
          {hero.supporting}
        </motion.p>

        <motion.div className={styles.ctas} variants={fadeUp}>
          <Button href={hero.primaryCta.href} size="lg" magnetic icon={<ArrowUpRight />}>
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} size="lg" variant="ghost" icon={<Play />}>
            {hero.secondaryCta.label}
          </Button>
        </motion.div>
      </motion.div>

      <div className={styles.visual}>
        <motion.div
          className={styles.back}
          style={{ y: yBack }}
          initial={{ opacity: 0, rotate: -14, x: 40 }}
          animate={{ opacity: 1, rotate: -8, x: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
        >
          <img src={asset(second.src)} alt={second.alt} className={styles.photo} />
        </motion.div>
        <motion.div
          className={styles.backRight}
          style={{ y: yBack }}
          initial={{ opacity: 0, rotate: 14, x: -40 }}
          animate={{ opacity: 1, rotate: 7, x: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease }}
        >
          <img src={asset(third.src)} alt={third.alt} className={styles.photo} />
        </motion.div>
        <motion.div
          className={styles.front}
          style={{ y: yFront }}
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
        >
          <TiltCard className={styles.card}>
            <img src={asset(main.src)} alt={main.alt} className={styles.photo} />
          </TiltCard>
        </motion.div>

        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease }}
        >
          <strong>{hero.badge.value}</strong>
          <span>{hero.badge.label}</span>
        </motion.div>
        <motion.div
          className={styles.badgeAlt}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease }}
        >
          <strong>{hero.badgeSecondary.value}</strong>
          <span>{hero.badgeSecondary.label}</span>
        </motion.div>
      </div>

      <a href="#about" className={styles.scroll} aria-label="Scroll to About">
        <ArrowDown />
      </a>
    </section>
  );
}
