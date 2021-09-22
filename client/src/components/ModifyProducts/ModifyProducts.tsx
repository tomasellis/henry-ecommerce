import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//import actions
import { getArticles } from "../../actions/products/productActions";
import { getOptions } from "../../actions";
//import components
import Row from "./ModifyProductsReadable";


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

  const handleEditClick = (event, product) => {
    event.preventDefault();
    setEditProductId(product.id);
  };

  const handleCancelClick = () => {
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
            <Row key={product.name} row={product} options={options} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
