import { Router } from "express";
import products from "./products";
import product from "./product";
import options from "./options";

const router = Router()

router.use("/products", products);
router.use("/product", product);
router.use("/options", options)

export default router;
