import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { cartIsLoading, updateQuantity } from "../../actions";

const StockInput = ({
  optionId,
  currentQuantity,
  stock,
}: {
  currentQuantity: number;
  optionId: string;
  stock: number;
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(currentQuantity);
  const [fetchingInfo, setFetchingInfo] = useState("loaded");

  useEffect(() => {
    // eslint-disable-next-line
  }, [quantity]);

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
              return setQuantity(quantity);
            }
            if (value < 1) {
              return setQuantity(1);
            }
            if (value > stock) {
              return setQuantity(stock);
            }
            return setQuantity(value);
          }}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              if (ref) {
                ref?.current?.blur();
              }
              setFetchingInfo("loading");
              dispatch(cartIsLoading(true));
              dispatch(updateQuantity(optionId, quantity));
              setTimeout(() => {
                dispatch(cartIsLoading(false));
                setFetchingInfo("loaded");
              }, 500);
            }
          }}
          onBlur={(e) => {
            setFetchingInfo("loading");
            dispatch(cartIsLoading(true));
            dispatch(updateQuantity(optionId, quantity));
            setTimeout(() => {
              dispatch(cartIsLoading(false));
              setFetchingInfo("loaded");
            }, 500);
          }}
          margin="normal"
          variant="outlined"
        />
      );
  }
};

export default StockInput;
