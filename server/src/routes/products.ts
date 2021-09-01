import axios from "axios";

const router = require("express").Router();

// Traeme todos los productos con sus nombres, categorias y generos

const query = `query {
    producto {
      nombre
      categoria
      genero
    }
  }`;

router.get("/", async (request, response, next) => {
  try {
    const data = await axios({
      url: "https://henry-pg-api.herokuapp.com/v1/graphql",
      method: "POST",
      data: { query: query },
    });
    response.send(data.data.data);
  } catch (err) {
    response.status(400).send("Rompiste algo");
  }
});

module.exports = router;
