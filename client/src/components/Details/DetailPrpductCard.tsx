import React from "react";
import  "./DetailProductCard.css";

export const DetailsProductCard = ({
    id,
    name,
    image_url,
    price

}) => { 
    return (
        <div className="mainDetailCard" >
            <div className="mainDetailCard__container">
                    <div className="container__img">
x                        <img src={image_url} width='200' alt="" className="container__card-img" />
                    </div>
                    <div className="container__card-content">
                        <div>
                            <h1>{name}</h1>
                            <div>
                                <span>Precio:</span><span> ${price}</span>
                            </div>

                            <div>
                                <span>Stock:</span><span> disponible </span>
                            </div>
                           
                        </div>
                        <div className="container__button-buy">
                            <button>Agregar al carrito</button>
                        </div>
                    </div>
            </div>
        </div>  
    )
}