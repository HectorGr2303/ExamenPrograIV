Para ejecutarlo es npm run start.
Primero creé mi proyecto y lo dividí en partes, la carpeta src que contiene models, routes y views.
Models contiene los 3 distintos modelos que se ocupaban para el examen, usuarios, citas y vacaciones.
Instalé dependencias como express, dotenv, bcryptjs, jsonwebtoken, mongoose y nodemon.
Index.js se encarga de levantar el servidor y conectar a mongodb con mongoose y express.
El archivo .env contiene la clave de JsonWebToken y el enlace para conectar mi cluster de mongodb atlas, cambiar de ser necesario para probarlo.
En la carpeta routes se crean los endpoints básicos de un CRUD, además de otros como registrar y loguear que utilizan bcrypt y jwt para la parte de usuarios.
El archivo requests.http tiene algunas solicitudes básicas para la api, podrían estar sujetas a modificaciones para funcionar.
El archivo verificarToken.js se encarga de verificar el token proporcionado al llamado de un endpoint si este lo necesita.
Las vistas login y register son básicas, pero guardan usuarios y "comprueba" que loguee el usuario.
