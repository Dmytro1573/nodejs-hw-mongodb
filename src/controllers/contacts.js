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
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

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

  const contact = await getContactById(contactId);

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

  const deletedContact = await deleteContact(contactId);

  if (deletedContact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
}

async function updateContactController(req, res, next) {
  const contactId = req.params.contactId;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  };

  const updatedContact = await updateContact(contactId, contact);

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

  const changedContact = await changeContactEmail(contactId, contact);

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
