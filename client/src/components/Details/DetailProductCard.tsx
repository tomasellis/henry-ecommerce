import "./DetailProductCard.css";
// import { useCookies } from 'react-cookie';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addToCartStorage, cleanProductDetail, setProductsIdsInCart } from "../../actions";
import DetailProductReview from "./DetailProductReview";
import FormReview from './FormReview'

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

interface RootState {
  cart: Array<Product>;
  idsInCart: string;
}

export const DetailsProductCard = ({
  id,
  name,
  product,
  image_url,
  price,
  product_options,
}) => {
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

  const { user, isAuthenticated } = useAuth0();
  const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

  async function addToCart() {
    //el id del producto
    if (!isAuthenticated) {
      const existProductInCartRedux = state.cart.some((product) => {
        return product.id_option === productDetail.id_option;
      });
      if (existProductInCartRedux) alert("Product already in cart!");
      else {
        dispatch(addToCartStorage(productDetail));
        alert("Product added to cart!");
      }
    } else { //si esta autenticado...

      const { data } = await axios.post(
        `${BASE_URL}/findOrCreateUserInDatabase`,
        {
          auth0_id: user.sub,
          email: user.email,
          name: user.name,
        }
      );

      const dataAddToCart = await axios.post(`${BASE_URL}/addToCart`, {
        user_id: data.user_id,
        product_option_id: productDetail.id_option,
        quantity: 1,
      });

      if (!dataAddToCart.data.errors) {
        dispatch(setProductsIdsInCart(id))
        alert("producto agregado al carrito");

      }

      //recordatorio: agregar una tilde verde al lado del boton "agregar al carrito"
      else alert(dataAddToCart.data.errors);
    }
  }

  function onChange(e) {
    if (e.target.name === "size") {
      const chosenOptionSize = optionsByColor[0].options.filter(
        (option) => option.size === e.target.value
      );
      return setProductDetail({
        ...productDetail,
        [e.target.name]: e.target.value,
        id_option: chosenOptionSize[0]?.optionId,
      });
    }
    else if (e.target.name === "color") {
      console.log('hola')
      console.log(productDetail['size'])
      return setProductDetail({
        ...productDetail,
        color: e.target.value,
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
              width="100%"
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
      {isAuthenticated && state.idsInCart.includes(id) && <FormReview product_id={id}/>}
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
    <div className="div_price_product_details">
      <span className="price_product_details"> ${price}</span>
    </div>
    <form>
      <div className="div_color_product_details">
        {optionsByColor.length &&
          optionsByColor.map((opcion) => {
            return (
              <label>
                {opcion.color}
                <input
                  type="radio"
                  name="color"
                  key={opcion.color}
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
              <label key={option.size}>
                {option.size}
                <input
                  type="radio"
                  name="size"

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
        className={productDetail["stock"] <= 0 ? "disabled" : ""}
      >
        Agregar al carrito
      </button>
      <Link to={`/modifyProduct/${productDetail.id}`}>
      <button>Modify</button>
      </Link>
    </div>
  </div>
);
