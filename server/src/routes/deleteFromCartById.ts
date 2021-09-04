import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { cart_product_id } = request.query;

    const cart_product_query: string = (cart_product_id as string) ?? "";

    if (cart_product_query !== "") {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: deleteFromCartById(cart_product_query),
          }, // addToCartMutation returns a string
        });

        response.send(data.data);
      } catch (err) {
        next(err);
      }
    } else {
      response.send(`Missing cart_product_id(UUID)`);
    }
  }
);

export default router;

const deleteFromCartById = (cart_product_id: string) => `mutation {
    delete_carts_products_by_pk(id: ${cart_product_id}){
      id
      product_option_id
      user_id
      quantity
    }
  }`;
