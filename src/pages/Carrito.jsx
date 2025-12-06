import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { NavContext } from '../context/NavContext';
import { AuthContext } from '../context/AuthContext'; // Importamos Auth
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { FaShoppingCart, FaTrash, FaShoppingBag, FaCreditCard } from 'react-icons/fa';

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, totalCarrito } = useContext(CarritoContext);
  const { navigate } = useContext(NavContext);
  const { isAuthenticated, crearOrden } = useContext(AuthContext); // Traemos función crearOrden

  const handleEliminar = (id, nombre) => {
    eliminarDelCarrito(id);
    toast.info(`${nombre} eliminado`, { autoClose: 1000 });
  };

  const handleVaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      vaciarCarrito();
    }
  };

  // Lógica de Pago
  const handlePago = () => {
    if (!isAuthenticated) {
      toast.warning('Debes iniciar sesión para realizar la compra');
      navigate('login');
      return;
    }

    if (window.confirm(`¿Confirmar compra por $${totalCarrito.toFixed(2)}?`)) {
      // 1. Guardar la orden en el historial
      crearOrden(carrito, totalCarrito);
      
      // 2. Vaciar el carrito
      vaciarCarrito();
      
      // 3. Notificar y redirigir
      toast.success('¡Compra realizada con éxito! Revisa tu historial.');
      navigate('mis-pedidos');
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="container">
        <Helmet><title>Carrito Vacío | Curso ReactJS</title></Helmet>
        <div className="carrito-vacio">
          <FaShoppingCart style={{ fontSize: '4rem', color: '#95a5a6', marginBottom: '1rem' }} />
          <h2>El carrito está vacío</h2>
          <button onClick={() => navigate('productos')} className="btn-primario">
            <FaShoppingBag /> Ir a Comprar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Mi Carrito (${carrito.length}) | Curso ReactJS`}</title>
      </Helmet>
      <div className="container">
        <h2 className="seccion-titulo"><FaShoppingCart /> Mi Carrito</h2>
        <div className="carrito-container">
          {carrito.map(item => (
            <div key={item.id} className="carrito-item">
              <img src={item.image} alt={item.name} className="carrito-imagen" />
              <div className="carrito-info">
                <h3>{item.name || item.title}</h3>
                <p>Cantidad: {item.cantidad}</p>
                <p>Unitario: ${parseFloat(item.price).toFixed(2)}</p>
                <p className="carrito-subtotal">Subtotal: ${(item.price * item.cantidad).toFixed(2)}</p>
              </div>
              <button onClick={() => handleEliminar(item.id, item.name)} className="btn-eliminar">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        
        <div className="carrito-total">
          <h3>Total: ${totalCarrito.toFixed(2)}</h3>
          <button onClick={handleVaciarCarrito} className="btn-secundario">
            <FaTrash /> Vaciar
          </button>
          {/* Botón conectado */}
          <button onClick={handlePago} className="btn-primario">
            <FaCreditCard /> Proceder al Pago
          </button>
        </div>
      </div>
    </>
  );
}

export default Carrito;