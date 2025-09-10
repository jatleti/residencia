# Workspace

## Instalar la app

- npm install -g @paljs/cli@7.0.1
- Crear la base de datos en mysql. utf8mb4 y utf8mb4_general_ci
- Configurar con las credenciales el .env
- Cambiar JWT_SECRET por una clave aleatoria en el .env
- Cambiar el puerto de la API en el .env si es necesario
- Ejecutar el comando `npm install`
- Ejecutar el comando `npx prisma migrate dev` para iniciar la base de datos
- `nx run api:serve:development` para iniciar el servidor de la api
- Entrar a http://localhost:3030/v1/apikeytoken/generate?tenant=dev para generar el token
- Entrar a http://localhost:3030/v1/apikeytoken/add?description=Init%20Token&token=13g5nhdzfngTOfZx7GObVLaYGkiNk7uL&tenant=dev para añadir el token a la base de datos
- Entrar en http://localhost:3030/v1/usersinit/init?tenant=dev para crear el usuario admin inicial
- Comentar la linea `app.use('/v1/usersinit', userRouterInit);` del archivo `apps/express/src/main.ts`
- Poner el token en libs/shared/util-core/src/lib/config/config.ts
- Cambiar dentro de libs/shared/util-core/src/lib/config/config.ts el valor de `localUserToken`
- Cambiar, si así se desea, el baseURL de la app, tanto en el config.ts como en el index.html
- Si se quiere trabajar con localstorage en lugar de cookies, libs/shared/util-core/src/lib/factory/localStorage.factories.ts cambiar el valor de `forceTarget` a true
- Ejecutar el comando `nx run admin:serve:development` para iniciar la app de angular en http://localhost:4200
- Comprobar que hace login correctamente con el usuario admin
- Si se quiere eliminar algún workspace sobrante: `nx generate remove api`
- Si se quiere renombrar algún workspace: `nx g mv --project express api` utilizando workspace
- Si se va a implementar S3, hay que crear el bucket y meter las credenciales en el archivo .env

## Start the app

To start the development server run `nx serve admin`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Prisma codes

Cuando se modifica el schema de prisma, se debe ejecutar el siguiente comando para que se actualice el cliente de prisma:

<pre><code>npx prisma migrate dev</code></pre>

A veces es posible que no encuentre el prisma client los nuevos schemas y haya que reiniciar el editor de código

- Para ejecutar en el servidor como modo de CD/CI prisma, se debe ejecutar:

<pre><code>npx prisma migrate deploy</code></pre>

- Para formatear el código de prisma, se debe ejecutar:

<pre><code>npx prisma format</code></pre>

- Para regenerar el cliente de prisma, se debe ejecutar:
  <pre><code>prisma generate</code></pre>

### TODO
