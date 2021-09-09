import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { auth0_id, email, name } = request.body;

      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: `mutation {
              insert_users_one(object: {auth0_id: "${auth0_id}", email: "${email}", name: "${name}"}) {
                id
              }
            }`,
          },
        });
        if (data.errors) {
          return response.json({errors: data.errors});
        } else {
          response.json({user_id: data.data.insert_users_one.id});
        }
      } catch (err) {
        next(err);
      }
  }
);

export default router;