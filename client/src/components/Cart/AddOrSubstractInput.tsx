import axios, { AxiosResponse } from "axios";
import React, { useRef, useState } from "react";

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

const AddOrSubstractInput = ({
  product,
  userId,
  active,
  itemQuantity,
  updateData,
}: {
  product: CartProductData;
  userId: string;
  active: boolean;
  itemQuantity: number;
  updateData: () => any;
}) => {
  const [fetchingInfo, setFetchingInfo] = useState<FetchInfo>("loaded");
  const [sum, setSum] = useState(itemQuantity);

  const inputRef = useRef(null);

  switch (fetchingInfo) {
    case "loaded":
      return (
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <button
            className="button"
            disabled={
              product.productOption.optionQuantity > 1 ? !active ?? false : true
            }
            onClick={async (event) => {
              setFetchingInfo("loading");
              await handleOnClick(false, product, userId);
              setSum(sum - 1);
              await updateData();
              setFetchingInfo("loaded");
            }}
          >
            <span style={{ alignSelf: "center" }}>-</span>
          </button>
          <input
            id={product.inCartId}
            ref={inputRef}
            className="stockInput"
            value={sum}
            type={"number"}
            onChange={(event) => {
              event.preventDefault();
              if (
                parseInt(event.target.value) > product.productOption.optionStock
              ) {
                return setSum(product.productOption.optionStock);
              }
              if (
                event.target.value === "NaN" ||
                parseInt(event.target.value) <= 0 ||
                event.target.value === ""
              ) {
                return setSum(1);
              }
              return setSum(parseInt(event.target.value));
            }}
            onBlur={async (event) => {
              setFetchingInfo("loading");
              handleOnChange(sum, product, userId);
              await updateData();
              setFetchingInfo("loaded");
            }}
            min={1}
            max={product.productOption.optionStock}
            onKeyPress={async (e) => {
              if (e.key === "Enter") {
                setFetchingInfo("loading");
                handleOnChange(sum, product, userId);
                await updateData();
                setFetchingInfo("loaded");
              }
            }}
          ></input>
          <button
            className="button"
            disabled={
              product.productOption.optionQuantity <
              product.productOption.optionStock
                ? !active ?? false
                : true
            }
            onClick={async (event) => {
              setFetchingInfo("loading");
              await handleOnClick(true, product, userId);
              setSum(sum + 1);
              await updateData();
              setFetchingInfo("loaded");
            }}
          >
            <span style={{ alignSelf: "center" }}>+</span>
          </button>
        </div>
      );

    case "loading":
      return <span>. . .</span>;

    case "error":
      return <span>ERROR</span>;
    default:
      return <span>. . .</span>;
  }
};

export default AddOrSubstractInput;

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
