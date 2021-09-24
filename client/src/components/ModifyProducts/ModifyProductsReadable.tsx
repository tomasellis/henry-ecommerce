import React from "react";
import { useDispatch } from "react-redux";

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//import Actions
import {removeProduct} from "../../actions/index"

export default function RowRead (props) {
  const { product, handleEditClick }= props;
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if(id!==''){
      dispatch(removeProduct({id}));
    }
  }

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
          {product.name}
        </TableCell>
        <TableCell align="right">{product.gender}</TableCell>
        <TableCell align="right">${product.price}</TableCell>
        <TableCell align="right">{product.image_url}</TableCell>
        <TableCell align="right">
           <button
             onClick={(event) => handleEditClick(event, product)}
             >Edit
           </button>
           <button onClick={() => handleDelete(product.id)}>Delete</button>
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
              {product.product_options.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell component="th" scope="row">
                      {option.color}
                    </TableCell>
                    <TableCell>{option.size}</TableCell>
                    <TableCell align="right">{option.stock}</TableCell>
                    <TableCell align="right"></TableCell>
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
              {product.product_categories.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell component="th" scope="row">
                      {option.category_name}
                    </TableCell>
                    <TableCell align="right"></TableCell>
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
