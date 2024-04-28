    // src/testreact_frontend/components/cargaAlumnos.jsx

import React, { useState } from 'react';
import { TESTREACT_backend } from 'declarations/TESTREACT_backend'; // Asegúrate de que la ruta de importación es correcta.
import '../styles/cargaAlumnos.css'

function CargaAlumnos() {
  const [alumno, setAlumno] = useState({
    id: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    carrera: '',
    fecha_nacimiento: '',
    semestre: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlumno((prev) => ({
      ...prev,
      [name]: name === 'semestre' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convertir semestre a número entero antes de enviar.
    const alumnoToSend = {
      ...alumno,
      id: parseInt(alumno.id, 10),
      semestre: parseInt(alumno.semestre, 10)
    };
    // Validar que semestre es un número entero antes de intentar enviarlo.
    if (!Number.isNaN(alumnoToSend.semestre) && !Number.isNaN(alumnoToSend.id)) {
        try {
          const response = await TESTREACT_backend.sendAlumnoData(alumnoToSend);
          console.log('Respuesta del servidor:', response);
          // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito.
        } catch (error) {
          console.error('Error al enviar los datos del alumno:', error);
          // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario.
        }
      } else {
        console.error('El ID y el semestre deben ser números válidos.');
      }
    };
  
    return (
      <div>
        <h2>Cargar Nuevo Alumno</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="id"
            value={alumno.id}
            onChange={handleInputChange}
            placeholder="ID"
            required
          />
          <input
            name="nombre"
            value={alumno.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            required
          />
          <input
            name="apellido_paterno"
            value={alumno.apellido_paterno}
            onChange={handleInputChange}
            placeholder="Apellido Paterno"
            required
          />
          <input
            name="apellido_materno"
            value={alumno.apellido_materno}
            onChange={handleInputChange}
            placeholder="Apellido Materno"
            required
          />
          <input
            name="carrera"
            value={alumno.carrera}
            onChange={handleInputChange}
            placeholder="Carrera"
            required
          />
          <input
            type="date"
            name="fecha_nacimiento"
            value={alumno.fecha_nacimiento}
            onChange={handleInputChange}
            placeholder="Fecha de Nacimiento"
            required
          />
          <input
            type="number"
            name="semestre"
            value={alumno.semestre}
            onChange={handleInputChange}
            placeholder="Semestre"
            required
          />
          <button type="submit">Cargar Alumno</button>
        </form>
      </div>
    );
  }
  
  export default CargaAlumnos;