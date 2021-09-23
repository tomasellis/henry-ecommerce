import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request.query;

    const userIdQuery: string = (userId as string) ?? "";

    if (userIdQuery !== "") {
      try {
        console.log(userIdQuery, "query");
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: getUserOrdersQuery(userIdQuery),
          },
        });

        if (data.errors) {
          response.send(data.errors);
        } else {
          console.log(data);
          response.send(data.data);
        }
      } catch (err) {
        next(err);
      }
    } else {
      response.send(`Missing: 
      query userId(UUID)`);
    }
  }
);

export default router;
// Get user info

const getUserOrdersQuery = (userId: string) => `query getUserOrders{
  orders(where:{user_id:{_eq:"${userId}"}}){
    id
    status
    user_id
    email
    latitude
    longitude
    address
    created_at
    updated_at
    orders_products{
      id
      unit_price
      quantity
      products_option{
        product{ 
        image_url
        name
        }
      product_id
      }
    }
  }
}`