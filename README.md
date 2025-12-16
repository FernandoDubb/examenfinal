# Examen Final – Aplicación de Administración de Productos

Este proyecto corresponde al **examen final**, desarrollado con **React Native (Expo)** y un **backend REST** para la gestión básica de productos.

La aplicación simula una app de administración de productos, permitiendo realizar las operaciones principales solicitadas en el enunciado del examen.

 Funcionalidades implementadas
 Frontend (React Native – Expo)
- Listado de productos mostrando:
  - Nombre
  - Precio
  - Acción (ver detalle)
- Creación de productos mediante un formulario con:
  - Nombre
  - Descripción
  - Precio
  - Estado (Disponible / No disponible)
  - Categoría
  - Fotografía asociada usando la **cámara del dispositivo**
- Vista de **detalle del producto**, donde se muestra:
  - Información completa del producto
  - Imagen asociada
- Eliminación de productos desde la vista de detalle

La interfaz es sencilla y funcional, enfocada en cumplir los requerimientos solicitados.
Backend (API REST)
Se implementó una API con los siguientes endpoints:

- `GET /productos` → Obtiene la lista de productos  
- `POST /productos` → Crea un nuevo producto  
- `DELETE /items/:id` → Elimina un producto por ID  

La API se encarga de manejar la información de los productos y responder a las acciones realizadas desde la aplicación móvil.
 Uso de la cámara
La aplicación utiliza el **plugin de cámara de Expo** para capturar una imagen relacionada al producto, cumpliendo con el requisito de carga de fotografía por ítem.
