import AuditLog from "../models/AuditLog.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { writeAuditLog } from "../utils/audit.js";

export async function dashboard(req, res, next) {
  try {
    const [sales, users, products, orders, lowStock, logs] = await Promise.all([
      Order.aggregate([{ $group: { _id: null, revenue: { $sum: "$total" }, count: { $sum: 1 } } }]),
      User.countDocuments({ role: "user" }),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Product.find({ $expr: { $lte: ["$stock", "$lowStockThreshold"] } }).select("name stock lowStockThreshold"),
      AuditLog.find().sort("-createdAt").limit(20)
    ]);

    res.json({
      revenue: sales[0]?.revenue || 0,
      salesCount: sales[0]?.count || 0,
      userCount: users,
      productCount: products,
      orderCount: orders,
      lowStock,
      recentActivity: logs
    });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(req, res, next) {
  try {
    const users = await User.find().select("-password").sort("-createdAt").limit(100);
    res.json({ users });
  } catch (error) {
    next(error);
  }
}

export async function updateUserStatus(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    await writeAuditLog(req, "admin.user.status_update", { entity: "User", entityId: String(user._id), status: user.status });
    res.json({ user });
  } catch (error) {
    next(error);
  }
}
