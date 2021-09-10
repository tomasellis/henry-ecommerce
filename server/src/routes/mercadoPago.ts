import { Response, Request, Router, NextFunction } from "express";
const router = Router();
import mercadopago from "mercadopago";
require("dotenv").config();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

const MPACCESS_TOKEN =
  process.env.MPACCESS_TOKEN ||
  (() => {
    console.log("No mpaccess token, half a pila");
    return "fake";
  })();

const CLIENT_ID =
  process.env.CLIENT_ID ||
  (() => {
    console.log("No client id token, half a pila");
    return "fake";
  })();

mercadopago.configure({ access_token: MPACCESS_TOKEN });

type MercadopagoItems = {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  description: string;
};

type MercadopagoPreference = {
  items: MercadopagoItems[];
  back_urls: {};
};

router.post(
  "/create_preference",
  async (req: Request, response: Response, next: NextFunction) => {
    const { items } = req.body;

    const items_body: MercadopagoItems[] = items as MercadopagoItems[];

    // const preference = {
    //   items: [
    //     {
    //       title: req.body.description,
    //       unit_price: Number(req.body.price),
    //       quantity: Number(req.body.quantity),
    //     },
    //   ],
    //   back_urls: {
    //     success: `${BACKEND_URL}/feedback`,
    //     failure: `${BACKEND_URL}/feedback`,
    //     pending: `${BACKEND_URL}/feedback`,
    //   },
    //   auto_return: "approved",
    // };

    const preference: MercadopagoPreference = {
      items: [
        {
          id: "fashion",
          title: "Mi producto",
          unit_price: 100,
          quantity: 1,
          description: "Descirpcion larguiismaaaaaa",
        },
        {
          id: "fashion",
          title: "Mi2 producto",
          unit_price: 200,
          quantity: 11,
          description: "Descirpcion largusiismaaaaaa",
        },
      ],
      back_urls: {
        failure: `${BACKEND_URL}/FalloMáquina`,
        pending: `${BACKEND_URL}/EsperandoElPaog`,
        success: `${BACKEND_URL}/SalioTodoBien`,
      },
    };

    try {
      const mpRes = await mercadopago.preferences.create(preference);
      console.log("llego melipago", mpRes.body.id);
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

export default router;
