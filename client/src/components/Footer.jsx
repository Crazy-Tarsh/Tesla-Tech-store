export default function Footer() {
  return (
    <footer className="border-t border-black/15 bg-white px-4 py-10 text-black dark:border-white/15 dark:bg-black dark:text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-tesla-lime font-black text-black">T</span>
            <span className="text-xl font-black">TESLA</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-black/65 dark:text-white/65">
            Premium technology marketplace for high-end electronics, gaming gear, smart devices, AI gadgets, and professional accessories.
          </p>
        </div>
        {[
          ["Shop", "New arrivals", "Flash deals", "Best sellers", "AI picks"],
          ["Support", "Order tracking", "Invoices", "Warranty", "Returns"],
          ["Security", "Protected checkout", "RBAC admin", "Audit logs", "HTTPS ready"]
        ].map(([title, ...links]) => (
          <div key={title}>
            <h3 className="mb-3 text-sm font-black uppercase">{title}</h3>
            <div className="grid gap-2 text-sm text-black/60 dark:text-white/60">
              {links.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
