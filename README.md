# 🛒 E-commerce Backend - Coderhouse

Proyecto final para el curso de Backend de Coderhouse. 
Consiste en una API robusta para un e-commerce con gestión de productos, carritos, sesiones de usuario y panel de administrador.

---

## 🚀 Tecnologías utilizadas
* **Node.js** & **Express** (Servidor)
* **MongoDB Atlas** & **Mongoose** (Base de datos y modelado)
* **Handlebars** (Motor de plantillas para el Frontend)
* **Passport.js** & **Bcrypt** (Autenticación y seguridad)
* **Mongoose Paginate V2** (Paginación y filtros)
* **SweetAlert2** (Notificaciones visuales)

🔐 Roles y Accesos
    Usuario: Puede navegar productos, filtrar, paginar y gestionar su propio carrito.

    Admin: Tiene acceso exclusivo a:

    Panel de creación, edición y eliminación de productos.

    Gestión de usuarios (cambio de roles y eliminación).

    Panel de visualización de carga de tareas (CRM).

📦 Endpoints Principales
    Productos (/api/products)
        GET /: Listado con paginación, limit, sort y query (categoría).

        POST /: Creación de productos (Admin).

        PUT /:pid: Actualización de productos (Admin).

        DELETE /:pid: Eliminación de productos (Admin).

    Carrito (/api/carts)
        GET /:cid: Visualización del carrito con Populate.

        POST /:cid/products/:pid: Agregar producto con cantidad dinámica.

        PUT /:cid/products/:pid: Actualizar cantidad de un producto.

        DELETE /:cid: Vaciar carrito.

