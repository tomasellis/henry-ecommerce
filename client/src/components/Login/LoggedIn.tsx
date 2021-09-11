import {useAuth0} from '@auth0/auth0-react'
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default function LoggedIn() {
  const {user, isAuthenticated} = useAuth0()
  const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;
  const history = useHistory();

  (async () => {
    if(isAuthenticated){
      const dataUser = await axios.post(`${BASE_URL}/findOrCreateUserInDatabase`, {
        auth0_id: user.sub,
        email: user.email,
        name: user.name
    })
    const {data} = await axios.post(`${BASE_URL}/addLocalStorageToCart`, {
      cart:JSON.parse(localStorage.cartStorage), 
      user_id :dataUser.data.user_id
    })
      if(data.insert_carts_products){
        alert('se agregaron los productos de localstorage a la db (averiguar por que sale 2 veces el cartel. no afecta el funcionamiento...)')
        localStorage.cartStorage=[]
        localStorage.idsInCartStorage=[]
        history.push('/')
      } else alert('no se agregaron los productos de localstorage a la db')
    }
  })()

  return (
    <h1>Redireccionando al home...</h1>
  )
  
}