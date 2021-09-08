import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()

router.get("/", async (req: Request, response: Response, next: NextFunction) => {

  const categories = req.query.categories? `product_categories: {_eq: ${req.query.categories}}` : ' '
  const gender = req.query.gender? `gender: {_eq: ${req.query.gender}}` : ' '
  const color = req.query.color? `color:{_eq:${req.query.color}}` : ' '
  const size = req.query.size? `size:{_eq:${req.query.size}}` : ' '
  const price = `price: {_gte: ${req.query.greater_than || "0"}, _lte: ${req.query.less_than || "999999"}}`
  const name = req.query.name? `name: {_ilike: "%${req.query.name}%"}`: ' '


  try {
    const {data} = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: { query:
        `query {

          products(where: {${categories},${gender},${price},${name}, product_options: {${color}, ${size}} }) {
            name
            image_url
            gender
            price
            id
            product_options{
              id
              color
              size
            }
            product_categories {
              id
              category_name
            }
          }
        }`
      },
    });
    response.send(data.data);
  } catch (err) {
    next(err)
  }
});

export default router;
