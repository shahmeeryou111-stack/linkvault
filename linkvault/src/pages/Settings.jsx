import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout.jsx";
import Seo from "../components/Seo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Settings() {
  const { user, updateProfile, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [payout, setPayout] = useState(user?.payout || { method: "PayPal", address: "" });
  const [notify, setNotify] = useState(user?.notify || { conversions: true, weekly: true, tips: false });
  const [confirming, setConfirming] = useState(false);

  function saveProfile(e) {
    e.preventDefault();
    updateProfile({ name });
    toast.success("Profile updated.");
  }
  function savePayout(e) {
    e.preventDefault();
    updateProfile({ payout });
    toast.success("Payout settings saved.");
  }
  function toggle(key) {
    const next = { ...notify, [key]: !notify[key] };
    setNotify(next);
    updateProfile({ notify: next });
  }
  function remove() {
    deleteAccount();
    toast.success("Account deleted.");
    navigate("/");
  }

  const input = "w-full rounded-lg border border-line bg-card2 px-4 py-2.5 text-ink outline-none focus:border-primary";

  return (
    <Layout>
      <Seo title="Account Settings | LinkVault"
        description="Manage your LinkVault profile, payout preferences and notification settings."
        path="/settings" noindex />

      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold text-ink">Account Settings</h1>

        <form onSubmit={saveProfile} className="mt-8 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Profile</h2>
          <label className="mb-1 mt-4 block text-sm text-muted" htmlFor="name">Name</label>
          <input id="name" className={input} value={name} onChange={(e) => setName(e.target.value)} />
          <label className="mb-1 mt-4 block text-sm text-muted" htmlFor="email">Email</label>
          <input id="email" className={`${input} opacity-60`} value={user?.email} disabled />
          <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-bg hover:brightness-110">Save profile</button>
        </form>

        <form onSubmit={savePayout} className="mt-6 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Payout</h2>
          <label className="mb-1 mt-4 block text-sm text-muted" htmlFor="method">Payout method</label>
          <select id="method" className={input} value={payout.method}
            onChange={(e) => setPayout({ ...payout, method: e.target.value })}>
            <option>PayPal</option><option>Wise</option><option>Bank Transfer</option><option>Crypto (USDT)</option>
          </select>
          <label className="mb-1 mt-4 block text-sm text-muted" htmlFor="addr">Payout address / email</label>
          <input id="addr" className={input} value={payout.address}
            onChange={(e) => setPayout({ ...payout, address: e.target.value })} placeholder="you@email.com" />
          <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-bg hover:brightness-110">Save payout</button>
        </form>

        <div className="mt-6 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Notifications</h2>
          {[
            ["conversions", "Conversion alerts", "Get notified whenever a referral converts."],
            ["weekly", "Weekly summary", "Receive a weekly performance recap."],
            ["tips", "Growth tips", "Occasional tips to promote your links better."],
          ].map(([key, title, desc]) => (
            <div key={key} className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-ink">{title}</div>
                <div className="text-xs text-muted">{desc}</div>
              </div>
              <button onClick={() => toggle(key)} aria-label={`Toggle ${title}`}
                className={`relative h-6 w-11 rounded-full transition-colors ${notify[key] ? "bg-primary" : "bg-card2 border border-line"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-bg transition-all ${notify[key] ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-red-500/30 bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-red-400">Danger zone</h2>
          <p className="mt-1 text-sm text-muted">Deleting your account removes all local data permanently.</p>
          {!confirming ? (
            <button onClick={() => setConfirming(true)}
              className="mt-4 rounded-lg border border-red-500/50 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
              Delete account
            </button>
          ) : (
            <div className="mt-4 flex gap-3">
              <button onClick={remove} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:brightness-110">Yes, delete</button>
              <button onClick={() => setConfirming(false)} className="rounded-lg border border-line px-4 py-2 text-sm text-ink">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
