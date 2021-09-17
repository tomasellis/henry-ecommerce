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
  external_reference: any;
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
    const { items, installments, excluded_payment_types, payer } = req.body;
    console.log("datahere", items);

    const items_body: MercadopagoItems[] = items as MercadopagoItems[];
    const installments_body: number = installments as number;
    const excluded_payment_types_body: ExcludedType[] =
      excluded_payment_types as ExcludedType[];

    const external_reference_body = JSON.stringify({
      userId: "asldkjalskjd21j3lk3",
      userOrderNumber: 5,
    });

    const preference: MercadopagoPreference = {
      items: items_body,
      back_urls: {
        failure: `${REQUESTS_URL}/payment/failure`,
        pending: `${REQUESTS_URL}/payment/pending`,
        success: `${REQUESTS_URL}/payment/success`,
      },
      external_reference: external_reference_body,
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
