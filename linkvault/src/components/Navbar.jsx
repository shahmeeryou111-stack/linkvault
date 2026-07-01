import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-card2 border border-line">
        <i className="fa-solid fa-vault text-primary text-sm" aria-hidden="true"></i>
      </span>
      <span className="text-ink">
        Link<span className="text-primary">Vault</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const linkCls = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? "text-primary" : "text-muted hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkCls} end>
            Home
          </NavLink>
          <NavLink to="/about" className={linkCls}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkCls}>
            Contact
          </NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" className={linkCls}>
                Dashboard
              </NavLink>
              <NavLink to="/links" className={linkCls}>
                Links
              </NavLink>
            </>
          )}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/settings" className="text-sm text-muted hover:text-ink">
                {user.name?.split(" ")[0] || "Account"}
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="rounded-lg border border-line px-3 py-1.5 text-sm text-ink hover:border-primary"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-muted hover:text-ink">
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-bg hover:brightness-110"
              >
                Join Free
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden text-ink"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </nav>
      {open && (
        <div className="border-t border-line px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            <NavLink to="/" className={linkCls} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkCls} onClick={() => setOpen(false)}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkCls} onClick={() => setOpen(false)}>
              Contact
            </NavLink>
            {user ? (
              <>
                <NavLink to="/dashboard" className={linkCls} onClick={() => setOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/links" className={linkCls} onClick={() => setOpen(false)}>
                  Links
                </NavLink>
                <NavLink to="/settings" className={linkCls} onClick={() => setOpen(false)}>
                  Settings
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                    navigate("/");
                  }}
                  className="text-left text-sm text-muted"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkCls} onClick={() => setOpen(false)}>
                  Login
                </NavLink>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-bg"
                >
                  Join Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
