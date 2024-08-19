import { contactsCollection } from '../models/contacts.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [data, count] = await Promise.all([
    contactsCollection
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
    contactsCollection.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return {
    data,
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage: Boolean(totalPages - page) && page <= totalPages,
    hasPreviousPage: page > 1 && page <= totalPages,
  };
};

export const getContactById = async (contactId, userId) => {
  return await contactsCollection.findOne({ _id: contactId, userId });
};

export function createContact(contact) {
  return contactsCollection.create(contact);
}

export function deleteContact(contactId, userId) {
  return contactsCollection.findOneAndDelete({ _id: contactId, userId });
}

export function updateContact(contactId, contact, userId) {
  return contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    contact,
    {
      new: true,
    },
  );
}

export function changeContactEmail(contactId, contact, userId, filename) {
  return contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    contact,
    {
      new: true,
    },
  );
}
