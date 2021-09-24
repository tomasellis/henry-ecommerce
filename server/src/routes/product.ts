import axios from "axios";

import { Response, Request, Router, NextFunction } from "express";
const router = Router();

router.get(
  "/",
  async (req: Request, response: Response, next: NextFunction) => {
    const id = req.query.id;
    let query = `query MyQuery {
    products(where: {id: {_eq: "${id}"}}) {
      gender
      id
      name
      image_url
      price
      product_options(where: {id: {}, product_id: {_eq: "${id}"}}) {
        color
        size
        stock
        id
      }
    }
  }`;
    try {
      const { data } = await axios({
        url: "https://henry-pg-api.herokuapp.com/v1/graphql",
        method: "POST",
        data: { query: query },
      });
      response.status(200).json(data.data);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
