import Head from "next/head";
import Backdrop from "src/components/layout/Backdrop/Backdrop";
import ScrollProgress from "src/components/layout/ScrollProgress/ScrollProgress";
import About from "src/components/sections/About/About";
import Brands from "src/components/sections/Brands/Brands";
import Contact from "src/components/sections/Contact/Contact";
import Footer from "src/components/sections/Footer/Footer";
import Gallery from "src/components/sections/Gallery/Gallery";
import Hero from "src/components/sections/Hero/Hero";
import Nav from "src/components/sections/Nav/Nav";
import Packages from "src/components/sections/Packages/Packages";
import Reels from "src/components/sections/Reels/Reels";
import Stats from "src/components/sections/Stats/Stats";
import Marquee from "src/components/ui/Marquee/Marquee";
import Reveal from "src/components/ui/Reveal/Reveal";
import { site } from "src/data/site";
import { asset } from "src/lib/asset";
import styles from "src/styles/Home.module.less";

export default function Home() {
  const { title, description, ogImage } = site.meta;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={asset(ogImage)} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={asset(ogImage)} />
        <link rel="preload" as="image" href={asset(site.hero.photos[0].src)} />
      </Head>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <Backdrop />
      <ScrollProgress />
      <Nav />
      <main id="main" className={styles.main}>
        <Hero />
        <Reveal preset="fadeIn" className={styles.marquee}>
          <Marquee items={site.marquee} />
        </Reveal>
        <About />
        <Reels />
        <Gallery />
        <Stats />
        <Brands />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
