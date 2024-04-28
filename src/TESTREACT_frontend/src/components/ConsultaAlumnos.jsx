// src/testreact_frontend/components/ConsultaAlumnos.jsx

import { TESTREACT_backend } from 'declarations/TESTREACT_backend';
import React, { useState, useEffect } from 'react';
import '../styles/consultaAlumnos.css';

function ConsultaAlumnos() {
    const [alumnos, setAlumnos] = useState([]);
  
    useEffect(() => {
      const fetchAlumnosData = async () => {
        try {
          const response = await TESTREACT_backend.fetchAlumnosData();
          // Asumiendo que la respuesta es una cadena JSON en texto, la parseamos.
          const data = JSON.parse(response);
          if (data && Array.isArray(data.alumnos)) {
            setAlumnos(data.alumnos);
          } else {
            // Si data.alumnos no existe o no es un arreglo, muestra el contenido de data para depuración.
            console.error('El formato de los datos no es el esperado:', data);
          }
        } catch (error) {
          // Captura cualquier error en el proceso, incluyendo errores de parseo.
          console.error('Error al obtener los datos de los alumnos:', error);
        }
      };
    
      fetchAlumnosData();
    }, []);
    
  
    return (
        <div className="alumnos-table-container">
          <h1 className="table-heading">Listado de Alumnos</h1>
          <table className="alumnos-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Carrera</th>
                <th>Semestre</th>
                <th>Fecha de Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map(alumno => (
                <tr key={alumno.id}>
                  <td>{alumno.id}</td>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido_paterno}</td>
                  <td>{alumno.apellido_materno}</td>
                  <td>{alumno.carrera}</td>
                  <td>{alumno.semestre}</td>
                  <td>{alumno.fecha_nacimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
  
  export default ConsultaAlumnos;
  