import axios from "axios";

import { Response, Request, Router, NextFunction } from "express";
const router = Router();

router.post(
  "/",
  async (req: Request, response: Response, next: NextFunction) => {
    const { name, category, image_url, gender, price, color, size, stock } =
      req.body;
    let mutation = `mutation  {
    insert_products(
      objects:
      {
        category: ${category}
        gender: ${gender}
        image_url: ${image_url}
        name: ${name}
        price: ${price}
        product_options: {
          data: {
            color:${color}
            size: ${size}
            stock:${stock}
            image_url: ${image_url}
          }
          }
        }) {
          returning {
            id
            gender
            image_url
            name
            price
          }
        }
  }`;
    try {
      const { data } = await axios({
        url: "https://henry-pg-api.herokuapp.com/v1/graphql",
        method: "POST",
        data: { query: mutation },
      });
      console.log(data.data.insert_products, "ACAAAAAAAAAAA");
      response.status(200).json(data.data.insert_products.returning);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
