import { isHttpError } from 'http-errors';

export function errorHandler(err, req, res, next) {
  if (isHttpError(err) === true) {
    return res
      .status(err.status)
      .send({ status: err.status, message: err.message });
  }

  if (
    err.message.includes('Cast to ObjectId failed') ||
    err.message.includes('Invalid ObjectId')
  ) {
    return res.status(404).send({ status: 404, message: 'Contact not found' });
  }

  res
    .status(500)
    .send({ status: 500, message: 'Something went wrong', data: err.message });
}
