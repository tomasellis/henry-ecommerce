import React from "react";
import  "./DetailProductCard.css";

export const DetailsProductCard = ({
    id,
    colors,
    size,
    name,
    image_url,
    price

}) => { 
    return (
        <div className="mainDetailCard" >
            <div className="mainDetailCard__container">
                    <div className="container__img">
                        <img src={image_url} width='100%' alt="" className="container__card-img" />
                    </div>
                    <div className="container__card-content">
                        <div className='div_name_product_details'>
                            <h1>{name}</h1>
                        </div>
                        <div className = 'div_price_product_details'>
                            <span className = 'price_product_details'> ${price}</span>
                        </div>
                        <div className = 'div_color_product_details'>
                            <span>{colors}</span>
                        </div>
                        <div className = 'div_size_product_details'>
                            <span>{size}</span>
                        </div>
                        <div className = 'div_stock_product_details'>
                            <span>Stock:</span><span> disponible </span>                           
                        </div>    
                    <div className="container__button-buy">
                        <button>Agregar al carrito</button>
                    </div>
                    </div>
            </div>
        </div>  
    )
}