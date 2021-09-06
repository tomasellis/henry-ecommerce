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
      console.log(data);
      setProductsInCart({
        ...productsInCart,
        products: data,
        loading: "loaded",
      });
    }
  };

  useEffect(() => {
    (async () => await updateData())();
  }, []);

  switch (productsInCart.loading) {
    case "error":
      return <div>An error has ocurred</div>;

    case "loading":
      return <div>Loading your cart!</div>;

    case "loaded":
      return (
        <div className="cartDisplay">
          <div className="cartProductBox cartLabels">
            <div>Nombre</div>
            <div>Disponibles</div>
            <div></div>
            <div>Cantidad</div>
            <div></div>
            <div></div>
            <div></div>
            <div>Precio</div>
          </div>
          {productsInCart.products.map((product, index) => (
            <CartProductBox
              key={index}
              product={product}
              index={index}
              productsInCart={productsInCart.products}
              updateData={updateData}
            ></CartProductBox>
          ))}
        </div>
      );

    default:
      return <div>Loading ;)</div>;
  }
};

export default Cart;

const getProductsInCart = async (userId: string) => {
  try {
    const { data }: AxiosResponse<CartProductData[] | any> = await axios(
      `${REACT_APP_BASE_BACKEND_URL}/getUserCartData?user_id=${userId}`
    );
    if (data[0].message) {
      return console.error(data[0]);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
