import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { register, login, logout, refresh } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../validations/auth.js';

const router = express.Router();
const JsonParser = express.json();

router.post(
  '/auth/register',
  JsonParser,
  validateBody(registerSchema),
  ctrlWrapper(register),
);

router.post(
  '/auth/login',
  JsonParser,
  validateBody(loginSchema),
  ctrlWrapper(login),
);

router.post('/auth/logout', ctrlWrapper(logout));

router.post('/auth/refresh', ctrlWrapper(refresh));

export default router;
