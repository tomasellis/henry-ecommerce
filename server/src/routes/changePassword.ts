import { Response, Request, Router, NextFunction } from 'express';
const router = Router()
require('dotenv').config();
var ManagementClient = require('auth0').ManagementClient;

const management = new ManagementClient({
  domain: 'ecommerce-ropa-henry.us.auth0.com',
  clientId: process.env.CLIENT_ID_FOR_GET_TOKEN,
  clientSecret: process.env.SECRET_FOR_GET_TOKEN,
});


router.post("/", async (req: Request, response: Response, next: NextFunction) => {

  const { auth0_id, newPassword } = req.body

  const body = {
    password: newPassword
  }

  const params = { id: auth0_id };

  try {

    const data = await management.users.update(params, body);
    response.send(data);
  } catch (err) {
    next(err)
  }
});

export default router;
