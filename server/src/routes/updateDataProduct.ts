import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const  productData  = request.body;
    console.log(productData)
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: updateDataProduct(productData),
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
          msg: "Product updated!",
        };
        return response.send(res);
      } catch (err) {
        next(err);
      }
  }
);

export default router;

const updateDataProduct = (
  productData:any
) => `mutation {
    update_products_by_pk(pk_columns: {id:"${productData.id}"},
     _set: {
     gender: ${productData.gender},
     image_url: "${productData.image_url}",
     name: "${productData.name}",
     price: "${productData.price}"}){
       name
     }
  }`;
