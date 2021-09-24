import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const  newOption  = request.body;

    console.log(newOption)

      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: addOptionToProduct(newOption),
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
  }
);

export default router;

const addOptionToProduct = (
  newOption:any
) => `mutation {
    insert_products_options_one(object:{
      color: ${newOption.color},
      product_id: "${newOption.product_id}",
      stock:${newOption.stock},
      image_url:"${newOption.image_url}",
      size: ${newOption.size}}){
      id
      color
    }
  }`;
