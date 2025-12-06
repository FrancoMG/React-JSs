import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavContext } from '../context/NavContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { FaUserPlus } from 'react-icons/fa';

function Registro() {
  const { register } = useContext(AuthContext);
  const { navigate } = useContext(NavContext);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    direccion: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarDatos = () => {
    // 1. Validar campos vacíos
    if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim() || !formData.password.trim() || !formData.telefono.trim()) {
      toast.error('Por favor completa todos los campos obligatorios (*)');
      return false;
    }

    // 2. Validar Email con Expresión Regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('El formato del email no es válido');
      return false;
    }

    // 3. Validar Teléfono (Solo números y longitud mínima)
    const telefonoRegex = /^[0-9]{7,15}$/;
    if (!telefonoRegex.test(formData.telefono)) {
      toast.error('El teléfono debe contener solo números (mínimo 7 dígitos)');
      return false;
    }

    // 4. Validar contraseña segura (mínimo 4 caracteres)
    if (formData.password.length < 4) {
      toast.error('La contraseña debe tener al menos 4 caracteres');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarDatos()) {
      const resultado = register(formData);

      if (resultado.success) {
        toast.success('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
        navigate('login');
      } else {
        toast.error(resultado.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Registro | Curso ReactJS Store</title>
      </Helmet>
      <div className="container">
        <div className="login-container">
          <h2><FaUserPlus /> Crear Cuenta</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre *</label>
              <input type="text" name="nombre" className="input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Apellido *</label>
              <input type="text" name="apellido" className="input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" className="input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Contraseña *</label>
              <input type="password" name="password" className="input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input type="text" name="direccion" className="input" onChange={handleChange} placeholder="Calle 123, Ciudad" />
            </div>
            <div className="form-group">
              <label>Teléfono *</label>
              <input 
                type="tel" 
                name="telefono" 
                className="input" 
                onChange={handleChange} 
                placeholder="Solo números (ej: 1122334455)" 
                required 
              />
            </div>

            <button type="submit" className="btn-primario w-100" style={{marginTop: '1rem'}}>
              Registrarse
            </button>
          </form>
          
          <p className="login-hint" style={{marginTop: '1rem'}}>
            ¿Ya tienes cuenta? <span onClick={() => navigate('login')} style={{color: '#3498db', cursor: 'pointer', fontWeight: 'bold'}}>Inicia Sesión</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Registro;