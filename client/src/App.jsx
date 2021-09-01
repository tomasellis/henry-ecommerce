import { Route } from "react-router-dom"
import NavBar from './components/NavBar';
import Home from './components/Home';
import './App.css';
import Login from "./components/Login";
import Carrito from "./components/Carrito";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/carrito" exact component={Carrito} />
      <Route path="/profile" exact component={Profile} />

    </div>
  );
}

export default App;