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
        placeholder='Search'
        clasName='input '
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
    border: none;
    outline: 0px;
    background: rgba(240,240,240,0.5);
    width: 155px;
    border-radius: 10px;
    font-size: 18px;
    text-align: center;
  }
  input::placeholder {
    text-align: center;
    color: #000;
  }
  
  .icon{
    color: #000;
  }

`