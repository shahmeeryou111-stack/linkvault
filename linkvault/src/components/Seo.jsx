import { Helmet } from "react-helmet-async";

const BASE = "https://linkvault.io";

export default function Seo({
  title,
  description,
  path = "/",
  jsonLd = [],
  noindex = false,
}) {
  const url = BASE + (path === "/" ? "/" : "/#" + path);
  const scripts = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {scripts.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
