import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

export default function Search() {

  return (
    <InputCtn>
      <input
        id='search-bar'
        type="text"
        name="name"
        autoComplete="off"
        placeholder='Search...'
        className='input '
      >
      </input>
      <div>
        <IconButton>
          <SearchIcon className='icon'/>
        </IconButton>
      </div>
    </InputCtn>
  )
}

const InputCtn = styled.div`
  display: flex;
  align-items: center;

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