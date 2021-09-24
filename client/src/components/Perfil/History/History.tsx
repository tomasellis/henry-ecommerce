import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setUserOrder } from '../../../actions';
import CardHistory from './CardHistory';
import Profile from '../Profile';

import "./CardHistory.css"


export default function History() {
    const state = useSelector((state: any) => state)
    const dispatch = useDispatch()
    const userId = state.user.id
    
    useEffect(() => {
        dispatch(setUserOrder(userId))
        //eslint-disable-next-line
    },[])
    
    return(
        <div className="div_cards">
            <div className = 'divqencierratodo'>
            <Profile />
            {  
                state.storeHistory.orders?.map((e) => {
                        return(
                            <div key={e.id}>
                                <CardHistory
                                id = {e.id}
                                image_url = {e.orders_products[0].products_option.product.image_url} 
                                name = {e.orders_products[0].products_option.product.name}
                                unit_price = {e.orders_products[0].unit_price}
                                quantity = {e.orders_products[0].quantity}
                                date = {e.created_at}
                                id_product_general = {e.orders_products[0].products_option.product_id}
                                />
                            </div>
                            )
                })
            }
            </div>
        </div>
    )

}