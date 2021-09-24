import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.body;

    if (id !== "") {
      try {
        console.log(id)
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: removeOptionFromProductMutation(id),
          },
        });
        if (data.errors) {
          return response.status(400).send(data);
        }
        const res = {
          ...data,
          msg: "Option removed!",
        };
        return response.send(res);
      } catch (err) {
        next(err);
      }
    } else {
      response.send(
        `Missing: {${
          id !== "" ? "" : "product_option_id"
        }}`
      );
    }
  }
);

export default router;

const removeOptionFromProductMutation = (
  id: string
) => `mutation {
    update_products_options_by_pk(pk_columns: {id: "${id}"},
      _set: {
        stock: ${0}}) {
          id
    }
  }`;
