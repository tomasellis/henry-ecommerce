import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import actions
import { getArticles } from "../../actions/products/productActions";
import { getOptions } from "../../actions";
//import components
import RowRead from "./ModifyProductsReadable";
import RowEdit from "./ModifyProductsEdit";


export default function ModifyProducts() {

  const dispatch = useDispatch();

  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    dispatch(
      getArticles(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    );
    dispatch(getOptions());
  }, [dispatch]);

  const products = useSelector((state: any) => state.articles);
  const options = useSelector((state: any) => state.options);

  function handleEditClick (event, product) {
    event.preventDefault();
    setEditProductId(product.id);
  };

  function handleCancelClick () {
   setEditProductId(null);
 };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell >Product Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {products.products.map((product) => (
          <Fragment>
          {editProductId===product.id ?
            <RowEdit
               key={product.id}
               product={product}
               options={options}
               handleCancelClick={handleCancelClick}
            />
           :
           <RowRead
           key={product.id}
           product={product}
           handleEditClick={handleEditClick} />
          }
          </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
