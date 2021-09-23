import React from 'react';
import styled from 'styled-components'
import { useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchArticles } from "../../actions/searchArticles/searchArticles";

const SearchList = () => {
    const busqueda = useSelector((state : any) => state.searchArticles);
    const dispatch = useDispatch()
    const DeleteDuplicate = (arr) => {
        const itemMap = arr.map(busqueda => {
            return [busqueda.name, busqueda]
        });
        return [...new Map(itemMap).values()];
    }
    let searchFilter = DeleteDuplicate(busqueda)
    
    function hacerClick(){
        dispatch(searchArticles(undefined))
    }
    
    return (
       <List>
           {
               // eslint-disable-next-line array-callback-return
               searchFilter !== []  && searchFilter.map((item:any, index:number) => {
                   return (
                       <Link to = {`/clothing/${item.id}`} key={index}>
                            <div className='listItem'  onClick={hacerClick}>
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
