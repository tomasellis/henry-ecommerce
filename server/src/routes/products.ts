import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()

router.get("/", async (req: Request, response: Response, next: NextFunction) => {

  const category_name = req.query.category_name? `category: {_eq: ${req.query.category_name}}` : ' '
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

          products(where: {${gender},${price},${name}, product_categories: {category_name: {${category_name}}}, product_options: {${color}, ${size}} }) {
            name
            image_url
            gender
            price
            id
            product_options{id}
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
