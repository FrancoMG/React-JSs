import React, { useContext } from 'react';
import { NavContext } from '../context/NavContext';
import { useProducts } from '../context/ProductsContext';
import { Helmet } from 'react-helmet-async';
import Producto from '../components/Producto';

function Inicio() {
  const { productos, cargando, error } = useProducts();
  const { navigate } = useContext(NavContext);

  const productosDestacados = productos.slice(0, 3); 

  if (cargando) return <div className="mensaje">Cargando destacados...</div>;
  if (error) return <div className="mensaje">Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Inicio | Curso ReactJS Store</title>
        <meta name="description" content="Bienvenido a Curso ReactJS Store. Descubre los mejores productos al mejor precio." />
      </Helmet>
      
      <div className="container">
        <div className="hero">
          <h1>Bienvenido a Curso ReactJS Store</h1>
        </div>
        
        <h2 className="seccion-titulo">Productos Destacados</h2>
        
        <div className="grid-destacados">
          {productosDestacados.map(producto => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </div>
        
        <div className="ver-mas">
          <button onClick={() => navigate('productos')} className="btn-primario">
            Ver Todos los Productos
          </button>
        </div>
      </div>
    </>
  );
}

export default Inicio;