import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
//import actions
import { getProduct } from "../../../actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1em"
  },
  root2: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "3em"
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    width: '30ch',
    marginLeft: "8px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30ch',
  },
}));

declare global {
    interface Window {
        cloudinary:any;
    }
}

export default function ModifyProduct() {
  const dispatch = useDispatch();
  const classes = useStyles();
  type IDParams = {
    id: string;
  };

  const { id } = useParams<IDParams>() ;

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const productObject = useSelector((state: any) => state.product);
  const product = productObject.products
  console.log(product)

  const [productUpdate, setProductUpdate] = useState({
    name: '',
    gender:  '',
    image_url:'',
    price: undefined,
    product_options: [],
    product_categories: []
  })

  let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dda6r0i60",
        uploadPreset: "henry.pg"
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setProductUpdate({
              ...productUpdate,
              image_url: result.info.url
          })
        }
      }
    );

  const openWidgetCloudinary = (e) => {
      e.preventDefault();
      myWidget.open();
    }

  return (
    <div className='div-conteiner'>
     <h3 className='titulo'>Modify Product</h3>
      <div className="conteiner-datos">
       <form
         className={classes.root}
         noValidate autoComplete="off"
       >
       <TextField
         value={productUpdate.name}
         placeholder={product ? product[0].name : ''}
         label="Name"
         name="name"
         multiline
         maxRows={4}
       />
       <div style={{ marginTop: "15px" }}>
       <Select
         labelId="demo-simple-select-helper-label"
         label="Select an option"
         value={productUpdate.gender}
         name="gender"
         className={classes.selectEmpty}
       >
         <MenuItem disabled value="">
           <em>Select a gender</em>
         </MenuItem>
         <MenuItem value="men">Men</MenuItem>
         <MenuItem value="women">Women</MenuItem>
       </Select>
       <TextField
         value={productUpdate.price}
         placeholder={product ? product[0].price : ''}
         label="Price"
         color="secondary"
         type="number"
         name="number"
       />
       <div className='div_image_add_product'>
           <p className='p_add_product'>Image URL</p>
           <input type="text"
               name='image_url'
               value={productUpdate.image_url}
           />
       </div>
       <button id="upload_widget" className="cloudinary-button" onClick={openWidgetCloudinary}>
           Upload image
       </button>
       </div>
       </form>
     </div>
    </div>
  );
}
