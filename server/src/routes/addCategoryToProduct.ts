import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { product_id, category } = request.body;

    const product_id_query: string = (product_id as string) ?? "";
    const category_query: string = (category as string) ?? "";

    if (product_id_query !== "" && category_query !== "") {
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: addCategoryToProduct(product_id_query, category_query),
          },
        });
        console.log(data);
        if (data.errors) {
          if (
            (data.errors[0].message as string).includes("Uniqueness violation")
          ) {
            return response.send({ msg: "Its already added!" });
          }
          return response.status(400).send(data);
        }
        const res = {
          ...data.insert_products_categories_one,
          msg: "Category added!",
        };
        return response.send(res);
      } catch (err) {
        next(err);
      }
    } else {
      response.send(
        `Missing: {${product_id_query !== "" ? "" : "product_id"} ${
          category !== "" ? "" : "category"
        }}`
      );
    }
  }
);

export default router;

const addCategoryToProduct = (
  product_id: string,
  category: string
) => `mutation {
    insert_products_categories_one(object:{
      category_name: ${category}
      product_id: "${product_id}"}){
      id
      category_name
    }
  }`;
