import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()


router.get("/", async (req: Request, response: Response, next: NextFunction) => {
  const {id} = req.query
  
  try {
    const {data} = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: { query: 
        `query {
          producto(where: {id: {_eq: "${id}" }}) {
            precio
            nombre
          }
          opcion_producto(where: {producto_id: {_eq: "${id}" }}) {
            color
            imagen_url
            size
            stock
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
