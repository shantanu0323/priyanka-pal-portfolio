import type { ReactNode } from "react";
import { cx } from "src/lib/cx";
import Magnetic from "../Magnetic/Magnetic";
import styles from "./Button.module.less";

type Common = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  icon?: ReactNode;
  magnetic?: boolean;
  className?: string;
};

type AsLink = Common & { href: string; external?: boolean; type?: never; onClick?: never };
type AsButton = Common & {
  href?: never;
  external?: never;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function Button(props: AsLink | AsButton) {
  const { children, variant = "primary", size = "md", icon, magnetic = false, className } = props;
  const classes = cx(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </>
  );

  const element =
    props.href !== undefined ? (
      <a
        href={props.href}
        className={classes}
        {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    ) : (
      <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
        {content}
      </button>
    );

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}
