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

type FetchInfo = "loading" | "loaded" | "error";

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

const TESTID = "2c6dc53e-dc41-4cd0-95fe-42451d750711";

const CartProductBox = (props: CartProductBoxProps) => {
  const [quantity, setQuantity] = useState(
    props.product.productOption.optionQuantity
  );

  const [fetchingInfo, setFetchingInfo] = useState<FetchInfo>("loaded");

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
        value={quantity}
        disabled={fetchingInfo === "loading" ? true : false}
        type={"number"}
        onChange={(event) => {
          event.preventDefault();
          if (
            parseInt(event.target.value) >
            props.product.productOption.optionStock
          ) {
            return setQuantity(props.product.productOption.optionStock);
          }
          if (
            event.target.value === "NaN" ||
            parseInt(event.target.value) <= 0 ||
            event.target.value === ""
          ) {
            return setQuantity(1);
          }
          return setQuantity(parseInt(event.target.value));
        }}
        onBlur={(event) => {
          if (fetchingInfo !== "loading") {
            setFetchingInfo("loading");
            handleOnChange(quantity, props.product, TESTID);
            setFetchingInfo("loaded");
          }
        }}
        min={1}
        max={props.product.productOption.optionStock}
        onKeyPress={(e) => {
          if (fetchingInfo !== "loading" && e.key === "Enter") {
            setFetchingInfo("loading");
            handleOnChange(quantity, props.product, TESTID);
            setFetchingInfo("loaded");
          }
        }}
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
      <div>{fetchingInfo === "loading" ? "LOADING" : ""}</div>
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

const handleOnChange = async (
  value: number,
  product: CartProductData,
  userId: string
) => {
  const data = await axios.post(`${BASE_URL}/addToCart`, {
    user_id: `${userId}`,
    product_option_id: `${product.productOption.optionId}`,
    quantity: value,
  });

  console.log("handleonchange", data);
};

const handleOnClick = async (
  sum: boolean,
  product: CartProductData,
  userId: string
) => {
  const data = await axios.post(`${BASE_URL}/addToCart`, {
    user_id: `${userId}`,
    product_option_id: `${product.productOption.optionId}`,
    quantity: sum
      ? product.productOption.optionQuantity + 1
      : product.productOption.optionQuantity - 1,
  });

  console.log("handleonclick", data);
};

const updateData = async (inCartId: string) => {};
