import { Link } from "react-router-dom";

//import css
import './card.css'

export default function Card({name,price,image,id}){
    
    const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium';

    return(
        <>
        <div className = 'cards_container_products'>
            <div className = 'div_container_card_product'>
                <div className = 'div_card_product'>
                <Link to = {`/clothing/details/${id}`} style={{textDecoration:"none"}}>
                    <img src={image.includes('http')? image : IMG }alt="" />
                    <h3 className = 'card_name_product'>{name}</h3>
                    <h5 className = 'card_desc_product'><b>{price}</b></h5>
                </Link>
                </div>
            </div>  
        </div>
        </>
    )
};