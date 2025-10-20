import React, { useState, useEffect } from 'react';
import Producto from '../components/Producto';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        setError('Error al cargar los productos');
        setCargando(false);
      });
  }, []);

  if (cargando) return <div className="mensaje">Cargando productos...</div>;
  if (error) return <div className="mensaje">{error}</div>;

  return (
    <div className="container">
      <h2 className="seccion-titulo">Todos los Productos</h2>
      <div className="productos-grid">
        {productos.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default Productos;