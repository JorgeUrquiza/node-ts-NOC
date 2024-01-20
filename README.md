# Proyecto NOC

## Descripción
Esta es una aplicacion Node.js escrita en TypeScript que realiza chequeos periódicos a un servicio web, registra los resultados y los manda por email.
El objetivo de este proyecto es crear una serie de tareas utilizando una arquitectura limpia con TypeScript.

## Configuración del entorno de desarrollo

### Prerrequisitos
- Node.js
- TypeScript

### Dependencias
Este proyecto utiliza las siguientes dependencias:

- [Dotenv] (https://www.npmjs.com/package/dotenv): Un módulo que carga variables de entorno de un archivo .env a process.env.
- [Nodemailer] (https://nodemailer.com/about/): Un módulo para enviar correos electrónicos fácilmente desde Node.js.
- [Node-cron] (https://www.npmjs.com/package/node-cron): Un módulo para programar tareas (cron jobs) en Node.js.

### Pasos para la configuración
1. Clonar el repositorio.
2. Ejecutar comando ```npm install```
3. Copiar el archivo `.env.template` a `.env`.
4. Configurar las variables de entorno en el archivo `.env`.
5. Ejecutar ```npm run dev```

```
PORT=3000
MAILER_EMAIL=your_email@example.com
MAILER_SECRET_KEY=your_secret_key
PROD=false

``` 
