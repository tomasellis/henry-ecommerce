import { IconButton } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//import actions
import { addFavorite } from "../../../actions";

//import css
import './card.css'

import StarIcon from '@material-ui/icons/Star';

export default function Card({name,price,image,id,product_id,cond}){

    const[fav,  setFav] = useState({
        status: cond,
    })    
    const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium';


    const dispatch = useDispatch();
    const user = useSelector((state : any) => state.user);
    

    const AddFavoriteProduct = (e) => {
        e.preventDefault();
        // dispatch(favoriteProducts({
        //     name,
        //     price,
        //     image,
        //     id : id
        // }));        
    
        setFav({
           status : true
        })
        dispatch(addFavorite({
        user_id : user.id,
        product_id : product_id
        })); 
    };
    
    return(
        <>
            <div className = 'div_container_card_product'>
                <div className = 'div_card_product'>
                    <Link to = {`/clothing/details/${id}`}>
                        <img className = 'img_product' src={image.includes('http')? image : IMG }alt="" />
                        <h3 className = 'card_name_product'>{name}</h3>
                        <h5 className = 'card_desc_product'>$ {price}</h5>
                    </Link>
                    <div className = 'button_fav_product' onClick = {AddFavoriteProduct}>
                        <IconButton>
                            <StarIcon className={fav.status === false ? 'icon_fav' : 'icon_fav_select'}/>
                        </IconButton>
                    </div>       
                
                {/* {
                    !user.id ? null : <button
                    className = 'button_fav_product'
                    onClick = {AddFavoriteProduct}
                    ><img className = 'img_fav_product' src={fav.status === false ? IMG_FAV_1 : IMG_FAV_2}/></button>
                } */}
                </div>
            </div>
        </>
    )
};
