import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  register,
  login,
  logout,
  refresh,
  requestResetEmail,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerSchema,
  loginSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/auth.js';

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

router.post(
  '/auth/send-reset-email',
  JsonParser,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmail),
);

router.post(
  '/auth/reset-password',
  JsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
