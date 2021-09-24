import "./DetailProductCard.css";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useAlert } from 'react-alert'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCartStorage, cleanProductDetail, setProductsIdsInCart, getFavorites } from "../../actions";
import DetailProductReview from "./DetailProductReview";
import { IconButton } from "@material-ui/core";

import StarIcon from '@material-ui/icons/Star';

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
  role:string;
  productsReceived:string[];
  reviews:string[]
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
  const alertReact = useAlert()
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  

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
  
  const stateUno = useSelector((state: any) => state);
  const user_fav = useSelector((state : any) => state.user);
  const favIcon =  stateUno.favoriteProducts;
  console.log('sotfavicon',favIcon);
   
  
  useEffect(()=> {
    dispatch(getFavorites(user_fav.id))
  }, []);
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
      if (existProductInCartRedux) alertReact.error("Product already in cart!");
      else {
        dispatch(addToCartStorage(productDetail));
        alertReact.success("Product added to cart!");
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
        user_id: data.id,
        product_option_id: productDetail.id_option,
        quantity: 1,
      });

      if (!dataAddToCart.data.errors) {
        dispatch(setProductsIdsInCart(id))
        alertReact.success("producto agregado al carrito");
      
      }

      //recordatorio: agregar una tilde verde al lado del boton "agregar al carrito"
      else alertReact.error(dataAddToCart.data.errors);
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
      
      <DetailProductReview product_id={id} />
    </React.Fragment>
  );
};

const productDetailDisplay = (
  price,
  opciones,
  onChange,
  addToCart,
  productDetail
  ) => (
    
    <div className="container__card-content">
    <div className="div_name_product_details">
      <h1>{productDetail["name"]}</h1>
      <div className = 'icon_fav_details'>
      <IconButton >
        <StarIcon className={null ? 'icon_fav' : 'icon_fav_select'}/>
      </IconButton> 
      </div>
    </div>
    <div className="div_price_product_details">
      <span className="price_product_details"> ${price}</span>
    </div>
    <form>
      <div className="div_color_product_details">
        {opciones.length &&
          opciones.map((opcion) => {
            return (
              <div className = 'color_filter_detail' style = {{backgroundColor : opcion.color, border : 'none'}}>
                <input
                className = 'input_color_details'
                  type="radio"
                  name="color"
                  key={opcion.color}
                  checked={productDetail["color"] === opcion.color}
                  value={opcion.color}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </div>
            );
          })}
      </div>
      <div className = 'div_size_product_details_one'>
        {opciones.length &&
          opciones
            .filter((obj) => obj.color === productDetail["color"])[0]
          ["options"].map((option) => {
            return (
              <div className="div_size_product_details">
              <div key={option.size}>
                {option.size}
                <input
                  className = 'input_size_product_details'
                  type="radio"
                  name="size"
                  checked={productDetail["size"] === option.size}
                  value={option.size}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  />
            </div>
      </div>
            );
          })}
          </div>
    </form>
    <div className="div_stock_product_details">
      <span>Stock:</span>{" "}
      {opciones.length &&
        opciones
          .filter((obj) => obj.color === productDetail["color"])[0]
        ["options"].filter((obj) => obj.size === productDetail["size"])[0][
        "stock"
        ]}{" "}
      u.
    </div>
    <div className="container__button-buy">
      <button
        onClick={(e) => addToCart()}
        className={productDetail["stock"] <= 0 ? "disabled" : ""}
        >
        Agregar al carrito
      </button>
      
        </div>
  </div>
);
