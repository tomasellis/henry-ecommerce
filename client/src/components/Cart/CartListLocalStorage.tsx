import React, { useEffect } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { removeToCartStorage } from "../../actions";
import "./styles.css";
import AddOrSubstractLocalStorageInput from "./AddOrSubstractInputLocalStorage";

type CartProductBoxProps = {
  products: CartProductData[];
};

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

type Product = {
  id_option: string;
};

interface RootState {
  cart: Array<Product>;
  idsInCart: string;
}

const CartListLocalStorage = (props: CartProductBoxProps) => {
  const state = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const handleDeleteOnClick = async (product: CartProductData) => {
    if (
      window.confirm(
        `Deseas remover este producto de tu lista: ${product.name}?`
      )
    ) {
      dispatch(removeToCartStorage(product.id_option));
    }
  };

  useEffect(() => {
    localStorage.cartStorage = JSON.stringify(state.cart);
    console.log("se actualizo el carrito");
  }, [state.cart]);

  const createData = (
    image: string,
    name: string,
    stock: number,
    quantity: number,
    price: number,
    product: CartProductData
  ) => {
    return { image, name, stock, quantity, price, product };
  };

  const rows = props.products.map((product) => {
    return createData(
      product.image_url,
      product.name + " " + product.size + " " + product.color.toUpperCase(),
      product.stock,
      product.quantity,
      product.price,
      product
    );
  });

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "red",
      }}
    >
      <TableContainer component={Paper} style={{ minWidth: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">
                  <img src={row.image} alt={row.name} height="30px" />
                </TableCell>
                <TableCell scope="row" align="left">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.stock}</TableCell>
                <TableCell align="center" width="100px">
                  <AddOrSubstractLocalStorageInput
                    itemQuantity={row.product.quantity}
                    product={row.product}
                  />
                </TableCell>

                <TableCell align="right">
                  $ {(row.price * row.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleDeleteOnClick(row.product);
                    }}
                    variant="outlined"
                    style={{ backgroundColor: "red" }}
                  >
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="left">
                <b>TOTAL</b>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="right">
                <b>$ {getTotal(props.products)}</b>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartListLocalStorage;

const getTotal = (products: CartProductData[]): number => {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].price * products[i].quantity;
  }
  return sum;
};
