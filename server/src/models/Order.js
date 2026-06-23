import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    gstRate: { type: Number, default: 18 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shippingAddress: {
      line1: String,
      city: String,
      state: String,
      pincode: String,
      phone: String
    },
    paymentMethod: { type: String, enum: ["UPI", "CARD", "NET_BANKING", "COD"], required: true },
    subtotal: Number,
    gst: Number,
    discount: { type: Number, default: 0 },
    total: Number,
    couponCode: String,
    status: {
      type: String,
      enum: ["confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "confirmed",
      index: true
    },
    invoiceNumber: { type: String, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
