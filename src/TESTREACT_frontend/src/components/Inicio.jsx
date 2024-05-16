// src/testreact_frontend/components/inicio.jsx
//requires
//npm i -S @connect2ic/core @connect2ic/react

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/inicioStyles.css'; // Esta es la ruta relativa correcta desde inicio.jsx a inicioStyles.css

//ic2connect
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react";
import { defaultProviders } from "@connect2ic/core/providers";
import { createClient } from "@connect2ic/core";
import "@connect2ic/core/style.css"

import * as counter from "../../../declarations/counter";

import LoginButton from './LoginButton';
import UserInfo from './UserInfo';

const client = createClient({
  canisters: {
    counter,
  },
  providers: defaultProviders,
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: import.meta.env.DEV,
  },
})



function Inicio() {
  return (
    <Connect2ICProvider client={client}>
    <div className="main-content">
      <div className="auth-section">
        <ConnectButton />
      </div>
      <ConnectDialog />
      <LoginButton/>
      <UserInfo/>

      <img src="./PLANTEC.png" alt="Logo" className="logo" />
      <div className="welcome-message">Bienvenidos a la Gestión de Alumnos</div>
      <Link to="/consultar" className="nav-link"><button className="button">Consultar Alumnos</button></Link>
      <Link to="/cargar" className="nav-link"><button className="button">Cargar Alumnos</button></Link>
      <Link to="/login" className="nav-link"><button className="button">Login</button></Link>

      
    </div>
    </Connect2ICProvider>
  );
}

export default Inicio;