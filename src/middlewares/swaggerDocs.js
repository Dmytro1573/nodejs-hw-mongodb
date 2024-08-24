import * as fs from 'node:fs';

import createHttpError from 'http-errors';

import swaggerUi from 'swagger-ui-express';

import { SWAGGER_PATH } from '../constants/index.js';

export function swaggerDocs() {
  try {
    const doc = JSON.parse(
      fs.readFileSync(SWAGGER_PATH, { encoding: 'utf-8' }),
    );

    return [...swaggerUi.serve, swaggerUi.setup(doc)];
  } catch (error) {
    return (req, res, next) => {
      next(createHttpError(500, 'Can not load swagger docs'));
    };
  }
}
