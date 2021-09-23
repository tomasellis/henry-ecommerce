import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../actions";

type CartProductData = {
  id;
  name;
  image_url;
  price;
  id_option;
  color;
  size;
  stock;
  quantity;
};

const AddOrSubstractLocalStorageInput = ({
  product,
  itemQuantity,
}: {
  product: CartProductData;
  itemQuantity: number;
}) => {
  const [sum, setSum] = useState(itemQuantity);
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(updateQuantity(product.id_option, sum));
    return () => {
      // cleanup
    };
    // eslint-disable-next-line
  }, [sum]);

  return (
    <div style={{ display: "flex", flexFlow: "row nowrap" }}>
      <button
        className="button"
        disabled={product.quantity > 1 ? false : true}
        onClick={(event) => {
          setSum(sum - 1);
        }}
      >
        <span style={{ alignSelf: "center" }}>-</span>
      </button>
      <input
        id={product.id_option}
        ref={inputRef}
        className="stockInput"
        value={sum}
        type={"number"}
        onChange={(event) => {
          event.preventDefault();
          if (parseInt(event.target.value) > product.stock) {
            return setSum(product.stock);
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
        min={1}
        max={product.stock}
      ></input>
      <button
        className="button"
        disabled={product.quantity < product.stock ? false : true}
        onClick={async (event) => {
          setSum(sum + 1);
        }}
      >
        <span style={{ alignSelf: "center" }}>+</span>
      </button>
    </div>
  );
};

export default AddOrSubstractLocalStorageInput;
