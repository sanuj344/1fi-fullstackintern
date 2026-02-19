import { Router } from "express";
import healthRoutes from "./health.js";
import productRoutes from "./products.js";

const router = Router();

router.use(healthRoutes);
router.use(productRoutes);

export default router;
