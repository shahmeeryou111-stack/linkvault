import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout.jsx";
import Seo from "../components/Seo.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function submit(e) {
    e.preventDefault();
    try {
      const msgs = JSON.parse(localStorage.getItem("linkvault_messages") || "[]");
      msgs.push({ ...form, t: Date.now() });
      localStorage.setItem("linkvault_messages", JSON.stringify(msgs));
    } catch {}
    toast.success("Message sent! We'll respond within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  const input = "w-full rounded-lg border border-line bg-card2 px-4 py-2.5 text-ink outline-none focus:border-primary";

  return (
    <Layout>
      <Seo title="Contact LinkVault — Get in Touch"
        description="Have a question about free affiliate programs or your dashboard? Contact the LinkVault team and we'll respond within 24 hours."
        path="/contact" />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">Contact Us</h1>
        <p className="mt-3 text-muted">
          Questions, feedback, or partnership ideas? Send us a message — or email{" "}
          <a href="mailto:support@linkvault.io" className="text-primary hover:underline">support@linkvault.io</a>.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-line bg-card p-6">
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="name">Name</label>
            <input id="name" required className={input} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="email">Email</label>
            <input id="email" type="email" required className={input} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="subject">Subject</label>
            <input id="subject" required className={input} value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted" htmlFor="message">Message</label>
            <textarea id="message" required rows="5" className={input} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-bg hover:brightness-110">
            Send message
          </button>
        </form>
      </div>
    </Layout>
  );
}
