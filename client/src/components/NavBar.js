import logoTiendaRopa from '../logoTiendaRopa.png'
import { Link } from "react-router-dom";
import Search from "./Search";
import './NavBar.css'
import { useAuth0 } from '@auth0/auth0-react';


export default function NavBar() {
  const {user, isAuthenticated} = useAuth0()

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={logoTiendaRopa} height={100} alt="Algo bonito" />
      </Link>
      <Search />
      <nav>
        <ul className="list">
          <li className="list-item">
            {isAuthenticated? <Link to="/profile">{user.name}</Link> : <Link to="/login">Login</Link> }
          </li>
          <li className="list-item">
            <Link to="/carrito">Carrito</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}