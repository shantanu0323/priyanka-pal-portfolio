import { Html, Head, Main, NextScript } from "next/document";
import { site } from "src/data/site";
import { asset } from "src/lib/asset";

export default function Document() {
  const { meta } = site;
  return (
    <Html lang="en">
      <Head>
        <meta name="author" content={meta.author} />
        <meta name="keywords" content={meta.keywords.join(", ")} />
        <meta name="theme-color" content={meta.themeColor} />
        <meta name="color-scheme" content="dark" />
        <meta name="apple-mobile-web-app-title" content={meta.siteName} />
        <meta name="application-name" content={meta.siteName} />

        <link rel="icon" href={asset("/favicon.ico")} sizes="48x48" />
        <link rel="icon" href={asset("/favicon.svg")} type="image/svg+xml" />
        <link rel="icon" href={asset("/favicon-32x32.png")} type="image/png" sizes="32x32" />
        <link rel="icon" href={asset("/favicon-16x16.png")} type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} sizes="180x180" />
        <link rel="manifest" href={asset("/site.webmanifest")} />
        <link rel="author" href={asset("/humans.txt")} type="text/plain" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
