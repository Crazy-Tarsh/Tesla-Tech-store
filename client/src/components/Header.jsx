import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Menu, Moon, Search, ShieldCheck, ShoppingBag, Sun, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const navItems = [
  { label: "Store", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
  { label: "Compare", href: "/compare" }
];

export default function Header({ search, setSearch }) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { profile, logout } = useAuth();
  const { totalItems, wishlist } = useCart();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-black bg-tesla-lime text-black shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-6">
        <button
          aria-label="Open navigation"
          className="grid h-10 w-10 place-items-center rounded-md border border-black/25 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>

        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-black text-base font-black text-tesla-lime shadow-glow">
            T
          </span>
          <span className="text-xl font-black tracking-normal">TESLA</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-bold transition ${
                  isActive ? "bg-black text-tesla-lime" : "hover:bg-black/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden min-w-[260px] max-w-md flex-1 items-center rounded-md border border-black/25 bg-white/75 px-3 py-2 lg:flex">
          <Search size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search AI gadgets, laptops, smart devices"
            className="ml-2 w-full bg-transparent text-sm font-medium outline-none placeholder:text-black/55"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-md border border-black/25 bg-black text-tesla-lime transition hover:scale-105"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative hidden h-10 w-10 place-items-center rounded-md border border-black/25 bg-black text-tesla-lime sm:grid"
          >
            <Heart size={18} />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-md border border-black/25 bg-black text-tesla-lime"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && <Badge>{totalItems}</Badge>}
          </Link>

          <Link
            to="/login"
            className="hidden items-center gap-2 rounded-md border border-black/25 bg-black px-3 py-2 text-sm font-bold text-tesla-lime transition hover:scale-[1.02] md:flex"
          >
            <UserRound size={16} />
            {profile?.role === "user" ? profile.name.split(" ")[0] : "Login"}
          </Link>

          <Link
            to="/admin/login"
            className="hidden items-center gap-2 rounded-md border border-black/25 px-3 py-2 text-sm font-black transition hover:bg-black/10 xl:flex"
          >
            <ShieldCheck size={16} />
            Admin
          </Link>

          {profile && (
            <button className="hidden rounded-md px-3 py-2 text-sm font-bold hover:bg-black/10 md:block" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-black/20 px-4 py-2 lg:hidden">
        <div className="flex items-center rounded-md border border-black/25 bg-white/75 px-3 py-2">
          <Search size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search TESLA"
            className="ml-2 w-full bg-transparent text-sm font-medium outline-none"
          />
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/70 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="h-full w-72 bg-tesla-lime p-4 text-black"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-black">TESLA</span>
              <button aria-label="Close navigation" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            <div className="grid gap-2">
              {[...navItems, { label: "Wishlist", href: "/wishlist" }, { label: "Cart", href: "/cart" }, { label: "User Login", href: "/login" }, { label: "Admin Login", href: "/admin/login" }].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`rounded-md px-3 py-3 text-sm font-black ${location.pathname === item.href ? "bg-black text-tesla-lime" : "border border-black/20"}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </header>
  );
}

function Badge({ children }) {
  return (
    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border border-black bg-white px-1 text-[11px] font-black text-black">
      {children}
    </span>
  );
}
