import React, { useState, useEffect } from 'react';

function FormularioProducto({ productoInicial = null, onSubmit, onCancelar, modo = 'agregar' }) {
  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoInicial) {
      setProducto(productoInicial);
    }
  }, [productoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
    
    // Limpiar error del campo al escribir
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!producto.name.trim()) {
      nuevosErrores.name = 'El nombre es obligatorio';
    }

    if (!producto.price || producto.price <= 0) {
      nuevosErrores.price = 'El precio debe ser mayor a 0';
    }

    if (!producto.description.trim() || producto.description.length < 10) {
      nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!producto.image.trim()) {
      nuevosErrores.image = 'La URL de la imagen es obligatoria';
    }

    if (!producto.category.trim()) {
      nuevosErrores.category = 'La categoría es obligatoria';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSubmit(producto);
    }
  };

  return (
    <div className="formulario-producto-container">
      <h2>{modo === 'agregar' ? 'Agregar Producto' : 'Editar Producto'}</h2>
      
      <div className="form-group">
        <label>Nombre del producto *</label>
        <input
          type="text"
          name="name"
          value={producto.name}
          onChange={handleChange}
          className="input"
          placeholder="Ej: iPhone 14"
        />
        {errores.name && <p className="error">{errores.name}</p>}
      </div>

      <div className="form-group">
        <label>Precio *</label>
        <input
          type="number"
          name="price"
          value={producto.price}
          onChange={handleChange}
          className="input"
          placeholder="0.00"
          min="0"
          step="0.01"
        />
        {errores.price && <p className="error">{errores.price}</p>}
      </div>

      <div className="form-group">
        <label>Descripción * (mínimo 10 caracteres)</label>
        <textarea
          name="description"
          value={producto.description}
          onChange={handleChange}
          className="input"
          placeholder="Describe el producto..."
          rows="4"
        />
        {errores.description && <p className="error">{errores.description}</p>}
      </div>

      <div className="form-group">
        <label>URL de la imagen *</label>
        <input
          type="text"
          name="image"
          value={producto.image}
          onChange={handleChange}
          className="input"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {errores.image && <p className="error">{errores.image}</p>}
      </div>

      <div className="form-group">
        <label>Categoría *</label>
        <input
          type="text"
          name="category"
          value={producto.category}
          onChange={handleChange}
          className="input"
          placeholder="Ej: Electrónica"
        />
        {errores.category && <p className="error">{errores.category}</p>}
      </div>

      <div className="form-buttons">
        <button onClick={handleSubmit} className="btn-primario">
          {modo === 'agregar' ? 'Agregar Producto' : 'Actualizar Producto'}
        </button>
        <button onClick={onCancelar} className="btn-secundario">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default FormularioProducto;