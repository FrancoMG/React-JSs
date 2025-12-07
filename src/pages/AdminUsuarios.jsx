import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavContext } from '../context/NavContext';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { FaUsers, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import ModalConfirmacion from '../components/ModalConfirmacion';
import FormularioUsuario from '../components/FormularioUsuario';

function AdminUsuarios() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { navigate } = useContext(NavContext);
  
  // Estados
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null); // Usuario seleccionado para editar
  const [modalEliminar, setModalEliminar] = useState({ isOpen: false, id: null, nombre: '' });

  // Cargar usuarios al inicio
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('login');
      return;
    }
    cargarUsuarios();
  }, [isAuthenticated, user, navigate]);

  const cargarUsuarios = () => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setUsuarios(usuariosGuardados);
  };

  // --- LÓGICA DE ELIMINACIÓN ---
  const confirmarEliminar = () => {
    const nuevosUsuarios = usuarios.filter(u => u.id !== modalEliminar.id);
    localStorage.setItem('registeredUsers', JSON.stringify(nuevosUsuarios));
    setUsuarios(nuevosUsuarios);
    toast.success(`Usuario ${modalEliminar.nombre} eliminado`);
    setModalEliminar({ isOpen: false, id: null, nombre: '' });
  };

  // --- LÓGICA DE EDICIÓN ---
  const handleGuardarEdicion = (usuarioActualizado) => {
    const nuevosUsuarios = usuarios.map(u => 
      u.id === usuarioActualizado.id ? usuarioActualizado : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(nuevosUsuarios));
    setUsuarios(nuevosUsuarios);
    setUsuarioEditando(null);
    toast.success('Usuario actualizado correctamente');
  };

  return (
    <>
      <Helmet>
        <title>Gestión de Usuarios | Admin</title>
      </Helmet>
      
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 className="seccion-titulo" style={{ marginBottom: 0 }}>
                <FaUsers /> Gestión de Usuarios
            </h2>
            <button onClick={() => navigate('admin')} className="btn-secundario">
                <FaArrowLeft /> Volver al Panel
            </button>
        </div>

        {usuarioEditando ? (
          <div className="formulario-overlay">
             <div style={{ background: 'white', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
                <FormularioUsuario 
                  usuarioInicial={usuarioEditando} 
                  onSubmit={handleGuardarEdicion}
                  onCancelar={() => setUsuarioEditando(null)}
                />
             </div>
          </div>
        ) : (
          <div className="admin-card">
            {usuarios.length === 0 ? (
              <div className="mensaje"><p>No hay usuarios registrados.</p></div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="tabla-productos">
                  <thead>
                    <tr>
                      <th>Nombre y Apellido</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Dirección</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.id}>
                        <td>{u.nombre} {u.apellido}</td>
                        <td>{u.email}</td>
                        <td>{u.telefono}</td>
                        <td>{u.direccion || '-'}</td>
                        <td style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            onClick={() => setUsuarioEditando(u)} 
                            className="btn-secundario btn-small"
                            title="Editar"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => setModalEliminar({ isOpen: true, id: u.id, nombre: u.nombre })} 
                            className="btn-eliminar btn-small"
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        <ModalConfirmacion
          isOpen={modalEliminar.isOpen}
          onConfirm={confirmarEliminar}
          onCancel={() => setModalEliminar({ isOpen: false, id: null, nombre: '' })}
          mensaje={`¿Estás seguro de eliminar al usuario ${modalEliminar.nombre}?`}
        />
      </div>
    </>
  );
}

export default AdminUsuarios;