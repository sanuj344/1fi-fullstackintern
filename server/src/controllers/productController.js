import prisma from "../config/prisma.js";

export const listProducts = async (req, res) => {
  try {
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
      data: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch products"
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: true,
        emiPlans: true
      }
    });

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    return res.status(200).json({
      data: product
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch product"
    });
  }
};
