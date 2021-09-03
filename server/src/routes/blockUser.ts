import axios from "axios";
import { Response, Request, Router, NextFunction } from 'express';
const router = Router()
require('dotenv').config();
var ManagementClient = require('auth0').ManagementClient;

//este es un token manual que caduca cada 24 hs y hay que obtenerlo desde el panel de auth0, se deja en caso de emergencia
// const {TOKEN_MANAGEMENT_API_AUTH0} = process.env

const { CLIENT_ID_FOR_GET_TOKEN } = process.env
const { SECRET_FOR_GET_TOKEN } = process.env

const management = new ManagementClient({
  domain: 'ecommerce-ropa-henry.us.auth0.com',
  clientId: CLIENT_ID_FOR_GET_TOKEN,
  clientSecret: SECRET_FOR_GET_TOKEN,
});

//esta opcion para usar con token manual
// const options = {
//   headers: {
//    Authorization: TOKEN_MANAGEMENT_API_AUTH0
//   }
//  }

router.get("/", async (req: Request, response: Response, next: NextFunction) => {

  const { id, blocking } = req.query

  const body = {
    "blocked": blocking === 'true'
  }

  try {
    //esta opcion para usar con token manual
    //   const {data} = await axios.patch(`https://ecommerce-ropa-henry.us.auth0.com/api/v2/users/${id}`, body, options)

    var params = { id: id };

    const data = await management.users.update(params, body);
    response.send(data);
  } catch (err) {
    next(err)
  }
});

export default router;
