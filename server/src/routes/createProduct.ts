import axios from "axios";

import { Response, Request, Router, NextFunction } from "express";
const router = Router();

router.post(
  "/",
  async (req: Request, response: Response, next: NextFunction) => {
    const { name, categories, image_url, gender, price, options } = req.body;
    console.log("BODY =>>>>>>>>>>>", req.body);
    if (
      name &&
      (categories as string[]) &&
      image_url &&
      gender &&
      price &&
      options
    ) {
      const productCategoriesArray: string[] = (categories as string[]).map(
        (category_name) => {
          const obj = `{ category_name: ${category_name.toLocaleLowerCase()} }`;
          return obj;
        }
      );

      const productOptionsArray: string[] = (options as ProductOptions[]).map(
        (option) => {
          return `{color: ${option.color}, image_url: "${option.image_url}", size: ${option.size}, stock: ${option.stock}}`;
        }
      );

      console.log(productOptionsArray);
      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: createProductMutation(
              gender,
              image_url,
              name,
              price,
              productCategoriesArray,
              productOptionsArray
            ),
          },
        });
        console.log("MAYBE ERRORS", data);
        if (data.errors) {
          return response.status(400).send(data);
        }
        return response.status(200).send(data);
      } catch (err) {
        console.log(err);
        next(err);
      }
    } else {
      response.send(
        `Missing data, make sure you send an object with the following properties: {
          ${gender ? "" : "gender(string),"} 
          ${image_url ? "" : "image_url(string),"} 
          ${name ? "" : "name(string),"} 
          ${price ? "" : "price(number),"}
          ${categories ? "" : "categories([name])"}, 
          ${options ? "" : "options([{color, size, stock, image_url}])"}`
      );
    }
  }
);

export default router;

type ProductOptions = {
  color: string;
  size: string;
  stock: number;
  image_url: string;
};

const createProductMutation = (
  gender: string,
  image_url: string,
  name: string,
  price: number,
  productCategoriesArray: string[],
  options: string[]
) => `mutation CreateAProduct{
  insert_products_one(object: {
    gender: ${gender}, 
    image_url: "${image_url}", 
    name: "${name}", 
    price: ${price}, 
    product_categories: {data: [${productCategoriesArray}]}, 
    product_options: {
      data: [${options}]
    }}) {
    id
    name
    product_categories {
      category_name
    }
    product_options {
      color
      size
      stock
    }
  }
}
`;
