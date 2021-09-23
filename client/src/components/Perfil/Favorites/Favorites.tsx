import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';
/* import { useEffect } from "react" */

//import actions
import { getFavorites } from "../../../actions";
import { getFavProduct, deleteFavProduct } from "../../../actions";
/* import { getProduct } from "../../../actions"; */

//import css
import './Favorites.css'

//import component
import Profile from "../Profile";

function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};
    
    for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    
    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
};

export default function Favorites(){

    /* const dispatch = useDispatch(); */
    const user_id = useSelector((state : any) => state.user);
    const id_user = user_id.id
    let favProducts = useSelector((state : any) => state.favoriteProducts);
    let productsFavs = favProducts?.products?.users_by_pk?.favourites;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFavorites(id_user))
    }, [productsFavs]);

    
    // let arrayUnico = removeDuplicates(favoritesProducts, 'image_url');
    // favoritesProducts = arrayUnico;

    
    
    
    const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium';
    const IMG_FAV_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAzUlEQVRIieWUUQ2DMBRFj4RJQAISKgEJlYCDIWEOQMIcgAPqYBbqgH3QJgVayIPysewm9wfKOeWlAP8WA4x3wTUwueo7BEMg6HPDVQD3VTkFXUTQ5YIXEbhvIQFVwBNomWfcM5+YFNx3DNa3jlHFBEcgaTfRGeE6NaarErsHvyqxQHkEPysRwX1eAoGSwmH5azhqfUYgGdEghSuhYAIeEkGdgDSusXvRrzeV9+phw/KUlO5auKaTCOxq16k0wbqPRGDY7joV/zZGIvidfAFZlMauIVsaSQAAAABJRU5ErkJggg==";
    
    const handleDeletle = (e) => {       
        // setState({
        //     product : arrayUnico.filter(i => i.id === e.id)
        // })
        productsFavs?.filter(i => {
            return i.id !== e.id
        });
        console.log(productsFavs);
        

        dispatch(deleteFavProduct({favorite_id :e.id}));
    }        

     return(
        <>
        <div className = 'divqencierratodo'>
        <Profile />
         <div className = 'div_fav_products'> 
            { productsFavs?.length < 1 ? <h4 className = 'h1_vacio_fav'>Add products to your favorites...</h4> :  productsFavs?.map(e => {
                return(
                        <div className = 'cards_container_products_fav'>
                            <div className = 'div_container_card_product_fav'>
                                <div className = 'div_card_product_fav'>
                                <Link to = {`/clothing/${e.product_id}`}>
                                    <img className = 'img_product_fav' src={e.product.image_url.includes('http')? e.product.image_url : IMG }alt="" />
                                    <h3 className = 'card_name_product_fav'>{e.product.name}</h3>
                                    <h5 className = 'card_desc_product_fav'><b>{e.product.price}</b></h5>
                                </Link>
                                    <button
                                    onClick = {() =>handleDeletle(e)}
                                    className = 'button_fav_product_fav'
                                    ><img className = 'img_fav_product_fav' src={ IMG_FAV_2}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
                    } 
                </div>
        </div>
    </>
    )
};