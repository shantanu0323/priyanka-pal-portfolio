import { Check, Copy, Mail } from "lucide-react";
import Instagram from "src/components/ui/InstagramIcon/InstagramIcon";
import { useEffect, useState } from "react";
import Button from "src/components/ui/Button/Button";
import Magnetic from "src/components/ui/Magnetic/Magnetic";
import Reveal from "src/components/ui/Reveal/Reveal";
import WordReveal from "src/components/ui/WordReveal/WordReveal";
import { mailto, site } from "src/data/site";
import styles from "./Contact.module.less";

const { contact, email, instagram } = site;

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = mailto(contact.emailSubject);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.panel}>
        <Reveal>
          <p className={styles.eyebrow}>{contact.eyebrow}</p>
        </Reveal>
        <WordReveal text={contact.title} className={styles.title} delay={0.05} />
        <Reveal delay={0.1}>
          <p className={styles.description}>{contact.description}</p>
        </Reveal>

        <Reveal delay={0.15} className={styles.actions}>
          <Magnetic strength={0.2}>
            <a href={mailto(contact.emailSubject)} className={styles.email}>
              <Mail aria-hidden />
              {email}
            </a>
          </Magnetic>
          <div className={styles.row}>
            <button
              type="button"
              onClick={copy}
              className={styles.copy}
              aria-label={copied ? contact.copiedLabel : contact.copyLabel}
            >
              {copied ? <Check /> : <Copy />}
              <span>{copied ? contact.copiedLabel : contact.copyLabel}</span>
            </button>
            <Button href={instagram} external variant="ghost" icon={<Instagram />}>
              {contact.instagramLabel}
            </Button>
          </div>
          <span className={styles.status} role="status" aria-live="polite">
            {copied ? contact.copiedLabel : ""}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
