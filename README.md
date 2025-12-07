# 🛒 Curso ReactJS Store - Proyecto Final

Este repositorio contiene la entrega final del proyecto eCommerce desarrollado para el curso de **Talento Tech**. Es una aplicación web progresiva (SPA) construida con React y Vite, que simula una tienda en línea completa con gestión de usuarios, productos y carrito de compras.

## 🚀 Despliegue (Demo)

Puedes ver el proyecto funcionando aquí:
**https://cursoreact-js.netlify.app/**

---

## 📋 Características Principales

### 🛍️ Para Clientes:
* **Catálogo de Productos:** Visualización de productos con paginación y buscador en tiempo real por nombre o categoría.
* **Carrito de Compras:** Gestión de estado global (agregar, eliminar, vaciar) con persistencia de datos para no perder la selección al recargar.
* **Registro y Login:** Sistema de autenticación simulado con validaciones de formulario.
* **Historial de Pedidos:** Visualización de compras anteriores guardadas localmente.
* **Detalle de Producto:** Vista individual con descripción ampliada.

### 🛡️ Para Administradores (Backoffice):
* **Panel de Control:** Acceso restringido mediante rutas protegidas.
* **Gestión de Productos (CRUD):** Alta, Baja y Modificación de productos conectados a MockAPI.
* **Gestión de Usuarios:** Visualización, edición y eliminación de usuarios registrados.

### 🎨 Diseño y UX:
* **Diseño Responsivo:** Adaptable a móviles, tablets y escritorio (Mobile-First).
* **Feedback Visual:** Notificaciones toast para acciones (éxito/error) y modales de confirmación.
* **SEO:** Optimización de títulos y metadatos dinámicos por página.

---

## 🛠️ Tecnologías Utilizadas

* **Core:** [React v19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Estado Global:** React Context API (`AuthContext`, `CarritoContext`, `ProductsContext`).
* **Enrutamiento:** Custom Router basado en Contexto (`NavContext`).
* **Estilos:** CSS3 Moderno (Grid, Flexbox, Variables) + Diseño Responsivo.
* **Iconos:** [React Icons](https://react-icons.github.io/react-icons/) (Fa).
* **Notificaciones:** [React Toastify](https://fkhadra.github.io/react-toastify/).
* **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async).
* **API:** Fetch API consumiendo [MockAPI](https://mockapi.io/).

---

## ⚙️ Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu computadora:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/FrancoMG/React-JSs.git](https://github.com/FrancoMG/React-JSs.git)
    cd React-JSs
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    # O si usas pnpm:
    pnpm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    # O si usas pnpm:
    pnpm run dev
    ```

4.  **Abrir en el navegador:**
    Ingresa a `http://localhost:5173/` (o el puerto que te indique la terminal).

---

## 🔑 Credenciales de Prueba

Para probar las funcionalidades de **Administrador**, utiliza las siguientes credenciales:

* **Usuario/Email:** `admin`
* **Contraseña:** `1234`

Para probar como **Cliente**, puedes registrar un nuevo usuario desde la opción "Crea una cuenta" en el login.

---

## 📦 Scripts Disponibles

* `npm run dev`: Inicia el servidor de desarrollo.
* `npm run build`: Genera la versión de producción en la carpeta `dist`.
* `npm run lint`: Ejecuta ESLint para buscar errores de código.
* `npm run preview`: Previsualiza la versión de producción localmente.
* `npm run deploy`: Despliega la aplicación a GitHub Pages (requiere configuración previa).

---

**Desarrollado por Franco Molina González**