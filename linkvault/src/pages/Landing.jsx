import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout, { AdSlot } from "../components/Layout.jsx";
import Seo from "../components/Seo.jsx";
import { LINKS, FAQS } from "../data/links.js";

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Best Free Affiliate Programs No Sign Up Required (2025)",
  description:
    "Comprehensive list of the best free affiliate programs that require no sign up. Get instant affiliate links and start earning today.",
  url: "https://linkvault.io/",
  datePublished: "2025-01-01",
  dateModified: "2025-01-15",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Exness Trading Affiliate", url: "https://linkvault.io/#exness" },
      { "@type": "ListItem", position: 2, name: "Systeme.io Affiliate", url: "https://linkvault.io/#systeme" },
      { "@type": "ListItem", position: 3, name: "InVideo AI Affiliate", url: "https://linkvault.io/#invideo" },
      { "@type": "ListItem", position: 4, name: "Temu Affiliate", url: "https://linkvault.io/#temu" },
      { "@type": "ListItem", position: 5, name: "Wizard Liz Affiliate", url: "https://linkvault.io/#wizardliz" },
      { "@type": "ListItem", position: 6, name: "Andrew Tate Affiliate", url: "https://linkvault.io/#andrewtate" },
    ],
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const offerLds = LINKS.map((l) => ({
  "@context": "https://schema.org",
  "@type": "Offer",
  name: `${l.name} Affiliate Program`,
  description: `Promote ${l.name} for free — no sign up required. ${l.commission}.`,
  url: l.url,
  offeredBy: { "@type": "Organization", name: l.name },
  price: "0",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  category: l.category,
}));

const steps = [
  {
    icon: "fa-hand-pointer",
    title: "1. Grab Your Free Affiliate Link",
    text: "Join free in seconds — no registration forms, no approval waiting. Your dashboard instantly unlocks all six affiliate links, ready to copy with one click.",
  },
  {
    icon: "fa-share-nodes",
    title: "2. Share Where Your Audience Is",
    text: "Post your links on Twitter/X, Facebook, WhatsApp, Instagram, Telegram or in relevant communities. No website needed — share where the conversation already happens.",
  },
  {
    icon: "fa-coins",
    title: "3. Track Clicks & Earn Commissions",
    text: "Watch clicks and conversions update on your live dashboard. When someone takes action through your link, you may earn a commission — you keep 100% of it.",
  },
];

const testimonials = [
  { name: "Marcus T.", role: "Student, first-time affiliate", text: "I shared a couple of links on my group chats and started seeing clicks the same day. No account approval, no fees — exactly what a beginner needs." },
  { name: "Aisha R.", role: "Content creator", text: "Having all six programs in one dashboard saves me so much time. The Temu and InVideo links convert really well for my audience." },
  { name: "Diego M.", role: "Side-hustler", text: "The tracking dashboard makes it easy to see what's working. It genuinely feels like a real analytics tool, not a gimmick." },
];

