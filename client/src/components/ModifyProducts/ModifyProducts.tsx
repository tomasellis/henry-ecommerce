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


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log(row)
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.gender}</TableCell>
        <TableCell align="right">${row.price}</TableCell>
        <TableCell align="right">{row.image_url}</TableCell>
        <TableCell align="right">
           <button>Update</button>
           <button>Delete</button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
            {/*Options*/}
            <Typography variant="h6" gutterBottom component="div">
              Options
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Color</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {row.product_options.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell component="th" scope="row">
                      {option.color}
                    </TableCell>
                    <TableCell>{option.size}</TableCell>
                    <TableCell align="right">{option.stock}</TableCell>
                    <TableCell align="right">
                      <button>Update</button>
                      <button>Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/*Categories*/}
            <Typography variant="h6" gutterBottom component="div">
              Categories
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {row.product_categories.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell component="th" scope="row">
                      {option.category_name}
                    </TableCell>
                    <TableCell align="right">
                      <button>Update</button>
                      <button>Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ModifyProducts() {

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
  }, [])

  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.articles);

  console.log(products)


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
            <Row key={product.name} row={product} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
