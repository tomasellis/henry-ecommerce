import Cart from "./Cart";
import CartLocalStorage from "./CartLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const PrevCart = () => {
  const { user, isAuthenticated } = useAuth0();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(!auth);
    return () => {};
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return isAuthenticated ? <Cart user={user} /> : <CartLocalStorage />;
};

export default PrevCart;
