import { User } from "@auth0/auth0-spa-js";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import CartProductBox from "./CartProductBox";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import "./styles.css";
import { Button, Checkbox, Switch, TextField } from "@material-ui/core";
import { useHistory } from "react-router";

const MercadoPago = window[`MercadoPago`];

const { REACT_APP_BASE_BACKEND_URL, REACT_APP_MP_PUBLIC_KEY } = process.env;

type ProductsInCart = {
  loading: "loaded" | "loading" | "error";
  products: CartProductData[];
  user_id: string;
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

type CheckoutData = {
  items: CheckoutItem[];
  id: string;
  installments: number;
  payer: {
    email: string;
  };
};

type CheckoutButton = {
  active: boolean;
  button: any;
};
type ToCheckout = {
  checkoutData: CheckoutData;
};

type ShippingForm = {
  shippingAddress: string;
  formComplete: boolean;
  checkbox: boolean;
};

const Cart = ({ user }: { user: User }) => {
  const [productsInCart, setProductsInCart] = useState<ProductsInCart>({
    loading: "loading",
    products: [],
    user_id: "",
  });

  const history = useHistory();

  const [toCheckout, setToCheckout] = useState<ToCheckout>({
    checkoutData: {
      payer: {
        email: "",
      },
      id: "",
      installments: 0,
      items: null,
    },
  });

  const [checkoutButton, setCheckoutButton] = useState<CheckoutButton>({
    active: false,
    button: null,
  });

  const [checkSlider, setCheckSlider] = useState(
    "Check when ready for payment"
  );

  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    shippingAddress: "",
    checkbox: false,
    formComplete: false,
  });

  const handleChange = (event) => {
    console.log("eves", event);
    event.target.disabled = true;
    setCheckSlider("Check when ready for payment ...");
    setTimeout(() => {
      event.target.disabled = false;
      setCheckSlider("Check when ready for payment");
    }, 1000);
    setCheckoutButton({ ...checkoutButton, active: event.target.checked });
  };

  const updateData = async () => {
    var dataUser = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/findOrCreateUserInDatabase`,
      {
        auth0_id: user.sub,
        email: user.email,
        name: user.name,
      }
    );

    const data = await getProductsInCart(dataUser.data.user_id);
    if (data) {
      setProductsInCart({
        ...productsInCart,
        products: data,
        loading: "loaded",
        user_id: dataUser.data.user_id,
      });
    }
  };

  useEffect(() => {
    (async () => await updateData())();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setToCheckout({
      ...toCheckout,
      checkoutData: createCheckoutData(productsInCart.products, 6, "", user),
    });

    // eslint-disable-next-line
  }, [productsInCart]);

  useEffect(() => {
    if (
      toCheckout.checkoutData.items !== null &&
      toCheckout.checkoutData.items.length > 0 &&
      shippingForm.checkbox === true
    ) {
      (async () => {
        const checkoutId = await createPreference(toCheckout.checkoutData);
        const mp = new MercadoPago(`${REACT_APP_MP_PUBLIC_KEY}`, {
          locale: "es-AR",
        });

        const checkout = mp.checkout({
          preference: {
            id: checkoutId,
          },
        });
        setCheckoutButton({ ...checkoutButton, button: checkout });
      })();
    }
    // eslint-disable-next-line
  }, [toCheckout.checkoutData, shippingForm.checkbox]);

  // To check shipping form
  useEffect(() => {
    if (shippingForm.shippingAddress.length > 0) {
      setShippingForm({ ...shippingForm, formComplete: true });
    } else {
      setShippingForm({ ...shippingForm, formComplete: false });
    }
    // eslint-disable-next-line
  }, [shippingForm.shippingAddress]);

  switch (productsInCart.loading) {
    case "error":
      return <div>An error has ocurred</div>;
    case "loading":
      return (
        <div
          style={{
            display: "flex",
            fontSize: "25px",
            paddingTop: "30px",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <span>Loading your cart!</span>
        </div>
      );

    case "loaded":
      return (
        <div>
          <div className="cartDisplay" id={"cartListDisplay"}>
            {productsInCart.products[0] ? (
              <div className="cartProductBox cartLabels">
                <div></div>
                <div>Name</div>
                <div>Available</div>
                <div></div>
                <div>Quantity</div>
                <div></div>
                <div></div>
                <div></div>
                <div>Price</div>
              </div>
            ) : (
              ""
            )}
            {productsInCart.products[0] ? (
              productsInCart.products.map((product, index) => (
                <CartProductBox
                  user_id={productsInCart.user_id}
                  key={index}
                  product={product}
                  index={index}
                  productsInCart={productsInCart.products}
                  updateData={updateData}
                  active={!checkoutButton.active}
                ></CartProductBox>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  fontSize: "25px",
                  paddingTop: "30px",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <span>Your cart is empty!</span>
              </div>
            )}
          </div>
          {productsInCart.products[0] ? (
            <div id="checkoutForm" className="checkoutForm">
              <FormControlLabel
                control={
                  <Switch
                    checked={checkoutButton.active}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={`${checkSlider}`}
              />
              <form hidden={!checkoutButton.active}>
                <div className="shippingForm">
                  <TextField
                    id="standard-disabled"
                    label="Shipping Address"
                    defaultValue="Address for shipping"
                    value={shippingForm.shippingAddress}
                    onChange={(e) => {
                      setShippingForm({
                        ...shippingForm,
                        shippingAddress: e.target.value,
                      });
                    }}
                  />
                  <br></br>

                  <FormControlLabel
                    control={
                      <Checkbox
                        value={shippingForm.checkbox}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            checkbox: e.target.checked,
                          })
                        }
                      ></Checkbox>
                    }
                    label={`I confirm the information provided is correct`}
                  />
                </div>
                <br></br>
                <Button
                  variant="contained"
                  hidden={!shippingForm.formComplete || !shippingForm.checkbox}
                  onClick={async () => {
                    const list = document.getElementById("cartListDisplay");
                    list.className = "fade-out";
                    setTimeout(() => {
                      list.hidden = true;
                    }, 2000);
                    await axios.post(
                      `${REACT_APP_BASE_BACKEND_URL}/deleteUserCart`,
                      { userId: `${productsInCart.user_id}` }
                    );
                    checkoutButton.button.open();
                    const checkoutForm =
                      document.getElementById("checkoutForm");
                    checkoutForm.hidden = true;
                    history.push("/");
                  }}
                >
                  Go to Payment!
                </Button>
              </form>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      );
    default:
      return <div>Loading ;)</div>;
  }
};

export default Cart;

const getProductsInCart = async (userId: string) => {
  try {
    const { data }: AxiosResponse<CartProductData[]> = await axios(
      `${REACT_APP_BASE_BACKEND_URL}/getUserCartData?user_id=${userId}`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

const createCheckoutData = (
  products: CartProductData[],
  installments: number,
  id: string,
  user: any
): CheckoutData => {
  const data: CheckoutData = {
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
    return res.data.response.id;
  }
};
