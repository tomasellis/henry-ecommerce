import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import CartProductBox from "./CartProductBox";
import "./styles.css";

const { REACT_APP_BASE_BACKEND_URL } = process.env;

type ProductsInCart = {
  loading: "loaded" | "loading" | "error";
  products: CartProductData[];
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

const TESTID = "2c6dc53e-dc41-4cd0-95fe-42451d750711";

const Cart = () => {
  const [productsInCart, setProductsInCart] = useState<ProductsInCart>({
    loading: "loading",
    products: [],
  });

  const updateData = async () => {
    const data = await getProductsInCart(TESTID);
    if (data) {
      setProductsInCart({
        ...productsInCart,
        products: data,
        loading: "loaded",
      });
    }
  };
  useEffect(() => {
    (async () => await updateData())();
    // eslint-disable-next-line
  }, []);

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
            <div className="cartProductBox cartLabels">
              <div></div>
              <div>Nombre</div>
              <div>Disponibles</div>
              <div></div>
              <div>Cantidad</div>
              <div></div>
              <div></div>
              <div></div>
              <div>Precio</div>
            </div>
          ) : (
            ""
          )}
          {productsInCart.products[0] ? (
            productsInCart.products.map((product, index) => (
              <CartProductBox
                key={index}
                product={product}
                index={index}
                productsInCart={productsInCart.products}
                updateData={updateData}
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
    console.log('data cart get products in cart', data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
