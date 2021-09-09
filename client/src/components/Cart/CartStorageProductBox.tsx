import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.css";
import {removeToCartStorage,updateQuantity} from '../../actions'

type CartProductBoxProps = {
  product: CartProductData;
  key:number
};

type CartProductData = {
  id,
  name,
  image_url,
  price,
  id_option,
  color,
  size,
  stock,
  quantity
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


const CartStorageProductBox = (props: CartProductBoxProps) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(
    props.product.quantity
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDeleteOnClick = async (product: CartProductData) => {
    if (
      window.confirm(
        `Deseas remover este producto de tu lista: ${product.name}?`
      )
    ) {
      dispatch(removeToCartStorage(product.id_option))
      };
    }
  
    useEffect(() => {
      dispatch(updateQuantity(props.product.id_option,quantity))
      return () => {
        // cleanup
      }
    }, [quantity])

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
        <img
          alt={props.product.name + props.product.size}
          style={{ height: "100%" }}
          src={props.product.image_url}
        />
      </div>
      <div
        style={{
          border: "1px solid",
          padding: "10px",
          overflow: "hidden",
        }}
      >
        {props.product.name +
          " " +
          props.product.color.toLocaleUpperCase() +
          " " +
          props.product.size}
      </div>

      <div
        style={{
          border: "1px solid",
          padding: "10px",
        }}
      >
        {props.product.stock}
      </div>
      <button
        className="button"
        disabled={quantity > 1 ? false : true}
        onClick={async (event) => {
          
          setQuantity(quantity - 1);
          
        }}
      >
        <span style={{ alignSelf: "center" }}>-</span>
      </button>
      <input
        id={props.product.id}
        ref={inputRef}
        className="stockInput"
        value={quantity}
        type={"number"}
        onChange={(event) => {
          event.preventDefault();
          if (
            parseInt(event.target.value) >
            props.product.stock
          ) {
            return setQuantity(props.product.stock);
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
          // if (fetchingInfo !== "loading") {
          //   setFetchingInfo("loading");
          //   handleOnChange(quantity, props.product, TESTID);
            
          //   setFetchingInfo("loaded");
          // }
        }}
        min={1}
        max={props.product.stock}
        onKeyPress={async (e) => {
          if ( e.key === "Enter") {
            
            handleOnChange(quantity, props.product);
            
            
          }
        }}
      ></input>
      <button
        className="button"
        disabled={
          props.product.quantity <
            props.product.stock
            ? false
            : true
        }
        onClick={async (event) => {
          
          
          setQuantity(quantity + 1);
          
          
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
          
        }}
      >
        <span style={{ alignSelf: "center" }}>x</span>
      </button>
      <div
        style={{
          border: "1px solid",
          padding: "10px",
        }}
      >
        $ {props.product.price * quantity}
      </div>
    </div>
  );
};

export default CartStorageProductBox;

const handleOnChange = async (
  value: number,
  product: CartProductData,
) => {
  // const { data }: AxiosResponse<AddToCartResponse> = await axios.post(
  //   `${BASE_URL}/addToCart`,
  //   {
  //     user_id: `${userId}`,
  //     product_option_id: `${product.productOption.optionId}`,
  //     quantity: value,
  //   }
  // );
  // return data.insert_carts_products_one;
};

// const handleOnClick = async (
//   sum: boolean,
//   product: CartProductData,
//   userId: string
// ) => {
//   const { data }: AxiosResponse<AddToCartResponse> = await axios.post(
//     `${BASE_URL}/addToCart`,
//     {
//       user_id: `${userId}`,
//       product_option_id: `${product.productOption.optionId}`,
//       quantity: sum
//         ? product.productOption.optionQuantity + 1
//         : product.productOption.optionQuantity - 1,
//     }
//   );
//   return data.insert_carts_products_one;
// };


