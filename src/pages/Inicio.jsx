import React, { useState, useEffect, useContext } from 'react';
import { NavContext } from '../context/NavContext';
import Producto from '../components/Producto';

function Inicio() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { navigate } = useContext(NavContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=6')
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
      <div className="hero">
        <h1>Bienvenido a Curso ReactJS Store</h1>
        <p>Los mejores productos al mejor precio</p>
      </div>
      
      <h2 className="seccion-titulo">Productos Destacados</h2>
      <div className="productos-grid">
        {productos.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
      
      <div className="ver-mas">
        <button onClick={() => navigate('productos')} className="btn-primario">
          Ver Todos los Productos
        </button>
      </div>
    </div>
  );
}

export default Inicio;