import React, { useRef, useState } from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

const StockInput = ({
  product,
  userId,
  active,
  updateData,
}: {
  product: CartProductData;
  userId: string;
  active: boolean;
  updateData: () => any;
}) => {
  type FetchInfo = "loading" | "loaded" | "error";

  const [fetchingInfo, setFetchingInfo] = useState<FetchInfo>("loaded");

  const stock = product.productOption.optionStock;

  const [quantity, setQuantity] = useState<number>(
    product.productOption.optionQuantity
  );

  const ref = useRef(null);

  switch (fetchingInfo) {
    default:
      return <div>...</div>;
    case "loading":
      return (
        <div style={{ height: "100%" }}>
          <CircularProgress />
        </div>
      );
    case "error":
      return <div style={{ color: "red" }}>ERROR</div>;
    case "loaded":
      return (
        <TextField
          style={{ width: "100%" }}
          id="outlined-value"
          inputRef={ref}
          type="number"
          label=""
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (isNaN(value)) {
              return setQuantity(1);
            }
            if (value < 1) {
              return setQuantity(1);
            }
            if (value > stock) {
              return setQuantity(stock);
            }
            return setQuantity(value);
          }}
          onKeyPress={async (e) => {
            if (e.code === "Enter") {
              if (ref) {
                ref?.current?.blur();
              }
              setFetchingInfo("loading");
              // Update quantity
              // const value =
              //   quantity >= 1 ? (quantity > stock ? stock : quantity) : 1;
              await updateQuantityInDb(quantity, product, userId);
              await updateData();
              setFetchingInfo("loaded");
            }
          }}
          onBlur={async (e) => {
            //Update quantity
            setFetchingInfo("loading");
            await updateQuantityInDb(quantity, product, userId);
            await updateData();
            setFetchingInfo("loaded");
          }}
          margin="normal"
          variant="outlined"
        />
      );
  }
};

export default StockInput;

const updateQuantityInDb = async (
  sum: number,
  product: CartProductData,
  userId: string
) => {
  const { data }: AxiosResponse<AddToCartResponse> = await axios.post(
    `${BASE_URL}/addToCart`,
    {
      user_id: `${userId}`,
      product_option_id: `${product.productOption.optionId}`,
      quantity: sum,
    }
  );
  return data.insert_carts_products_one;
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
