import { Router } from "express";
import products from "./products";
import product from "./product";
import options from "./options";
import createProduct from "./createProduct"
import blockUser from "./blockUser";
import setAdminUser from "./setAdminUser";
import addToCart from "./addToCart";

const router = Router();

router.use("/products", products);
router.use("/product", product);
router.use("/options", options);
router.use("/createProduct", createProduct)
router.use("/blockUser", blockUser);
router.use("/setAdminUser", setAdminUser);
router.use("/addToCart", addToCart);
export default router;
