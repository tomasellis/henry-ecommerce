/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router";
import { searchArticles } from '../../actions/searchArticles/searchArticles';
import { getArticles } from "../../actions/products/productActions";
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import { getCombinedModifierFlags } from 'typescript';
import SearchList from "./SearchList";

export default function Search(): JSX.Element {
  const dispatch = useDispatch();
  const [search, setSearch]  = useState<string>('');
  // const busqueda = useSelector((state : any) => state.searchArticles);

 //useEffect(() => {



 //},[search,dispatch])


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(searchArticles(search));
  };


  const handleSubmit = (e : React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(search !== ''){
      window.location.replace(`http://localhost:3000/search?name=${search}`);//Cambiar URL.
      setSearch('')
      console.log(`funciona ${search.toLowerCase()}`)

      // setTimeout(() => {
      //   dispatch(searchArticles(search))
      // },1000)

    }else{
      alert('Please, write something...')
    }
  }


  return (
    <>
    <InputCtn onSubmit={e => handleSubmit(e)}>

        <input
          id='search-bar'
          type="text"
          name="name"
          autoComplete="off"
          placeholder='Search...'
          className='input'
          value={search}
          onChange = {e => handleChange(e)}
        >

        </input>
        <div onClick={e => handleSubmit(e)}>

          <IconButton>
            {/* <SearchIcon className='icon' /> */}
            <SearchIcon className='icon' />
          </IconButton>
        </div>
    </InputCtn>
    <SearchList/>
    </>
  )
}

const InputCtn = styled.form`
  display: flex;
  align-items: center;
  /* position: fixed; */

  input{
    font-family: 'Poppins', sans-serif;
    border: 1px solid black;
    padding: 5px;
    outline: 0px;
    width: 155px;
    border-radius: 30px;
    font-size: 18px;
    text-align: center;
  }
  input::placeholder {
    text-align: center;
    color: black;
  }

  .icon{
    color: rgba(0, 0, 0, 0.788);
  }
`;
