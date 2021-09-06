import axios from "axios";
import React from "react";
import "./CartProductBox.css";

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
  };
};

const CartProductBox = (props: CartProductBoxProps) => {
  return (
    <div className="cartProductBox">
      <div
        style={{
          border: "1px solid",
          padding: "10px",
        }}
      >
        {props.product.baseName}
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
      ></div>
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
            axios.post("");
          }
        }}
      >
        x
      </button>
    </div>
  );
};

export default CartProductBox;
