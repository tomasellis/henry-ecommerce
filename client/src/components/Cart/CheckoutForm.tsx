import React, { useEffect } from "react";
import "./styles.css";

const CheckoutForm = ({ data, active }) => {
  let checkoutButton;

  useEffect(() => {
    (async () => {
      if (data && active) {
        try {
          // eslint-disable-next-line
          // await createPreference(data);
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
        <div>
          <button onClick={() => checkoutButton.open()}></button>
        </div>
      </div>
    );
  } else {
    return <span></span>;
  }
};

export default CheckoutForm;
