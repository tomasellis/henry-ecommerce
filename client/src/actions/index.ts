import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";


const url = "https://henry-pg-api.herokuapp.com/v1/graphql";

export function getArticles(
    gender,
    category,
    less_than,
    greater_than,
    color,
    size,
) {
    let string1 = `/products?gender=${gender}&category=${category}&less_than=${less_than}&greater_than=${greater_than}&color=${color}&size=${size}`

}
