import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import { NavContext } from '../context/NavContext';

function Navbar() {
  const { carrito } = useContext(CarritoContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { navigate, currentPage } = useContext(NavContext);
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    navigate('inicio');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div onClick={() => navigate('inicio')} className="nav-brand">
          Curso ReactJS
        </div>
        <div className="nav-links">
          <span 
            onClick={() => navigate('inicio')} 
            className={`nav-link ${currentPage === 'inicio' ? 'active' : ''}`}
          >
            Inicio
          </span>
          <span 
            onClick={() => navigate('productos')} 
            className={`nav-link ${currentPage === 'productos' ? 'active' : ''}`}
          >
            Productos
          </span>
          <span 
            onClick={() => navigate('carrito')} 
            className={`nav-link ${currentPage === 'carrito' ? 'active' : ''}`}
          >
            Carrito ({totalItems})
          </span>
          {isAuthenticated ? (
            <>
              <span 
                onClick={() => navigate('admin')} 
                className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`}
              >
                Admin
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <span 
              onClick={() => navigate('login')} 
              className={`nav-link ${currentPage === 'login' ? 'active' : ''}`}
            >
              Login
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;