import axios from "axios";
import { Response, Request, Router, NextFunction } from 'express';
const router = Router()
require('dotenv').config();
var ManagementClient = require('auth0').ManagementClient;


const { CLIENT_ID_FOR_GET_TOKEN } = process.env
const { SECRET_FOR_GET_TOKEN } = process.env

const management = new ManagementClient({
  domain: 'ecommerce-ropa-henry.us.auth0.com',
  clientId: CLIENT_ID_FOR_GET_TOKEN,
  clientSecret: SECRET_FOR_GET_TOKEN,
});


router.get("/", async (req: Request, response: Response, next: NextFunction) => {
  const { id } = req.query

  const body = { "roles": ["rol_1Zs7o4HFqBBTTYzx"] }; //id del rol admin

  try {
    const params = { id: id };
    const data = await management.assignRolestoUser(params, body);
    response.send(data);
  } catch (err) {
    next(err)
  }
});

export default router;
