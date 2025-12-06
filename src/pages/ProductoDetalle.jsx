import React, { useState, useEffect, useContext } from 'react';
import { NavContext } from '../context/NavContext';
import { CarritoContext } from '../context/CarritoContext';
import { useProducts } from '../context/ProductsContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

function ProductoDetalle() {
  const { selectedProductId, navigate } = useContext(NavContext);
  const { productos } = useProducts();
  const [producto, setProducto] = useState(null);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    if (selectedProductId && productos.length > 0) {
      // Convertimos ambos a string o número para asegurar la comparación
      const productoEncontrado = productos.find(p => String(p.id) === String(selectedProductId));
      setProducto(productoEncontrado);
    }
  }, [selectedProductId, productos]);

  const handleAgregarCarrito = () => {
    if (producto) {
      agregarAlCarrito(producto);
      toast.success(`${producto.name} agregado al carrito`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  if (!producto) return <div className="mensaje">Cargando detalle o producto no encontrado...</div>;

  return (
    <>
      <Helmet>
        <title>{`${producto.name} | Curso ReactJS Store`}</title>
        <meta name="description" content={producto.description || 'Detalle del producto'} />
        <meta property="og:title" content={producto.name} />
        <meta property="og:description" content={producto.description} />
        <meta property="og:image" content={producto.image} />
      </Helmet>
      <div className="container">
        <div className="detalle-container">
          <img src={producto.image} alt={producto.name} className="detalle-imagen" />
          <div className="detalle-info">
            <h2>{producto.name}</h2>
            <p className="detalle-categoria">{producto.category}</p>
            <p className="detalle-precio">${producto.price}</p>
            <p className="detalle-descripcion">{producto.description}</p>
            <button onClick={handleAgregarCarrito} className="btn-primario">
              <FaShoppingCart /> Agregar al Carrito
            </button>
            <button onClick={() => navigate('productos')} className="btn-secundario">
              <FaArrowLeft /> Volver a Productos
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductoDetalle;