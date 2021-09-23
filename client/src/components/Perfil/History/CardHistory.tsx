import React from 'react'
/* import { Link } from "react-router-dom"; */
import "./CardHistory.css"


export default function CardHistory({id,name,unit_price,quantity,image_url}) {
    /* const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium'; */

    return (
        <>
            <div className = 'div_container_card_product'>
                <div className = 'div_card_product'>
                    {/* <Link to = {`/clothing/${id}`}> */}
                        <img className = 'img_product' src={image_url} alt="" />
                        <h3 className = 'card_name_product'>{name}</h3>
                        <h5 className = 'titulito'>$ {unit_price}</h5>
                        <h5 className = 'titulito'> Quantity: {quantity}</h5>
                   {/*  </Link>  */}
                </div>
            </div>
        </>
    )
}