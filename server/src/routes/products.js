import { Router } from "express";
import {
	getProductBySlug,
	listProducts
} from "../controllers/productController.js";

const router = Router();

router.get("/products", listProducts);
router.get("/products/:slug", getProductBySlug);

export default router;
