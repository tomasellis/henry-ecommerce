/* eslint-disable */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//import css
import "./filter.css";
import { getArticles } from "../../../actions/products/productActions";

export default function Filter() {
  type GenderParams = {
    gender: string;
  };
  const { gender } = useParams<GenderParams>();

  const dispatch = useDispatch();

  const setDataHandler = (e) => {
    e.preventDefault();
    if (gender === "woman") {
      dispatch(
        getArticles(
          gender,
          e.target.id,
          undefined,
          undefined,
          undefined,
          undefined
        )
      );
    }
    if (gender === "men") {
      dispatch(
        getArticles(
          gender,
          e.target.id,
          undefined,
          undefined,
          undefined,
          undefined
        )
      );
    }
    if (gender === "kids") {
      dispatch(
        getArticles(
          gender,
          e.target.id,
          undefined,
          undefined,
          undefined,
          undefined
        )
      );
    }
  };

    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        }},
        margin: {
          margin: theme.spacing(1),
        },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
    }),
  );

  const classes = useStyles();
  const [dataFilter, setDataFilter] = useState({
    gender: undefined,
    category: [],
    less_than: undefined,
    greater_than: undefined,
    color: undefined,
    size: undefined
  });

  const handleInputChange = (event) => {
    setDataFilter({
      ...dataFilter,
      [event.target.name]: event.target.value
    })
  }

  const handleChange = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  })
  }

    type Inputs = {
      less_than: string,
      greater_than: string,
    };

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
      
    const onSubmit = (event,e) => {
      e.target.reset();
      e.preventDefault();
      dispatch(
        getArticles(
          dataFilter.gender,
          dataFilter.category,
          dataFilter.less_than,
          dataFilter.greater_than,
          dataFilter.color,
          dataFilter.size
        )
      );
    } 

    const handleChangeSize = (e) => {
      if(e.target.id === "x") dispatch(getArticles(gender,undefined,undefined,undefined,undefined,"x"))
      if(e.target.id === "s") dispatch(getArticles(gender,undefined,undefined,undefined,undefined,"s"))
      if(e.target.id === "m") dispatch(getArticles(gender,undefined,undefined,undefined,undefined,"m"))
      if(e.target.id === "l") dispatch(getArticles(gender,undefined,undefined,undefined,undefined,"l"))
      if(e.target.id === "xs") dispatch(getArticles(gender,undefined,undefined,undefined,undefined,"xs"))
      if(e.target.id === "xl") dispatch(getArticles(gender,undefined,undefined,undefined,undefined,"xl"))
    }

    const handleChangeColor = (e) => {
      if(e.target.id === "white") dispatch(getArticles(gender,undefined,undefined,undefined,"white",undefined))
      if(e.target.id === "black") dispatch(getArticles(gender,undefined,undefined,undefined,"black",undefined))
      if(e.target.id === "grey") dispatch(getArticles(gender,undefined,undefined,undefined,"grey",undefined))
      if(e.target.id === "green") dispatch(getArticles(gender,undefined,undefined,undefined,"green",undefined))
      if(e.target.id === "yellow") dispatch(getArticles(gender,undefined,undefined,undefined,"yellow",undefined))
      if(e.target.id === "pink") dispatch(getArticles(gender,undefined,undefined,undefined,"pink",undefined))
      if(e.target.id === "sienna") dispatch(getArticles(gender,undefined,undefined,undefined,"sienna",undefined))
    }
  return (
    <>
      <div className="container_filters_product">
        <div className="btn_menu_product">
          <label htmlFor="btn_menu_product">
            <div className="cont_filter_product">
              <h1 className="title_filter_product">FILTER</h1>
              <p className="icon_menu_product">☰</p>
            </div>
          </label>
        </div>
      </div>
      <input type="checkbox" id="btn_menu_product" />
      <div className="div_container_product">
        <div className="div_cont_product">
          <div className="dropdown">
            <button
              className="btn btn-ligth dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              CLOTHER
            </button>
            <ul
              onClick={(e) => setDataHandler(e)}
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <a className="dropdown-item" id="t-shirt" href="#">
                  T-SHIRT
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="pants" href="#">
                PANTS
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="jacket" href="#">
                  JACKETS
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="diver" href="#">
                  DIVERS
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="footwear" href="#">
                  FOOTWEAR
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-ligth dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              PRICE
            </button>
            <ul
              className="dropdown-menu "
              aria-labelledby="dropdownMenuButton1"
            >
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
        <div>
        <TextField
            id="standard-multiline-flexible"
            label="Min"
            maxRows={4}
            type="number"
            placeholder="$0"
            onChange={handleInputChange}
            {...register('less_than', { required: {value: true, message:'Obligatorio' }})}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.less_than?.message}
            </span>
        </div>
        <div>
        <TextField
            id="standard-multiline-flexible"
            label="Max"
            maxRows={4}
            type="number"
            placeholder="$5.000"
            onChange={handleInputChange}
            {...register('greater_than', { required: {value: true, message:'Obligatorio' }})}
          />
          <span className="text-danger text-small d-block mb-2">
              {errors?.greater_than?.message}
            </span>

        </div>
        <div>
        <Button
         variant="outlined" 
         size="small"
         color="default"
         type="submit"
         className={classes.margin}
         onClick={(e) => handleChange(e)}>
          APPLY
        </Button>
        </div>
      </form>
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-ligth dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              SIZES
            </button>
            <ul
              onClick = {(e) => handleChangeSize(e)}
              className="dropdown-menu "
              aria-labelledby="dropdownMenuButton1"
            >
              <div className="div_size_filter_product">
                <li>
                  <button id="x">X</button>
                </li>
                <li>
                  <button id="s">S</button>
                </li>
                <li>
                  <button id="m">M</button>
                </li>
                <li>
                  <button id="l">L</button>
                </li>
                <li>
                  <button id="xs">XS</button>
                </li>
                <li>
                  <button id="xl">XL</button>
                </li>
              </div>
              <hr className="hr_filter_product" />
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-ligth dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              COLORS
            </button>
            <ul
              onClick = {(e) => handleChangeColor(e)}
              className="dropdown-menu "
              aria-labelledby="dropdownMenuButton1"
            >
              <div className="div_colors_filter_product">
                <li>
                  <button
                    className="color_filter color_one_filter"
                    id="withe"
                  >
                    {" "}
                  </button>
                </li>
                <li>
                  <button
                    className="color_filter color_two_filter"
                    id="black"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_three_filter"
                    id="grey"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_four_filter"
                    id="green"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_five_filter"
                    id="yellow"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_six_filter"
                    id="pink"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_seven_filter"
                    id="sienna"
                  ></button>
                </li>
              </div>
              <hr className="hr_filter_product" />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
