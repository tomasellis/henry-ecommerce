import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { Link } from "react-router-dom";

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

const DropDownHistory = ({ order, index }: { order: Order; index: number }) => {
  const [open, setOpen] = useState(false);

  const mapProducts = order.orders_products.map((product) => {
    return (
      <div className="div_container_card_product_history">
        <div className="div_card_product">
          <Link to={`/clothing/details/${product.product_id}`}>
            <img
              className="img_product_history"
              src={product.products_option.product.image_url}
              alt=""
            />
            <h3 className="card_name_product_history">
              {product.products_option.product.name}
            </h3>
            <h5 className="titulito">$ {product.unit_price}</h5>
            <h5 className="titulito"> Quantity: {product.quantity}</h5>
            <h5 className="titulito"> {product.created_at.slice(0, 10)}</h5>
            <h5 className="titulito"> Order: {index + 1}</h5>
          </Link>
        </div>
      </div>
    );
  });

  const final = order.orders_products.map(
    (product) => product.unit_price * product.quantity
  );

  return (
    <div className="dropdownStyle">
      <React.Fragment>
        <TableRow sx={{ borderBottom: "unset", width: "100%" }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell>Order N??: {index + 1}</TableCell>
          <TableCell>Status: {order.status}</TableCell>
          <TableCell>Date: {order.created_at.slice(0, 10)}</TableCell>
          <TableCell>
            Total: ${" "}
            {final.reduce(function (previousValue, currentValue) {
              return previousValue + currentValue;
            }, 0)}
          </TableCell>
        </TableRow>
        {open ? (
          <TableRow sx={{ backgroundColor: "lightgrey" }}>
            <div className="thisDiv">{mapProducts}</div>
          </TableRow>
        ) : (
          <span></span>
        )}
      </React.Fragment>
    </div>
  );
};

export default DropDownHistory;
