import React from "react";


import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function RowEdit (props) {
  const { product, options, handleCancelClick } = props;
  const [open, setOpen] = React.useState(false);

  console.log(options)

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
          {/*NAME*/}
          <TextField
          id="outlined-required"
          defaultValue="Name"
          />
        </TableCell>
          {/*GENDER*/}
         <TableCell align="right">
           <TextField
             id="outlined-select-currency"
             select
           >
           <MenuItem key="men" value="men">
             Men
           </MenuItem>
           <MenuItem key="women" value="women">
             Women
           </MenuItem>
           </TextField>
        </TableCell>
          {/*PRICE*/}
        <TableCell align="right">
          <TextField
           id="outlined-start-adornment"
           sx={{ m: 1, width: '25ch' }}
           InputProps={{
             startAdornment: <InputAdornment position="start">$</InputAdornment>,
           }}
         />
        </TableCell>
        {/*IMG*/}
        <TableCell align="right">
          <TextField
           id="outlined-basic"
           variant="outlined"
           defaultValue={product.image_url}
          />
        </TableCell>
        <TableCell align="right">
           <button>Save</button>
           <button onClick={handleCancelClick}>Cancel</button>
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
                      {/*color*/}
                    <TableCell component="th" scope="row">
                    <TextField
                      id="outlined-select-currency"
                      select
                    >
                    {options.colors.map((color)=> (
                      <MenuItem key={color.name}value={color.name}>
                        {color.name}
                      </MenuItem>
                    ))}
                    </TextField>
                    </TableCell>
                      {/*size*/}
                    <TableCell>
                    <TextField
                      id="outlined-select-currency"
                      select
                    >
                    {options.size.map((size)=> (
                      <MenuItem key={size.name} value={size.name}>
                        {size.name}
                      </MenuItem>
                    ))}
                    </TextField>
                    </TableCell>
                     {/*stock*/}
                    <TableCell align="right">
                    <TextField
                    id="outlined-required"
                    defaultValue={option.stock}
                    />
                    </TableCell>

                    <TableCell align="right">
                      <button>Update</button>
                      <button>Delete</button>
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow key='new_option'>
                  <TableCell component="th" scope="row">
                   <TextField
                     id="outlined-select-currency"
                     select
                   >
                    {options.colors.map((color)=> (
                      <MenuItem key={color.name}value={color.name}>
                        {color.name}
                      </MenuItem>
                    ))}
                   </TextField>
                  </TableCell>

                  <TableCell>
                  <TextField
                    id="outlined-select-currency"
                    select
                  >
                  {options.size.map((size)=> (
                    <MenuItem key={size.name} value={size.name}>
                      {size.name}
                    </MenuItem>
                  ))}
                  </TextField>
                  </TableCell>

                  <TableCell align="right">
                  <TextField
                  id="outlined-required"
                  defaultValue="Stock"
                  />
                  </TableCell>

                  <button>Add option</button>
                </TableRow>
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
                       <TextField
                        id="outlined-select-currency"
                        select
                       >
                        {options.categories.map((category)=> (
                         <MenuItem key={category.name}value={category.name}>
                          {category.name}
                         </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell align="right">
                      <button>Update</button>
                      <button>Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key='new_category'>
                  <TableCell component="th" scope="row">
                  <TextField
                   id="outlined-select-currency"
                   select
                  >
                   {options.categories.map((category)=> (
                    <MenuItem key={category.name}value={category.name}>
                     {category.name}
                    </MenuItem>
                   ))}
                 </TextField>
                  </TableCell>
                  <button>Add Category</button>
                </TableRow>
              </TableBody>
            </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
