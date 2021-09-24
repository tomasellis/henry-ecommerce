import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const newCategory = request.body;

    console.log(newCategory);

    try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: addCategoryToProduct(newCategory),
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
      };
  }
);

export default router;

const addCategoryToProduct = (
  newCategory:any
) => `mutation {
    insert_products_categories_one(object:{
      category_name: ${newCategory.name}
      product_id: "${newCategory.product_id}"}){
      id
      category_name
    }
  }`;
