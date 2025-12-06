import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavContext } from '../context/NavContext';
import { useProducts } from '../context/ProductsContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { FaPlus, FaEdit, FaTrash, FaBoxOpen } from 'react-icons/fa';
import FormularioProducto from '../components/FormularioProducto';
import ModalConfirmacion from '../components/ModalConfirmacion';

function AdminProductos() {
  const { isAuthenticated } = useContext(AuthContext);
  const { navigate } = useContext(NavContext);
  const { productos, cargando, agregarProducto, editarProducto, eliminarProducto } = useProducts();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState('agregar');
  const [productoEditando, setProductoEditando] = useState(null);
  const [modalEliminar, setModalEliminar] = useState({ isOpen: false, productoId: null, productoNombre: '' });

  // Protección de ruta
  if (!isAuthenticated) {
    navigate('login');
    return null;
  }

  const handleAgregar = () => {
    setModoFormulario('agregar');
    setProductoEditando(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (producto) => {
    setModoFormulario('editar');
    setProductoEditando(producto);
    setMostrarFormulario(true);
  };

  const handleSubmitFormulario = async (producto) => {
    let resultado;
    
    if (modoFormulario === 'agregar') {
      resultado = await agregarProducto(producto);
      if (resultado.success) {
        toast.success('✅ Producto agregado correctamente', {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } else {
      resultado = await editarProducto(productoEditando.id, producto);
      if (resultado.success) {
        toast.success('✅ Producto actualizado correctamente', {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }

    if (resultado.success) {
      setMostrarFormulario(false);
      setProductoEditando(null);
    } else {
      toast.error(`❌ ${resultado.message}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
  };

  const abrirModalEliminar = (id, nombre) => {
    setModalEliminar({ isOpen: true, productoId: id, productoNombre: nombre });
  };

  const cerrarModalEliminar = () => {
    setModalEliminar({ isOpen: false, productoId: null, productoNombre: '' });
  };

  const confirmarEliminar = async () => {
    const resultado = await eliminarProducto(modalEliminar.productoId);
    if (resultado.success) {
      toast.success(`🗑️ ${modalEliminar.productoNombre} eliminado correctamente`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      toast.error(`❌ ${resultado.message}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
    cerrarModalEliminar();
  };

  if (cargando) {
    return <div className="mensaje">Cargando productos...</div>;
  }

  return (
    <>
      <Helmet> {/* ⬅️ NUEVO */}
        <title>Gestión de Productos | Admin</title>
        <meta name="description" content="Panel de administración para gestionar el catálogo de productos." />
      </Helmet>
      <div className="container">
        <h2 className="seccion-titulo">
          <FaBoxOpen /> Administración de Productos
        </h2>

        <div className="admin-actions">
          <button onClick={handleAgregar} className="btn-primario">
            <FaPlus /> Agregar Nuevo Producto
          </button>
        </div>

        {mostrarFormulario && (
          <div className="formulario-overlay">
            <FormularioProducto
              productoInicial={productoEditando}
              onSubmit={handleSubmitFormulario}
              onCancelar={handleCancelarFormulario}
              modo={modoFormulario}
            />
          </div>
        )}

        <div className="admin-productos-lista">
          {productos.length === 0 ? (
            <p className="mensaje">No hay productos disponibles</p>
          ) : (
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <img src={producto.image} alt={producto.name} className="tabla-imagen" />
                    </td>
                    <td>{producto.name}</td>
                    <td>${producto.price}</td>
                    <td>{producto.category}</td>
                    <td>
                      <button 
                        onClick={() => handleEditar(producto)} 
                        className="btn-secundario btn-small"
                      >
                        <FaEdit /> Editar
                      </button>
                      <button 
                        onClick={() => abrirModalEliminar(producto.id, producto.name)} 
                        className="btn-eliminar btn-small"
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <ModalConfirmacion
          isOpen={modalEliminar.isOpen}
          onConfirm={confirmarEliminar}
          onCancel={cerrarModalEliminar}
          mensaje={`¿Estás seguro de que deseas eliminar "${modalEliminar.productoNombre}"? Esta acción no se puede deshacer.`}
        />
      </div>
    </>
  );
}

export default AdminProductos;