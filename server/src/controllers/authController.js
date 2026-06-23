import User from "../models/User.js";
import LoginAttempt from "../models/LoginAttempt.js";
import { cookieOptions, signToken } from "../utils/tokens.js";
import { writeAuditLog } from "../utils/audit.js";

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    addresses: user.addresses,
    wishlist: user.wishlist
  };
}

export async function register(req, res, next) {
  try {
    const user = await User.create({ ...req.body, role: "user" });
    const token = signToken(user);
    res.cookie("jwt", token, cookieOptions());
    res.status(201).json({ user: publicUser(user), token });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password, portal = "user" } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      await LoginAttempt.create({ email, ip: req.ip, success: false, reason: "invalid_credentials" });
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (portal === "admin" && user.role !== "admin") {
      await LoginAttempt.create({ email, ip: req.ip, success: false, reason: "admin_portal_denied" });
      return res.status(403).json({ message: "This portal is only for admin accounts" });
    }

    if (portal === "user" && user.role === "admin") {
      await LoginAttempt.create({ email, ip: req.ip, success: false, reason: "wrong_portal" });
      return res.status(403).json({ message: "Admin accounts must use the admin login portal" });
    }

    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false });
    await LoginAttempt.create({ email, ip: req.ip, success: true });

    req.user = user;
    await writeAuditLog(req, `${user.role}.login`, { entity: "User", entityId: String(user._id) });

    const token = signToken(user);
    res.cookie("jwt", token, cookieOptions());
    res.json({ user: publicUser(user), token });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  res.cookie("jwt", "logged-out", { ...cookieOptions(), expires: new Date(Date.now() + 1000) });
  res.json({ message: "Logged out" });
}

export async function getMe(req, res) {
  res.json({ user: publicUser(req.user) });
}

export async function updateProfile(req, res, next) {
  try {
    const allowed = ["name", "addresses", "wishlist"];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}
