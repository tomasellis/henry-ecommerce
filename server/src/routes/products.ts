import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()

router.get("/", async (req: Request, response: Response, next: NextFunction) => {

  const categoria = req.query.categoria? `categoria: {_eq: ${req.query.categoria}}` : ' '
  const genero = req.query.genero? `genero: {_eq: ${req.query.genero}}` : ' '
  const color = req.query.color? `color:{_eq:${req.query.color}}` : ' '
  const size = req.query.size? `size:{_eq:${req.query.size}}` : ' '
  
  try {
    const {data} = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: { query: 
        `query {
          producto(where: {${categoria},${genero}, opcion_productos: {${color}, ${size}} }) {
            nombre
            categoria
            genero
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
