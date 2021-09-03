import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export function getArticles(
    genero,
    categoria,
    color,
    size,
) {
    let string1 = `/products?genero=${genero}&categoria=${categoria}&color=${color}&size=${size}`

}
