import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import { Auth0Provider } from "@auth0/auth0-react";
import { CookiesProvider } from 'react-cookie';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// import AlertTemplate from 'react-alert-template-mui'

const domain = process.env.REACT_APP_DOMAIN_AUTH0;
const clientId = process.env.REACT_APP_CLIENT_ID_AUTH0;

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 1000,
  offset: '10px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/loggedIn`}
    >
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    </Auth0Provider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
