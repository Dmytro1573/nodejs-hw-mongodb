import { contactsCollection } from '../models/contacts.js';

export const getAllContacts = async () => {
  try {
    const data = await contactsCollection.find();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getContactById = async (contactId) => {
  try {
    const data = await contactsCollection.findById(contactId);
    return data;
  } catch (error) {
    console.error(error);
  }
};
