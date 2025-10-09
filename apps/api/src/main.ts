import express from 'express';
import * as path from 'path';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { apikeytokenRouter } from './routes/v1/apikeytokenRoutes';
import { ApiKeyTokenMiddleware } from './middlewares/apikeytoken';
import { loginRouter } from './routes/v1/loginRoutes';
import { SessionMiddleware } from './middlewares/session';
import { sessionRouter } from './routes/v1/sessionRouter';
import { userRouter } from './routes/v1/userRoutes';
import { userRouterInit } from './routes/v1/userRoutesInit';
import { emailingRouter } from './routes/v1/emailingRoutes';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { MultiTenant } from './factories/multiTenant';
import { roleRouter } from './routes/v1/roleRoutes';
import { rolePermissionRouter } from './routes/v1/rolePermissionRoutes';
import { userPermissionRouter } from './routes/v1/userPermissionRoutes';
import { storageRouter } from './routes/v1/storageRoutes';
import { getPuppeteerInstance } from './factories/puppeteerInstance';
import { attendanceRouter } from './routes/v1/attendanceRoutes';
import { authorizationRouter } from './routes/v1/authorizationRoutes';
import { guardianRouter } from './routes/v1/guardianRoutes';
import { invoiceRouter } from './routes/v1/invoiceRoutes';
import { sanctionRouter } from './routes/v1/sanctionRoutes';
import { studentRouter } from './routes/v1/studentRoutes';
import { tutorshipRouter } from './routes/v1/tutorshipRoutes';
import { seasonRouter } from './routes/v1/seasonRoutes';

const app = express();

const env = process.env.NODE_ENV || 'development';

const multiTenant = new MultiTenant();

app.set('view engine', 'ejs');
if (env === 'development') {
    app.use(express.static(path.join(__dirname, '../public/')));
} else {
    app.use(express.static(path.join(__dirname, './public/')));
}

const options = {
    origin: '*',
    //methods: ['OPTIONS', 'GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
};

app.use(cors(options));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
    // esta es la base de datos que se tomará por defecto
    let name = '.env.demo';

    // cogemos el subdominio para acceder al .env según el subdominio
    if (req.subdomains.length > 0) {
        name = `.env.${req.subdomains[0]}`;
    }

    // si no, miramos el referer https://subdominio.noutly.com obtenemos el subdominio
    if (req.headers.referer) {
        const url = new URL(req.headers.referer);
        const subdomain = url.hostname.split('.')[0];
        if (subdomain) {
            name = `.env.${subdomain}`;
        }
    }

    // si es localhost lo mandamos a la demo
    if (
        req.headers.referer &&
        (req.headers.referer.includes('localhost') || req.headers.referer.includes('192.168.'))
    ) {
        name = '.env';
    }

    // si nos llega por la url el tenant lo cogemos, lo priorizamos sobre el nombre que venga en el subdominio
    if (req.query.tenant) {
        name = `.env.${req.query.tenant}`;
        // query para coger el tenant admin
        if (req.query.tenant === 'dev') {
            name = '.env';
        }
    }

    // comprobamos si existe el fichero .env pasado en el name o lo mandamos al faker
    if (!fs.existsSync(name)) {
        name = '.env.faker';
    }

    name = '.env'; // FORZAMOS A USAR ESTE TENANT

    res.locals.prisma = multiTenant.get(name);
    res.locals.referer = req.headers.referer;
    next();
});

app.get('/', async function (req, res) {
    res.send('🔥 Residencia v0.0.1!');
});

app.use('/v1/apikeytoken', apikeytokenRouter);
app.use('/v1/usersinit', userRouterInit);
app.use('/v1/emailing', emailingRouter);

/* a partir de aquí las rutas necesitan keytoken */
const apiKeyTokenMiddleware = new ApiKeyTokenMiddleware();
app.use(apiKeyTokenMiddleware.verifyApiKeyToken);

app.use('/v1/login', loginRouter);

/*********************
A partir de esta línea las rutas son privadas
 *********************/
const sessionMiddleware = new SessionMiddleware();
app.use(sessionMiddleware.verifyToken); // Verify Token middleware
app.use(fileUpload());

app.use('/v1/storage', storageRouter);
app.use('/v1/session', sessionRouter);
app.use('/v1/user', userRouter);
app.use('/v1/role', roleRouter);
app.use('/v1/rolePermission', rolePermissionRouter);
app.use('/v1/userPermission', userPermissionRouter);
app.use('/v1/guardian', guardianRouter);
app.use('/v1/student', studentRouter);
app.use('/v1/invoice', invoiceRouter);
app.use('/v1/attendance', attendanceRouter);
app.use('/v1/season', seasonRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);

process.on('exit', async (code) => {
    console.log(`About to exit with code: ${code}`);
    await closeYourAppGracefully();
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Flushing transaction log.');
    await closeYourAppGracefully();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Flushing transaction log.');
    await closeYourAppGracefully();
    process.exit(0);
});

async function closeYourAppGracefully() {
    // Insert your pre-shutdown logic here.
    console.log('Closing Puppeteer...');
    const browser = await getPuppeteerInstance();
    if (browser && browser.connected) {
        await browser.close();
    }
}
