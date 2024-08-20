import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
  resetEmail,
  resetPassword,
} from '../services/auth.js';

export async function register(req, res, next) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const createdUser = await registerUser(user);

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a user!',
    data: createdUser,
  });
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  if (req.cookies.sessionId) {
    const existingSession = await Session.findById(req.cookies.sessionId);

    if (existingSession) {
      return next(createHttpError(409, 'You are already logged in.'));
    }
  }
  const session = await loginUser(email, password);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function logout(req, res, next) {
  if (typeof req.cookies.sessionId === 'string') {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).end();
}

export async function refresh(req, res, next) {
  const session = await refreshUser(
    req.cookies.sessionId,
    req.cookies.refreshToken,
  );

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function requestResetEmail(req, res, next) {
  await resetEmail(req.body.email);

  res.send({
    status: 200,
    message: 'Reset password email was successfully send',
    data: {},
  });
}

export async function resetPasswordController(req, res, next) {
  const { password, token } = req.body;

  await resetPassword(password, token);

  res.send({ status: 200, message: 'Password reset successfully', data: {} });
}
