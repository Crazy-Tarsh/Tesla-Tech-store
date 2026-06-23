import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const cached = localStorage.getItem("tesla-cart");
    return cached ? JSON.parse(cached) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const cached = localStorage.getItem("tesla-wishlist");
    return cached ? JSON.parse(cached) : [];
  });

  const persist = (nextItems) => {
    localStorage.setItem("tesla-cart", JSON.stringify(nextItems));
    setItems(nextItems);
  };

  const addToCart = (product) => {
    const existing = items.find((item) => item.id === product.id);
    const nextItems = existing
      ? items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [...items, { ...product, quantity: 1 }];
    persist(nextItems);
  };

  const updateQuantity = (id, quantity) => {
    const nextItems = items
      .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
      .filter(Boolean);
    persist(nextItems);
  };

  const removeFromCart = (id) => persist(items.filter((item) => item.id !== id));

  const toggleWishlist = (productId) => {
    const next = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    localStorage.setItem("tesla-wishlist", JSON.stringify(next));
    setWishlist(next);
  };

  const clearCart = () => persist([]);

  const value = useMemo(
    () => ({
      items,
      wishlist,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
      clearCart,
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0)
    }),
    [items, wishlist]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
