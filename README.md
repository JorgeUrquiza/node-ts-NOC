# Proyecto NOC

## Descripción
Esta es una aplicacion Node.js escrita en TypeScript que realiza chequeos periódicos a un servicio web, registro de logs en MongoDB, PostgreSQL y el sistema de archivos y los manda por email.
El objetivo de este proyecto es crear una serie de tareas utilizando una arquitectura limpia con TypeScript.

## Configuración del entorno de desarrollo

### Prerrequisitos
- Node.js
- TypeScript
- Docker
- MongoDB
- Prisma

### Dependencias
Este proyecto utiliza las siguientes dependencias:

- [Dotenv](https://www.npmjs.com/package/dotenv): Un módulo que carga variables de entorno de un archivo .env a process.env.
- [Nodemailer](https://nodemailer.com/about/): Un módulo para enviar correos electrónicos fácilmente desde Node.js.
- [Node-cron](https://www.npmjs.com/package/node-cron): Un módulo para programar tareas (cron jobs) en Node.js.
- [Prisma](https://www.prisma.io/): Un ORM para trabajar con bases de datos.
- [PostgreSQL](https://www.postgresql.org/): Un sistema de gestión de bases de datos relacional orientado a objetos y libre.
- [MongoDB](https://www.mongodb.com/): Una base de datos NoSQL orientada a documentos.
- [Mongoose](https://mongoosejs.com/): Una biblioteca de MongoDB que proporciona una solución de modelado de objetos para trabajar con MongoDB de manera más cómoda.

### Pasos para la configuración
1. Clonar el repositorio.
2. Ejecutar comando ```npm install```
3. Copiar el archivo `.env.template` a `.env`.
4. Configurar las variables de entorno en el archivo `.env`.
5. Levantar las bases de datos con el comando
    ```
    docker compose up -d
    ```
6. Ejecutar ```npm run dev```


