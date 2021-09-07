import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { user_id } = request.body;

      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: `mutation {
              insert_users_one(object: {id: "${user_id}"}) {
                id
              }
            }`,
          },
        });
        if (data.errors) {
          return response.json({errors: data.errors});
        } else {
          response.json({data: data.data});
        }
      } catch (err) {
        next(err);
      }
  }
);

export default router;