import axios from "axios";
import React from "react";
import "./styles.css";

type CartProductBoxProps = {
  product: CartProductData;
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
  };
};

type AddToCartJson = {
  product_option_id: string;
  user_id: string;
  quantity: number;
};

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

const CartProductBox = (props: CartProductBoxProps) => {
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
        {props.product.basePrice}
      </div>
      <div
        style={{
          border: "1px solid",
          padding: "10px",
        }}
      >
        STOCK: {props.product.productOption.optionStock}
      </div>
      <button
        onClick={(event) => {
          alert(`te resto`);
        }}
      >
        -
      </button>
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
    </div>
  );
};

export default CartProductBox;
