import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { writeAuditLog } from "../utils/audit.js";

export async function createOrder(req, res, next) {
  try {
    const productIds = req.body.items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const items = req.body.items.map((item) => {
      const product = products.find((candidate) => String(candidate._id) === item.product);
      if (!product) throw new Error("Invalid product in order");
      return {
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        gstRate: product.gstRate
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gst = Math.round(subtotal * 0.18);
    const discount = req.body.couponCode ? Math.round(subtotal * 0.05) : 0;
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      subtotal,
      gst,
      discount,
      total: subtotal + gst - discount,
      couponCode: req.body.couponCode,
      invoiceNumber: `TSL-${Date.now()}`
    });

    await writeAuditLog(req, "user.order.create", { entity: "Order", entityId: String(order._id) });
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
}

export async function myOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json({ orders });
  } catch (error) {
    next(error);
  }
}

export async function listOrders(req, res, next) {
  try {
    const orders = await Order.find().populate("user", "name email").sort("-createdAt").limit(100);
    res.json({ orders });
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    await writeAuditLog(req, "admin.order.status_update", { entity: "Order", entityId: String(order._id), status: order.status });
    res.json({ order });
  } catch (error) {
    next(error);
  }
}
