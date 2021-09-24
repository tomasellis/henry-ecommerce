import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//import actions
import { getFavProduct, deleteFavProduct } from "../../../actions";

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

export default function CardFAv({favProductsId}){
    console.log('primero', favProductsId[0]?.users_by_pk?.favourites?.length);
    
    
    const dispatch = useDispatch();
    useEffect(() => {
        if(favProductsId[0]?.users_by_pk?.favourites?.length > 0){
            favProductsId[0]?.users_by_pk?.favourites?.map(e => {                         
                dispatch(getFavProduct(e.product_id)); 
            })
        }
        }, [])
    let favoritesProducts = useSelector((state : any) => state.favoriteProducts.products);
    console.log('aaaaaaaaaa',favoritesProducts);
    
    let arrayUnico = removeDuplicates(favoritesProducts, 'image_url');
    favoritesProducts = arrayUnico;
    
        const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium';
        const IMG_FAV_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAzUlEQVRIieWUUQ2DMBRFj4RJQAISKgEJlYCDIWEOQMIcgAPqYBbqgH3QJgVayIPysewm9wfKOeWlAP8WA4x3wTUwueo7BEMg6HPDVQD3VTkFXUTQ5YIXEbhvIQFVwBNomWfcM5+YFNx3DNa3jlHFBEcgaTfRGeE6NaarErsHvyqxQHkEPysRwX1eAoGSwmH5azhqfUYgGdEghSuhYAIeEkGdgDSusXvRrzeV9+phw/KUlO5auKaTCOxq16k0wbqPRGDY7joV/zZGIvidfAFZlMauIVsaSQAAAABJRU5ErkJggg==";
                
    const handleDeletle = (e) => {       
        let deleteId = favProductsId[0]?.users_by_pk?.favourites?.filter(i => i.product_id === e.id);console.log('asaaaaa',deleteId);
                arrayUnico = arrayUnico.filter(i => {
           return i.id !== e.id 
        })
        console.log('eeeee', favProductsId);
        console.log(favoritesProducts, arrayUnico);
        
        dispatch(deleteFavProduct({favorite_id : deleteId[0]?.id}));
    }

    return(
        <>
        <div className = 'divqencierratodo'>
         <div className = 'div_fav_products'> 
            { arrayUnico.length < 1 ? <h4 className = 'h1_vacio_fav'>Add products to your favorites...</h4> : 
                arrayUnico?.map(e => {                                        
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