import { Router } from "express";
import products from "./products";
import product from "./product";

const router = Router()

router.use("/products", products);
router.use("/product", product);

export default router;
