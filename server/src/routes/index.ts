import { Router } from "express";
import products from "./products";
import product from "./product";
import user from "./user";

const router = Router()

router.use("/products", products);
router.use("/product", product);
router.use("/user", user);

export default router;
