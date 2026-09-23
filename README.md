# Taller 05: CRUD con GraphQL, React y Apollo Client

Aplicación web para gestionar usuarios mediante una interfaz desarrollada con React y una API GraphQL conectada a MariaDB.

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- GraphQL
- graphql-http
- MariaDB
- mysql2
- CORS
- Ruru

### Frontend

- React
- Vite
- Apollo Client
- GraphQL
- CSS

## Estructura del proyecto

- `graphQL_taller05`: backend y API GraphQL.
- `graphQL_taller05_frontend`: interfaz desarrollada con React.

## Requisitos

- Node.js
- npm
- XAMPP con MariaDB
- Navegador web

## Base de datos

La aplicación utiliza la base de datos:

```text
graphql_taller05
```

La tabla principal es:

```Plain Text
usuarios
```

La conexión local utiliza el usuario root de MariaDB y el puerto predeterminado de XAMPP.

## Instalación del backend

Abrir una terminal y ejecutar:

```PowerShell
cd graphQL_taller05
npm install
npm run dev
```

El backend se ejecuta en:

```Plain Text
http://localhost:4000
```

El endpoint GraphQL es:

```Plain Text
http://localhost:4000/graphql
```

## Instalación del frontend

Abrir otra terminal y ejecutar:

```PowerShell
cd graphQL_taller05_frontend
npm install
npm run dev
```

El frontend se ejecuta normalmente en:

```Plain Text
http://localhost:5173
```

##Funcionalidades

- Consultar los usuarios almacenados.
- Registrar usuarios.
- Seleccionar y editar usuarios.
- Eliminar usuarios con confirmación.
- Mostrar estados de carga, éxito y error.
- Actualizar la tabla después de cada operación.
- Validar los campos obligatorios del formulario.

## Puertos utilizados

- Backend GraphQL: 4000
- Frontend Vite: 5173
- MariaDB: puerto configurado por XAMPP

## Ejecución

Antes de iniciar el proyecto:

1. Iniciar MySQL desde el panel de XAMPP.
2. Ejecutar el backend.
3. Ejecutar el frontend.
4. Abrir http://localhost:5173 en el navegador.

## Autor(es):

Juan Eraso
Diego Escobar
