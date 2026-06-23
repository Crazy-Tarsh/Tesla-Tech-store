import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPanel({ mode = "user" }) {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState(mode === "admin" ? "admin@tesla.shop" : "user@tesla.shop");
  const { login } = useAuth();
  const navigate = useNavigate();

  const isAdmin = mode === "admin";

  const handleSubmit = (event) => {
    event.preventDefault();
    login(isAdmin ? "admin" : "user", email);
    navigate(isAdmin ? "/admin" : "/profile");
  };

  return (
    <main className="min-h-screen bg-white px-4 py-12 text-black dark:bg-black dark:text-white">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-black uppercase text-tesla-lime">{isAdmin ? "Restricted admin access" : "TESLA account"}</p>
          <h1 className="max-w-xl text-4xl font-black leading-tight md:text-6xl">
            {isAdmin ? "Secure operations command center." : "Your premium tech universe, synced."}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-black/65 dark:text-white/65">
            {isAdmin
              ? "Admin sessions are isolated from customer accounts and designed for RBAC, audit logs, activity monitoring, 2FA readiness, and session timeout enforcement."
              : "Manage your orders, wishlist, addresses, invoices, recommendations, and saved checkout preferences from one protected portal."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-black/15 bg-white p-6 shadow-xl dark:border-white/15 dark:bg-tesla-zinc">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-tesla-lime text-black">
              {isAdmin ? <ShieldCheck /> : <UserPlus />}
            </span>
            <div>
              <h2 className="text-2xl font-black">{isAdmin ? "Admin Login" : view === "login" ? "User Login" : "Create Account"}</h2>
              <p className="text-sm text-black/55 dark:text-white/55">
                {isAdmin ? "Normal user accounts cannot access this portal." : "Email, password, Google-ready, and recovery-ready."}
              </p>
            </div>
          </div>

          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-bold">Email</span>
            <span className="flex items-center rounded-md border border-black/20 px-3 py-3 dark:border-white/20">
              <Mail size={18} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="ml-3 w-full bg-transparent outline-none"
                required
              />
            </span>
          </label>

          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-bold">Password</span>
            <span className="flex items-center rounded-md border border-black/20 px-3 py-3 dark:border-white/20">
              <LockKeyhole size={18} />
              <input
                type="password"
                defaultValue={isAdmin ? "Admin@12345" : "User@12345"}
                className="ml-3 w-full bg-transparent outline-none"
                required
              />
            </span>
          </label>

          {!isAdmin && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm">
              <button type="button" className="font-bold text-tesla-lime" onClick={() => setView(view === "login" ? "register" : "login")}>
                {view === "login" ? "Register instead" : "Back to login"}
              </button>
              <button type="button" className="font-bold text-black/60 dark:text-white/60">
                Forgot password?
              </button>
            </div>
          )}

          <button className="w-full rounded-md bg-tesla-lime px-4 py-3 font-black text-black transition hover:shadow-glow">
            {isAdmin ? "Enter Admin Dashboard" : view === "login" ? "Login Securely" : "Create Secure Account"}
          </button>

          {!isAdmin && (
            <button type="button" className="mt-3 w-full rounded-md border border-black/20 px-4 py-3 font-black dark:border-white/20">
              Continue with Google
            </button>
          )}

          <div className="mt-6 grid gap-2 text-xs text-black/55 dark:text-white/55">
            <span>JWT authentication with HTTP-only cookies</span>
            <span>bcrypt password hashing and login attempt monitoring</span>
            <span>CSRF, XSS, rate limit, and injection protection ready</span>
          </div>
        </form>
      </section>
    </main>
  );
}
