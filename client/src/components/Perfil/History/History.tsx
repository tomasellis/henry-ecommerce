import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setUserOrder } from '../../../actions';

import Card from "../../products/cards/card";

export default function History() {
    const { user } = useAuth0()
    const stateHistory = useSelector((state: any) => state.stateHistory)
    const dispatch = useDispatch()
    const userId = user.auth0_id
    useEffect(() => {
        dispatch(setUserOrder(userId))
    },[])

    
    return(
        <div>
            {
                stateHistory?.map((e) => {
                    <Card
                    name = {e.name}
                    price = {e.price}
                    image = {e.image}
                    id = {e.id}
                    />
                })
            }
        </div>
    )

}