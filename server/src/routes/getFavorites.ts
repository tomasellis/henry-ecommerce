import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { user_id } = request.query;

    const user_id_query: string = (user_id as string) ?? "";

    if (
      user_id_query !== ""
    ) {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: getFavorites(
              user_id_query
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
        `Missing ${user_id_query === "" ? "user_id(UUID), " : ""}`
      });
    }
  }
);

export default router;

const getFavorites = (
  user_id: string,
) => `query TraerFavorites {
  users_by_pk(id: "${user_id}") {
    favourites(order_by: {created_at: asc}) {
      product {
        name
        price
        gender
        image_url
      }
      product_id
      id
    }
  }
}
  `;
