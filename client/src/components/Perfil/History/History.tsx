import React, { useState } from 'react'
import { useSelector } from "react-redux"

import Card from "../../products/cards/card";

export default function History() {

    const stateHistory = useSelector((state: any) => state.stateHistory)

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