import axios from "axios";
import React, { useEffect, useState } from "react";

type ProductsInCart = {
  loading: "idle" | "loading" | "error";
  products: [];
};

const userId = "2c6dc53e-dc41-4cd0-95fe-42451d750711";

const Cart = () => {
  const [productsInCart, setProductsInCart] = useState<ProductsInCart>({
    loading: "loading",
    products: [],
  });

  useEffect(() => {
    getProductsInCart(userId);
    console.log("acá");
    setProductsInCart({ ...productsInCart, loading: "idle" });
  }, []);

  switch (productsInCart.loading) {
    case "error":
      return <div>An error has ocurred</div>;

    case "loading":
      return <div>Loading your cart!</div>;

    case "idle":
      return <div>Algo se cargo</div>;

    default:
      return <div>Loading ;)</div>;
  }
};

export default Cart;

const getProductsInCart = async (userId: string) => {
  try {
    const { data } = await axios(
      `http://localhost:4000/getUserData?user_id=${userId}`
    );
    data.errors ? console.error(data.errors) : console.info(data.data);
    console.log("estoy");
    console.log(data);
    return data.data;
  } catch (err) {
    console.error(err);
  }
};
