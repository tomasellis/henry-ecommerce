import axios from "axios";
import React, { useEffect } from "react";
import "./styles.css";

const { REACT_APP_MP_PUBLIC_KEY } = process.env;

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;
const MercadoPago = window[`MercadoPago`];

const CheckoutForm = ({ data, active }) => {
  useEffect(() => {
    (async () => {
      if (data && active) {
        try {
          await createPreference(data);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [data, active]);

  if (active) {
    return (
      <div className="checkoutForm fade-in">
        <div>
          Address info:
          <input type={"text"} placeholder={"Direccion de envio"}></input>
        </div>
        <br />
        <div className={"cho-container"}></div>
      </div>
    );
  } else {
    return <span></span>;
  }
};

export default CheckoutForm;

const createPreference = async (data) => {
  const res = await axios.post(
    `${BASE_URL}/mercadopago/create_preference`,
    data
  );

  if (res) {
    const mp = new MercadoPago(`${REACT_APP_MP_PUBLIC_KEY}`, {
      locale: "es-AR",
    });
    console.log(res.data.response.id);
    mp.checkout({
      preference: {
        id: res.data.response.id,
      },
      render: {
        container: ".cho-container",
        label: "Payment Options",
      },
    });
  }
};
