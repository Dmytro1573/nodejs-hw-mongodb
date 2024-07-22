import 'dotenv/config';

import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const user = process.env.MONGODB_USER;
  const pass = process.env.MONGODB_PASSWORD;
  const url = process.env.MONGODB_URL;
  const db = process.env.MONGODB_DB;

  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${pass}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// mongodb+srv://DmytroManko:Naluga17@cluster0.1twglb1.mongodb.net/
