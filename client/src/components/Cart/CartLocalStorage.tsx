import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { bounceInUp, bounceOutUp } from "react-animations";
import styled, { keyframes } from "styled-components";
import { Button } from "@material-ui/core";
import CartListLocalStorage from "./CartListLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles.css";
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

type ProductsInCart = {
  loading: "loaded" | "loading" | "error";
  products: Array<CartProductData>;
};

type CartProductData = {
  id;
  name;
  image_url;
  price;
  id_option;
  color;
  size;
  stock;
  product;
  quantity;
};

interface RootState {
  cart: Array<CartProductData>;
}

const CartLocalStorage = () => {
  const ref = useRef(null);
  const { loginWithPopup } = useAuth0();
  const state = useSelector((state: RootState) => state);

  const [productsInCart, setProductsInCart] = useState<ProductsInCart>({
    loading: "loading",
    products: [],
  });

  useEffect(() => {
    if (state.cart) {
      setProductsInCart({
        loading: "loaded",
        products: state.cart,
      });
    }

    // eslint-disable-next-line
  }, [state.cart]);

  switch (productsInCart.loading) {
    case "error":
      return (
        <div
          style={{
            display: "flex",
            fontSize: "25px",
            paddingTop: "30px",
            justifyContent: "center",
            alignContent: "center",
            color: "red",
          }}
        >
          An error has ocurred, please contact the admin
        </div>
      );

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
          <span>Loading your guest cart...</span>
        </div>
      );

    case "loaded":
      return (
        <div className="cartDisplay" id={"cartListDisplay"}>
          {productsInCart.products[0] ? (
            <InBouncingDiv
              style={{
                display: "flex",
                width: "100%",
                paddingTop: "10px",
                flexFlow: "column nowrap",
              }}
            >
              <CartListLocalStorage products={productsInCart.products} />
              <div className="goToCheckoutButton">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => loginWithPopup()}
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
              <CartListLocalStorage products={productsInCart.products} />
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
              <span>Your guest cart is empty!</span>
            </div>
          )}
        </div>
      );
    default:
      return <div>Loading your guest cart....</div>;
  }
};

export default CartLocalStorage;
