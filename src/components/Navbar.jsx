import React, { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import { NavContext } from '../context/NavContext';
import { FaHome, FaShoppingBag, FaShoppingCart, FaUserShield, FaSignInAlt, FaSignOutAlt, FaHistory } from 'react-icons/fa';

function Navbar() {
  const { carrito } = useContext(CarritoContext);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { navigate, currentPage } = useContext(NavContext);
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('inicio');
    setMenuAbierto(false);
  };

  const handleNavigate = (page) => {
    navigate(page);
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div onClick={() => handleNavigate('inicio')} className="nav-brand">
          Curso ReactJS
        </div>

        <div className="nav-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </div>

        <div className={`nav-links ${menuAbierto ? 'nav-links-open' : ''}`}>
          <span onClick={() => handleNavigate('inicio')} className={`nav-link ${currentPage === 'inicio' ? 'active' : ''}`}>
            <FaHome className="nav-icon" /> Inicio
          </span>
          <span onClick={() => handleNavigate('productos')} className={`nav-link ${currentPage === 'productos' ? 'active' : ''}`}>
            <FaShoppingBag className="nav-icon" /> Productos
          </span>
          <span onClick={() => handleNavigate('carrito')} className={`nav-link ${currentPage === 'carrito' ? 'active' : ''}`}>
            <FaShoppingCart className="nav-icon" /> Carrito ({totalItems})
          </span>

          {isAuthenticated ? (
            <>
              {/* Solo para Admin */}
              {user?.role === 'admin' && (
                <span onClick={() => handleNavigate('admin')} className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`}>
                  <FaUserShield className="nav-icon" /> Admin
                </span>
              )}

              {/* Solo para Clientes (o todos los logueados) */}
              {user?.role === 'user' && (
                <span onClick={() => handleNavigate('mis-pedidos')} className={`nav-link ${currentPage === 'mis-pedidos' ? 'active' : ''}`}>
                  <FaHistory className="nav-icon" /> Mis Pedidos
                </span>
              )}

              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px'}}>
                <span style={{color: '#3498db', fontSize: '0.9rem'}}>Hola, {user.nombre}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <FaSignOutAlt /> Salir
                </button>
              </div>
            </>
          ) : (
            <span onClick={() => handleNavigate('login')} className={`nav-link ${currentPage === 'login' ? 'active' : ''}`}>
              <FaSignInAlt className="nav-icon" /> Login
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;