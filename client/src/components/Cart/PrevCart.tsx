import Cart from "./Cart";
import CartLocalStorage from "./CartLocalStorage";
import { useAuth0 } from '@auth0/auth0-react'


export default function PrevCart(){
  const { isAuthenticated } = useAuth0()
  
  return isAuthenticated? <Cart /> : <CartLocalStorage />

}



