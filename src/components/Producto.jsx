import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { NavContext } from '../context/NavContext';

function Producto({ producto }) {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { navigate } = useContext(NavContext);

  return (
    <div className="producto-card">
      <img src={producto.image} alt={producto.title} className="producto-imagen" />
      <h3 className="producto-titulo">{producto.title}</h3>
      <p className="producto-categoria">{producto.category}</p>
      <p className="producto-precio">${producto.price}</p>
      <button 
        onClick={() => navigate('detalle', producto.id)} 
        className="btn-secundario"
      >
        Ver Detalles
      </button>
      <button onClick={() => agregarAlCarrito(producto)} className="btn-primario">
        Agregar al Carrito
      </button>
    </div>
  );
}

export default Producto;