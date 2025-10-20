import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavContext } from '../context/NavContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useContext(AuthContext);
  const { navigate } = useContext(NavContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Usuario o contraseña incorrectos. Usa: admin / 1234');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <div className="login-form">
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="admin"
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="1234"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button onClick={handleSubmit} className="btn-primario">Ingresar</button>
        </div>
        <p className="login-hint">Credenciales de prueba: admin / 1234</p>
      </div>
    </div>
  );
}

export default Login;