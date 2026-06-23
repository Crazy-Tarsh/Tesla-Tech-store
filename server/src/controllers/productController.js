import Product from "../models/Product.js";
import { writeAuditLog } from "../utils/audit.js";

export async function listProducts(req, res, next) {
  try {
    const { search, category, brand, minPrice, maxPrice, sort = "-createdAt" } = req.query;
    const query = { isActive: true };

    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).sort(sort).limit(60);
    res.json({ products });
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ product });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const product = await Product.create(req.body);
    await writeAuditLog(req, "admin.product.create", { entity: "Product", entityId: String(product._id) });
    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    await writeAuditLog(req, "admin.product.update", { entity: "Product", entityId: String(product._id) });
    res.json({ product });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    await writeAuditLog(req, "admin.product.delete", { entity: "Product", entityId: String(product._id) });
    res.json({ message: "Product archived" });
  } catch (error) {
    next(error);
  }
}

export async function uploadProductImages(req, res, next) {
  try {
    const imageNames = req.files.map((file) => ({
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    }));
    await writeAuditLog(req, "admin.product.images.validate", { entity: "Product", files: imageNames });
    res.json({
      message: "Images validated. Connect object storage such as S3 or Cloudinary for production persistence.",
      files: imageNames
    });
  } catch (error) {
    next(error);
  }
}
