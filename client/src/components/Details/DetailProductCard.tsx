import React from "react";
import "./DetailProductCard.css";
import { useCookies } from 'react-cookie';
import { useAuth0 } from '@auth0/auth0-react'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


export const DetailsProductCard = ({
    id,
    name,
    image_url,
    price,
    id_option

}) => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const { user, isAuthenticated } = useAuth0()
    const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;
    console.log(user); //temporal para evitar error eslint
    console.log(removeCookie);
    
    

    async function addToCart(id: string) { //el id del producto
        if (!isAuthenticated) {
            if (!cookies || !cookies.user_id) setCookie('user_id', uuidv4())
            await axios.post(`${BASE_URL}/addUserToDatabase`, {
                user_id: cookies.user_id
            })

            const dataAddToCart = await axios.post(`${BASE_URL}/addToCart`, {
                user_id: cookies.user_id,
                product_option_id: id_option,
                quantity: 1
            });
            
            if (!dataAddToCart.data.errors) alert('producto agregado al carrito') //recordatorio: agregar una tilde verde al lado del boton "agregar al carrito"
            else alert(dataAddToCart.data.errors)
        } 




    }




return (
    <div className="mainDetailCard" >
        <div className="mainDetailCard__container">
            <div className="container__img">
                <img src={image_url} width='200' alt="" className="container__card-img" />
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
                    <button onClick={() => addToCart(id)}
                    >Agregar al carrito</button>
                </div>
            </div>
        </div>
    </div>
)
}