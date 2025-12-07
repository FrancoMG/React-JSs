import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavContext } from '../context/NavContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, isAuthenticated } = useContext(AuthContext);
  const { navigate } = useContext(NavContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('admin');
      } else {
        navigate('inicio'); // O a 'mis-pedidos'
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = login(email, password);
    if (resultado.success) {
      toast.success(`¡Bienvenido!`);
    } else {
      toast.error(resultado.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión | Curso ReactJS</title>
      </Helmet>
      <div className="container">
        <div className="login-container">
          <h2><FaSignInAlt /> Iniciar Sesión</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label><FaUser /> Email / Usuario:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="admin o tu email"
              />
            </div>
            <div className="form-group">
              <label><FaLock /> Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="****"
              />
            </div>
            <button type="submit" className="btn-primario">
              <FaSignInAlt /> Ingresar (admin / 1234)
            </button>
          </form>
          
          {/* Opción para registrarse */}
          <div style={{textAlign: 'center', marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem'}}>
            <p style={{color: '#7f8c8d'}}>¿No tienes una cuenta?</p>
            <button 
              onClick={() => navigate('registro')} 
              className="btn-secundario" 
              style={{marginTop: '0.5rem', width: '100%'}}
            >
              Crea una cuenta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;