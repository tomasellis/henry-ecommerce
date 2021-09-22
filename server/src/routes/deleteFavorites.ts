import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { favorite_id } = request.body;

    const favorite_id_body: string = (favorite_id as string) ?? "";

    if (
      favorite_id_body !== ""
    ) {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: deleteToFavourites(
              favorite_id_body,
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
        `Missing ${favorite_id_body === "" ? "favorite_id(UUID), " : ""}`
      });
    }
  }
);

export default router;

const deleteToFavourites = (
  favorite_id: string
) => `mutation {
    delete_favourites_by_pk(id:"${favorite_id}"){
      id
      product_option_id
      created_at
      user_id
    }
  }`;