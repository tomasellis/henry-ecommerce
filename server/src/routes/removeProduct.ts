import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.body;
    console.log(id)

      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: removeProductMutation(id),
          },
        });
        if (data.errors) {
          return response.status(400).send(data);
        }
        const res = {
          ...data,
          msg: "Product removed!",
        };
        return response.send(res);
      } catch (err) {
        next(err);
      }
  }
);

export default router;

const removeProductMutation = (
  id: string
) => `mutation {
    delete_products_by_pk(id: "${id}"){
      name
    }
  }`;
