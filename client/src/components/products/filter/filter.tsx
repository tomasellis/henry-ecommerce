/* eslint-disable */
import React from "react";

//import css
import "./filter.css";

export default function Filter() {
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
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" id="remeras" href="#">
                  REMERAS
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="pantalones" href="#">
                  PANTALONES
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="camperas" href="#">
                  CAMPERAS
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="buzos" href="#">
                  BUZOS
                </a>
              </li>
              <hr className="hr_filter_product" />
              <li>
                <a className="dropdown-item" id="calzados" href="#">
                  CALZADOS
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
                  <button value="x">X</button>
                </li>
                <li>
                  <button value="s">S</button>
                </li>
                <li>
                  <button value="m">M</button>
                </li>
                <li>
                  <button value="l">L</button>
                </li>
                <li>
                  <button value="xs">XS</button>
                </li>
                <li>
                  <button value="xl">XL</button>
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
