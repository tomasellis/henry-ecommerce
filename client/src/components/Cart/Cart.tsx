import { User } from "@auth0/auth0-spa-js";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import CartProductBox from "./CartProductBox";
import "./styles.css";

const MercadoPago = window[`MercadoPago`];

const { REACT_APP_BASE_BACKEND_URL, REACT_APP_MP_PUBLIC_KEY } = process.env;

type ProductsInCart = {
  loading: "loaded" | "loading" | "error";
  products: CartProductData[];
  user_id: string;
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

type CheckoutItem = {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  description: string;
};

type CheckoutData = {
  items: CheckoutItem[];
  id: string;
  installments: number;
  payer: {
    email: string;
  };
};

type ToCheckout = {
  active: boolean;
  checkoutData: CheckoutData;
};

const Cart = ({ user }: { user: User }) => {
  const [productsInCart, setProductsInCart] = useState<ProductsInCart>({
    loading: "loading",
    products: [],
    user_id: "",
  });

  const [toCheckout, setToCheckout] = useState<ToCheckout>({
    checkoutData: {
      payer: {
        email: "",
      },
      id: "",
      installments: 0,
      items: [
        { id: "", description: "", quantity: 0, title: "", unit_price: 0 },
      ],
    },
    active: false,
  });

  const [checkoutButton, setCheckoutButton] = useState(null);

  const updateData = async () => {
    var dataUser = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/findOrCreateUserInDatabase`,
      {
        auth0_id: user.sub,
        email: user.email,
        name: user.name,
      }
    );

    const data = await getProductsInCart(dataUser.data.user_id);
    if (data) {
      setProductsInCart({
        ...productsInCart,
        products: data,
        loading: "loaded",
        user_id: dataUser.data.user_id,
      });
    }
  };

  useEffect(() => {
    (async () => await updateData())();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setToCheckout({
      ...toCheckout,
      checkoutData: createCheckoutData(productsInCart.products, 6, "", user),
    });

    // eslint-disable-next-line
  }, [productsInCart]);

  useEffect(() => {
    (async () => {
      const checkoutId = await createPreference(toCheckout.checkoutData);
      const mp = new MercadoPago(`${REACT_APP_MP_PUBLIC_KEY}`, {
        locale: "es-AR",
      });

      const checkout = mp.checkout({
        preference: {
          id: checkoutId,
          autoOpen: true, // Habilita la apertura automática del Checkout Pro
        },
      });
      setCheckoutButton(checkout);
    })();
  }, [toCheckout.checkoutData]);
  switch (productsInCart.loading) {
    case "error":
      return <div>An error has ocurred</div>;
    case "loading":
      return (
        <div
          style={{
            display: "flex",
            fontSize: "25px",
            paddingTop: "30px",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <span>Loading your cart!</span>
        </div>
      );

    case "loaded":
      return (
        <>
          <span>ESTAS EN EL CART DE USUARIO</span>
          <div className="cartDisplay" id={"cartListDisplay"}>
            {productsInCart.products[0] ? (
              <div className="cartProductBox cartLabels">
                <div></div>
                <div>Nombre</div>
                <div>Disponibles</div>
                <div></div>
                <div>Cantidad</div>
                <div></div>
                <div></div>
                <div></div>
                <div>Precio</div>
              </div>
            ) : (
              ""
            )}
            {productsInCart.products[0] ? (
              productsInCart.products.map((product, index) => (
                <CartProductBox
                  user={productsInCart.user_id}
                  key={index}
                  product={product}
                  index={index}
                  productsInCart={productsInCart.products}
                  updateData={updateData}
                ></CartProductBox>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  fontSize: "25px",
                  paddingTop: "30px",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <span>Your cart is empty!</span>
              </div>
            )}
          </div>
          <div>
            <button
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                border: "2px solid blue",
                alignSelf: "center",
                borderRadius: "5px",
              }}
              onClick={() => checkoutButton.open()}
            >
              Checkout
            </button>
            <div className="bnRender"></div>
          </div>
        </>
      );
    default:
      return <div>Loading ;)</div>;
  }
};

export default Cart;

const getProductsInCart = async (userId: string) => {
  try {
    const { data }: AxiosResponse<CartProductData[]> = await axios(
      `${REACT_APP_BASE_BACKEND_URL}/getUserCartData?user_id=${userId}`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

const createCheckoutData = (
  products: CartProductData[],
  installments: number,
  id: string,
  user: any
): CheckoutData => {
  const data: CheckoutData = {
    id: `${id}`,
    installments: installments,
    payer: {
      email: user.email,
    },
    items: products.map((item) => {
      return {
        id: "fashion",
        description: "",
        quantity: item.productOption.optionQuantity,
        title: item.baseName,
        unit_price: item.basePrice,
      };
    }),
  };
  return data;
};

const createPreference = async (data) => {
  const res = await axios.post(
    `${REACT_APP_BASE_BACKEND_URL}/mercadopago/create_preference`,
    data
  );
  if (res) {
    return res.data.response.id;
  }
};
