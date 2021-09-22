import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { product_id, user_id } = request.body;

    const user_id_query: string = (user_id as string) ?? "";
    const product_id_query: string = (product_id as string) ?? "";

    if (
      user_id_query !== "" &&
      product_id_query !== ""
    ) {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: addToFavourites(
              user_id_query,
              product_id_query,
            ),
          },
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
      response.json({ error:
        `Missing ${user_id_query === "" ? "user_id(UUID), " : ""}${
          product_id_query === "" ? "product_option_id(UUID), " : ""
        }`
      });
    }
  }
);

export default router;

const addToFavourites = (
  user_id: string,
  product_id: string,
) => `mutation {
    insert_favourites_one(object: {
      user_id: "${user_id}",
      product_id: "${product_id}"}){
    created_at
    id
    product_id
    updated_at
    user_id
  }
}`;
