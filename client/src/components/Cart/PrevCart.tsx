import Cart from "./Cart";
import CartLocalStorage from "./CartLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";

const PrevCart = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? <Cart user={user} /> : <CartLocalStorage />;
};

export default PrevCart;
