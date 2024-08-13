import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contacts.js';
import { notFoundHandler } from './middlewares/noFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cookieParser());

app.use(authRoutes);
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
