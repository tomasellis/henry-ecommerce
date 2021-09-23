import axios from "axios";
import { Response, Request, Router, NextFunction, response } from "express";
const router = Router();
import mercadopago from "mercadopago";
require("dotenv").config();

type MercadopagoItems = {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  description: string;
};

type ExcludedType = {
  id: string;
};

type MercadopagoPreference = {
  items: MercadopagoItems[];
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  external_reference: any;
  payment_methods: {
    excluded_payment_types: ExcludedType[];
    installments: number;
  };
  payer: Payer;
};

type Payer = {
  email: string;
  address: {
    street_name: string;
    zip_code: string;
    street_number: string;
  };
};
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
const FRONTEND_URL = process.env.REQUESTS_URL || "http://localhost:3000";

const MPACCESS_TOKEN =
  process.env.MPACCESS_TOKEN ||
  (() => {
    console.log("No mpaccess token");
    return "fake";
  })();

mercadopago.configure({ access_token: MPACCESS_TOKEN });

router.post(
  "/create_preference",
  async (req: Request, response: Response, next: NextFunction) => {
    const {
      items,
      installments,
      excluded_payment_types,
      payer,
      external_reference,
      latitude,
      longitude,
      additionalInfo,
    } = req.body;
    console.log("datahere", req.body);

    const items_body: MercadopagoItems[] = items as MercadopagoItems[];
    const installments_body: number = installments as number;
    const excluded_payment_types_body: ExcludedType[] =
      excluded_payment_types as ExcludedType[];
    const payer_body: Payer = payer as Payer;
    const latitude_body: number = latitude as number;
    const longitude_body: number = longitude as number;
    const additionalInfo_body: string = additionalInfo as string;

    const external_reference_body = external_reference as string;

    const backURL = `${BACKEND_URL}/mercadoPago/payment?userEmail=${payer_body.email}&userAddress=${payer_body.address.street_name}&latitude=${latitude_body}&longitude=${longitude_body}&additionalInfo=${additionalInfo_body}`;

    const preference: MercadopagoPreference = {
      items: items_body,
      back_urls: {
        failure: backURL,
        pending: backURL,
        success: backURL,
      },
      external_reference: external_reference_body,
      payment_methods: {
        excluded_payment_types: excluded_payment_types_body ?? [],
        installments: installments_body,
      },
      payer: payer_body,
    };

    try {
      const mpRes = await mercadopago.preferences.create(preference);
      return response.send(mpRes);
    } catch (err) {
      console.error(err);
    }
  }
);

