import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()

let query = `query MyQuery {
  colors {
    name
  }
  size {
    name
  }
  categories {
    name
  }
}`

router.get("/", async (req: Request, response: Response, next: NextFunction) => {
  try {
    const {data} = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: { query: query
        },
    });
    await console.log(data.data)
    response.status(200).json(data.data)
  } catch (err) {
    next(err)
  }
});

export default router
