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
import { contactSchema, patchContactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidID.js';
import { auth } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', auth, ctrlWrapper(getAllContactsController));

router.get(
  '/contacts/:contactId',
  auth,
  isValidID,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  auth,
  jsonParser,
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  auth,
  isValidID,
  ctrlWrapper(deleteContactController),
);

router.put(
  '/contacts/:contactId',
  auth,
  isValidID,
  jsonParser,
  ctrlWrapper(updateContactController),
);

router.patch(
  '/contacts/:contactId',
  auth,
  isValidID,
  upload.single('photo'),
  jsonParser,
  validateBody(patchContactSchema),
  ctrlWrapper(changeEmailController),
);

export default router;
