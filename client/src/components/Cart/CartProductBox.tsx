import axios from "axios";
import React, { useState } from "react";
import "./styles.css";

type ProductsInCart = {
  loading: "loaded" | "loading" | "error";
  products: CartProductData[];
};

type CartProductBoxProps = {
  product: CartProductData;
  index: number;
  productsInCart: CartProductData[];
  setProductsInCart: React.Dispatch<React.SetStateAction<ProductsInCart>>;
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

type AddToCartJson = {
  product_option_id: string;
  user_id: string;
  quantity: number;
};

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

const TESTID = "2c6dc53e-dc41-4cd0-95fe-42451d750711";

const CartProductBox = (props: CartProductBoxProps) => {
  const [quantity, setQuantity] = useState(
    props.product.productOption.optionQuantity
  );

  const addToCartObj: AddToCartJson = {
    product_option_id: "",
    quantity: props.product.productOption.optionStock,
    user_id: "",
  };

  return (
    <div className="cartProductBox">
      <div
        style={{
          border: "1px solid",
          padding: "10px",
          overflow: "hidden",
        }}
      >
        {props.product.baseName +
          " " +
          props.product.productOption.optionColor.toLocaleUpperCase() +
          " " +
          props.product.productOption.optionSize}
      </div>

      <div
        style={{
          border: "1px solid",
          padding: "10px",
        }}
      >
        {props.product.productOption.optionStock}
      </div>
      <button
        disabled={props.product.productOption.optionQuantity > 1 ? false : true}
        onClick={async (event) =>
          await handleOnClick(false, props.product, TESTID)
        }
      >
        -
      </button>
      <input
        className="stockInput"
        placeholder={"1"}
        value={quantity}
        onChange={(event) => {
          console.log(event);
        }}
        min={1}
        max={props.product.productOption.optionStock}
      ></input>
      <button
        disabled={
          props.product.productOption.optionQuantity <=
          props.product.productOption.optionStock
            ? false
            : true
        }
        onClick={async (event) =>
          await handleOnClick(true, props.product, TESTID)
        }
      >
        +
      </button>
      <button
        onClick={(event) => {
          if (
            window.confirm(
              `Deseas remover este producto de tu lista: ${props.product.baseName}?`
            )
          ) {
          }
        }}
      >
        x
      </button>
      <div></div>
      <div
        style={{
          border: "1px solid",
          padding: "10px",
        }}
      >
        $ {props.product.basePrice * props.product.productOption.optionQuantity}
      </div>
    </div>
  );
};

export default CartProductBox;

const handleOnClick = async (
  sum: boolean,
  product: CartProductData,
  userId: string
) => {
  console.log("llega", {
    user_id: `${userId}`,
    product_option_id: `${product.inCartId}`,
    quantity: sum
      ? product.productOption.optionQuantity + 1
      : product.productOption.optionQuantity - 1,
  });
  const data = await axios.post(`${BASE_URL}/addToCart`, {
    user_id: `${userId}`,
    product_option_id: `${product.inCartId}`,
    quantity: sum
      ? product.productOption.optionQuantity + 1
      : product.productOption.optionQuantity - 1,
  });

  console.log("handleonclick", data);
};
