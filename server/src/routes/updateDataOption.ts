import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const option = request.body;

      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: updateDataOption(option),
          },
        });
        console.log(data);
        if (data.errors) {
          if (
            (data.errors[0].message as string).includes("Uniqueness violation")
          ) {
            return response.send({ msg: "Its already updated!" });
          }
          return response.status(400).send(data);
        }
        const res = {
          ...data.insert_products_categories_one,
          msg: "Option updated!",
        };
        return response.send(res);
      } catch (err) {
        next(err);
      }
  }
);

export default router;

const updateDataOption = (
  option:any
) => `mutation {
    update_products_options_by_pk(pk_columns: {id: "${option.id}"},
     _set: {
     color: ${option.color},
     size: ${option.size},
     stock: ${option.stock}}) {
       id
     }
  }`;