router.get("/payment", async (req, res) => {
  const { userEmail, userAddress, latitude, longitude, additionalInfo } =
    req.query;

  const additionalInfo_query = additionalInfo as string;
  const userEmail_query = userEmail as string;
  const userAddress_query = userAddress as string;
  const latitude_query = parseFloat(latitude as string);
  const longitude_query = parseFloat(longitude as string);
  const payment_status = req.query.status as
    | "approved"
    | "rejected"
    | "in_process";
  const userId = req.query.external_reference as string;

  // If payment is rejected
  if (payment_status === "rejected") {
    return res.redirect(`${FRONTEND_URL}/cart`);
  }

  // Delete user's cart data
  const deleteCartRes = await axios.post(`${BACKEND_URL}/deleteUserCart`, {
    userId: userId,
  });

  // Get removed items
  const productsRemovedFromCart = deleteCartRes.data.data.delete_carts_products
    .returning as ReturningRemovedFromCart[];

  console.log(
    "QUANTITY",
    productsRemovedFromCart[0].quantityBought,
    "STOCK",
    productsRemovedFromCart[0].products_option.stock,
    "NAME",
    productsRemovedFromCart[0].products_option.productDetail.name
  );

  // Update stock in db
  const updateStock = await axios({
    url: "https://henry-pg-api.herokuapp.com/v1/graphql",
    method: "POST",
    data: {
      query: updateStockOfProductOptionMutation(
        createUpdatedStocksArray(
          productsRemovedFromCart.map((product) => {
            const finalQuantity =
              product.products_option.stock - product.quantityBought;
            console.log("FINAL QUANTITY", finalQuantity);
            let obj = {
              id: product.products_option.id,
              stock: finalQuantity,
              color: product.products_option.color,
              size: product.products_option.size,
              product_id: product.products_option.product_id,
              image_url: product.products_option.image_url,
            };
            return obj;
          })
        )
      ),
    },
  });

  console.log(
    "UPDATED SOTKC",
    updateStock.data.data.insert_products_options.returning
  );

  // Set new order for user
  const createNewOrder = await axios({
    url: "https://henry-pg-api.herokuapp.com/v1/graphql",
    method: "POST",
    data: {
      query: addNewOrderMutation(
        userId,
        payment_status,
        userEmail_query,
        latitude_query,
        longitude_query,
        userAddress_query,
        additionalInfo_query
      ),
    },
  });

  console.log("ORDERNEW", createNewOrder.data);

  // Set orderId
  const orderId = createNewOrder.data.data.insert_orders_one.id as string;

  // Set new bought products for user
  await axios({
    url: "https://henry-pg-api.herokuapp.com/v1/graphql",
    method: "POST",
    data: {
      query: addOrderProductsMutation(
        fromCartToOrderStringArray(productsRemovedFromCart, orderId)
      ),
    },
  });

  return res.redirect(`${FRONTEND_URL}`);
});

export default router;

type ReturningRemovedFromCart = {
  userId: string;
  quantityBought: number;
  products_option: {
    id: string;
    size: string;
    color: string;
    stock: number;
    product_id: string;
    image_url: string;
    productDetail: {
      name: string;
      price: number;
    };
  };
};

const addNewOrderMutation = (
  userId: string,
  status: string,
  email: string,
  latitude: number,
  longitude: number,
  address: string,
  additionalInfo: string
) => `mutation AddNewOrder {
  insert_orders_one(object: {
      user_id: "${userId}", 
      status: "${status}", 
      email: "${email}", 
      latitude: ${latitude}, 
      longitude: ${longitude}, 
      address: "${address}",
      additional_information: "${additionalInfo}"      
    }) {
    id
    user_id
    email
    status
    latitude
    longitude
    address
    additional_information
    status
    created_at
    updated_at
  }
}`;

const fromCartToOrderStringArray = (
  products: ReturningRemovedFromCart[],
  orderId: string
) => {
  const array = products.map((product) => {
    let properString = `{
      user_id: "${product.userId}",
      order_id: "${orderId}",
      product_option_id: "${product.products_option.id}",
      quantity: ${product.quantityBought},
      unit_price: ${product.products_option.productDetail.price}
    }`;
    return properString;
  });
  return array;
};

const addOrderProductsMutation = (
  products: string[]
) => `mutation AddBoughtProductsToUser {
  insert_orders_products(objects: [${products}]) {
    affected_rows
    returning {
      id
      user_id
      unit_price
      quantity
      product_option_id
    }
  }
}
`;

const createUpdatedStocksArray = (
  productOptions: {
    id: string;
    stock: number;
    color: string;
    size: string;
    product_id: string;
    image_url: string;
  }[]
) => {
  const array = productOptions.map(
    (option) =>
      `{id: "${option.id}" stock: ${option.stock} color: ${option.color} size: ${option.size} product_id: "${option.product_id}" image_url: "${option.image_url}"}`
  );
  return array;
};

const updateStockOfProductOptionMutation = (
  productOptions: string[]
) => `mutation UpdateStockOfProductOption {
	insert_products_options(objects: [${productOptions}],
  on_conflict: {
        constraint: opcion_producto_pkey,
        update_columns: [stock]
      }){
    affected_rows
    returning{
      id
      stock
      product{
        name
      }
    }
  }
}`;
