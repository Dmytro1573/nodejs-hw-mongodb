import 'dotenv/config';

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Contacts found',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => [
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    }),
  ]);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
