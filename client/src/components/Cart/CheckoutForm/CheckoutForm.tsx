import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { bounceInUp } from "react-animations";
import styled, { keyframes } from "styled-components";
import "./styles.css";

/* BOUNCE ANIMATION*/

const bounceInUpAnimation = keyframes`${bounceInUp}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceInUpAnimation};
`;

const MercadoPago = window[`MercadoPago`];
const { REACT_APP_BASE_BACKEND_URL, REACT_APP_MP_PUBLIC_KEY } = process.env;

const CheckoutForm = ({
  active,
  setActive,
  productsToCheckout,
  userId,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  productsToCheckout: CartProductData[];
  userId: string;
}) => {
  const [checkoutForm, setCheckoutForm] = useState({
    shippingAddress: "",
    email: "",
    confirmCheckbox: false,
    formComplete: false,
    mpButton: null,
  });

  const [checkoutData, setCheckoutData] = useState({
    data: null,
  });

  useEffect(
    () => {
      const data = createCheckoutData(productsToCheckout, 6, "", userId);
      setCheckoutData({ ...checkoutData, data });
    },
    // eslint-disable-next-line
    [productsToCheckout]
  );

  useEffect(() => {
    if (productsToCheckout.length > 0) {
      (async () => {
        const checkoutId = await createPreference(checkoutData.data);
        const mp = new MercadoPago(`${REACT_APP_MP_PUBLIC_KEY}`, {
          locale: "es-AR",
        });

        const checkout = mp.checkout({
          preference: {
            id: checkoutId,
          },
        });

        setCheckoutForm({ ...checkoutForm, mpButton: checkout });
      })();
    }
    // eslint-disable-next-line
  }, [checkoutForm.confirmCheckbox]);

  switch (active) {
    case true:
      return (
        <BouncyDiv>
          <div id="checkoutForm" className="checkoutForm">
            <div className="shippingForm">
              <Button
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  width: "fit-content",
                }}
                variant="contained"
                color="primary"
                size="small"
                onClick={(e) => {
                  setActive(!active);
                }}
              >
                Return to Cart
              </Button>
              <TextField
                id="standard-disabled"
                label="Shipping Address"
                value={checkoutForm.shippingAddress}
                onChange={(e) => {
                  setCheckoutForm({
                    ...checkoutForm,
                    shippingAddress: e.target.value,
                  });
                }}
              />
              <br></br>
              <TextField
                id="standard-disabled"
                label="Email for notifications"
                value={checkoutForm.email}
                onChange={(e) => {
                  setCheckoutForm({
                    ...checkoutForm,
                    email: e.target.value,
                  });
                }}
              />
              <br></br>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkoutForm.confirmCheckbox}
                    onChange={(e) => {
                      console.log(e.currentTarget.checked);
                      setCheckoutForm({
                        ...checkoutForm,
                        confirmCheckbox: e.target.checked,
                      });
                    }}
                  ></Checkbox>
                }
                label={`I confirm the information provided is correct`}
              />
            </div>
            <br></br>
            <Button
              variant="contained"
              disabled={
                !checkoutForm.email ||
                !checkoutForm.shippingAddress ||
                !checkoutForm.confirmCheckbox
              }
              onClick={async () => {
                checkoutForm.mpButton.open();
              }}
            >
              Proceed to payment!
            </Button>
          </div>
        </BouncyDiv>
      );

    case false:
      return <div></div>;

    default:
      return <div>Nothing rendering in Checkout Form</div>;
  }
};

export default CheckoutForm;

/* -----------------HERLPERS------------------------*/

const createCheckoutData = (
  products: CartProductData[],
  installments: number,
  id: string,
  user: any
): PreferenceData => {
  const data: PreferenceData = {
    id: `${id}`,
    installments: installments,
    payer: {
      email: user.email,
    },
    items: products.map((item) => {
      return {
        id: "fashion",
        description: "",
        quantity: item.productOption.optionQuantity,
        title: item.baseName,
        unit_price: item.basePrice,
      };
    }),
  };
  return data;
};

const createPreference = async (data) => {
  const res = await axios.post(
    `${REACT_APP_BASE_BACKEND_URL}/mercadopago/create_preference`,
    data
  );
  if (res) {
    console.log("MeliP res", res.data);
    return res.data.response.id;
  }
};

type CartProductData = {
  baseId: string;
  baseName: string;
  basePrice: number;
  baseImage: string;
  productOption: {
    optionId: string;
    optionSize: string;
    optionColor: string;
    optionImage: string;
    optionStock: number;
    optionQuantity: number;
  };
  inCartId: string;
};

type CheckoutItem = {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  description: string;
} | null;

type PreferenceData = {
  payer: {
    email: string;
  };
  id: string;
  installments: number;
  items: CheckoutItem[];
};
