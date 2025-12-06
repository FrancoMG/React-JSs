import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { FaHistory, FaBoxOpen } from 'react-icons/fa';

function HistorialPedidos() {
  const { user } = useContext(AuthContext);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    // Leer todas las órdenes del localStorage
    const todasLasOrdenes = JSON.parse(localStorage.getItem('orders') || '[]');
    
    if (user) {
      // Filtrar solo las que pertenecen al usuario actual (por email)
      const misOrdenes = todasLasOrdenes.filter(o => o.userId === user.email);
      // Ordenar: más recientes primero
      setOrdenes(misOrdenes.reverse());
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Mis Pedidos | Curso ReactJS</title>
      </Helmet>
      <div className="container">
        <h2 className="seccion-titulo"><FaHistory /> Historial de Pedidos</h2>

        {ordenes.length === 0 ? (
          <div className="mensaje">
            <p>Aún no has realizado ninguna compra.</p>
          </div>
        ) : (
          <div className="ordenes-lista">
            {ordenes.map(orden => (
              <div key={orden.id} className="orden-card">
                
                {/* Cabecera del Pedido */}
                <div className="orden-header">
                  <div>
                    <h3>Pedido #{orden.id}</h3>
                    <span className="orden-fecha">Fecha: {orden.fecha}</span>
                  </div>
                  <div className="orden-estado-container">
                    <span className="orden-total">${orden.total.toFixed(2)}</span>
                    <span className="orden-estado">{orden.estado}</span>
                  </div>
                </div>

                <hr style={{ margin: '1rem 0', border: '0', borderTop: '1px solid #eee' }} />

                {/* Lista de Productos */}
                <div className="orden-productos">
                  <h4>Productos Comprados:</h4>
                  {orden.productos.map((prod, index) => (
                    <div key={index} className="orden-item">
                      <img src={prod.image} alt={prod.name} className="orden-img" />
                      <div className="orden-item-info">
                        <strong>{prod.name}</strong>
                        <span>${parseFloat(prod.price).toFixed(2)} c/u</span>
                      </div>
                      <div className="orden-item-cantidad">
                        x{prod.cantidad}
                      </div>
                      <div className="orden-item-subtotal">
                        ${(prod.price * prod.cantidad).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default HistorialPedidos;