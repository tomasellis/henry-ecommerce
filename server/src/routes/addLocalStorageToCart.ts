import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
const router = Router();
require("dotenv").config();

interface DataProduct {
  user_id: string,
  quantity: number,
  id_option: string
}



router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { cart, user_id } = request.body;

    if (
      cart
    ) {

      const cartFormated =  cart.map((product: DataProduct) => {
        return {
          user_id: user_id,
          product_option_id: product.id_option,
          quantity: product.quantity
        }
      })

      try {
        const { data } = await axios({
          url: "https://henry-pg-api.herokuapp.com/v1/graphql",
          method: "POST",
          data: {
            query: `mutation addMultiplesProductsToCart($cartFormated: [carts_products_insert_input!]!){
              insert_carts_products(objects: $cartFormated, on_conflict: {constraint: carts_products_product_option_id_user_id_key, update_columns: quantity}) {
                returning {
                  id
                  quantity
                }
              }
            }`, 
            variables:{cartFormated:cartFormated}
          },
        })
        if (data.errors) {
          return response.send(data.errors);
        } else {
          response.json(data.data);
        }
      } catch (err) {
        next(err);
      }
    } else {

      response.json({
        error:
          `Missing cart -> [{},{color: 'COLOR',id: 'UUID_PRODUCT_GENERAL',id_option: 'UUID_PRODUCT_OPTION',image_url: 'URL',name: 'NAME',price: PRICE,quantity: QUANTITY,size: 'SIZE'},{},{}]. user_id -> 'UUID_user_id'`
      });
    }
  }
);

export default router;

