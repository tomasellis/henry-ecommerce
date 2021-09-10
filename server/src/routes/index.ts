import { Router } from "express";
import products from "./products";
import product from "./product";
import options from "./options";
import createProduct from "./createProduct";
import blockUser from "./blockUser";
import setAdminUser from "./setAdminUser";
import addToCart from "./addToCart";
import deleteFromCart from "./deleteFromCart";
import getUserCartData from "./getUserCartData";
import addUserToDatabase from "./addUserToDatabase";
import addCategoryToProduct from "./addCategoryToProduct";
import removeCategoryFromProduct from "./removeCategoryFromProduct";
import verifyUserAuth0InDatabase from "./verifyUserAuth0InDatabase";
import fuzzySearch from "./fuzzySearch";
import mercadoPago from "./mercadoPago";

const router = Router();

router.use("/products", products);
router.use("/product", product);
router.use("/options", options);
router.use("/createProduct", createProduct);
router.use("/blockUser", blockUser);
router.use("/setAdminUser", setAdminUser);
router.use("/addToCart", addToCart);
router.use("/addUserToDatabase", addUserToDatabase);
router.use("/deleteFromCart", deleteFromCart);
router.use("/getUserCartData", getUserCartData);
router.use("/addCategoryToProduct", addCategoryToProduct);
router.use("/removeCategoryFromProduct", removeCategoryFromProduct);
router.use("/verifyUserAuth0InDatabase", verifyUserAuth0InDatabase);
router.use("/fuzzySearch", fuzzySearch);
router.use("/mercadopago", mercadoPago);

export default router;
