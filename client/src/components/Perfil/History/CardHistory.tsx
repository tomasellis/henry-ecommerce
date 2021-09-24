import { Link } from 'react-router-dom'
/* import { Link } from "react-router-dom"; */
import "./CardHistory.css"


export default function CardHistory({ id, name, unit_price, quantity, image_url, date, id_product_general }) {
    /* const IMG = 'https://img.hollisterco.com/is/image/anf/KIC_325-1470-0615-320_prod1?policy=product-medium'; */

    return (
        <>
            <div className='div_container_card_product_history'>
                <div className='div_card_product'>
                    <Link to={`/clothing/details/${id_product_general}`}>
                        <img className='img_product_history' src={image_url} alt="" />
                        <h3 className='card_name_product_history'>{name}</h3>
                        <h5 className='titulito'>$ {unit_price}</h5>
                        <h5 className='titulito'> Quantity: {quantity}</h5>
                        <h5 className='titulito'> {date.slice(0, 10)}</h5>
                    </Link>
                </div>
            </div>
        </>
    )
}