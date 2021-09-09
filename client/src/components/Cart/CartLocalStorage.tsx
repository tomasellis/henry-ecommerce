import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartStorageProductBox from "./CartStorageProductBox";
import "./styles.css";

const { REACT_APP_BASE_BACKEND_URL } = process.env;

type ProductsInCart = {
  loading: "loaded" | "loading" | "error";
  products: Array<CartProductData>;
};

type CartProductData = {
  id,
  name,
  image_url,
  price,
  id_option,
  color,
  size,
  stock,
  product,
  quantity
};

interface RootState {
  cart: Array<CartProductData>,
}

const TESTID = "2c6dc53e-dc41-4cd0-95fe-42451d750711";

const CartLocalStorage = () => {

  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)

  const [productsInCart, setProductsInCart] = useState<ProductsInCart>({
    loading: "loading",
    products: [],
  });


  useEffect(() => {
    setProductsInCart({
      loading: 'loaded',
      products: state.cart
    })

    return () => {
      setProductsInCart({
        loading: "loading",
        products: [],
      })
    }
    // eslint-disable-next-line
  }, [state.cart]);

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
        <div className="cartDisplay">
          {productsInCart.products[0] ? (
            productsInCart.products.map((product, index) => (
              <CartStorageProductBox
                key={index}
                product={product}
              ></CartStorageProductBox>
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
      );
    default:
      return <div>Loading...</div>;
  }
};

export default CartLocalStorage;

