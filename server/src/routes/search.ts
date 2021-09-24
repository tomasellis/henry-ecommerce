import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()


router.get("/", async (req: Request, response: Response, next: NextFunction) => {
  const word = req.query.word;
  try {
    const {data} = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: {
        query: `query MyQuery {
    products(where: {_or: [{name: {_ilike: "%${word}%"}}, {product_categories: {category_name: {_ilike: "%${word}%"}}}]}) {
      name
      price
      image_url
      id
      product_categories {
        id
        category_name
      }
      gender
      product_options {
       color
       id
       size
    }
    }
  }`
      }
    });
    response.send(data.data);
  } catch (err) {
    next(err)
  }
});

export default router;
