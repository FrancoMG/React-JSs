import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import { Helmet } from 'react-helmet-async';
import Producto from '../components/Producto';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Productos() {
  const { productos, cargando, error } = useProducts();
  
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  
  const productosPorPagina = 8; 

  if (cargando) return <div className="mensaje">Cargando productos...</div>;
  if (error) return <div className="mensaje">Error: {error}</div>;

  // Lógica de Filtrado
  const productosFiltrados = productos.filter(producto =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.category.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Lógica de Paginación
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
  
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Catálogo | Curso ReactJS Store</title>
        <meta name="description" content="Explora nuestro catálogo completo de productos." />
      </Helmet>
      
      <div className="container">
        <h2 className="seccion-titulo">Nuestros Productos</h2>

        <div style={estilosBuscador.contenedor}>
          <FaSearch style={estilosBuscador.icono} />
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={busqueda}
            onChange={handleBusqueda}
            className="input"
            style={estilosBuscador.input}
          />
        </div>

        <div className="productos-grid">
            {productosPaginados.length > 0 ? (
                productosPaginados.map((producto) => (
                    <Producto key={producto.id} producto={producto} />
                ))
            ) : (
                <p>No hay productos que coincidan con la búsqueda.</p>
            )}
        </div>

        {totalPaginas > 1 && (
          <div style={estilosPaginador.contenedor}>
            <button 
              onClick={() => cambiarPagina(Math.max(paginaActual - 1, 1))}
              disabled={paginaActual === 1}
              className="btn-secundario"
              style={estilosPaginador.boton}
            >
              <FaChevronLeft /> Anterior
            </button>
            
            <span style={estilosPaginador.texto}>
              Página {paginaActual} de {totalPaginas}
            </span>

            <button 
              onClick={() => cambiarPagina(Math.min(paginaActual + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              className="btn-secundario"
              style={estilosPaginador.boton}
            >
              Siguiente <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const estilosBuscador = {
  contenedor: {
    maxWidth: '500px',
    margin: '0 auto 2rem',
    position: 'relative'
  },
  icono: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#7f8c8d'
  },
  input: {
    width: '100%',
    paddingLeft: '40px'
  }
};

const estilosPaginador = {
  contenedor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '3rem',
    marginBottom: '2rem'
  },
  boton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem'
  },
  texto: {
    fontWeight: 'bold',
    color: '#2c3e50'
  }
};

export default Productos;