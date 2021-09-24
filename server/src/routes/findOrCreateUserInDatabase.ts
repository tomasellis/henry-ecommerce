import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { auth0_id, email, name } = request.body;

    try {
      let { data } = await axios({
        url: "https://henry-pg-api.herokuapp.com/v1/graphql",
        method: "POST",
        data: {
          //verifico si el usuario existe
          query: `query {
                users(where: {auth0_id: {_eq: "${auth0_id}"}}) {
                  id
                  address
                  address_number
                  city
                  id
                  auth0_id
                  email
                  last_name
                  name
                  postal_code
                  role
                  status
                  reviews {
                    id_product_general
                  }
                  orders {
                    orders_products {
                      product_option_id
                      quantity
                      unit_price
                      product_id
                    }
                    status
                  }
                  favourites {
                    product_id
                    url_image
                  }
                }
              }`,
        },
      });
      console.log("findorcreateresponse", data);
      if (data.data.users.length)
        return response.send(data.data.users[0]);
      ({ data } = await axios({
        url: "https://henry-pg-api.herokuapp.com/v1/graphql",
        method: "POST",
        data: {
          query: `mutation {
                insert_users_one(object: {auth0_id: "${auth0_id}", email: "${email}", name: "${name}"}) {
                  id
                  address
                  address_number
                  city
                  id
                  auth0_id
                  email
                  last_name
                  name
                  postal_code
                  role
                  status
                  reviews {
                    id_product_general
                  }
                  orders {
                    orders_products {
                      product_option_id
                      quantity
                      unit_price
                      product_id
                    }
                    status
                  }
                  favourites {
                    product_id
                    url_image
                  }
                }
              }`,
        },
      }));
      if (data.errors) {
        return response.send({ errors: data.errors });
      } else {
        response.send(data.data.insert_users_one);
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
