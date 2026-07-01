import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout.jsx";
import Seo from "../components/Seo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    const res = signup(form);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Welcome to LinkVault! Your links are ready.");
    navigate("/dashboard");
  }

  const field = (name) =>
    "w-full rounded-lg border bg-card2 px-4 py-2.5 text-ink outline-none focus:border-primary " +
    (errors[name] ? "border-red-500" : "border-line");

  return (
    <Layout>
      <Seo
        title="Join Free — Get Instant Affiliate Links No Registration | LinkVault"
        description="Create your free LinkVault account in seconds and unlock instant affiliate links from top programs. No registration approval, no credit card required."
        path="/signup"
      />
      <section className="mx-auto flex max-w-md flex-col px-4 py-16">
        <h1 className="text-3xl font-bold text-ink">Join Free — Get Instant Links</h1>
        <p className="mt-2 text-sm text-muted">
          No approval waiting, no credit card. Your six affiliate links unlock
          immediately.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="name">Full name</label>
            <input id="name" className={field("name")} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="email">Email</label>
            <input id="email" type="email" className={field("email")} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="password">Password</label>
            <input id="password" type="password" className={field("password")} value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
          </div>
          <button type="submit"
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-bg hover:brightness-110">
            Create free account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </section>
    </Layout>
  );
}
