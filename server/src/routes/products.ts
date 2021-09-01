import axios from "axios";

import {Response, Request, Router, NextFunction} from 'express';
const router = Router()

// Traeme todos los productos con sus nombres, categorias y generos

const query = `query {
    producto {
      nombre
      categoria
      genero
    }
  }`;

router.get("/", async (req: Request, response: Response, next: NextFunction) => {
  try {
    const data = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: { query: query },
    });
    response.send(data.data.data);
  } catch (err) {
    next(err)
  }
});

export default router;
