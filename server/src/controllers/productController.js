import prisma from "../config/prisma.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createError } from "../middleware/errorHandler.js";

export const listProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      mrp: true,
      imageUrl: true
    },
    orderBy: { name: "asc" }
  });

  res.status(200).json({
    status: "success",
    data: products
  });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      emiPlans: true
    }
  });

  if (!product) {
    throw createError(404, "Product not found");
  }

  res.status(200).json({
    status: "success",
    data: product
  });
});
