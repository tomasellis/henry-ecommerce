import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setUserOrder } from '../../../actions';


import CardHistory from './CardHistory';

export default function History() {
    const { user } = useAuth0()
    const state = useSelector((state: any) => state)
    const dispatch = useDispatch()
    const userId = state.user.id
    useEffect(() => {
        dispatch(setUserOrder("3a8c1709-1000-4338-ac76-9d36d81b9c83"))
    },[])
    console.log(state.storeHistory,"eeeeeee")
    
    return(
        <div>
            {  
                state.storeHistory[0]?.orders?.map((e,i) => {
                    if(e.status === "approved"){
                        <div className = 'historial' key={i}>
                        <CardHistory
                        name = {e.name}
                        id = {e.orders_products.id}
                        unit_price = {e.orders_products[0].unit_price}
                        quantity = {e.orders_products[0].quantity}
                        image_url = {e.orders_products[0].products_option.product.image_url}
                        />
                        </div>
                    }
                    else {
                        <h3>Made no purchase</h3>
                    }
                })
            }
        </div>
    )

}