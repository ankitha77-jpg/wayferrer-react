import { Helmet } from "react-helmet-async";

const SITE_NAME = "Wayfarer Footprints";
const BASE_URL = "https://wayfarerfootprints.com";
const DEFAULT_IMAGE = `${BASE_URL}/images/og-default.jpg`;

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: "website" | "article";
  /** JSON-LD structured data objects to embed as <script type="application/ld+json"> */
  structuredData?: object[];
}

export function Seo({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  structuredData = [],
}: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${canonical}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {structuredData.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
