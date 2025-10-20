import React, { useState, useEffect, useContext } from 'react';
import { NavContext } from '../context/NavContext';
import { CarritoContext } from '../context/CarritoContext';

function ProductoDetalle() {
  const { selectedProductId, navigate } = useContext(NavContext);
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    if (selectedProductId) {
      fetch(`https://fakestoreapi.com/products/${selectedProductId}`)
        .then(res => res.json())
        .then(data => {
          setProducto(data);
          setCargando(false);
        })
        .catch(err => {
          setError('Error al cargar el producto');
          setCargando(false);
        });
    }
  }, [selectedProductId]);

  if (cargando) return <div className="mensaje">Cargando producto...</div>;
  if (error) return <div className="mensaje">{error}</div>;
  if (!producto) return <div className="mensaje">Producto no encontrado</div>;

  return (
    <div className="container">
      <div className="detalle-container">
        <img src={producto.image} alt={producto.title} className="detalle-imagen" />
        <div className="detalle-info">
          <h2>{producto.title}</h2>
          <p className="detalle-categoria">{producto.category}</p>
          <p className="detalle-precio">${producto.price}</p>
          <p className="detalle-descripcion">{producto.description}</p>
          <button onClick={() => agregarAlCarrito(producto)} className="btn-primario">
            Agregar al Carrito
          </button>
          <button onClick={() => navigate('productos')} className="btn-secundario">
            Volver a Productos
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;