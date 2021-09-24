import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()

router.get("/", async (req: Request, response: Response, next: NextFunction) => {
  let page = req.query._page
  let limit =req.query._limit
  const category_name = req.query.category_name? `category_name: {_eq: ${req.query.category_name}}` : ' '
  const gender = req.query.gender? `gender: {_eq: ${req.query.gender}}` : ' '
  const color = req.query.color? `color:{_eq:${req.query.color}}` : ' '
  const size = req.query.size? `size:{_eq:${req.query.size}}` : ' '
  const price = `price: {_gte: ${req.query.greater_than || "0"}, _lte: ${req.query.less_than || "999999"}}`
  const _search = req.query._search? `name: {_ilike: "%${req.query._search}%"}`: ' '
  const _page = page? `offset: ${+page}`: ' '
  const _limit = limit? `limit: ${+limit}`: ' '
  let pages = [page? `offset: ${(+page + 0) * 12}`: ' ', page? `offset: ${(+page + 1) * 12}`: ' ']
  try {
    let arr = [];
    for (let i=0; i<2; i++) {
    const {data} = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: { query:
        `query {
          products(where: {${gender},${price},${_search}, product_categories: {${category_name}}, product_options: {${color}, ${size}} }, ${pages[i]}, ${_limit}) {
            name
            image_url
            gender
            price
            id
            product_options{
              id
              color
              size
              stock
            }
            product_categories {
              id
              category_name
            }
          }
        }`
      },
    });
    arr.push(data.data)
    }
    let obj = {
      data: arr[0],
      next: arr[1]
    }
    response.send(obj);
  } catch (err) {
    next(err)
  }
});

export default router;
