// import axios from "axios";
import { Response, Request, Router, NextFunction } from "express";
import nodemailer from "nodemailer";
import { messageOrderPaid } from "../templatesEmail/messageOrderPaid";
import { messageOrderShipped } from "../templatesEmail/messageOrderShipped";
import { messageOrderDelivered } from "../templatesEmail/messageOrderDelivered";
require("dotenv").config();

const { PASSWORD_EMAIL_NODEMAILER } = process.env;
const router = Router();


router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { user_email, user_name, type_message, order } = request.body;

    if (user_email && user_name && type_message && order) {

      let message = "",
        subject = "";
      switch (type_message) {
        case "ORDER_PAID":
          message = messageOrderPaid(user_name, order);
          subject = "Your order has been approved";
          break;

        case "ORDER_SHIPPED":
          message = messageOrderShipped(user_name, order);
          subject = "Your order has been shipped";
          break;

        case "ORDER_DELIVERED":
          message = messageOrderDelivered(user_name, order);
          subject = "Your order has been delivered";
          break;
      }

      try {
        let transporter = nodemailer.createTransport({
          host: "smtp.mail.yahoo.com",
          port: 465,
          secure: false, // upgrade later with STARTTLS
          service: "yahoo",
          auth: {
            user: "henry.pg@yahoo.com",
            pass: PASSWORD_EMAIL_NODEMAILER,
          },
        });

        let email = await transporter.sendMail({
          from: '"henry ecommerce" <henry.pg@yahoo.com>', // sender address
          to: user_email, // list of receivers
          subject: subject,
          // text: "Hello world?", // plain text body
          html: message,
        });

        response.json(email);
      } catch (err) {
        next(err);
      }
    } else {
      response.json({
        error: `Missing user_email OR user_name OR type_message OR order`,
      });
    }
  }
);

export default router;

/*
formato rta:

{
  "accepted": [
    listaDeEmails
  ],
  "rejected": [],
  "envelopeTime": 1212,
  "messageTime": 1842,
  "messageSize": 332,
  "response": "250 OK , completed",
  "envelope": {
    "from": "henry.pg@yahoo.com",
    "to": [
      listaDeEmails
    ]
  },
  "messageId": "<0b4a9af9-efed-e0a3-c40f-97fd5f97d830@yahoo.com>"
}

 */
