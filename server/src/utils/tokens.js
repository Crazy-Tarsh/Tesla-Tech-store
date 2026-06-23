import jwt from "jsonwebtoken";

export function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });
}

export function cookieOptions() {
  const days = Number(process.env.COOKIE_EXPIRES_DAYS || 1);
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  };
}