export default function Landing() {
  return (
    <Layout>
      <Seo
        title="Best Free Affiliate Programs No Sign Up Required (2025) | LinkVault"
        description="Join the best free affiliate programs with no sign up required. Get instant affiliate links for Exness, Temu, Systeme.io, InVideo and more. 100% free, no registration."
        path="/"
        jsonLd={[webPageLd, faqLd, ...offerLds]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulseDot" />
            47,000+ affiliates already earning — no sign up needed
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight text-ink md:text-6xl"
          >
            Best Free Affiliate Programs —{" "}
            <span className="text-primary">No Sign Up Required</span>
          </motion.h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted md:text-lg">
            Get instant affiliate links for the top programs of 2025 — Exness,
            Temu, Systeme.io, InVideo AI and more. Copy, share, and start
            earning supplementary income online. 100% free, no registration, no
            credit card.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-bg hover:brightness-110"
            >
              Join free affiliate program
            </Link>
            <a
              href="#programs"
              className="rounded-xl border border-line px-6 py-3 font-semibold text-ink hover:border-primary"
            >
              Browse the programs
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["6", "Free programs"],
              ["$0", "Cost to join"],
              ["0", "Sign-up forms"],
              ["24/7", "Live tracking"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-xl border border-line bg-card p-4">
                <div className="font-display text-2xl font-bold text-primary">{n}</div>
                <div className="text-xs text-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AdSlot />
      </div>

      {/* PROGRAMS */}
      <section id="programs" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center text-3xl font-bold text-ink">
          Top 6 Free Affiliate Programs With Instant Links
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          Every program below is free to promote and requires no formal
          registration. Here's what makes each one worth adding to your rotation.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {LINKS.map((l, i) => (
            <motion.article
              key={l.key}
              id={l.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="scroll-mt-24 rounded-2xl border border-line bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-card2 text-primary">
                  <i className={`fa-solid ${l.icon}`} aria-hidden="true"></i>
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {l.name} — Free {l.category} Affiliate Program
                  </h3>
                  <span className="text-xs text-gold">{l.category}</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {l.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full border border-line px-3 py-1 text-primary">
                  {l.commission}
                </span>
                <span className="rounded-full border border-line px-3 py-1 text-muted">
                  Payout: {l.payoutSpeed}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <Link
                  to="/signup"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-bg hover:brightness-110"
                >
                  Get instant affiliate links
                </Link>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="text-sm text-muted hover:text-primary"
                >
                  Visit program <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-line bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-3xl font-bold text-ink">
            How to Start Affiliate Marketing For Free — No Registration
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <article key={s.title} className="rounded-2xl border border-line bg-card p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-card2 text-gold">
                  <i className={`fa-solid ${s.icon}`}></i>
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BEST */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold text-ink">
          What Makes These The Best Free Affiliate Programs?
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["No sign up or approval delays", "Skip the lengthy application forms most networks demand. Your links are ready the moment you join LinkVault."],
            ["Diverse, high-demand niches", "Finance, e-commerce, AI tools, marketing software and influencer pages — something that fits almost any audience."],
            ["Beginner-friendly payouts", "Programs like Temu and InVideo reward simple actions such as app installs and free signups, not just purchases."],
            ["Real, transparent tracking", "Your dashboard shows clicks, conversions and estimated earnings so you always know what's working."],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-3 rounded-2xl border border-line bg-card p-5">
              <i className="fa-solid fa-circle-check mt-1 text-primary"></i>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">{t}</h3>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-6 text-2xl font-bold text-ink">
          Free Affiliate Programs Compared
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-card2 text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Program</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Commission Range</th>
                <th className="px-4 py-3 font-semibold">Payout Speed</th>
                <th className="px-4 py-3 font-semibold">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {LINKS.map((l) => (
                <tr key={l.key} className="border-t border-line text-muted">
                  <td className="px-4 py-3 font-medium text-ink">{l.name}</td>
                  <td className="px-4 py-3">{l.category}</td>
                  <td className="px-4 py-3 text-primary">{l.commissionRange}</td>
                  <td className="px-4 py-3">{l.payoutSpeed}</td>
                  <td className="px-4 py-3">{l.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AdSlot />
      </div>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-bold text-ink">
          What Beginner Affiliates Are Saying
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-line bg-card p-6">
              <div className="mb-3 text-gold">
                {"★★★★★".split("").map((s, i) => (
                  <i key={i} className="fa-solid fa-star text-xs"></i>
                ))}
              </div>
              <blockquote className="text-sm text-muted">"{t.text}"</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-ink">
                {t.name} <span className="font-normal text-muted">· {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-line bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-center text-3xl font-bold text-ink">
            Frequently Asked Questions About Free Affiliate Programs
          </h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-line bg-card p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-ink">
                  <h3 className="font-display text-base font-semibold">{f.q}</h3>
                  <i className="fa-solid fa-plus text-primary transition-transform group-open:rotate-45"></i>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-ink">
          Start Earning With Free Affiliate Links Today
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          It takes seconds to join, costs nothing, and requires no registration
          approval. Your six affiliate links are waiting.
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-block rounded-xl bg-primary px-8 py-3 font-semibold text-bg hover:brightness-110"
        >
          Get instant affiliate links
        </Link>
      </section>
    </Layout>
  );
}
