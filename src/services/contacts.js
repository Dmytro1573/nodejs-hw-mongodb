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

export function createContact(contact) {
  return contactsCollection.create(contact);
}

export function deleteContact(contactId) {
  return contactsCollection.findByIdAndDelete(contactId);
}

export function updateContact(contactId, contact) {
  return contactsCollection.findByIdAndUpdate(contactId, contact, {
    new: true,
  });
}

export function changeContactEmail(contactId, contact) {
  return contactsCollection.findByIdAndUpdate(contactId, contact);
}
