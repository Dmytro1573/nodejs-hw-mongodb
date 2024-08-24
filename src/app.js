import express from 'express';
import path from 'node:path';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contacts.js';
import { notFoundHandler } from './middlewares/noFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const app = express();

app.use(express.static(path.resolve('src', 'uploads')));
app.use('/api-docs', swaggerDocs());

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
