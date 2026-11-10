import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { cx } from "src/lib/cx";
import styles from "./AppShell.module.less";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

/** Root wrapper: provides font variables and base typography to the whole app. */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={cx(styles.shell, display.variable, body.variable, mono.variable)}>
      {children}
    </div>
  );
}
