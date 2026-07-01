import { Link } from "react-router-dom";
import { Logo } from "./Navbar.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted">
              Free affiliate programs directory with instant links — no sign up
              required. Start earning supplementary income online today.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Platform</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/signup" className="hover:text-primary">Join Free</Link></li>
              <li><Link to="/login" className="hover:text-primary">Login</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              <li><Link to="/links" className="hover:text-primary">Affiliate Links</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Company</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Connect</h4>
            <div className="flex gap-3 text-muted">
              <a href="#" aria-label="Twitter" className="hover:text-primary"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#" aria-label="Facebook" className="hover:text-primary"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="Telegram" className="hover:text-primary"><i className="fa-brands fa-telegram"></i></a>
            </div>
            <p className="mt-4 text-sm text-muted">
              <a href="mailto:support@linkvault.io" className="hover:text-primary">
                support@linkvault.io
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-line pt-6 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} LinkVault. All rights reserved.
            Earnings disclaimer: results vary and are not guaranteed. Figures
            shown in the demo dashboard are illustrative and simulated.
          </p>
        </div>
      </div>
    </footer>
  );
}
