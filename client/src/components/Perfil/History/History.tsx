import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrder } from "../../../actions";
import CardHistory from "./CardHistory";
import Profile from "../Profile";
import DropDownHistory from "./DropDownHistory";
import "./CardHistory.css";

type Order = {
  email: string;
  address: string;
  additional_information: string;
  latitude: number;
  longitude: number;
  status: string;
  created_at: string;
  updated_at: string;
  orders_products: {
    id: string;
    order_id: string;
    product_id: string;
    product_option_id: string;
    unit_price: number;
    quantity: number;
    user_id: string;
    created_at: string;
    products_option: {
      product: {
        name: string;
        image_url: string;
      };
    };
  }[];
};

export default function History() {
  const state = useSelector(
    (state: { user: { id: string }; storeHistory: { orders: Order[] } }) =>
      state
  );
  const dispatch = useDispatch();
  const userId = state.user.id;

  useEffect(() => {
    if (state.user.id) {
      dispatch(setUserOrder(userId));
    }
    //eslint-disable-next-line
  }, [state.user.id]);

  console.log("HISTORY", state.storeHistory.orders);
  if (state.user.id && state.storeHistory) {
    return (
      <div className="div_cards">
        <div className="divqencierratodo">
          <Profile />
          <div className="actualDiv">
            {/* {state.storeHistory.orders?.map((e, index) => {
              console.log("STORE HISTORY", e);
              return e.orders_products.map((productOption, indexOption) => {
                console.log("PRODUCT OPTION", productOption, indexOption);
                return (
                  <div key={indexOption}>
                    <CardHistory
                      id={productOption.id}
                      image_url={
                        productOption.products_option.product.image_url
                      }
                      name={productOption.products_option.product.name}
                      unit_price={productOption.unit_price}
                      quantity={productOption.quantity}
                      date={productOption.created_at}
                      orderId={index + 1}
                      id_product_general={productOption.product_id}
                    />
                  </div>
                );
              });
            })} */}
            {state.storeHistory.orders?.map((e, index) => (
              <DropDownHistory order={e} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
