import "./DetailProductCard.css";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartStorage,
  cleanProductDetail,
  setProductsIdsInCart,

} from "../../actions";
import DetailProductReview from "./DetailProductReview";


type Product = {
  id_option: string;
  id: string;
  name: string;
  image_url: string;
  price: number;
  stock: number;
  color: string;
  size: string;
  quantity;
};

type User = {
  id: string;
  email: string;
  auth0_id: string;
  role: string;
  productsReceived: string[];
  reviews: string[];
};

interface RootState {
  cart: Array<Product>;
  idsInCart: string;
  user: User;
}

export const DetailsProductCard = ({
  id,
  name,
  product,
  image_url,
  price,
  product_options,
}) => {
  const alertReact = useAlert();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  console.log(id)

  type OptionsByColor = {
    color: string;
    options: Option[];
  };

  type Option = {
    size: string;
    stock: number;
    optionId: string;
  };

  function createOptions(
    array: { color: string; size: string; stock: number; id: string }[]
  ): OptionsByColor[] {
    let colorOptions: any = [];
    for (let i = 0; i < array.length; i++) {
      let object: OptionsByColor = {
        color: array[i].color,
        options: [
          {
            size: array[i].size,
            stock: array[i].stock,
            optionId: array[i].id,
          },
        ],
      };
      const length = colorOptions.length;
      for (let j = 0; j < length; j++) {
        if (colorOptions[j]["color"] === object["color"]) {
          colorOptions[j].options = colorOptions[j].options.concat(
            object.options
          );
        } else if (j === length - 1) {
          colorOptions.push(object);
        }
      }
      if (length === 0) colorOptions.push(object);
    }
    return colorOptions;
  }

  let optionsByColor: OptionsByColor[] = createOptions(product_options);

  const [productDetail, setProductDetail] = useState<Product>({
    id: id,
    name: name,
    image_url: image_url,
    price: price,
    stock: optionsByColor[0].options[0].stock,
    id_option: product_options[0]["id"],
    color: optionsByColor[0].color,
    size: optionsByColor[0].options[0].size,
    quantity: 1,
  });




  useEffect(() => {
    return () => {
      dispatch(cleanProductDetail());
    };
    // eslint-disable-next-line
  }, [product]);

  const { isAuthenticated } = useAuth0();
  const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

  async function addToCart() {
    if (!isAuthenticated) {
      if (state.idsInCart.includes(productDetail.id_option)) alertReact.error("Product already in cart!");
      else {
        dispatch(addToCartStorage(productDetail));
        alertReact.success("Product added to cart!");
      }
    } else { //si esta autenticado...
      if (state.idsInCart.includes(productDetail.id_option)) alertReact.error("Product already in cart!");
      else {
        const dataAddToCart = await axios.post(`${BASE_URL}/addToCart`, {
          user_id: state.user.id,
          product_option_id: productDetail.id_option,
          quantity: productDetail.quantity,
        });
        if (!dataAddToCart.data.errors) {
          dispatch(setProductsIdsInCart(productDetail.id_option));
          alertReact.success("Product added to cart!");
        }
        else alertReact.error(dataAddToCart.data.errors);
      }
    }
  }

  function onChange(e) {
    if (e.target.name === "size") {
      const chosenOptionColor = optionsByColor.filter(
        (option) => option.color === productDetail.color
      )
      const chosenOptionSize = chosenOptionColor[0].options.filter(
        (option) => option.size === e.target.value
      );
      console.log(chosenOptionSize)
      return setProductDetail({
        ...productDetail,
        [e.target.name]: e.target.value,
        id_option: chosenOptionSize[0]?.optionId,
        stock: chosenOptionSize[0]?.stock
      });
    }
    else if (e.target.name === "color") {
      const chosenOptionColor = optionsByColor.filter(
        (option) => option.color === e.target.value
      )
      const chosenOptionSize = chosenOptionColor[0].options.filter(
        (option) => option.size === productDetail.size
      );
      console.log(chosenOptionSize)
      return setProductDetail({
        ...productDetail,
        color: e.target.value,
        id_option: chosenOptionSize[0]?.optionId,
        stock: chosenOptionSize[0]?.stock
      });
    }
    return setProductDetail({
      ...productDetail,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <React.Fragment>
      <div className="mainDetailCard">
        <div className="mainDetailCard__container">
          <div className="container__img">
            <img
              src={image_url}
              alt=""
              className="container__card-img"
            />
          </div>
          {product &&
            productDetailDisplay(
              price,
              optionsByColor,
              onChange,
              addToCart,
              productDetail
            )}
        </div>
      </div>

      <DetailProductReview product_id={id} />
    </React.Fragment>
  );
};

const productDetailDisplay = (
  price,
  optionsByColor,
  onChange,
  addToCart,
  productDetail
) => (
  <div className="container__card-content">
    <div className="div_name_product_details">
      <h1>{productDetail["name"]}</h1>
    </div>
    <div className="icon_fav_details">
    </div>
    <div className="div_price_product_details">
      <span className="price_product_details"> ${price}</span>
    </div>
    <form>
      <div className="div_form_select_options">
        <div className="div_color_product_details">
          {optionsByColor.length &&
            optionsByColor.map((opcion) => {
              return (
                <label
                  key={opcion.color}
                  className="color_filter_detail"
                  style={productDetail["color"] === opcion.color ? { backgroundColor: opcion.color, outlineStyle: "double" } : { backgroundColor: opcion.color, border: "none" }}
                  htmlFor={opcion.color}
                >
                  <input
                    className="input_color_details"
                    id={opcion.color}
                    type="radio"
                    name="color"
                    checked={productDetail["color"] === opcion.color}
                    value={opcion.color}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </label>
              );
            })}
        </div>
        <div className="div_size_product_details">
          {optionsByColor.length &&
            optionsByColor
              .filter((obj) => obj.color === productDetail["color"])[0]
            ["options"].map((option) => {
              return (

                <label
                  key={option.size}
                  style={productDetail["size"] === option.size ? { outlineStyle: "double" } : null}
                  className="div_size_individual_select"
                  htmlFor={option.size}
                >
                  {option.size}
                  <input
                    type="radio"
                    name="size"
                    id={option.size}
                    checked={productDetail["size"] === option.size}
                    value={option.size}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </label>

              );
            })}
        </div>
      </div>
    </form>
    <div className="div_stock_product_details">
      <span>Stock:</span>{" "}
      {optionsByColor.length &&
        optionsByColor
          .filter((obj) => obj.color === productDetail["color"])[0]
        ["options"].filter((obj) => obj.size === productDetail["size"])[0] ? optionsByColor
          .filter((obj) => obj.color === productDetail["color"])[0]
        ["options"].filter((obj) => obj.size === productDetail["size"])[0][
      "stock"] : '-'}{" "} u.
    </div>
    <div className="container__button-buy">
      <button
        onClick={(e) => addToCart()}
        className={productDetail["stock"] <= 0 || productDetail.id_option === undefined ? "disabled" : ""}
      >
        Add to cart
      </button>
    </div>

  </div>
);
