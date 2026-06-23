import { useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  IndianRupee,
  Layers3,
  PackageCheck,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Star,
  Truck,
  UsersRound,
  Zap
} from "lucide-react";
import Header from "./components/Header.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Footer from "./components/Footer.jsx";
import AuthPanel from "./components/AuthPanel.jsx";
import { categories, formatCurrency, products } from "./data/products.js";
import { useCart } from "./context/CartContext.jsx";
import { useAuth } from "./context/AuthContext.jsx";

export default function App() {
  const [search, setSearch] = useState("");
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      [product.name, product.category, product.brand, product.description, product.badge].some((value) =>
        value.toLowerCase().includes(term)
      )
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-white font-body text-black transition-colors duration-500 dark:bg-black dark:text-white">
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home products={filteredProducts} />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/deals" element={<ProductGrid title="Flash Deals" subtitle="Limited-time promotions, festival offers, and bank discounts." products={products.filter((product) => product.mrp - product.price > 10000)} />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<AuthPanel mode="user" />} />
        <Route path="/admin/login" element={<AuthPanel mode="admin" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

function Home({ products: visibleProducts }) {
  const featured = visibleProducts.slice(0, 4);
  const aiPicks = products.filter((product) => product.category === "AI Gadgets" || product.badge.includes("AI"));

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-black/15 bg-black text-white dark:border-white/15">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85"
            alt="Premium circuit technology background"
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/82 to-black/25" />
        </div>
        <div className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1fr_0.78fr] lg:px-6">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-tesla-lime/50 bg-tesla-lime/10 px-3 py-2 text-sm font-black text-tesla-lime">
              <Sparkles size={16} />
              AI powered premium marketplace
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] md:text-7xl">
              TESLA
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
              High-end smartphones, laptops, gaming rigs, smart home systems, AI gadgets, wearables, and accessories in Indian Rupees.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/categories" className="inline-flex items-center gap-2 rounded-md bg-tesla-lime px-5 py-3 font-black text-black transition hover:shadow-glow">
                Explore Categories
                <ChevronRight size={18} />
              </Link>
              <Link to="/deals" className="rounded-md border border-white/25 px-5 py-3 font-black text-white transition hover:border-tesla-lime hover:text-tesla-lime">
                Flash Deals
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="grid gap-4"
          >
            {[
              ["Revenue-grade security", "JWT, bcrypt, RBAC, audit logs"],
              ["Smart recommendations", "AI picks and trending detection"],
              ["Fast checkout", "UPI, cards, net banking, COD"]
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <h3 className="font-black text-tesla-lime">{title}</h3>
                <p className="mt-1 text-sm text-white/65">{body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <StatsBand />
      <ProductGrid title="Featured Products" subtitle="Premium picks from every high-performance category." products={featured} />
      <CategoryRail />
      <ProductGrid title="AI Recommended" subtitle="Personalized recommendations based on premium browsing behavior." products={aiPicks} />
      <ProductGrid title="New Arrivals & Best Sellers" subtitle="Fresh launches and proven favorites across TESLA." products={visibleProducts} />
    </main>
  );
}

function StatsBand() {
  const stats = [
    ["24K+", "Orders processed"],
    ["99.9%", "Secure uptime"],
    ["18 min", "Avg support response"],
    ["₹12Cr+", "Monthly GMV"]
  ];

  return (
    <section className="border-b border-black/15 bg-tesla-lime text-black dark:border-white/15">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-6 md:grid-cols-4 lg:px-6">
        {stats.map(([value, label]) => (
          <div key={label} className="py-3">
            <p className="text-3xl font-black">{value}</p>
            <p className="text-sm font-bold text-black/60">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductGrid({ title, subtitle, products: gridProducts }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl font-black">{title}</h2>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">{subtitle}</p>
        </div>
        <span className="rounded-md border border-black/15 px-3 py-2 text-sm font-bold dark:border-white/15">
          {gridProducts.length} products
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {gridProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function CategoryRail() {
  return (
    <section className="bg-black px-4 py-12 text-white">
      <div className="mx-auto max-w-7xl lg:px-6">
        <h2 className="text-3xl font-black">Product Categories</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/categories?category=${encodeURIComponent(category)}`}
              className="group flex items-center justify-between rounded-lg border border-white/15 bg-white/5 p-5 transition hover:border-tesla-lime hover:bg-tesla-lime hover:text-black"
            >
              <span className="font-black">{category}</span>
              <ChevronRight className="transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const [category, setCategory] = useState(categories[0]);
  const [maxPrice, setMaxPrice] = useState(250000);
  const filtered = products.filter((product) => product.category === category && product.price <= maxPrice);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black">Categories</h1>
          <p className="mt-2 text-black/60 dark:text-white/60">Filter by category, budget, brand, and availability.</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-black/15 px-3 py-2 dark:border-white/15">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-bold">Advanced filters</span>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-lg border border-black/15 p-4 dark:border-white/15">
          <h2 className="mb-4 font-black">Filters</h2>
          <div className="grid gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-md px-3 py-2 text-left text-sm font-bold ${category === item ? "bg-tesla-lime text-black" : "border border-black/15 dark:border-white/15"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="mt-6 block">
            <span className="mb-2 block text-sm font-bold">Max price: {formatCurrency(maxPrice)}</span>
            <input
              type="range"
              min="15000"
              max="250000"
              step="5000"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="w-full accent-lime-400"
            />
          </label>
        </aside>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) || products[0];
  const [image, setImage] = useState(product.gallery[0]);
  const { addToCart, toggleWishlist } = useCart();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section>
          <div className="overflow-hidden rounded-lg border border-black/15 bg-black dark:border-white/15">
            <img src={image} alt={product.name} className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-110" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.gallery.map((item) => (
              <button key={item} onClick={() => setImage(item)} className="overflow-hidden rounded-md border border-black/15 dark:border-white/15">
                <img src={item} alt="" className="aspect-video w-full object-cover" />
              </button>
            ))}
          </div>
        </section>
        <section>
          <p className="text-sm font-black uppercase text-tesla-lime">{product.category}</p>
          <h1 className="mt-2 text-4xl font-black leading-tight">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 font-bold"><Star className="fill-tesla-lime text-tesla-lime" size={17} /> {product.rating}</span>
            <span className="text-black/55 dark:text-white/55">{product.reviews} reviews</span>
            <span className="rounded-md bg-tesla-lime px-2 py-1 font-black text-black">{product.stock} in stock</span>
          </div>
          <p className="mt-6 text-4xl font-black">{formatCurrency(product.price)}</p>
          <p className="mt-1 text-black/50 line-through dark:text-white/50">{formatCurrency(product.mrp)}</p>
          <p className="mt-5 leading-7 text-black/70 dark:text-white/70">{product.description}</p>
          <div className="mt-6 rounded-lg border border-black/15 p-4 dark:border-white/15">
            <h2 className="font-black">Technical Specifications</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <span key={spec} className="rounded-md bg-black/5 px-3 py-2 text-sm font-bold dark:bg-white/10">
                  {spec}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-tesla-lime/40 bg-tesla-lime/10 p-4">
            <h2 className="font-black text-tesla-lime">Offer Information</h2>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">{product.deal}. Coupons, GST invoices, and no-cost EMI supported at checkout.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => addToCart(product)} className="rounded-md bg-tesla-lime px-5 py-3 font-black text-black hover:shadow-glow">
              Add to Cart
            </button>
            <Link to="/checkout" onClick={() => addToCart(product)} className="rounded-md border border-black/20 px-5 py-3 font-black dark:border-white/20">
              Buy Now
            </Link>
            <button onClick={() => toggleWishlist(product.id)} className="rounded-md border border-black/20 px-5 py-3 font-black dark:border-white/20">
              Wishlist
            </button>
          </div>
        </section>
      </div>
      {related.length > 0 && <ProductGrid title="Related Products" subtitle="More picks from the same category." products={related} />}
    </main>
  );
}

function Cart() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="mb-6 text-4xl font-black">Shopping Cart</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="grid gap-4">
          {items.length === 0 && <EmptyState title="Your cart is empty" action="Explore products" href="/" />}
          {items.map((item) => (
            <article key={item.id} className="grid gap-4 rounded-lg border border-black/15 p-4 dark:border-white/15 sm:grid-cols-[140px_1fr_auto]">
              <img src={item.image} alt={item.name} className="aspect-square rounded-md object-cover" />
              <div>
                <h2 className="font-black">{item.name}</h2>
                <p className="mt-1 text-sm text-black/60 dark:text-white/60">{item.category}</p>
                <p className="mt-3 font-black">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                  className="w-20 rounded-md border border-black/20 bg-transparent px-3 py-2 dark:border-white/20"
                />
                <button onClick={() => removeFromCart(item.id)} className="text-sm font-bold text-red-500">
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>
        <Summary subtotal={subtotal} gst={gst} total={total} />
      </div>
    </main>
  );
}

function Summary({ subtotal, gst, total }) {
  return (
    <aside className="h-fit rounded-lg border border-black/15 p-5 dark:border-white/15">
      <h2 className="text-xl font-black">Order Summary</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <Row label="Subtotal" value={formatCurrency(subtotal)} />
        <Row label="GST" value={formatCurrency(gst)} />
        <Row label="Secure shipping" value="Free" />
        <div className="h-px bg-black/15 dark:bg-white/15" />
        <Row label="Total" value={formatCurrency(total)} strong />
      </div>
      <Link to="/checkout" className="mt-5 block rounded-md bg-tesla-lime px-4 py-3 text-center font-black text-black hover:shadow-glow">
        Secure Checkout
      </Link>
    </aside>
  );
}

function Checkout() {
  const { subtotal, clearCart } = useCart();
  const [done, setDone] = useState(false);
  const total = subtotal + Math.round(subtotal * 0.18);

  if (done) {
    return (
      <main className="mx-auto grid min-h-[65vh] max-w-3xl place-items-center px-4 py-10 text-center">
        <div>
          <CheckCircle2 className="mx-auto text-tesla-lime" size={64} />
          <h1 className="mt-4 text-4xl font-black">Order Confirmed</h1>
          <p className="mt-3 text-black/60 dark:text-white/60">Invoice and shipment tracking are ready for order TSL-{Date.now().toString().slice(-6)}.</p>
          <Link to="/" className="mt-6 inline-block rounded-md bg-tesla-lime px-5 py-3 font-black text-black">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <h1 className="mb-6 text-4xl font-black">Secure Checkout</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form
          className="grid gap-5 rounded-lg border border-black/15 p-5 dark:border-white/15"
          onSubmit={(event) => {
            event.preventDefault();
            clearCart();
            setDone(true);
          }}
        >
          <CheckoutSection icon={<Truck />} title="Address Management">
            <input className="field" defaultValue="221B Indiranagar, Bengaluru, Karnataka 560038" />
          </CheckoutSection>
          <CheckoutSection icon={<CreditCard />} title="Payment Options">
            <div className="grid gap-3 sm:grid-cols-2">
              {["UPI", "Credit/Debit Cards", "Net Banking", "Cash on Delivery"].map((method) => (
                <label key={method} className="flex items-center gap-2 rounded-md border border-black/15 p-3 text-sm font-bold dark:border-white/15">
                  <input name="payment" type="radio" defaultChecked={method === "UPI"} />
                  {method}
                </label>
              ))}
            </div>
          </CheckoutSection>
          <CheckoutSection icon={<Zap />} title="Coupon Codes">
            <input className="field" defaultValue="TESLAFLASH" />
          </CheckoutSection>
          <button className="rounded-md bg-tesla-lime px-5 py-3 font-black text-black hover:shadow-glow">
            Place Order for {formatCurrency(total)}
          </button>
        </form>
        <Summary subtotal={subtotal} gst={Math.round(subtotal * 0.18)} total={total} />
      </div>
    </main>
  );
}

function CheckoutSection({ icon, title, children }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-black text-tesla-lime">{icon}{title}</h2>
      {children}
    </section>
  );
}

function Wishlist() {
  const { wishlist } = useCart();
  const wishedProducts = products.filter((product) => wishlist.includes(product.id));
  return wishedProducts.length ? (
    <ProductGrid title="Wishlist" subtitle="Saved premium gadgets for later." products={wishedProducts} />
  ) : (
    <EmptyState title="No wishlist items yet" action="Find something premium" href="/" />
  );
}

function Compare() {
  const compareProducts = products.slice(0, 4);
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="mb-6 text-4xl font-black">Product Comparison</h1>
      <div className="overflow-x-auto rounded-lg border border-black/15 dark:border-white/15">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-tesla-lime text-black">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Key Specs</th>
            </tr>
          </thead>
          <tbody>
            {compareProducts.map((product) => (
              <tr key={product.id} className="border-t border-black/15 dark:border-white/15">
                <td className="p-4 font-black">{product.name}</td>
                <td className="p-4">{formatCurrency(product.price)}</td>
                <td className="p-4">{product.rating}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">{product.specs.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Profile() {
  const { profile } = useAuth();
  if (!profile || profile.role !== "user") return <Navigate to="/login" replace />;
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <h1 className="text-4xl font-black">Profile Management</h1>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {[
          ["Account", profile.email],
          ["Order History", "TSL-2401, TSL-2407"],
          ["Saved Addresses", "Bengaluru, Karnataka"]
        ].map(([title, body]) => (
          <div key={title} className="rounded-lg border border-black/15 p-5 dark:border-white/15">
            <h2 className="font-black">{title}</h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">{body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function AdminRoute({ children }) {
  const { profile } = useAuth();
  if (!profile || profile.role !== "admin") return <Navigate to="/admin/login" replace />;
  return children;
}

function AdminDashboard() {
  const metrics = [
    ["Total Sales", "₹8.4Cr", IndianRupee],
    ["Revenue Analytics", "+18.2%", BarChart3],
    ["Users", "48,902", UsersRound],
    ["Orders", "12,408", PackageCheck],
    ["Inventory Alerts", "7", ShieldAlert],
    ["Activity Logs", "1,284", Activity]
  ];

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-black dark:bg-black dark:text-white lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-tesla-lime">RBAC Protected</p>
            <h1 className="text-4xl font-black">Admin Dashboard</h1>
          </div>
          <span className="rounded-md bg-tesla-lime px-4 py-2 text-sm font-black text-black">2FA Ready</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map(([title, value, Icon]) => (
            <article key={title} className="rounded-lg border border-black/15 p-5 dark:border-white/15">
              <div className="flex items-center justify-between">
                <h2 className="font-black">{title}</h2>
                <Icon className="text-tesla-lime" />
              </div>
              <p className="mt-4 text-3xl font-black">{value}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <AdminPanel title="Product Management" icon={<Boxes />}>
            {["Add Products", "Edit Products", "Delete Products", "Drag & Drop Image Upload", "Variants", "Technical Specifications"].map((item) => <AdminLine key={item} text={item} />)}
          </AdminPanel>
          <AdminPanel title="Pricing, Inventory & Offers" icon={<Layers3 />}>
            {["Stock quantity updates", "Low stock alerts", "GST configuration", "Dynamic pricing rules", "Festival sales", "Coupon codes"].map((item) => <AdminLine key={item} text={item} />)}
          </AdminPanel>
          <AdminPanel title="Order Management" icon={<PackageCheck />}>
            {["View orders", "Process orders", "Shipping status", "Cancel orders", "Generate reports", "Invoice generation"].map((item) => <AdminLine key={item} text={item} />)}
          </AdminPanel>
          <AdminPanel title="User Management & Security" icon={<UsersRound />}>
            {["Suspend users", "Delete users", "Monitor activity", "Brute force protection", "Session timeout", "Admin activity tracking"].map((item) => <AdminLine key={item} text={item} />)}
          </AdminPanel>
        </div>
      </div>
    </main>
  );
}

function AdminPanel({ title, icon, children }) {
  return (
    <section className="rounded-lg border border-black/15 p-5 dark:border-white/15">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-tesla-lime">{icon}{title}</h2>
      <div className="grid gap-2 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function AdminLine({ text }) {
  return (
    <span className="rounded-md bg-black/5 px-3 py-2 text-sm font-bold dark:bg-white/10">
      {text}
    </span>
  );
}

function EmptyState({ title, action, href }) {
  return (
    <main className="mx-auto grid min-h-[58vh] max-w-3xl place-items-center px-4 py-10 text-center">
      <div>
        <h1 className="text-4xl font-black">{title}</h1>
        <Link to={href} className="mt-6 inline-block rounded-md bg-tesla-lime px-5 py-3 font-black text-black">
          {action}
        </Link>
      </div>
    </main>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className={`flex justify-between gap-3 ${strong ? "text-lg font-black" : ""}`}>
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
