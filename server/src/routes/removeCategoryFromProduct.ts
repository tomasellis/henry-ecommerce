import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { product_category_id } = request.body;

    const product_category_id_query: string =
      (product_category_id as string) ?? "";

    if (product_category_id_query !== "") {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: removeCategoryFromProductMutation(product_category_id_query),
          },
        });
        if (data.errors) {
          return response.status(400).send(data);
        }
        const res = {
          ...data.insert_products_categories_one,
          msg: "Category removed!",
        };
        return response.send(res);
      } catch (err) {
        next(err);
      }
    } else {
      response.send(
        `Missing: {${product_category_id !== "" ? "" : "product_id"}}`
      );
    }
  }
);

export default router;

const removeCategoryFromProductMutation = (
  product_category_id: string
) => `mutation {
    delete_products_categories_by_pk(id: "${product_category_id}"){
      category_name
      id
      product_id
    }
  }`;
