import React from 'react';


import { useParams } from "react-router";
import { DetailsProductCard } from "./DetailPrpductCard";
// import { useDispatch, useSelector } from "react-redux";
// import { getProduct } from '../../actions/index';

export const DetailProductCards = () => {

    // const dispatch = useDispatch();

    let id = 12;
    let name = " Remera Telletubies";
    let image_url = 'https://d3ugyf2ht6aenh.cloudfront.net/stores/894/963/products/teletoobies1-9de34d162291d6ade616166201708137-640-0.jpg';
    let price = 150.00;
    let gender = "hombre";
    let category = "remera";

    return (
       <DetailsProductCard 
            id = {id}
            name = {name}
            image_url = {image_url}
            price = {price}
            gender = {gender}
            category = {category}
       />
    )
}
