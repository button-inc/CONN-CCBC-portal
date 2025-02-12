import next from 'next';
import delay from 'delay';
import http from 'http';
import { createLightship } from 'lightship';
import { pgPool } from './backend/lib/setup-pg';
import express from 'express';
import config from './config.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from './backend/lib/session';
import ssoMiddleware from './backend/lib/sso-middleware';
import graphQlMiddleware from './backend/lib/graphql';

const port = config.get('PORT');
const dev = config.get('NODE_ENV') != 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const { json, urlencoded } = bodyParser;

app.prepare().then(async () => {
  const server = express();

  const lightship = createLightship();

  lightship.registerShutdownHandler(async () => {
    // Allow the server to send any in-flight requests before shutting down
    await delay(10000);
    await app.close();
    await pgPool.end();
  });

  server.use(json());

  server.use(urlencoded({ extended: false }));

  server.use(cookieParser());

  server.disable('x-powered-by'); // at minimum, disable x-powered-by header
  server.set('trust proxy', 1); // trust first proxy

  const { middleware: sessionMiddleware } = session();

  server.use(sessionMiddleware);

  server.use(await ssoMiddleware());

  server.use(graphQlMiddleware());

  server.all('*', async (req, res) => handle(req, res));

  http
    .createServer(server)
    .listen(port, () => {
      lightship.signalReady();
      console.log(`> Ready on http://localhost:${port}`);
    })
    .on('error', (err) => {
      console.error(err);
      lightship.shutdown();
    });
});
