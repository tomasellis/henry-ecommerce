import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const category = request.body;
    console.log(category)
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: updateDataCategory(category),
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
          msg: "Category updated!",
        };
        return response.send(res);
      } catch (err) {
        next(err);
      }
  }
);

export default router;

const updateDataCategory = (
  category:any
) => `mutation {
    update_products_categories_by_pk(pk_columns: {id: "${category.id}"},
     _set: {category_name: ${category.category_name},
     }){
       category_name
     }
  }`;
