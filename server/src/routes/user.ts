import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()
require('dotenv').config();

const {TOKEN_MANAGEMENT_API_AUTH0} = process.env


const options = {
  headers: {
   Authorization: TOKEN_MANAGEMENT_API_AUTH0
  }
 }

router.get("/", async (req: Request, response: Response, next: NextFunction) => {
  
  const {id, blocking} = req.query

  const body = {
    "blocked": blocking === 'true'
  }

  try {
    const {data} = await axios.patch(`https://ecommerce-ropa-henry.us.auth0.com/api/v2/users/${id}`, body, options)
    response.send(data);
  } catch (err) {
    next(err)
  }
});

export default router;
