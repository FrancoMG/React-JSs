import React, { useContext, useEffect } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import { NavContext } from '../context/NavContext';

function Admin() {
  const { carrito } = useContext(CarritoContext);
  const { logout, isAuthenticated } = useContext(AuthContext);
  const { navigate } = useContext(NavContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container">
      <h2 className="seccion-titulo">Panel de Administración</h2>
      <div className="admin-panel">
        <div className="admin-card">
          <h3>Estadísticas</h3>
          <p>Total de productos en carrito: {carrito.length}</p>
          <p>Items totales: {carrito.reduce((total, item) => total + item.cantidad, 0)}</p>
        </div>
        <div className="admin-card">
          <h3>Gestión</h3>
          <p>Panel de administración de la tienda</p>
          <button onClick={logout} className="btn-primario">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;