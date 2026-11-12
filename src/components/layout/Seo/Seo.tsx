import Head from "next/head";
import { site } from "src/data/site";

type Props = {
  /** Page title; rendered through the title template. Omit for the default site title. */
  title?: string;
  description?: string;
  /** Route path, e.g. "/" — used for the canonical and og:url. */
  path?: string;
  noindex?: boolean;
  /** Emit Person/WebSite JSON-LD (home page only). */
  structuredData?: boolean;
};

const { meta } = site;
const absolute = (path: string) => `${meta.url}${path}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${meta.url}/#person`,
      name: `${site.name.first} ${site.name.last}`,
      jobTitle: meta.jobTitle,
      description: meta.description,
      url: meta.url,
      email: `mailto:${site.email}`,
      image: absolute(meta.ogImage.src),
      address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
      sameAs: [site.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${meta.url}/#website`,
      name: meta.siteName,
      url: meta.url,
      inLanguage: "en",
      publisher: { "@id": `${meta.url}/#person` },
    },
  ],
};

/** Per-page <head> metadata: title, description, canonical, Open Graph and Twitter card. */
export default function Seo({
  title,
  description = meta.description,
  path = "/",
  noindex = false,
  structuredData = false,
}: Props) {
  const fullTitle = title ? meta.titleTemplate.replace("%s", title) : meta.title;
  const url = absolute(path);
  const image = absolute(meta.ogImage.src);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={url} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:locale" content={meta.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content={String(meta.ogImage.width)} />
      <meta property="og:image:height" content={String(meta.ogImage.height)} />
      <meta property="og:image:alt" content={meta.ogImage.alt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={meta.ogImage.alt} />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
