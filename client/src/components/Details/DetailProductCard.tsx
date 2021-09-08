// import React from "react";
import "./DetailProductCard.css";
// import { useCookies } from 'react-cookie';
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';


export const DetailsProductCard = ({
    id,
    name,
    image_url,
    price,
    id_option,
    color,
    size,
    stock

}) => {

    const [cart, setCart] = useState({
        id_option: id_option,
        quantity: 1
    })
    console.log(setCart);

    // const [cookies, setCookie, removeCookie] = useCookies();
    const { user, isAuthenticated } = useAuth0()
    const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;
    console.log('user auth0', user); //temporal para evitar error eslint

    async function addToCart(id: string) { //el id del producto
        if (!isAuthenticated) {
            // if (!cookies || !cookies.user_id) setCookie('user_id', uuidv4())
            // await axios.post(`${BASE_URL}/addUserToDatabase`, {
            //     user_id: cookies.user_id
            // })

            if (localStorage.cartStorage) {
                let cartStorage: Array<Object> = JSON.parse(localStorage.cartStorage)
                cartStorage.push(cart)
                localStorage.cartStorage = (JSON.stringify(cartStorage))
            } else {
                localStorage.cartStorage = (JSON.stringify([cart]))
            }
        } else {
            let validId = await axios.get(`${BASE_URL}/verifyUserAuth0InDatabase?id_auth0=${user.sub}`)
            if (!validId.data.user_id) {
                validId  = await axios.post(`${BASE_URL}/addUserToDatabase`, {
                    auth0_id: user.sub,
                    email: user.email,
                    name: user.name
                })
            }
            console.log(validId, 'y', validId.data.user_id);


            const dataAddToCart = await axios.post(`${BASE_URL}/addToCart`, {
                user_id: validId.data.user_id,
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
                        <span>{color}</span>
                    </div>
                    <div className = 'div_size_product_details'>
                        <span>{size}</span>
                    </div>
                    <div className = 'div_stock_product_details'>
                        <span>Stock:</span><span> disponible </span>
                    </div>
                <div className="container__button-buy">
                    <button onClick = {e => addToCart(id)}>Agregar al carrito</button>
                </div>
            </div>
        </div>
    </div>
    )
}
