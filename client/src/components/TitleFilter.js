import React from 'react';
import styled from 'styled-components';

const TitleFilter = ({mob}) => {

    if(mob){
        return (
            <TitleCtn>
                <p>MUJERES</p>
                <p>HOMBRES</p>
                <p>NIÑOS</p>
            </TitleCtn>
        )
    }

    return (
        <TitleCtn>
            <div>
                <p>MUJERES</p>
                <p>HOMBRES</p>
                <p>NIÑOS</p>    
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
    margin-right: 20px;
    }
    p{ 
        color: #000;
        margin-left: 10px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
    }
`



export default TitleFilter