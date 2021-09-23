import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setUserOrder } from '../../../actions';
import CardHistory from './CardHistory';
import "./CardHistory.css"



export default function History() {
    const { user } = useAuth0()
    const state = useSelector((state: any) => state)
    const dispatch = useDispatch()
    const userId = state.user.id
    useEffect(() => {
        dispatch(setUserOrder(userId))
    },[])
    console.log(state.storeHistory,"eeeeeee")
    
    return(
        <div className="div_cards">
            {  
                state.storeHistory[0]?.orders?.map((e) => {
                        return(
                            <div key={e.id}>
                                <CardHistory
                                id = {e.orders_products[0].id}
                                image_url = {e.orders_products[0].products_option.product.image_url} 
                                name = {e.orders_products[0].products_option.product.name}
                                unit_price = {e.orders_products[0].unit_price}
                                quantity = {e.orders_products[0].quantity}
                                />
                            </div>
                            )
                })
            }
        </div>
    )

}