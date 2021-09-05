import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { user_id } = request.query;
    const user_id_query: string = (user_id as string) ?? "";
    if (user_id_query !== "") {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: getUserCartDataQuery(user_id_query),
          },
        });

        if (data.errors) {
          response.send(data.errors);
        } else {
          response.send(data.data);
        }
      } catch (err) {
        next(err);
      }
    } else {
      response.send(`Missing: 
      query user_id(UUID)`);
    }
  }
);

export default router;

const getUserCartDataQuery = (user_id: string) => `query {
    users(where: {id: {_eq: "${user_id}"}}) {
      role
      email
      cart_products {
        id
        quantity
        product_option_id
        products_option {
          product {
            name
          }
        }
      }
    }
  }
  `;
