import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function FormularioUsuario({ usuarioInicial, onSubmit, onCancelar }) {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    if (usuarioInicial) {
      setUsuario(usuarioInicial);
    }
  }, [usuarioInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // --- LÓGICA DE VALIDACIÓN ---
  const validarDatos = () => {
    // 1. Campos obligatorios
    if (!usuario.nombre.trim() || !usuario.apellido.trim() || !usuario.email.trim()) {
      toast.error('Nombre, Apellido y Email son obligatorios');
      return false;
    }

    // 2. Validación de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario.email)) {
      toast.error('Ingresa un email válido');
      return false;
    }

    // 3. Validación de Teléfono (Solo números)
    if (usuario.telefono && !/^[0-9]+$/.test(usuario.telefono)) {
      toast.error('El teléfono debe contener solo números');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ejecutar validación antes de enviar
    if (validarDatos()) {
      onSubmit(usuario);
    }
  };

  return (
    <div className="formulario-producto-container">
      <h2>Editar Usuario</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre *</label>
          <input 
            type="text" 
            name="nombre" 
            value={usuario.nombre} 
            onChange={handleChange} 
            className="input" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Apellido *</label>
          <input 
            type="text" 
            name="apellido" 
            value={usuario.apellido} 
            onChange={handleChange} 
            className="input" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            name="email" 
            value={usuario.email} 
            onChange={handleChange} 
            className="input" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input 
            type="tel" 
            name="telefono" 
            value={usuario.telefono} 
            onChange={handleChange} 
            className="input" 
            placeholder="Solo números"
          />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input 
            type="text" 
            name="direccion" 
            value={usuario.direccion} 
            onChange={handleChange} 
            className="input" 
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primario">Guardar Cambios</button>
          <button type="button" onClick={onCancelar} className="btn-secundario">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioUsuario;