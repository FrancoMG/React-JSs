import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { NavContext } from '../context/NavContext';

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, totalCarrito } = useContext(CarritoContext);
  const { navigate } = useContext(NavContext);

  if (carrito.length === 0) {
    return (
      <div className="container">
        <div className="carrito-vacio">
          <h2>El carrito está vacío</h2>
          <button onClick={() => navigate('productos')} className="btn-primario">
            Ir a Comprar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="seccion-titulo">Mi Carrito</h2>
      <div className="carrito-container">
        {carrito.map(item => (
          <div key={item.id} className="carrito-item">
            <img src={item.image} alt={item.title} className="carrito-imagen" />
            <div className="carrito-info">
              <h3>{item.title}</h3>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio unitario: ${item.price}</p>
              <p className="carrito-subtotal">Subtotal: ${(item.price * item.cantidad).toFixed(2)}</p>
            </div>
            <button onClick={() => eliminarDelCarrito(item.id)} className="btn-eliminar">
              Eliminar
            </button>
          </div>
        ))}
      </div>
      
      <div className="carrito-total">
        <h3>Total: ${totalCarrito.toFixed(2)}</h3>
        <button onClick={vaciarCarrito} className="btn-secundario">Vaciar Carrito</button>
        <button className="btn-primario">Proceder al Pago</button>
      </div>
    </div>
  );
}

export default Carrito;