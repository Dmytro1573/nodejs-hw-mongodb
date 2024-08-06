import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  changeEmailController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidID.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get(
  '/contacts/:contactId',
  isValidID,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidID,
  ctrlWrapper(deleteContactController),
);

router.put(
  '/contacts/:contactId',
  isValidID,
  jsonParser,
  ctrlWrapper(updateContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidID,
  jsonParser,
  ctrlWrapper(changeEmailController),
);

export default router;
