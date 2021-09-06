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
};

type AddToCartJson = {
  product_option_id: string;
  user_id: string;
  quantity: number;
};

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

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
        onClick={(event) => {
          alert(`te resto`);
        }}
      >
        -
      </button>
      <input
        className="stockInput"
        placeholder={"1"}
        value={quantity}
        min={1}
        max={props.product.productOption.optionStock}
      ></input>
      <button
        onClick={(event) => {
          alert(`te sumo`);
        }}
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
            axios.post(`${BASE_URL}/addToCart`, {});
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
