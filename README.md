# TESLA

TESLA is a premium full-stack electronics marketplace built with React, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, JWT, and bcrypt.

## Features

- Futuristic dark/light theme with saved preference
- User and admin login portals kept separate
- JWT auth with HTTP-only cookies, bcrypt password hashing, RBAC, rate limiting, CSRF-ready headers, audit logs, and protected admin routes
- Product catalogue, smart search, filters, comparison, wishlist, cart, checkout, Indian Rupee pricing, and invoice-ready order data
- Admin dashboard for sales, analytics, inventory, products, offers, users, orders, and activity logs
- Responsive premium UI for desktop, tablet, and mobile

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `server/.env` from `server/.env.example`.

3. Start MongoDB locally, or set `MONGODB_URI` to a hosted MongoDB connection string.

4. Seed sample products and accounts:

   ```bash
   npm run seed
   ```

5. Run the app:

   ```bash
   npm run dev
   ```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Seed Accounts

- Admin: `admin@tesla.shop` / `Admin@12345`
- User: `user@tesla.shop` / `User@12345`

## Notes

This project is production-oriented scaffolding. Before going live, connect real payment gateways, email delivery, object storage for uploads, HTTPS/TLS termination, and a managed secret store.
