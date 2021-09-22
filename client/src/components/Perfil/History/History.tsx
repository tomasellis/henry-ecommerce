import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setUserOrder } from '../../../actions';

import Card from "../../products/cards/card";

export default function History() {

    const stateHistory = useSelector((state: any) => state.stateHistory)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserOrder())
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