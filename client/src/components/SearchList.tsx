import React from 'react';
import styled from 'styled-components'
import { useSelector} from 'react-redux';
import {Link} from "react-router-dom";

const SearchList = () => {
    const busqueda = useSelector((state : any) => state.searchArticles);
    return (
        <List>
            {
                busqueda.length > 0 && busqueda.map((item:any, index:number) => {
                    console.log(busqueda)
                    return (
                            <Link to = {`/clothing/details/${item.id}`}>        
                            <div className='listItem' key={index}>
                                <p>{item.name}</p>
                                <img src={item.image_url} alt='img'/>
                            </div>
                            </Link>
                    )
                })
            
            }
        </List>
    )
}

export default SearchList;

const List = styled.div` 
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 19px;
    display: flex;
    flex-direction: column;
    position: absolute;
    background: rgb(255, 255, 255);
    max-width: 245px;
    color: rgb(0,0,0);
    border-radius: 5px;
    z-index: 99999;
    /* margin-right: 20px; */
    a{
        text-decoration: none;
        color: rgb(0,0,0);
    }
    .listItem{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2px;
        margin-left: 5px;
        margin-right: 5px;
        img{
            margin-left: 10px;
            width: 70px;
            height: 70px;
        }
        img:hover{
            transform: scale(1.1); 
            border-radius: 50%;
        }
    }
    .listItem:hover{
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
        
    }
    
`
