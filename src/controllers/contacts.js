import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  changeContactEmail,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { contactSchema } from '../validations/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

async function getAllContactsController(req, res, next) {
  console.log(req.user);
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = { ...parseFilterParams(req.query), userId: req.user._id };

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Contacts found',
    data: contacts,
  });
}

async function getContactByIdController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await getContactById(contactId, userId);

  if (!contact || contact.userId.toString() !== req.user._id.toString()) {
    return next(createHttpError(404, 'Contact not found'));
  }

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
}

async function createContactController(req, res, next) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    userId: req.user._id,
  };

  const { error, value } = contactSchema.validate(contact);

  console.log(error);

  if (error !== undefined) {
    return next(createHttpError(400, error.details[0].message));
  }

  const createdContact = await createContact(value);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
}

async function deleteContactController(req, res, next) {
  const contactId = req.params.contactId;
  const userId = req.user._id;

  const deletedContact = await deleteContact(contactId, userId);

  if (!contact || contact.userId.toString() !== req.user._id.toString()) {
    return next(createHttpError(404, 'Contact not found'));
  }

  if (deletedContact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
}

async function updateContactController(req, res, next) {
  const contactId = req.params.contactId;
  const userId = req.user._id;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  };

  if (!contact || contact.userId.toString() !== req.user._id.toString()) {
    return next(createHttpError(404, 'Contact not found'));
  }

  const updatedContact = await updateContact(contactId, contact, userId);

  res
    .status(200)
    .send({ status: 200, message: 'Contact is updated', data: updatedContact });
}

async function changeEmailController(req, res, next) {
  const contactId = req.params.contactId;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  };
  const userId = req.user._id;

  const changedContact = await changeContactEmail(contactId, contact, userId);

  if (!contact || contact.userId.toString() !== req.user._id.toString()) {
    return next(createHttpError(404, 'Contact not found'));
  }

  if (!changedContact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: changedContact,
  });
}

export {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  changeEmailController,
};
