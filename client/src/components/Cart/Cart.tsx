import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import CartProductBox from "./CartProductBox";

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
  };
};

const { BASE_URL } = process.env;
console.log(process.env);
const userId = "2c6dc53e-dc41-4cd0-95fe-42451d750711";

const Cart = () => {
  const [productsInCart, setProductsInCart] = useState<ProductsInCart>({
    loading: "loading",
    products: [],
  });

  useEffect(() => {
    (async () => {
      const data = await getProductsInCart(userId);
      if (data) {
        setProductsInCart({
          ...productsInCart,
          products: data,
          loading: "loaded",
        });
      }
    })();
  }, []);

  switch (productsInCart.loading) {
    case "error":
      return <div>An error has ocurred</div>;

    case "loading":
      return <div>Loading your cart!</div>;

    case "loaded":
      return (
        <div id={"cartDisplay"}>
          Name | Price | Stock
          {productsInCart.products.map((product) => (
            <CartProductBox product={product}></CartProductBox>
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
      `${REACT_APP_BASE_BACKEND_URL}getUserCartData?user_id=${userId}`
    );
    if (data[0].message) {
      return console.error(data[0]);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
