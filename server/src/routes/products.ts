import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()

router.get("/", async (req: Request, response: Response, next: NextFunction) => {

  const category = req.query.category? `category: {_eq: ${req.query.category}}` : ' '
  const gender = req.query.gender? `gender: {_eq: ${req.query.gender}}` : ' '
  const color = req.query.color? `color:{_eq:${req.query.color}}` : ' '
  const size = req.query.size? `size:{_eq:${req.query.size}}` : ' '

  try {
    const {data} = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: { query:
        `query {
            product(where: {${category},${gender}, products_options: {${color}, ${size}} }) {
            name
            category
            gender
          }
        }`
      },
    });
    await console.log(data.data)
    response.status(200).json(data.data);
  } catch (err) {
    next(err)
  }
});

export default router;
