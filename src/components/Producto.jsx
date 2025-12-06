import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { NavContext } from '../context/NavContext';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaEye } from 'react-icons/fa'; 

function Producto({ producto }) {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { navigate } = useContext(NavContext);

  const handleAgregarCarrito = () => {
    agregarAlCarrito(producto);
    toast.success(`${producto.name} agregado al carrito`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="producto-card">
      <img src={producto.image} alt={producto.name} className="producto-imagen" />
      <h3 className="producto-titulo">{producto.name}</h3>
      <p className="producto-categoria">{producto.category}</p>
      <p className="producto-precio">${producto.price}</p>
      <button 
        onClick={() => navigate('detalle', producto.id)} 
        className="btn-secundario"
      >
        <FaEye /> Ver Detalles
      </button>
      <button onClick={handleAgregarCarrito} className="btn-primario">
        <FaShoppingCart /> Agregar al Carrito
      </button>
    </div>
  );
}

export default Producto;