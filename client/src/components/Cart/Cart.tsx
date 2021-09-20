import axios, { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { User } from "@auth0/auth0-spa-js";

import "./styles.css";

import { bounceInUp, bounceOutUp } from "react-animations";
import styled, { keyframes } from "styled-components";
import { Button } from "@material-ui/core";
import CartList from "./CartList";

/* BOUNCE OUT ANIMATION*/

const bounceInUpAnimation = keyframes`${bounceInUp}`;

const InBouncingDiv = styled.div`
  position: absolute;
  animation: 1s ${bounceInUpAnimation};
`;

const bounceOutUpAnimation = keyframes`${bounceOutUp}`;

const OutBouncingDiv = styled.div`
  position: absolute;
  animation: 1s ${bounceOutUpAnimation};
`;

const { REACT_APP_BASE_BACKEND_URL } = process.env;

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

const Cart = ({ user }: { user: User }) => {
  const [productsInCart, setProductsInCart] = useState<ProductsInCart>({
    loading: "loading",
    products: [],
    user_id: "",
  });

  const [checkoutActive, setCheckoutActive] = useState(false);

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

  const ref = useRef(null);

  useEffect(() => {
    if (checkoutActive === true) {
      setTimeout(() => {
        ref.current.hidden = true;
      }, 900);
    }
  }, [checkoutActive]);

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
        <div className="cartDisplay" id={"cartListDisplay"}>
          {productsInCart.products[0] && checkoutActive === false ? (
            <InBouncingDiv
              style={{
                display: "flex",
                width: "100%",
                paddingTop: "10px",
                flexFlow: "column nowrap",
              }}
            >
              <CartList
                products={productsInCart.products}
                userId={productsInCart.user_id}
                updateData={updateData}
              />
              <div className="goToCheckoutButton">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={(e) => {
                    setCheckoutActive(!checkoutActive);
                  }}
                >
                  Go to checkout
                </Button>
              </div>
            </InBouncingDiv>
          ) : (
            <OutBouncingDiv
              ref={ref}
              style={{
                display: "flex",
                width: "100%",
                paddingTop: "10px",
                flexFlow: "column nowrap",
              }}
            >
              <CartList
                products={productsInCart.products}
                userId={productsInCart.user_id}
                updateData={updateData}
              />
            </OutBouncingDiv>
          )}
          {productsInCart.products[0] ? (
            <div></div>
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
          {productsInCart.products[0] ? (
            <div>
              <CheckoutForm
                active={checkoutActive}
                setActive={setCheckoutActive}
                productsToCheckout={productsInCart.products}
                auth0User={user}
                userId={productsInCart.user_id}
              ></CheckoutForm>
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
