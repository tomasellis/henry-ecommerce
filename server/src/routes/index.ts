import { Router } from "express";
import products from "./products";
import product from "./product";
import blockUser from "./blockUser";
import setAdminUser from './setAdminUser'

const router = Router()

router.use("/products", products);
router.use("/product", product);
router.use("/blockUser", blockUser);
router.use("/setAdminUser", setAdminUser);

export default router;
