import React from "react";
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
import AddOrSubstractInput from "./AddOrSubstractInput";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;

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

const CartList = ({
  products,
  userId,
  updateData,
}: {
  products: CartProductData[];
  userId: string;
  updateData: () => any;
}) => {
  const rows = products.map((product) => {
    return createData(
      product.baseImage,
      product.baseName +
        " " +
        product.productOption.optionSize +
        " " +
        product.productOption.optionColor.toUpperCase(),
      product.productOption.optionStock,
      product.productOption.optionQuantity,
      product.basePrice,
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
                  <AddOrSubstractInput
                    itemQuantity={row.product.productOption.optionQuantity}
                    product={row.product}
                    userId={userId}
                    active={true}
                    updateData={updateData}
                  />
                </TableCell>

                <TableCell align="right">
                  $ {(row.price * row.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={async () => {
                      await handleDeleteOnClick(row.product);
                      updateData();
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
                <b>$ {getTotal(products)}</b>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartList;

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

const handleDeleteOnClick = async (product: CartProductData) => {
  if (
    window.confirm(
      `Deseas remover este producto de tu lista: ${product.baseName}?`
    )
  ) {
    const { data } = await axios.post(`${BASE_URL}/deleteFromCart`, {
      cart_product_id: `${product.inCartId}`,
    });
    return data;
  }
};

const getTotal = (products: CartProductData[]): number => {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].basePrice * products[i].productOption.optionQuantity;
  }
  return sum;
};
