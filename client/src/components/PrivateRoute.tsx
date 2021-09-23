import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

type User = {
  role: string;
  id:string
};

interface RootState {
  user: User;
}

const PrivateRoute = (props) => {
  const { loginWithPopup } = useAuth0();
  const state = useSelector((state: RootState) => state);

  return state.user?.role?.toLowerCase() === 'admin' ? (
    <Route {...props} />
    ): <Redirect to='/' />
};

export default PrivateRoute