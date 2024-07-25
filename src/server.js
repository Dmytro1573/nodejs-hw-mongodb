import 'dotenv/config';

import app from './app.js';

export const setupServer = () => {
  const PORT = Number(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
