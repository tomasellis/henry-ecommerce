import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//import actions
import { favoriteProducts } from "../../../actions";

//import css
import './card.css'

import StarIcon from '@material-ui/icons/Star';

export default function Card({name,price,image,id}){

    const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium';

    const dispatch = useDispatch();

    const AddFavoriteProduct = (e) => {
        e.preventDefault();
        dispatch(favoriteProducts({
            name,
            price,
            image,
            id : id
        }));        
    }
    
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
                            <StarIcon className='icon_fav'/>
                        </IconButton>
                    </div>       
                </div>
            </div>
        </>
    )
};
