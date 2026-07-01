import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout.jsx";
import Seo from "../components/Seo.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useSimulation } from "../hooks/useSimulation.js";
import { LINKS } from "../data/links.js";

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://linkvault.io/" },
    { "@type": "ListItem", position: 2, name: "Affiliate Links", item: "https://linkvault.io/#/links" },
  ],
};

function copy(text) {
  navigator.clipboard?.writeText(text);
  toast.success("Link copied!");
}

export default function LinksPage() {
  const { user } = useAuth();
  const { state } = useSimulation(user?.id);

  return (
    <Layout>
      <Seo title="Your Free Affiliate Links — Copy & Share | LinkVault"
        description="Access, copy and share all six of your free affiliate links with per-link click and earnings stats."
        path="/links" jsonLd={breadcrumbLd} noindex />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav className="mb-1 text-xs text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary">Home</Link> / Links
        </nav>
        <h1 className="text-3xl font-bold text-ink">Your Free Affiliate Links</h1>
        <p className="mt-2 text-sm text-muted">
          Copy any link and share it on social media. Stats update live as clicks come in.
        </p>

        <div className="mt-8 space-y-4">
          {LINKS.map((l) => {
            const s = state?.perLink?.[l.key] || { clicks: 0, conversions: 0, earnings: 0 };
            return (
              <article key={l.key} className="rounded-2xl border border-line bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-card2 text-primary">
                      <i className={`fa-solid ${l.icon} text-lg`}></i>
                    </span>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-ink">{l.name}</h2>
                      <span className="text-xs text-gold">{l.category} · {l.commission}</span>
                    </div>
                  </div>
                  <div className="flex gap-6 text-center">
                    <div><div className="font-display text-xl font-bold text-ink">{s.clicks}</div><div className="text-xs text-muted">Clicks</div></div>
                    <div><div className="font-display text-xl font-bold text-ink">{s.conversions}</div><div className="text-xs text-muted">Conversions</div></div>
                    <div><div className="font-display text-xl font-bold text-gold">${s.earnings.toFixed(2)}</div><div className="text-xs text-muted">Earned</div></div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted">{l.description}</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1 truncate rounded-lg border border-line bg-card2 px-3 py-2.5 text-sm text-muted">{l.url}</div>
                  <button onClick={() => copy(l.url)}
                    className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-bg hover:brightness-110">
                    <i className="fa-solid fa-copy mr-1"></i> Copy
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
