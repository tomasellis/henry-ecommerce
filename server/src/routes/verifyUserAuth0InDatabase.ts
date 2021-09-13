import axios from "axios";

import { Response, Request, Router, NextFunction } from 'express';
const router = Router()

router.get("/", async (req: Request, response: Response, next: NextFunction) => {
  const { id_auth0 } = req.query

  try {
    const { data } = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: {
        query:
          `query {
            users(where: {auth0_id: {_eq: "${id_auth0}"}}) {
              id
            }
          }`
      },
    });
    response.json({user_id:data.data.users[0].id || null});
  } catch (err) {
    next(err)
  }
});

export default router;