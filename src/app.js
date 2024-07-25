import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactRoutes from './routes/contacts.js';
import { notFoundHandler } from './middlewares/noFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(contactRoutes);

app.use(cors());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use('*', notFoundHandler);

app.use(errorHandler);

export default app;
