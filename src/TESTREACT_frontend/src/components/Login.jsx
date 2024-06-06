import React, { useState, useEffect } from 'react';
import { canisterCRUD } from 'declarations/canisterCRUD';



const Login = () => {

    const [areas, setAreas] = useState([]);
    const [nuevaArea, setNuevaArea] = useState('');
    const [carreras, setCarreras] = useState([]);
    const [nuevaCarrera, setNuevaCarrera] = useState('');
    const [alumnos, setAlumnos] = useState([]);
    const [nuevoNombreAlumno, setNuevoNombreAlumno] = useState('');
    const [nuevoPrimerAp, setNuevoPrimerAp] = useState('');
    const [nuevoSegundoAp, setNuevoSegundoAp] = useState('');
    const [nuevaMatricula, setNuevaMatricula] = useState('');
    const [nuevaFechaNacimiento, setNuevaFechaNacimiento] = useState('');
    const [nuevaCurp, setNuevaCurp] = useState('');
    const [idCarrera, setIdCarrera] = useState('');
    const [semestre, setSemestre] = useState('');
    const [sexo, setSexo] = useState('');
    const [principal, setPrincipal] = useState('');

    useEffect(() => {
        obtenerAreas();
        obtenerCarreras();
        obtenerAlumnos();
    }, []);


  


    const obtenerAreas = async () => {
        try {
            const areasObtenidas = await canisterCRUD.obtieneAreas();
            setAreas(areasObtenidas);
        } catch (e) {
            console.error("Error al obtener áreas", e);
        }
    };

    const agregarArea = async () => {
        try {
            await canisterCRUD.crearArea(nuevaArea);
            setNuevaArea('');
            obtenerAreas();
        } catch (e) {
            console.error("Error al agregar área", e);
        }
    };

    const eliminarArea = async (id) => {
        try {
            await canisterCRUD.eliminarArea(id);
            obtenerAreas();
        } catch (e) {
            console.error("Error al eliminar área", e);
        }
    };

    const obtenerCarreras = async () => {
        try {
            const carrerasObtenidas = await canisterCRUD.obtieneCarreras();
            setCarreras(carrerasObtenidas);
        } catch (e) {
            console.error("Error al obtener carreras", e);
        }
    };

    const agregarCarrera = async () => {
        try {
            await canisterCRUD.crearCarrera(nuevaCarrera);
            setNuevaCarrera('');
            obtenerCarreras();
        } catch (e) {
            console.error("Error al agregar carrera", e);
        }
    };

    const eliminarCarrera = async (id) => {
        try {
            await canisterCRUD.eliminarCarrera(id);
            obtenerCarreras();
        } catch (e) {
            console.error("Error al eliminar carrera", e);
        }
    };

    const obtenerAlumnos = async () => {
        try {
            const alumnosObtenidos = await canisterCRUD.obtieneAlumnos();
            setAlumnos(alumnosObtenidos);
        } catch (e) {
            console.error("Error al obtener alumnos", e);
        }
    };

    const agregarAlumno = async () => {
        try {
            
            const idCarreraNumber = parseInt(idCarrera, 10);
            const numSemestre = parseInt(semestre, 10);
            await canisterCRUD.crearAlumno(nuevoNombreAlumno, nuevoPrimerAp, nuevoSegundoAp, nuevaMatricula, nuevaFechaNacimiento, nuevaCurp, idCarreraNumber, numSemestre, sexo, principal);
            setNuevoNombreAlumno('');
            setNuevoPrimerAp('');
            setNuevoSegundoAp('');
            setNuevaMatricula('');
            setNuevaFechaNacimiento('');
            setNuevaCurp('');
            setIdCarrera('');
            setSemestre('');
            setSexo('');
            setPrincipal('');
            obtenerAlumnos();
            console.log("Alumno agregado exitosamente");
        } catch (e) {
            console.error("Error al agregar Alumno ", e);
        }
    };

    const eliminarAlumno = async (id) => {
        try {
            await canisterCRUD.eliminarAlumno(id);
            obtenerAlumnos();
        } catch (e) {
            console.error("Error al eliminar alumno", e);
        }
    };

    return (
        <div>
            <h2>Áreas</h2>
            <ul>
                {areas.map((area) => (
                    <li key={area[0]}>
                        {area[1].nombre}
                        <button onClick={() => eliminarArea(area[0])}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={nuevaArea}
                onChange={(e) => setNuevaArea(e.target.value)}
            />
            <button onClick={agregarArea}>Agregar Área</button>

            <h2>Carreras</h2>
            <ul>
                {carreras.map((carrera) => (
                    <li key={carrera[0]}>
                        {carrera[1].nombre}
                        <button onClick={() => eliminarCarrera(carrera[0])}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={nuevaCarrera}
                onChange={(e) => setNuevaCarrera(e.target.value)}
            />
            <button onClick={agregarCarrera}>Agregar Carrera</button>

            {alumnos.length > 0 && (
                <>
                    <h2>Alumnos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Principal</th>
                                <th>Nombre</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Matrícula</th>
                                <th>Fecha de Nacimiento</th>
                                <th>CURP</th>
                                <th>ID Carrera</th>
                                <th>Semestre</th>
                                <th>Sexo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumnos.map((alumno) => (
                                <tr key={alumno[0]}>
                                    <td>{alumno[1].idAlumno}</td>
                                    <td>{alumno[1].nombre}</td>
                                    <td>{alumno[1].primerAp}</td>
                                    <td>{alumno[1].segundoAp}</td>
                                    <td>{alumno[1].matricula}</td>
                                    <td>{alumno[1].fechaNacimiento}</td>
                                    <td>{alumno[1].curp}</td>
                                    <td>{alumno[1].idCarrera}</td>
                                    <td>{alumno[1].semestre}</td>
                                    <td>{alumno[1].sexo}</td>
                                    <td>
                                        <button onClick={() => eliminarAlumno(alumno[0])}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            <h2>Agregar Alumno</h2>
            <label>Nombre:</label>
            <input
                type="text"
                value={nuevoNombreAlumno}
                onChange={(e) => setNuevoNombreAlumno(e.target.value)}
            />
            <br />
            <label>Primer Apellido:</label>
            <input
                type="text"
                value={nuevoPrimerAp}
                onChange={(e) => setNuevoPrimerAp(e.target.value)}
            />
            <br />
            <label>Segundo Apellido:</label>
            <input
                type="text"
                value={nuevoSegundoAp}
                onChange={(e) => setNuevoSegundoAp(e.target.value)}
            />
            <br />
            <label>Matrícula:</label>
            <input
                type="text"
                value={nuevaMatricula}
                onChange={(e) => setNuevaMatricula(e.target.value)}
            />
            <br />
            <label>Fecha de Nacimiento:</label>
            <input
                type="date"
                value={nuevaFechaNacimiento}
                onChange={(e) => setNuevaFechaNacimiento(e.target.value)}
            />
            <br />
            <label>CURP:</label>
            <input
                type="text"
                value={nuevaCurp}
                onChange={(e) => setNuevaCurp(e.target.value)}
            />
            <br />
            <label>ID Carrera:</label>
            <input
                type="text"
                value={idCarrera}
                onChange={(e) => setIdCarrera(e.target.value)}
            />
            <br />
            <label>Semestre:</label>
            <input
                type="number"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
            />
            <br />
            <label>Sexo:</label>
            <input
                type="text"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
            />
            <br />
          
            <button onClick={agregarAlumno}>Agregar Alumno</button>
        </div>
    );
};

export default Login;
