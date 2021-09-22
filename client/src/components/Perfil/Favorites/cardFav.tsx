import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//import actions
import { getFavProduct } from "../../../actions";

export default function CardFAv({favProductsId}){
    console.log('aaaaaaaaaa', favProductsId);
    
    const dispatch = useDispatch();
    useEffect(() => {
        favProductsId[0]?.users_by_pk?.favourites?.map(e => {
            console.log('soyeeee',e.product_id);
            
           dispatch(getFavProduct(e.product_id)); 
        })
    }, [])
    const favoritesProducts = useSelector((state : any) => state.favoriteProducts.products);
    // favoritesProducts.map(e => {
        //     console.log(e);
        
        // })
        
        
        const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium';
        const IMG_FAV_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAzUlEQVRIieWUUQ2DMBRFj4RJQAISKgEJlYCDIWEOQMIcgAPqYBbqgH3QJgVayIPysewm9wfKOeWlAP8WA4x3wTUwueo7BEMg6HPDVQD3VTkFXUTQ5YIXEbhvIQFVwBNomWfcM5+YFNx3DNa3jlHFBEcgaTfRGeE6NaarErsHvyqxQHkEPysRwX1eAoGSwmH5azhqfUYgGdEghSuhYAIeEkGdgDSusXvRrzeV9+phw/KUlO5auKaTCOxq16k0wbqPRGDY7joV/zZGIvidfAFZlMauIVsaSQAAAABJRU5ErkJggg==";
        
        const productsFavsUnicos = favoritesProducts.filter((value, index) => {
            return favoritesProducts.indexOf(value) === index;
        });
        
        console.log('soyaaaaaaaaaa',productsFavsUnicos);
        
    const handleDeletle = (e) => {
        
    }

    return(
        <>
        <div className = 'divqencierratodo'>
         <div className = 'div_fav_products'> 
            {
                favoritesProducts?.map(e => {
                    return(
                        <div className = 'cards_container_products_fav'>
                            <div className = 'div_container_card_product_fav'>
                                <div className = 'div_card_product_fav'>
                                <Link to = {`/clothing/${e.id}`}>
                                    <img className = 'img_product_fav' src={e.image_url.includes('http')? e.image_url : IMG }alt="" />
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
}