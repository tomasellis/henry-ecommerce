import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//import actions
import { addFavorite } from "../../../actions";

//import css
import './card.css'

export default function Card({name,price,image,id,product_id}){

    const[fav,  setFav] = useState({
        status: false,
        id : []
    })    
    const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium';


    const IMG_FAV_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABF0lEQVRIieWUUbGDMBBFjwQkIKESkIAEJNRB46DPQZHwHBQHxEErAQf0I5thSYCQPvrxpndmP5K5uXez2Q18GyzQf0q8AUaJ5hMGnTK4Hy1eifAgMcreYWhF1EiMsncISqbSFBJ+XeYI1cAFuOFqfMd1jBdrFbdV+73i30SjXjIYN2IIsi2Z3mItIjRBthVwSl1bOBVuRpJt3OwhBShwpfE3TZ7TJtcd4v6dBvbdODLZysiXJUvc44ep99fw5A9D18nhxZYTtMI5v2OghwtcCXoJX45aOF2ueCUHrawNcZ9fmE91EYps4cw0pXqaTWDWAw/SpYzwG2RrmXfJiflgZX9++hswGzyjeI8cA0uc9Rr8bWyK+D/xApb0gEHaryczAAAAAElFTkSuQmCC";
    const IMG_FAV_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAzUlEQVRIieWUUQ2DMBRFj4RJQAISKgEJlYCDIWEOQMIcgAPqYBbqgH3QJgVayIPysewm9wfKOeWlAP8WA4x3wTUwueo7BEMg6HPDVQD3VTkFXUTQ5YIXEbhvIQFVwBNomWfcM5+YFNx3DNa3jlHFBEcgaTfRGeE6NaarErsHvyqxQHkEPysRwX1eAoGSwmH5azhqfUYgGdEghSuhYAIeEkGdgDSusXvRrzeV9+phw/KUlO5auKaTCOxq16k0wbqPRGDY7joV/zZGIvidfAFZlMauIVsaSQAAAABJRU5ErkJggg==";

    const dispatch = useDispatch();
    const user = useSelector((state : any) => state.user)
    const favIcon = useSelector((state : any) => state.favoriteProducts.id)

    const AddFavoriteProduct = (e) => {
        e.preventDefault();
        setFav({
             ...fav,
                status: true
        })
        dispatch(addFavorite({
        user_id : user.id,
        product_id : product_id
        })); 
    }
    console.log('favIcon',favIcon);

    
    
    return(
        <>
        <div className = 'cards_container_products'>

            <div className = 'div_container_card_product'>
                <div className = 'div_card_product'>
                <Link to = {`/clothing/${id}`}>
                    <img className = 'img_product' src={image.includes('http')? image : IMG }alt="" />
                    <h3 className = 'card_name_product'>{name}</h3>
                    <h5 className = 'card_desc_product'><b>{price}</b></h5>
                </Link>
                <button
                className = 'button_fav_product'
                onClick = {AddFavoriteProduct}
                ><img className = 'img_fav_product' src={null ? IMG_FAV_1 : IMG_FAV_2}/></button>
                
                </div>
            </div>
            {/* <div className = 'div_container_card_product'>
                <div className = 'div_card_product'>
                <Link to = '#'>
                    <img src="https://img.hollisterco.com/is/image/anf/KIC_328-1501-0041-279_prod1?policy=product-medium" alt="" />
                    <h3 className = 'card_name_product'>Short gastado clasico</h3>
                    <h5 className = 'card_desc_product'><b>$45.2</b></h5>
                </Link>
                </div>
            </div>
            <div className = 'div_container_card_product'>
                <div className = 'div_card_product'>
                <Link to = '#'>
                    <img src="https://img.hollisterco.com/is/image/anf/KIC_314-1000-0707-900_prod1?policy=product-medium" alt="" />
                    <h3 className = 'card_name_product'>Canzolcillos cortos clasicos</h3>
                    <h5 className = 'card_desc_product'><b>$45.2</b></h5>
                </Link>
                </div>
            </div>
            <div className = 'div_container_card_product'>
                <div className = 'div_card_product'>
                <Link to = '#'>
                    <img src="https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-210_prod1?policy=product-medium" alt="" />
                    <h3 className = 'card_name_product'>Camisa Oxford Elastizada de Corte Suelto</h3>
                    <h5 className = 'card_desc_product'><b>$45.2</b></h5>
                </Link>
                </div>
            </div>  */}
        </div>
        </>
    )
};
