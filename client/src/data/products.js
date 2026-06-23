export const categories = [
  "Smartphones",
  "Laptops",
  "Gaming",
  "Smart Watches",
  "Audio Devices",
  "Smart Home",
  "Cameras",
  "Accessories",
  "AI Gadgets"
];

export const products = [
  {
    id: "tesla-nova-x1",
    name: "Nova X1 Pro Smartphone",
    category: "Smartphones",
    brand: "TESLA",
    price: 129999,
    mrp: 149999,
    rating: 4.8,
    reviews: 1842,
    stock: 42,
    badge: "AI Camera",
    deal: "₹8,000 bank offer",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85"
    ],
    specs: ["6.9-inch LTPO AMOLED", "Tensor AI image engine", "1 TB storage", "120 W HyperCharge"],
    description: "A flagship smartphone built for creators, gamers, and power users with a neural camera stack and titanium-grade body."
  },
  {
    id: "tesla-aero-book",
    name: "AeroBook Ultra 16",
    category: "Laptops",
    brand: "Aero",
    price: 219999,
    mrp: 249999,
    rating: 4.9,
    reviews: 967,
    stock: 18,
    badge: "Creator Pick",
    deal: "Free premium sleeve",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=85"
    ],
    specs: ["Intel Core Ultra 9", "RTX 4080 Studio GPU", "32 GB RAM", "4K OLED display"],
    description: "A premium workstation laptop for engineering, 3D, video editing, and AI development."
  },
  {
    id: "tesla-pulse-watch",
    name: "Pulse Matrix Watch",
    category: "Smart Watches",
    brand: "Pulse",
    price: 38999,
    mrp: 44999,
    rating: 4.7,
    reviews: 731,
    stock: 67,
    badge: "Health AI",
    deal: "15% launch discount",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?auto=format&fit=crop&w=900&q=85"
    ],
    specs: ["ECG and SpO2", "10-day battery", "AMOLED always-on display", "5 ATM water resistance"],
    description: "A sleek wearable with advanced health monitoring, adaptive coaching, and premium materials."
  },
  {
    id: "tesla-sonic-max",
    name: "Sonic Max ANC Headphones",
    category: "Audio Devices",
    brand: "Sonic",
    price: 29999,
    mrp: 35999,
    rating: 4.8,
    reviews: 1218,
    stock: 51,
    badge: "Studio ANC",
    deal: "No-cost EMI",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=85"
    ],
    specs: ["Adaptive ANC", "Spatial audio", "60-hour battery", "Hi-res wireless codec"],
    description: "Immersive wireless headphones tuned for long gaming sessions, flights, and focused work."
  },
  {
    id: "tesla-orbit-console",
    name: "Orbit X Gaming Console",
    category: "Gaming",
    brand: "Orbit",
    price: 74999,
    mrp: 84999,
    rating: 4.9,
    reviews: 2404,
    stock: 23,
    badge: "4K 144Hz",
    deal: "2 games bundled",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=900&q=85"
    ],
    specs: ["Ray tracing engine", "2 TB NVMe", "120 FPS performance mode", "Cloud saves"],
    description: "A premium gaming console designed for cinematic visuals, ultra-fast loads, and competitive latency."
  },
  {
    id: "tesla-home-hub",
    name: "HomeHub Neural Center",
    category: "Smart Home",
    brand: "Nestia",
    price: 24999,
    mrp: 29999,
    rating: 4.6,
    reviews: 524,
    stock: 74,
    badge: "Matter Ready",
    deal: "Free installation guide",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1585399000684-d2f72660f092?auto=format&fit=crop&w=900&q=85"
    ],
    specs: ["Matter and Zigbee", "Edge AI automation", "Privacy switch", "Voice assistant support"],
    description: "A secure smart home command center that connects lights, sensors, security, climate, and scenes."
  },
  {
    id: "tesla-vision-drone",
    name: "Vision Air 8K Drone",
    category: "Cameras",
    brand: "Vision",
    price: 159999,
    mrp: 184999,
    rating: 4.8,
    reviews: 311,
    stock: 9,
    badge: "8K Pro",
    deal: "Extra battery kit",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=85"
    ],
    specs: ["8K HDR sensor", "45-minute flight", "Obstacle avoidance", "Cinema gimbal"],
    description: "A professional aerial camera system for filmmakers, survey teams, and advanced creators."
  },
  {
    id: "tesla-ai-orb",
    name: "AI Orb Desk Companion",
    category: "AI Gadgets",
    brand: "TESLA",
    price: 54999,
    mrp: 64999,
    rating: 4.7,
    reviews: 406,
    stock: 35,
    badge: "Edge AI",
    deal: "1-year AI cloud included",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=900&q=85"
    ],
    specs: ["Local voice model", "Meeting summaries", "Smart home control", "Privacy-first compute"],
    description: "A premium AI assistant device for workspaces, automation, reminders, and private local intelligence."
  },
  {
    id: "tesla-vault-dock",
    name: "Vault Thunderbolt Dock",
    category: "Accessories",
    brand: "Vault",
    price: 19999,
    mrp: 24999,
    rating: 4.6,
    reviews: 648,
    stock: 82,
    badge: "14-in-1",
    deal: "GST invoice available",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85"
    ],
    specs: ["Thunderbolt 4", "Dual 4K output", "100 W charging", "2.5G Ethernet"],
    description: "A compact premium workstation dock for professionals who need clean desk connectivity."
  }
];

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
