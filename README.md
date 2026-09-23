\# Taller 05: CRUD con GraphQL, React y Apollo Client



Aplicación web para gestionar usuarios mediante una interfaz desarrollada con React y una API GraphQL conectada a MariaDB.



\## Tecnologías utilizadas



\### Backend



\- Node.js

\- Express

\- GraphQL

\- graphql-http

\- MariaDB

\- mysql2

\- CORS

\- Ruru



\### Frontend



\- React

\- Vite

\- Apollo Client

\- GraphQL

\- CSS



\## Estructura del proyecto



\- `graphQL\_taller05`: backend y API GraphQL.

\- `graphQL\_taller05\_frontend`: interfaz desarrollada con React.



\## Requisitos



\- Node.js

\- npm

\- XAMPP con MariaDB

\- Navegador web



\## Base de datos



La aplicación utiliza la base de datos:



```text

graphql\_taller05



La tabla principal es:



Plain Text

usuarios

Mostrar más líneas



La conexión local utiliza el usuario root de MariaDB y el puerto predeterminado de XAMPP.



Instalación del backend



Abrir una terminal y ejecutar:



PowerShell

cd graphQL\_taller05

npm install

npm run dev

Mostrar más líneas



El backend se ejecuta en:



Plain Text

http://localhost:4000

Mostrar más líneas



El endpoint GraphQL es:



Plain Text

http://localhost:4000/graphql

Mostrar más líneas

Instalación del frontend



Abrir otra terminal y ejecutar:



PowerShell

cd graphQL\_taller05\_frontend

npm install

npm run dev

Mostrar más líneas



El frontend se ejecuta normalmente en:



Plain Text

http://localhost:5173

Mostrar más líneas

Funcionalidades

Consultar los usuarios almacenados.

Registrar usuarios.

Seleccionar y editar usuarios.

Eliminar usuarios con confirmación.

Mostrar estados de carga, éxito y error.

Actualizar la tabla después de cada operación.

Validar los campos obligatorios del formulario.

Puertos utilizados

Backend GraphQL: 4000

Frontend Vite: 5173

MariaDB: puerto configurado por XAMPP

Ejecución



Antes de iniciar el proyecto:



Iniciar MySQL desde el panel de XAMPP.

Ejecutar el backend.

Ejecutar el frontend.

Abrir http://localhost:5173 en el navegador.

Autor



Juan Manuel Eraso Grijalba

Diego Fernando Escobar Enriquez





Guarda y cierra.



\---



\# Paso 49. Inicializar Git



Todavía ubicado en la carpeta general `GraphQL`, ejecuta:



```powershell

git init





Después:



PowerShell

git status

Mostrar más líneas



Verifica especialmente que no aparezcan miles de archivos de node\_modules.



Luego agrega los archivos:



PowerShell

git add .

Mostrar más líneas



Comprueba nuevamente:



PowerShell

git status

Mostrar más líneas



Crea el primer commit:



PowerShell

git commit -m "feat: implementar CRUD con GraphQL React y Apollo Client"

