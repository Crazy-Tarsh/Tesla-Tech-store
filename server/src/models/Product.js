import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true }
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    name: String,
    sku: String,
    price: Number,
    stock: Number
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: "text" },
    slug: { type: String, required: true, unique: true, lowercase: true },
    brand: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    gstRate: { type: Number, default: 18 },
    stock: { type: Number, required: true, min: 0 },
    lowStockThreshold: { type: Number, default: 10 },
    images: [{ type: String, required: true }],
    specifications: [specificationSchema],
    variants: [variantSchema],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    tags: [String],
    offer: String,
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", tags: "text", category: "text", brand: "text" });

export default mongoose.model("Product", productSchema);
