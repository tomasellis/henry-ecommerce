import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import "./styles.css";

type CartProductBoxProps = {
  product: CartProductData;
  index: number;
  productsInCart: CartProductData[];
  updateData: () => Promise<void>;
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

type AddToCartResponse = {
  insert_carts_products_one: InsertResponse;
};

type InsertResponse = {
  id: string;
  product_option_id: string;
  quantity: number;
  user_id: string;
};

type FetchInfo = "loading" | "loaded" | "error";

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

const TESTID = "2c6dc53e-dc41-4cd0-95fe-42451d750711";

const CartProductBox = (props: CartProductBoxProps) => {
  const [quantity, setQuantity] = useState(
    props.product.productOption.optionQuantity
  );

  const [fetchingInfo, setFetchingInfo] = useState<FetchInfo>("loaded");

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="cartProductBox">
      <div
        style={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img style={{ height: "100%" }} src={props.product.baseImage} />
      </div>
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
        className="button"
        disabled={props.product.productOption.optionQuantity > 1 ? false : true}
        onClick={async (event) => {
          setFetchingInfo("loading");
          await handleOnClick(false, props.product, TESTID);
          setQuantity(quantity - 1);
          await props.updateData();
          setFetchingInfo("loaded");
        }}
      >
        <span style={{ alignSelf: "center" }}>-</span>
      </button>
      <input
        id={props.product.inCartId}
        ref={inputRef}
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
        onBlur={async (event) => {
          if (fetchingInfo !== "loading") {
            setFetchingInfo("loading");
            handleOnChange(quantity, props.product, TESTID);
            await props.updateData();
            setFetchingInfo("loaded");
          }
        }}
        min={1}
        max={props.product.productOption.optionStock}
        onKeyPress={async (e) => {
          if (fetchingInfo !== "loading" && e.key === "Enter") {
            setFetchingInfo("loading");
            handleOnChange(quantity, props.product, TESTID);
            await props.updateData();
            setFetchingInfo("loaded");
          }
        }}
      ></input>
      <button
        className="button"
        disabled={
          props.product.productOption.optionQuantity <
          props.product.productOption.optionStock
            ? false
            : true
        }
        onClick={async (event) => {
          setFetchingInfo("loading");
          await handleOnClick(true, props.product, TESTID);
          setQuantity(quantity + 1);
          await props.updateData();
          setFetchingInfo("loaded");
        }}
      >
        <span style={{ alignSelf: "center" }}>+</span>
      </button>
      <button
        className="button"
        style={{
          borderColor: "red",
          backgroundColor: "red",
          borderRadius: "5px",
        }}
        onClick={async (event) => {
          await handleDeleteOnClick(props.product);
          await props.updateData();
        }}
      >
        <span style={{ alignSelf: "center" }}>x</span>
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div style={{ alignSelf: "center" }}>
          {fetchingInfo === "loading" ? "..." : "✔"}
        </div>
      </div>
      <div
        style={{
          border: "1px solid",
          padding: "10px",
        }}
      >
        $ {props.product.basePrice * quantity}
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
  const { data }: AxiosResponse<AddToCartResponse> = await axios.post(
    `${BASE_URL}/addToCart`,
    {
      user_id: `${userId}`,
      product_option_id: `${product.productOption.optionId}`,
      quantity: value,
    }
  );
  return data.insert_carts_products_one;
};

const handleOnClick = async (
  sum: boolean,
  product: CartProductData,
  userId: string
) => {
  const { data }: AxiosResponse<AddToCartResponse> = await axios.post(
    `${BASE_URL}/addToCart`,
    {
      user_id: `${userId}`,
      product_option_id: `${product.productOption.optionId}`,
      quantity: sum
        ? product.productOption.optionQuantity + 1
        : product.productOption.optionQuantity - 1,
    }
  );
  return data.insert_carts_products_one;
};

const handleDeleteOnClick = async (product: CartProductData) => {
  if (
    window.confirm(
      `Deseas remover este producto de tu lista: ${product.baseName}?`
    )
  ) {
    const { data } = await axios.post(`${BASE_URL}/deleteFromCart`, {
      cart_product_id: `${product.inCartId}`,
    });
  }
};
