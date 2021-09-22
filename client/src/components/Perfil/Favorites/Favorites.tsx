import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';
/* import { useEffect } from "react" */

//import actions
import { getFavorites } from "../../../actions";
/* import { getProduct } from "../../../actions"; */

//import css
import './Favorites.css'

//import component
import Profile from "../Profile";
import CardFAv from "./cardFav";

export default function Favorites( ){
    
    /* const dispatch = useDispatch(); */
    const user_id = useSelector((state : any) => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFavorites(user_id.id))
    }, [])
    let favProductsId = useSelector((state : any) => state.favoriteProducts.id);    
    console.log(favProductsId);
     
    
    

     return(
        <>
        <div className = 'divqencierratodo'>
        <Profile />
         <div className = 'div_fav_products'> 
        <CardFAv
        favProductsId = {favProductsId} 
        />
                </div>
        </div>
    </>
    )
};