import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// Simple, clearly-labeled ad placeholder (AdSense-safe demo slot)
export function AdSlot({ label = "Advertisement" }) {
  return (
    <div className="my-6 flex flex-col items-center">
      <span className="mb-1 text-[10px] uppercase tracking-widest text-muted">
        {label}
      </span>
      <div className="flex h-24 w-full max-w-3xl items-center justify-center rounded-xl border border-dashed border-line bg-card/50 text-xs text-muted">
        Ad space
      </div>
    </div>
  );
}
