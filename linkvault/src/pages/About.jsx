import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Seo from "../components/Seo.jsx";

const team = [
  { name: "Elena Novak", role: "Founder & CEO", bio: "Former affiliate manager who believes earning online should be accessible to everyone, without paywalls." },
  { name: "Rahul Mehta", role: "Head of Product", bio: "Builds simple tools that remove friction between creators and the programs they promote." },
  { name: "Sofia Alvarez", role: "Community Lead", bio: "Helps thousands of beginner affiliates find their footing and share links effectively." },
];

export default function About() {
  return (
    <Layout>
      <Seo title="About LinkVault — Free Affiliate Programs Directory"
        description="Learn about LinkVault's mission to make affiliate marketing free and accessible with instant links and no sign up required."
        path="/about" />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">About LinkVault</h1>
        <p className="mt-4 text-muted">
          LinkVault is a free affiliate programs directory built for beginners.
          We bring together some of the best no-signup affiliate programs of 2025
          into a single dashboard, so anyone can start promoting quality offers
          and earning supplementary income — without paywalls, approval delays,
          or hidden fees.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-ink">Our Mission</h2>
        <p className="mt-3 text-muted">
          Traditional affiliate networks can be intimidating: long application
          forms, approval waiting periods, and confusing dashboards. We believe
          getting started should take seconds, not weeks. LinkVault removes those
          barriers so you can focus on what matters — sharing links your audience
          genuinely finds useful.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-ink">How We Make Money</h2>
        <p className="mt-3 text-muted">
          LinkVault is completely free for you to use. We may earn a small
          commission from some of the programs listed when referrals convert,
          and we display advertising to support the platform. This never costs
          you anything and never reduces your own earnings.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-ink">Meet the Team</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {team.map((t) => (
            <div key={t.name} className="rounded-2xl border border-line bg-card p-5">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-card2 text-primary">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="font-display font-semibold text-ink">{t.name}</div>
              <div className="text-xs text-gold">{t.role}</div>
              <p className="mt-2 text-sm text-muted">{t.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-card p-6 text-center">
          <p className="text-ink">Ready to start earning with free affiliate links?</p>
          <Link to="/signup" className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 font-semibold text-bg hover:brightness-110">
            Join free affiliate program
          </Link>
        </div>
      </div>
    </Layout>
  );
}
