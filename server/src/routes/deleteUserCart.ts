import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request.body;

    const user_id_query = (userId as string) || "";

    if (user_id_query !== "") {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: deleteUserCartMutation(user_id_query),
          },
        });
        if (data.errors) {
          return response.send(data.errors);
        } else {
          response.send(data);
        }
      } catch (err) {
        next(err);
      }
    } else {
      response.json({
        error: `Missing ${user_id_query === "" ? "userId(UUID), " : ""} `,
      });
    }
  }
);

export default router;

const deleteUserCartMutation = (userId: string) => `mutation DeleteUserCart{
    delete_carts_products(where: {user_id:{_eq:"${userId}"}}){
      affected_rows
      returning{
        user_id
      }
    }
  }`;
