import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Plus, Star } from "lucide-react";
import { formatCurrency } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const wished = wishlist.includes(product.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-lg border border-black/15 bg-white text-black shadow-sm transition dark:border-white/15 dark:bg-tesla-zinc dark:text-white"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-black">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <span className="absolute left-3 top-3 rounded-md bg-tesla-lime px-2 py-1 text-xs font-black text-black">
            {product.badge}
          </span>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase text-black/55 dark:text-white/55">{product.category}</p>
            <Link to={`/product/${product.id}`} className="mt-1 block font-black leading-tight hover:text-tesla-lime">
              {product.name}
            </Link>
          </div>
          <button
            aria-label="Toggle wishlist"
            onClick={() => toggleWishlist(product.id)}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border transition ${
              wished ? "border-tesla-lime bg-tesla-lime text-black" : "border-black/20 dark:border-white/20"
            }`}
          >
            <Heart size={17} fill={wished ? "currentColor" : "none"} />
          </button>
        </div>
        {!compact && <p className="line-clamp-2 text-sm text-black/65 dark:text-white/65">{product.description}</p>}
        <div className="flex items-center gap-2 text-sm">
          <Star size={16} className="fill-tesla-lime text-tesla-lime" />
          <span className="font-bold">{product.rating}</span>
          <span className="text-black/50 dark:text-white/50">({product.reviews})</span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-black">{formatCurrency(product.price)}</p>
            <p className="text-xs text-black/50 line-through dark:text-white/50">{formatCurrency(product.mrp)}</p>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 rounded-md bg-tesla-lime px-3 py-2 text-sm font-black text-black transition hover:shadow-glow"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
