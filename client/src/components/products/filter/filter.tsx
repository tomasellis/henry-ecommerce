/* eslint-disable */
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

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
      dispatch(
        getArticles(
          gender,
          e.target.id,
          undefined,
          undefined,
          undefined,
          undefined,
          0,
          1
        )
      );

  };

  return (
    <>
      <div className="container_filters_product">
        <div className="btn_menu_product">
          <label htmlFor="btn_menu_product">
            <div className="cont_filter_product">
              <h1 className="title_filter_product">FILTRAR</h1>
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
              ROPA
            </button>
            <ul
              onClick={(e) => setDataHandler(e)}
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <a className="dropdown-item" id="tshirts" href="#">
                  T-SHIRTS
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
                <a className="dropdown-item" id="jackets" href="#">
                  JACKETS
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="sweater" href="#">
                  SWEATER
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="shoes" href="#">
                  SHOES
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
              PRECIO
            </button>
            <ul
              className="dropdown-menu "
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <a className="dropdown-item" id="alto" href="#">
                  PRECIO MAS ALTO
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="bajo" href="#">
                  PRECIO MAS BAJO
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
              TALLES
            </button>
            <ul
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
              COLORES
            </button>
            <ul
              className="dropdown-menu "
              aria-labelledby="dropdownMenuButton1"
            >
              <div className="div_colors_filter_product">
                <li>
                  <button
                    className="color_filter color_one_filter"
                    value="withe"
                  >
                    {" "}
                  </button>
                </li>
                <li>
                  <button
                    className="color_filter color_two_filter"
                    value="black"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_three_filter"
                    value="grey"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_four_filter"
                    value="green"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_five_filter"
                    value="yellow"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_six_filter"
                    value="pink"
                  ></button>
                </li>
                <li>
                  <button
                    className="color_filter color_seven_filter"
                    value="sienna"
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
