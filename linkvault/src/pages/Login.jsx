import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout.jsx";
import Seo from "../components/Seo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  function submit(e) {
    e.preventDefault();
    const res = login(form);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Welcome back!");
    navigate("/dashboard");
  }

  return (
    <Layout>
      <Seo
        title="Login to Your Affiliate Dashboard | LinkVault"
        description="Log in to your LinkVault affiliate dashboard to track clicks, conversions and earnings across all your free affiliate links."
        path="/login"
        noindex
      />
      <section className="mx-auto flex max-w-md flex-col px-4 py-16">
        <h1 className="text-3xl font-bold text-ink">Log in to LinkVault</h1>
        <p className="mt-2 text-sm text-muted">
          Access your dashboard and track your affiliate performance.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="email">Email</label>
            <input id="email" type="email" required
              className="w-full rounded-lg border border-line bg-card2 px-4 py-2.5 text-ink outline-none focus:border-primary"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@email.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="password">Password</label>
            <input id="password" type="password" required
              className="w-full rounded-lg border border-line bg-card2 px-4 py-2.5 text-ink outline-none focus:border-primary"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••" />
          </div>
          <button type="submit"
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-bg hover:brightness-110">
            Log in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          New here?{" "}
          <Link to="/signup" className="text-primary hover:underline">Join free</Link>
        </p>
      </section>
    </Layout>
  );
}
