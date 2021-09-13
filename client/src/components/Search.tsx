/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { searchArticles } from '../actions/searchArticles/searchArticles';  

import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import { getCombinedModifierFlags } from 'typescript';


export default function Search(): JSX.Element {
  const dispatch = useDispatch();
  const [search, setSearch]  = useState<string>('');
  // const busqueda = useSelector((state : any) => state.searchArticles);
  
  // useEffect(() => {

    
    
  // },[busqueda,dispatch])
  
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(searchArticles(search))
    
  }
  
  
  
  const handleSubmit = (e : React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(search !== ''){
      
      console.log(`funciona ${search.toLowerCase()}`)

      // setTimeout(() => {
      //   dispatch(searchArticles(search))
      // },1000)
    
    }else{
      alert('Ingrese algo por favor...')
    }    
  }


  return (
    
    <InputCtn onSubmit={e => handleSubmit(e)}>
      
        <input
          id='search-bar'
          type="text"
          name="name"
          autoComplete="off"
          placeholder='Buscar...'
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
`

