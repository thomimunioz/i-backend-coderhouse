# 🛒 E-commerce Backend - Coderhouse

Proyecto final para el curso de Backend de Coderhouse. Consiste en una API robusta para un e-commerce con gestión de productos, carritos, sesiones de usuario y panel de administrador.

---

## 🚀 Tecnologías utilizadas
* **Node.js** & **Express** (Servidor)
* **MongoDB Atlas** & **Mongoose** (Base de datos y modelado)
* **Handlebars** (Motor de plantillas para el Frontend)
* **Passport.js** & **Bcrypt** (Autenticación y seguridad)
* **Mongoose Paginate V2** (Paginación y filtros)
* **SweetAlert2** (Notificaciones visuales)

---

## 🔐 Roles y Accesos

### 👤 Usuario
* Puede navegar productos, filtrar por categoría y ordenar por precio.
* Paginación dinámica de productos.
* Gestión completa de su propio carrito (agregar, quitar, vaciar).

### 🛡️ Admin
* **Gestión de Stock:** Panel de creación, edición y eliminación de productos.
* **Control de Usuarios:** Vista para cambiar roles (User/Admin) y eliminar cuentas.
* **CRM:** Panel de visualización de carga de tareas y reasignación.

---

## 📦 Endpoints Principales

### 🏷️ Productos (`/api/products`)
* `GET /` - Listado con paginación, limit, sort y query (categoría).
* `POST /` - Creación de productos (**Solo Admin**).
* `PUT /:pid` - Actualización de productos (**Solo Admin**).
* `DELETE /:pid` - Eliminación de productos (**Solo Admin**).

### 🛒 Carrito (`/api/carts`)
* `GET /:cid` - Visualización del carrito con **Populate** (detalles de productos).
* `POST /:cid/products/:pid` - Agregar producto con cantidad dinámica (desde Body).
* `PUT /:cid/products/:pid` - Actualizar cantidad de un producto específico.
* `DELETE /:cid` - Vaciar carrito por completo.

---

## ✨ Features Destacadas
* **Populate:** Los carritos no solo guardan IDs, sino que traen toda la info del producto en tiempo real.
* **Auth Avanzada:** Uso de sesiones y middlewares para proteger rutas críticas.
* **Filtros Inteligentes:** Implementación de búsqueda por categoría combinada con ordenamiento ascendente/descendente de precio.