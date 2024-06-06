// src/testreact_frontend/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConsultaAlumnos from './components/ConsultaAlumnos';
import CargaAlumnos from './components/CargaAlumnos';
import Inicio from './components/Inicio';
import './styles/commonStyles.css'; 
import Login from './components/Login';


function Nav() {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-link">Inicio</Link> 
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Nav /> {/* Esto hará que el nav aparezca en todas las páginas */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/consultar" element={<ConsultaAlumnos />} />
        <Route path="/cargar" element={<CargaAlumnos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;