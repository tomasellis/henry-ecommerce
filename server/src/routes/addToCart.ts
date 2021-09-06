import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { product_option_id, user_id, quantity } = request.body;

    const user_id_query: string = (user_id as string) ?? "";
    const product_option_id_query: string = (product_option_id as string) ?? "";
    const quantity_query: number = quantity ? parseInt(quantity as string) : 0;

    if (
      user_id_query !== "" &&
      product_option_id_query !== "" &&
      quantity_query !== 0
    ) {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: addToCartMutation(
              user_id_query,
              product_option_id_query,
              quantity_query
            ),
          }, // addToCartMutation returns a string
        });
        if (data.errors) {
          return response.send(data.errors);
        } else {
          response.send(data.data);
        }
      } catch (err) {
        next(err);
      }
    } else {
      console.log(quantity_query);
      response.send(
        `Missing ${user_id_query === "" ? "user_id(UUID), " : ""}${
          product_option_id_query === "" ? "product_option_id(UUID), " : ""
        }${quantity_query === 0 ? "quantity(number !== 0)" : ""} `
      );
    }
  }
);

export default router;

const addToCartMutation = (
  user_id: string,
  product_option_id: string,
  quantity: number
) => `mutation {
    insert_carts_products_one(object: {
      user_id: "${user_id}", 
      quantity: ${quantity}, 
      product_option_id: "${product_option_id}"}, 
    on_conflict: {
      constraint: carts_products_product_option_id_user_id_key,
      update_columns: [quantity]
    }) {
      id
      product_option_id
      quantity
      user_id
    }
  }`;
