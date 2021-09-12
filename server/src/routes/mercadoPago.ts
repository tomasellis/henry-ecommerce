import { Response, Request, Router, NextFunction } from "express";
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
  external_reference: string;
  payment_methods: {
    excluded_payment_types: ExcludedType[];
    installments: number;
  };
  payer: any;
};

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

const MPACCESS_TOKEN =
  process.env.MPACCESS_TOKEN ||
  (() => {
    console.log("No mpaccess token, half a pila");
    return "fake";
  })();

mercadopago.configure({ access_token: MPACCESS_TOKEN });

router.post(
  "/create_preference",
  async (req: Request, response: Response, next: NextFunction) => {
    const { items, id, installments, excluded_payment_types, payer } = req.body;
    console.log("datahere", items);

    const items_body: MercadopagoItems[] = items as MercadopagoItems[];
    const id_body: string = id as string;
    const installments_body: number = installments as number;
    const excluded_payment_types_body: ExcludedType[] =
      excluded_payment_types as ExcludedType[];

    const preference: MercadopagoPreference = {
      items: items_body,
      back_urls: {
        failure: `${BACKEND_URL}/FalloMáquina`,
        pending: `${BACKEND_URL}/mercadoPago/payments`,
        success: `${BACKEND_URL}/mercadoPago/payments`,
      },
      external_reference: `${id_body}`,
      payment_methods: {
        excluded_payment_types: excluded_payment_types_body ?? [],
        installments: installments_body,
      },
      payer,
    };

    try {
      const mpRes = await mercadopago.preferences.create(preference);
      return response.send(mpRes);
    } catch (err) {
      console.error(err);
    }
  }
);

router.get("/feedback", function (request, response) {
  response.json({
    Payment: request.query.payment_id,
    Status: request.query.status,
    MerchantOrder: request.query.merchant_order_id,
  });
});

router.get(
  "/payments",
  async (req: Request, response: Response, next: NextFunction) => {
    console.log(req);
    response.send({ ...req.query, return: "http://localhost:3000/cart" });
  }
);

export default router;
