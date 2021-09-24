import React from "react";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
//Import actions:
import {
  removeOption,
  updateOption,
  updateCategory,
  addNewOption,
  addNewCategory,
  updateDataProduct,
} from "../../actions/index";

export default function RowEdit(props) {
  const { product, options, handleCancelClick } = props;
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const [newOption, setNewOption] = React.useState({
    color: "",
    stock: "",
    size: "",
    image_url: product.image_url,
    product_id: product.id,
  });

  const [productOptions, setProductOptions] = React.useState([]);

  const [productCategories, setProductCategories] = React.useState([]);

  const [productData, setProductData] = React.useState({
    id: product.id,
    name: product.name,
    image_url: product.image_url,
    price: product.price,
    gender: product.gender,
  });

  const [newCategory, setNewCategory] = React.useState({
    name: "",
    product_id: product.id,
  });

  function handleChangeProductOption(e, id) {
    let option = product.product_options.filter((opt) => opt.id === id);
    setProductOptions([
      {
        ...option[0],
        [e.target.name]: e.target.value,
      },
    ]);
  }

  function handleChangeProductCategory(e, id) {
    let category = product.product_categories.filter((cat) => cat.id === id);
    setProductCategories([
      {
        ...category[0],
        [e.target.name]: e.target.value,
      },
    ]);
  }

  function handleChangeOption(e) {
    setNewOption({
      ...newOption,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeCategory(e) {
    setNewCategory({
      ...newCategory,
      name: e.target.value,
    });
  }

  function handleChangeData(e) {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  }

  function handleDeleteOption(id) {
    console.log(id);
    dispatch(removeOption({ id }));
  }

  function handleUpdateOption() {
    if (productOptions.length > 0) {
      let option = productOptions[0];
      dispatch(updateOption(option));
    }
  }

  function handleUpdateCategory() {
    if (productCategories.length > 0) {
      let category = productCategories[0];
      dispatch(updateCategory(category));
    }
  }

  function handleUpdateData() {
    dispatch(updateDataProduct(productData));
  }

  function handleNewOption() {
    if (
      newOption.color !== "" &&
      newOption.size !== "" &&
      newOption.stock !== ""
    ) {
      dispatch(addNewOption(newOption));
    }
  }

  function handleNewCategory() {
    if (newCategory.name !== "") {
      dispatch(addNewCategory(newCategory));
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {/*NAME*/}
          <TextField
            id="outlined-required"
            name="name"
            defaultValue={product.name}
            onChange={(e) => handleChangeData(e)}
          />
        </TableCell>
        {/*GENDER*/}
        <TableCell align="right">
          <TextField
            id="outlined-select-currency"
            select
            name="gender"
            defaultValue={product.gender}
            onChange={(e) => handleChangeData(e)}
          >
            <MenuItem key="men" value="men" selected>
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
            sx={{ m: 1, width: "25ch" }}
            defaultValue={product.price}
            onChange={(e) => handleChangeData(e)}
            name="price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </TableCell>
        {/*IMG*/}
        <TableCell align="right">
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="img_url"
            defaultValue={product.image_url}
            onChange={(e) => handleChangeData(e)}
          />
        </TableCell>
        <TableCell align="right">
          <button onClick={() => handleUpdateData()}>Save</button>
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
                          name="color"
                          defaultValue={option.color}
                          onChange={(e) =>
                            handleChangeProductOption(e, option.id)
                          }
                        >
                          {options.colors.map((color) => (
                            <MenuItem key={color.name} value={color.name}>
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
                          name="size"
                          defaultValue={option.size}
                          onChange={(e) =>
                            handleChangeProductOption(e, option.id)
                          }
                        >
                          {options.size.map((size) => (
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
                          name="stock"
                          defaultValue={option.stock}
                          onChange={(e) =>
                            handleChangeProductOption(e, option.id)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <button onClick={() => handleUpdateOption()}>
                          Update
                        </button>
                        <button onClick={() => handleDeleteOption(option.id)}>
                          Out of Stock
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow key="new_option">
                    <TableCell component="th" scope="row">
                      <TextField
                        id="outlined-select-currency"
                        select
                        name="color"
                        defaultValue=""
                        onChange={(e) => handleChangeOption(e)}
                      >
                        {options.colors.map((color) => (
                          <MenuItem key={color.name} value={color.name}>
                            {color.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>

                    <TableCell>
                      <TextField
                        id="outlined-select-currency"
                        select
                        name="size"
                        defaultValue=""
                        onChange={(e) => handleChangeOption(e)}
                      >
                        {options.size.map((size) => (
                          <MenuItem key={size.name} value={size.name}>
                            {size.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>

                    <TableCell align="right">
                      <TextField
                        id="outlined-required"
                        name="stock"
                        onChange={(e) => handleChangeOption(e)}
                      />
                    </TableCell>

                    <button onClick={() => handleNewOption()}>
                      Add option
                    </button>
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
                          name="category_name"
                          defaultValue={option.category_name}
                          onChange={(e) =>
                            handleChangeProductCategory(e, option.id)
                          }
                        >
                          {options.categories.map((category) => (
                            <MenuItem key={category.name} value={category.name}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      <TableCell align="right">
                        <button onClick={() => handleUpdateCategory()}>
                          Update
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow key="new_category">
                    <TableCell component="th" scope="row">
                      <TextField
                        id="outlined-select-currency"
                        select
                        name="category_name"
                        defaultValue=""
                        onChange={(e) => handleChangeCategory(e)}
                      >
                        {options.categories.map((category) => (
                          <MenuItem key={category.name} value={category.name}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <button onClick={() => handleNewCategory()}>
                      Add Category
                    </button>
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
