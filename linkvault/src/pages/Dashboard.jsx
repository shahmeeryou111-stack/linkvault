import { useMemo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
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
    { "@type": "ListItem", position: 2, name: "Dashboard", item: "https://linkvault.io/#/dashboard" },
  ],
};

function copy(text) {
  navigator.clipboard?.writeText(text);
  toast.success("Copied to clipboard!");
}

function last7(daily) {
  const out = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      clicks: daily[key] || 0,
    });
  }
  return out;
}

function Skeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="skeleton mb-6 h-8 w-56 rounded-lg" />
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-28 rounded-2xl" />
        ))}
      </div>
      <div className="skeleton mb-6 h-64 rounded-2xl" />
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton h-40 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { state, loading } = useSimulation(user?.id);

  const chartData = useMemo(() => (state ? last7(state.daily) : []), [state]);
  const convRate = state && state.totalClicks
    ? ((state.totalConversions / state.totalClicks) * 100).toFixed(1)
    : "0.0";

  const referral = `https://linkvault.io/r/${(user?.id || "").split("@")[0] || "you"}`;
  const shareText = encodeURIComponent(
    "Get instant free affiliate links — no sign up required! Start earning with LinkVault:"
  );

  if (loading || !state) {
    return (
      <Layout>
        <Seo title="Affiliate Dashboard — Track Clicks & Earnings | LinkVault"
          description="Track your affiliate clicks, conversions and earnings in real time." path="/dashboard" noindex />
        <Skeleton />
      </Layout>
    );
  }

  const stats = [
    { label: "Total Clicks", value: state.totalClicks.toLocaleString(), icon: "fa-hand-pointer" },
    { label: "Total Earnings", value: "$" + state.totalEarnings.toFixed(2), icon: "fa-sack-dollar", accent: true },
    { label: "Conversion Rate", value: convRate + "%", icon: "fa-arrow-trend-up" },
    { label: "Active Links", value: "6", icon: "fa-link" },
  ];

  const socials = [
    { name: "X", icon: "fa-x-twitter", url: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(referral)}` },
    { name: "Facebook", icon: "fa-facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referral)}` },
    { name: "WhatsApp", icon: "fa-whatsapp", url: `https://wa.me/?text=${shareText}%20${encodeURIComponent(referral)}` },
    { name: "Telegram", icon: "fa-telegram", url: `https://t.me/share/url?url=${encodeURIComponent(referral)}&text=${shareText}` },
  ];

  return (
    <Layout>
      <Seo title="Affiliate Dashboard — Track Clicks & Earnings | LinkVault"
        description="Track your affiliate clicks, conversions and earnings in real time across all six free affiliate programs."
        path="/dashboard" jsonLd={breadcrumbLd} noindex />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <nav className="mb-1 text-xs text-muted" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary">Home</Link> / Dashboard
            </nav>
            <h1 className="text-3xl font-bold text-ink">
              Welcome back, {user.name?.split(" ")[0]}
            </h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs text-primary">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulseDot" /> Live
          </span>
        </div>

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">{s.label}</span>
                <i className={`fa-solid ${s.icon} ${s.accent ? "text-gold" : "text-primary"}`}></i>
              </div>
              <div className={`mt-3 font-display text-2xl font-bold ${s.accent ? "text-gold" : "text-ink"}`}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* CHART */}
        <div className="mt-6 rounded-2xl border border-line bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">
            Clicks — Last 7 Days
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e68a" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#00e68a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e3a2e" vertical={false} />
                <XAxis dataKey="day" stroke="#6b8f7e" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b8f7e" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#141f1a", border: "1px solid #1e3a2e", borderRadius: 12, color: "#e8f5ee" }}
                  labelStyle={{ color: "#6b8f7e" }}
                />
                <Area type="monotone" dataKey="clicks" stroke="#00e68a" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LINK CARDS */}
        <h2 className="mb-4 mt-8 font-display text-lg font-semibold text-ink">
          Your Affiliate Links
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {LINKS.map((l) => {
            const s = state.perLink[l.key];
            return (
              <div key={l.key} className="rounded-2xl border border-line bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card2 text-primary">
                    <i className={`fa-solid ${l.icon}`}></i>
                  </span>
                  <div>
                    <div className="font-display font-semibold text-ink">{l.name}</div>
                    <span className="text-xs text-gold">{l.category}</span>
                  </div>
                </div>
                <div className="mt-3 truncate rounded-lg border border-line bg-card2 px-3 py-2 text-xs text-muted">
                  {l.url}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted">{s.clicks} clicks</span>
                  <span className="font-semibold text-gold">${s.earnings.toFixed(2)}</span>
                </div>
                <button onClick={() => copy(l.url)}
                  className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-bg hover:brightness-110">
                  <i className="fa-solid fa-copy mr-1"></i> Copy link
                </button>
              </div>
            );
          })}
        </div>

        {/* ACTIVITY */}
        <h2 className="mb-4 mt-8 font-display text-lg font-semibold text-ink">
          Recent Activity
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-card2 text-ink">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 text-right">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {state.activity.slice(0, 15).map((a, i) => (
                <tr key={i} className="border-t border-line text-muted">
                  <td className="px-4 py-3">{new Date(a.t).toLocaleTimeString()}</td>
                  <td className="px-4 py-3 text-ink">{a.name}</td>
                  <td className="px-4 py-3">{a.source}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${a.type === "Conversion" ? "bg-gold/15 text-gold" : "bg-primary/10 text-primary"}`}>
                      {a.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{a.amount ? "$" + a.amount.toFixed(2) : "—"}</td>
                </tr>
              ))}
              {state.activity.length === 0 && (
                <tr><td colSpan="5" className="px-4 py-6 text-center text-muted">Waiting for your first clicks…</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* SHARE */}
        <div className="mt-8 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Share LinkVault & grow faster</h2>
          <p className="mt-1 text-sm text-muted">Share your referral link and invite others to start earning too.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 truncate rounded-lg border border-line bg-card2 px-3 py-2.5 text-sm text-muted">{referral}</div>
            <button onClick={() => copy(referral)}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-bg hover:brightness-110">Copy</button>
          </div>
          <div className="mt-4 flex gap-3">
            {socials.map((so) => (
              <a key={so.name} href={so.url} target="_blank" rel="noopener noreferrer"
                aria-label={`Share on ${so.name}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted hover:border-primary hover:text-primary">
                <i className={`fa-brands ${so.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
