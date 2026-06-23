import AuditLog from "../models/AuditLog.js";

export async function writeAuditLog(req, action, metadata = {}) {
  try {
    await AuditLog.create({
      actor: req.user?._id,
      role: req.user?.role,
      action,
      entity: metadata.entity,
      entityId: metadata.entityId,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      metadata
    });
  } catch (error) {
    console.error("Audit log failed", error.message);
  }
}
