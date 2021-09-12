// import React from "react";
import "./DetailProductCard.css";
// import { useCookies } from 'react-cookie';
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addToCartStorage } from "../../actions";

type Product = {
    id_option: string
}

interface RootState {
    cart: Array<Product>,
    idsInCart: string
}


export const DetailsProductCard = ({
    id,
    name,
    image_url,
    price,
    product_options
}) => {

    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)

    function createOptions (array : {color:string, size:string, stock:number, id:string}[]) {
      let options = [];
      for (let i=0; i< array.length; i++) {
        let object = {
          color: array[i].color,
          options:[{
            size: array[i].size,
            stock: array[i].stock
          }]
        }
        const length = options.length
        for (let j=0; j< length; j++) {
          if (options[j]['color'] === object['color']){
            options[j].options=options[j].options.concat(object.options)
          } else if (j === length-1) {
            options.push(object)
          }
        }
        if(length===0) options.push(object)
      }
      return options;
    }

    let opciones = createOptions(product_options)

    const [productDetail, setProductDetail] = useState<object>({
        id,
        name,
        image_url,
        price,
        product_options,
        color:opciones[0].color,
        size:opciones[0].options[0].size,
        quantity: 1,
    })


    useEffect(() => {
      console.log(typeof(opciones[0].color))
        return () => {
            //limpiar el componente
        };
        // eslint-disable-next-line
    }, [productDetail])


    const { user, isAuthenticated } = useAuth0()
    const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;
    console.log('user auth0', user); //temporal para evitar error eslint


    async function addToCart(id: string) { //el id del producto
        if (!isAuthenticated) {
            const existProductInCartRedux = state.cart.some(product => product[id] === productDetail[id])
            if (existProductInCartRedux) alert('Product already in cart!')
            else dispatch(addToCartStorage(productDetail))

        } else {
            let validId = await axios.get(`${BASE_URL}/verifyUserAuth0InDatabase?id_auth0=${user.sub}`)
            if (!validId.data.user_id) {
                validId = await axios.post(`${BASE_URL}/addUserToDatabase`, {
                    auth0_id: user.sub,
                    email: user.email,
                    name: user.name
                })
            }

            const dataAddToCart = await axios.post(`${BASE_URL}/addToCart`, {
                user_id: validId.data.user_id,
                product_option_id: id,
                quantity: 1
            });
            if (!dataAddToCart.data.errors) alert('Product added to cart!') //recordatorio: agregar una tilde verde al lado del boton "agregar al carrito"
            else alert(dataAddToCart.data.errors);
        };
    }

    function onChange (e){
        setProductDetail ({
        productDetail,
        [e.target.name] : e.target.value
      })
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
                    <div className='div_price_product_details'>
                        <span className='price_product_details'> ${price}</span>
                    </div>
                    <form>
                     <div className='div_color_product_details'>
                        {opciones.map((opcion) => {return(<label>
                          {opcion.color}
                          <input
                          type="radio"
                          name="color"
                          checked={productDetail['color']===opcion.color}
                          value={opcion.color}
                          onChange={e => onChange(e)}
                          />
                          </label>)
                        })
                      }
                     </div>
                     <div className='div_size_product_details'>
                        {opciones.filter(obj => obj.color===productDetail['color'])[0].options.map((option) => {
                          return( <label>
                            {option.size}
                            <input
                            type="radio"
                            name="size"
                            checked={productDetail['size']===option.size}
                            value= {option.size}
                            onChange={e => onChange(e)}
                             />
                          </label>)
                        })}
                     </div>
                    </form>
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
