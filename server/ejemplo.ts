import axios from "axios";

const variableGenero = "hombre";

/* Acciones con API GraphQL

  query:  para pedir informacion, sería un GET
    ex:   query {
      productos {
        nombre
      }
    }

    Va a ir a la tabla de Productos y va a traer los nombres de todos los productos



  mutation: para modificar informacion, sería un POST potente, porque tambien puede borrar
    ex: mutation {
      insert_color(objects: {nombre: "violeta"}) {
        returning {
          nombre
        }
    }
  }
    
    Va a insertar una fila con el nombre "violeta" en la tabla color y va a responder con el nombre que agrego


  
    
  subscriptions: para tener informacion en tiempo real, no lo vamos a necesitar en el proyecto
*/

// _eq => donde "genero" es igual a : variableGenero

const query = `query {
  producto(where: {genero: {_eq:${variableGenero}}}) { 
    nombre
    genero
    categoria
  }
}`;

const mutation = `mutation {
    insert_color(objects: {nombre: "violeta"}) {
      returning {
        nombre
      }
    }
  }
  `;

const init = async () => {
  const data = await axios({
    url: "https://henry-pg-api.herokuapp.com/v1/graphql",

    method: "POST",

    data: { query: query },
  });

  console.log(data.data.data);
};

init();
