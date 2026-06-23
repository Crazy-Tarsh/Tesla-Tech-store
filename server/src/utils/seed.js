import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import AuditLog from "../models/AuditLog.js";
import LoginAttempt from "../models/LoginAttempt.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();

const products = [
  {
    name: "Nova X1 Pro Smartphone",
    slug: "nova-x1-pro-smartphone",
    brand: "TESLA",
    category: "Smartphones",
    description: "Flagship AI smartphone with neural camera processing and titanium-grade body.",
    price: 129999,
    mrp: 149999,
    stock: 42,
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85"],
    specifications: [
      { name: "Display", value: "6.9-inch LTPO AMOLED" },
      { name: "Storage", value: "1 TB" },
      { name: "Charging", value: "120 W HyperCharge" }
    ],
    tags: ["smartphone", "ai camera", "premium"],
    offer: "₹8,000 bank offer",
    rating: 4.8,
    reviewCount: 1842,
    isFeatured: true,
    isTrending: true
  },
  {
    name: "AeroBook Ultra 16",
    slug: "aerobook-ultra-16",
    brand: "Aero",
    category: "Laptops",
    description: "Premium AI-ready workstation laptop for creators, developers, and professionals.",
    price: 219999,
    mrp: 249999,
    stock: 18,
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85"],
    specifications: [
      { name: "Processor", value: "Intel Core Ultra 9" },
      { name: "GPU", value: "RTX 4080 Studio" },
      { name: "Memory", value: "32 GB RAM" }
    ],
    tags: ["laptop", "creator", "gaming"],
    offer: "Free premium sleeve",
    rating: 4.9,
    reviewCount: 967,
    isFeatured: true
  },
  {
    name: "Orbit X Gaming Console",
    slug: "orbit-x-gaming-console",
    brand: "Orbit",
    category: "Gaming",
    description: "4K 144Hz gaming console with ray tracing, ultra-fast storage, and cloud saves.",
    price: 74999,
    mrp: 84999,
    stock: 23,
    images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=85"],
    specifications: [
      { name: "Storage", value: "2 TB NVMe" },
      { name: "Performance", value: "120 FPS mode" },
      { name: "Graphics", value: "Ray tracing engine" }
    ],
    tags: ["gaming", "console", "4k"],
    offer: "2 games bundled",
    rating: 4.9,
    reviewCount: 2404,
    isTrending: true
  },
  {
    name: "AI Orb Desk Companion",
    slug: "ai-orb-desk-companion",
    brand: "TESLA",
    category: "AI Gadgets",
    description: "Privacy-first AI assistant device for workspaces, smart automations, and meeting summaries.",
    price: 54999,
    mrp: 64999,
    stock: 35,
    images: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85"],
    specifications: [
      { name: "AI", value: "Local voice model" },
      { name: "Automation", value: "Smart home control" },
      { name: "Privacy", value: "Hardware mute switch" }
    ],
    tags: ["ai", "assistant", "smart home"],
    offer: "1-year AI cloud included",
    rating: 4.7,
    reviewCount: 406,
    isFeatured: true,
    isTrending: true
  }
];

async function seed() {
  await connectDatabase();
  await Promise.all([
    Product.deleteMany({}),
    User.deleteMany({}),
    Order.deleteMany({}),
    AuditLog.deleteMany({}),
    LoginAttempt.deleteMany({})
  ]);

  const insertedProducts = await Product.insertMany(products);
  const user = await User.create({
    name: "Aarav Mehta",
    email: "user@tesla.shop",
    password: "User@12345",
    role: "user",
    addresses: [
      {
        label: "Home",
        line1: "221B Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
        phone: "9876543210"
      }
    ],
    wishlist: [insertedProducts[0]._id, insertedProducts[3]._id]
  });

  await User.create({
    name: "TESLA Admin",
    email: "admin@tesla.shop",
    password: "Admin@12345",
    role: "admin"
  });

  await Order.create({
    user: user._id,
    items: [
      {
        product: insertedProducts[0]._id,
        name: insertedProducts[0].name,
        quantity: 1,
        price: insertedProducts[0].price,
        gstRate: 18
      }
    ],
    shippingAddress: user.addresses[0],
    paymentMethod: "UPI",
    subtotal: insertedProducts[0].price,
    gst: Math.round(insertedProducts[0].price * 0.18),
    total: insertedProducts[0].price + Math.round(insertedProducts[0].price * 0.18),
    invoiceNumber: "TSL-SEED-001",
    status: "delivered"
  });

  console.log("Seed complete");
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
