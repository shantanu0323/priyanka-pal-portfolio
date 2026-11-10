import Instagram from "src/components/ui/InstagramIcon/InstagramIcon";
import Button from "src/components/ui/Button/Button";
import InstagramEmbed from "src/components/ui/InstagramEmbed/InstagramEmbed";
import Reveal from "src/components/ui/Reveal/Reveal";
import SectionHeading from "src/components/ui/SectionHeading/SectionHeading";
import Tag from "src/components/ui/Tag/Tag";
import { site } from "src/data/site";
import styles from "./Reels.module.less";

const { reels } = site;

export default function Reels() {
  return (
    <section id="reels" className={styles.reels}>
      <div className={styles.head}>
        <SectionHeading
          eyebrow={reels.eyebrow}
          index="02"
          title={reels.title}
          description={reels.description}
        />
        <Reveal className={styles.more}>
          <Button href={reels.more.href} external variant="outline" icon={<Instagram />}>
            {reels.more.label}
          </Button>
        </Reveal>
      </div>

      <ul className={styles.track}>
        {reels.items.map((r, i) => (
          <Reveal as="li" key={r.code} delay={i * 0.08} className={styles.item}>
            <article>
              <header className={styles.meta}>
                <h3>{r.title}</h3>
                {r.brand && <Tag tone="pear">{r.brand}</Tag>}
              </header>
              <p className={styles.caption}>{r.caption}</p>
              <InstagramEmbed code={r.code} kind={r.kind} title={r.title} />
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
