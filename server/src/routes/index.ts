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
import addOptionToProduct from "./addOptionToProduct";
import removeCategoryFromProduct from "./removeCategoryFromProduct";
import removeOptionFromProduct from "./removeOptionFromProduct";
import verifyUserAuth0InDatabase from "./verifyUserAuth0InDatabase";
import fuzzySearch from "./fuzzySearch";
import mercadoPago from "./mercadoPago";
import createNewCategory from "./createNewCategory";
import deleteUserCart from "./deleteUserCart";
import addLocalStorageToCart from "./addLocalStorageToCart";
import findOrCreateUserInDatabase from "./findOrCreateUserInDatabase";
import addReview from "./addReview";
import getUserOrders from "./getUserOrders";
import sendMail from "./sendMail";
import changePassword from './changePassword'
import search from './search'
import removeProduct from './removeProduct'
import updateDataProduct from './updateDataProduct'
import updateDataOption from './updateDataOption'
import updateDataCategory from './updateDataCategory'


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
router.use("/addOptionToProduct", addOptionToProduct);
router.use("/removeCategoryFromProduct", removeCategoryFromProduct);
router.use("/removeOptionFromProduct", removeOptionFromProduct);
router.use("/removeProduct", removeProduct);
router.use("/verifyUserAuth0InDatabase", verifyUserAuth0InDatabase);
router.use("/fuzzySearch", fuzzySearch);
router.use("/mercadopago", mercadoPago);
router.use("/addLocalStorageToCart", addLocalStorageToCart);
router.use("/deleteUserCart", deleteUserCart);
router.use("/createNewCategories", createNewCategory);
router.use("/findOrCreateUserInDatabase", findOrCreateUserInDatabase);
router.use("/addReview", addReview);
router.use("/getUserOrders", getUserOrders);
router.use("/sendMail", sendMail);
router.use("/changePassword", changePassword);
router.use("/search", search);
router.use("/updateDataProduct", updateDataProduct);
router.use("/updateDataOption", updateDataOption);
router.use("/updateDataCategory", updateDataCategory);

export default router;
