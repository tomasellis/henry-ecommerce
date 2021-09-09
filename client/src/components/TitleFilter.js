import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const TitleFilter = ({mob}) => {

    if(mob){
        return (
            <TitleCtn>
                <p>WOMEN</p>
                <p>MEN</p>
                <p>Kids</p>
            </TitleCtn>
        )
    }

    return (
        <TitleCtn>
            <div>
                 <Link to = '/clothing/women/0'>
                    <p>WOMEN</p>
                </Link>
                <Link to = '/clothing/men/0'>
                    <p>MEN</p>
                </Link>
                <Link to = '/clothing/kids/0'>
                    <p>KIDS</p>
                </Link>
            </div>
        </TitleCtn>
    )
}

const TitleCtn = styled.div`
    div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 170px;
    margin-right: 300px;
}
    a{
        text-decoration : none;
    }
    p{
        font-family: Poppins, sans-serif;
        margin-top: 20px;
        color: black;
        margin-left: 80px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }
`



export default TitleFilter
