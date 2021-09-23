import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

interface Review {
  user_id: string,
  id_product_general: string,
  stars: number,
  comment:string,
  user_email:string
}



router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { id_product_general, user_id, stars, comment, user_email} = request.body;

    if (
      id_product_general && user_id && stars && comment && user_email
    ) {

      const review:Review = {
        id_product_general,
        user_id,
        stars,
        comment,
        user_email
    }

      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: `mutation addReview($review: reviews_insert_input!) {
              insert_reviews_one(object: $review) {
                comment
                id_review
                id_product_general
                stars
                user_id
                user_email
              }
            }`, 
            variables:{review:review}
          },
        })
        if (data.errors) {
          next(data.errors);
          return response.send(data.errors[0].message);
        } else {
          response.json(data.data);
        }
      } catch (err) {
        next(err);
      }
    } else {
      response.json({
        error:
          `Missing user_id OR id_product_general OR stars OR comment OR user_email'`
      });
    }
  }
);

export default router;

