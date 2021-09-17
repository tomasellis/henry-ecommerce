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

const REQUESTS_URL = process.env.REQUESTS_URL || "http://localhost:3000";

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
        failure: `${REQUESTS_URL}/home`,
        pending: `${REQUESTS_URL}/cart`,
        success: `${REQUESTS_URL}/cart`,
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

export default router;
