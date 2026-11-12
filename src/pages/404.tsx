import Backdrop from "src/components/layout/Backdrop/Backdrop";
import Seo from "src/components/layout/Seo/Seo";
import Button from "src/components/ui/Button/Button";
import { asset } from "src/lib/asset";
import styles from "src/styles/NotFound.module.less";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="This page wandered off the map. Head back to Priyanka Pal's portfolio."
        path="/404"
        noindex
      />
      <Backdrop />
      <main className={styles.main}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page wandered off the map.</h1>
        <p className={styles.text}>The link may be broken, or the page has moved.</p>
        <Button href={asset("/")} size="lg">
          Back to home
        </Button>
      </main>
    </>
  );
}
