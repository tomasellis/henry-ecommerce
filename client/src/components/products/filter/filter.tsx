/* eslint-disable */
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//import css
import "./filter.css";
import { getArticles } from "../../../actions/products/productActions";
import { cleanProducts } from '../../../actions';

export default function Filter() {
  const state = useSelector((state: RootState) => state);

  interface RootState {
    maxProducts: number;
  }

  type Params = {
    gender: string;
    page: string
  };
  const { gender } = useParams<Params>();
  // const {page} = useParams<Params>();
  const dispatch = useDispatch();

  const setDataHandler = (e) => {
    setDataFilter({
      ...dataFilter,
      [e.target.name]: e.target.id
    })
  };

  const [pages, setPages] = useState({
    currentPage: 0,
    prevPage: -1,
    nextPage: 1,
  })
  const productsxPage = 8
  const [dataFilter, setDataFilter] = useState({
    gender: gender,
    category: [],
    less_than: undefined,
    greater_than: undefined,
    color: undefined,
    size: undefined
  });

  useEffect(() => {
    dispatch(
      getArticles(
        gender,
        dataFilter.category,
        dataFilter.less_than,
        dataFilter.greater_than,
        dataFilter.color,
        dataFilter.size,
        productsxPage * 0,
        productsxPage,
        undefined
      )
    )
    setPages({
      currentPage: 0,
      prevPage: -1,
      nextPage: 1,
    })
  }, [dataFilter,gender])

  useEffect(() => {
    dispatch(
      getArticles(
        gender,
        dataFilter.category,
        dataFilter.less_than,
        dataFilter.greater_than,
        dataFilter.color,
        dataFilter.size,
        productsxPage * pages.currentPage,
        productsxPage,
        undefined
      )
    )
  }, [pages.currentPage])

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        }
      },
      margin: {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    }),
  );

  const classes = useStyles();

  const inputHandler = (e) => {
    if (e.target.name !== "less_than" || e.target.name !== "greater_than") {
      setDataFilter({
        ...dataFilter,
        [e.target.name]: e.target.value
      })
    } else {
      setDataPrice({
        ...dataPrice,
        [e.target.name]: e.target.id
      })
    }
  }

  const [dataPrice, setDataPrice] = useState({
    less_than: undefined,
    greater_than: undefined
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    setDataFilter({
      ...dataFilter,
      less_than: dataPrice.less_than,
      greater_than: dataPrice.greater_than
    })
  }

  
  const removeFilter = (e) =>{
    if(e === "category"){
      setDataFilter({...dataFilter, category:[] })
    }
    else  if(e === "color"){
      setDataFilter({...dataFilter, color:undefined })
    }
    else if(e === "size"){
      setDataFilter({...dataFilter, size:undefined })
    }
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
      {!dataFilter.category.length ||
      <div className = 'div_quitar_filter'>
        <button onClick={() => removeFilter("category")}>
          {dataFilter.category}
          <p>x</p>
        </button>
      </div>
      }
      {!dataFilter.color ||
      <div className = 'div_quitar_filter'>
        <button onClick={() => removeFilter("color")}>
          {dataFilter.color}
          <p>x</p>
        </button>
      </div>
      }
      {!dataFilter.size ||
      <div className = 'div_quitar_filter'>
        <button onClick={() => removeFilter("size")}>
          {dataFilter.size}
          <p>x</p>
        </button>
      </div>
      }
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
                <button className="dropdown-item" id="tshirts" name="category">
                  T-SHIRT
                </button>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <button className="dropdown-item" id="pants" name="category">
                  PANTS
                </button>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <button className="dropdown-item" id="jackets" name="category">
                  JACKETS
                </button>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <button className="dropdown-item" id="diver" name="category">
                  DIVERS
                </button>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <button className="dropdown-item" id="footwear" name="category">
                  FOOTWEAR
                </button>
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
              <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                <div>
                  <TextField
                    id="greater_than"
                    label="Min"
                    maxRows={4}
                    type="number"
                    placeholder="$0"
                    name="greater_than"
                    onChange={(e) => inputHandler(e)}
                  />
                </div>
                <div>
                  <TextField
                    id="less_than"
                    label="Max"
                    maxRows={4}
                    type="number"
                    placeholder="$5.000"
                    name="less_than"
                    onChange={(e) => inputHandler(e)}
                  />
                </div>
{/*                 <div>
                  <Button
                    variant="outlined"
                    size="small"
                    color="default"
                    type="submit"
                    className={classes.margin}
                    onClick={(e) => handleChange(e)}>
                    APPLY
                  </Button>
                </div> */}
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
              onClick={(e) => setDataHandler(e)}
              className="dropdown-menu "
              aria-labelledby="dropdownMenuButton1"
            >
              <div className="div_size_filter_product">
                <li>
                  <button id="X" name="size">X</button>
                </li>
                <li>
                  <button id="S" name="size">S</button>
                </li>
                <li>
                  <button id="M" name="size">M</button>
                </li>
                <li>
                  <button id="L" name="size">L</button>
                </li>
                <li>
                  <button id="XS" name="size">XS</button>
                </li>
                <li>
                  <button id="XL" name="size">XL</button>
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
              onClick={(e) => setDataHandler(e)}
              className="dropdown-menu "
              aria-labelledby="dropdownMenuButton1"
            >
              <div className="div_colors_filter_product">
                <li>
                  <button
                    className="color_filter color_one_filter"
                    id="withe"
                    name="color"
                  >
                    {" "}
                  </button>
                </li>
                <li>
                  <button
                    className="color_filter color_two_filter"
                    id="black"
                    name="color"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_three_filter"
                    id="grey"
                    name="color"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_four_filter"
                    id="green"
                    name="color"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_five_filter"
                    id="yellow"
                    name="color"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_six_filter"
                    id="pink"
                    name="color"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_seven_filter"
                    id="sienna"
                    name="color"
                  ></button>
                </li>
              </div>
              <hr className="hr_filter_product" />
            </ul>
          </div>
        </div>
      </div>
      <div className='pagination'>
      <button onClick={e => setPages({
          ...pages,
          currentPage: pages.currentPage - 1,
          prevPage: pages.prevPage - 1,
          nextPage: pages.nextPage - 1
        })} disabled={pages.prevPage < 0} >Prev</button>
        <button onClick={e => setPages({
          ...pages,
          currentPage: pages.currentPage + 1,
          prevPage: pages.prevPage + 1,
          nextPage: pages.nextPage + 1
        })} disabled={pages.nextPage > Math.ceil(state.maxProducts / productsxPage) - 1} >Next</button>
        </div>
    </>
  );
}
