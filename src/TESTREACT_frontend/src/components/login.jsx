// src/testreact_frontend/components/login.jsx


import React, { useState } from 'react';
import { canisterCRUD } from 'declarations/canisterCRUD';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        try {
            const principal = await canisterCRUD.whoami();
            console.log("Usuario actual:", principal);
            // Aquí puedes realizar acciones adicionales después de obtener el Principal
        } catch (error) {
            console.error("Error al obtener el usuario actual:", error);
        }
    }

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;

