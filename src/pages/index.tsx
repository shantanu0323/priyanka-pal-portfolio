import Head from "next/head";
import Backdrop from "src/components/layout/Backdrop/Backdrop";
import Reveal from "src/components/ui/Reveal/Reveal";
import styles from "src/styles/Home.module.less";

export default function Home() {
  return (
    <>
      <Head>
        <title>Priyanka Pal — Portfolio</title>
        <meta name="description" content="Priyanka Pal's portfolio — under development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Backdrop />
      <main className={styles.main}>
        <Reveal>
          <span className={styles.badge}>
            <span className={styles.dot} /> Under development
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className={styles.title}>
            Priyanka <span className={styles.accent}>Pal</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={styles.subtitle}>Something good is being built here. Check back soon.</p>
        </Reveal>
      </main>
    </>
  );
}
