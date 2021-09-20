import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';

//import actions
import { getProduct } from "../../../actions";

//import component
import Profile from "../Profile";

//import css
import './Favorites.css'

export default function Favorites(){

    let {user} = useAuth0();
    let favProducts = useSelector((state : any) => state.favoriteProducts);    
    
    const[fav, setFav] = useState({
        email : user?.email,
        product : [favProducts]
    });        
    
    const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium';
    
    const IMG_FAV_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAzUlEQVRIieWUUQ2DMBRFj4RJQAISKgEJlYCDIWEOQMIcgAPqYBbqgH3QJgVayIPysewm9wfKOeWlAP8WA4x3wTUwueo7BEMg6HPDVQD3VTkFXUTQ5YIXEbhvIQFVwBNomWfcM5+YFNx3DNa3jlHFBEcgaTfRGeE6NaarErsHvyqxQHkEPysRwX1eAoGSwmH5azhqfUYgGdEghSuhYAIeEkGdgDSusXvRrzeV9+phw/KUlO5auKaTCOxq16k0wbqPRGDY7joV/zZGIvidfAFZlMauIVsaSQAAAABJRU5ErkJggg==";
    
    const handleDeletle = (e) => {
        setFav({
            ...fav,
            product : [fav.product[0].filter(el => el.id !== e.id)]
        })
        favProducts = fav.product[0].filter(el => el.id !== e.id)        
    }

    return(
        <>
        <div className = 'divqencierratodo'>
        <Profile />
         <div className = 'div_fav_products'> 
            {
                fav.product[0]?.map(e => {
                    return(
                        <div className = 'cards_container_products_fav'>
                            <div className = 'div_container_card_product_fav'>
                                <div className = 'div_card_product_fav'>
                                <Link to = {`/clothing/${e.id}`}>
                                    <img className = 'img_product_fav' src={e.image.includes('http')? e.image : IMG }alt="" />
                                    <h3 className = 'card_name_product_fav'>{e.name}</h3>
                                    <h5 className = 'card_desc_product_fav'><b>{e.price}</b></h5>
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