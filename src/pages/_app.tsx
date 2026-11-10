import "src/styles/globals.less";
import { MotionConfig } from "framer-motion";
import type { AppProps } from "next/app";
import AppShell from "src/components/layout/AppShell/AppShell";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </MotionConfig>
  );
}
