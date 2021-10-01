import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrder } from "../../../actions";
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
            {state.storeHistory.orders?.map((e, index) => (
              <DropDownHistory order={e} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
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
        <span>Loading your history...</span>
      </div>
    );
  }
}
