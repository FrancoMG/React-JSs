import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavContext } from '../context/NavContext';
import { Helmet } from 'react-helmet-async';
import { FaUsers, FaBoxOpen, FaSignOutAlt, FaUserShield } from 'react-icons/fa';

function Admin() {
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const { navigate } = useContext(NavContext);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'admin') return null;

  return (
    <>
      <Helmet>
        <title>Panel de Administración | Curso ReactJS</title>
      </Helmet>
      
      <div className="container">
        <h2 className="seccion-titulo"><FaUserShield /> Panel de Administración</h2>
        
        <div className="mensaje" style={{textAlign: 'left', marginBottom: '2rem', borderLeft: '4px solid #3498db'}}>
            <h3>Hola, {user?.nombre || 'Administrador'}</h3>
            <p>Selecciona una opción para gestionar tu tienda.</p>
        </div>

        <div className="admin-panel">
          
          {/* Tarjeta 1: Gestión de Usuarios */}
          <div className="admin-card">
            <h3><FaUsers /> Usuarios</h3>
            <p>Ver lista de clientes registrados</p>
            <button 
              onClick={() => navigate('admin-usuarios')} 
              className="btn-primario"
              style={{width: '100%', marginTop: '10px', backgroundColor: '#9b59b6'}}
            >
              Gestionar Usuarios
            </button>
          </div>
          
          {/* Tarjeta 2: Gestión de Productos */}
          <div className="admin-card">
            <h3><FaBoxOpen /> Catálogo</h3>
            <p>Agregar, editar o eliminar productos</p>
            <button 
              onClick={() => navigate('admin-productos')} 
              className="btn-primario"
              style={{width: '100%', marginTop: '10px'}}
            >
              Gestionar Productos
            </button>
          </div>
          
          {/* Tarjeta 3: Sesión */}
          <div className="admin-card">
            <h3>Sesión</h3>
            <p>Cerrar sesión activa</p>
            <button 
                onClick={() => { logout(); navigate('inicio'); }} 
                className="btn-eliminar"
                style={{width: '100%', marginTop: '10px'}}
            >
              <FaSignOutAlt /> Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;