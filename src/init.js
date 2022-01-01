import dotenv from 'dotenv';
import app from './app';
import db from './db';

dotenv.config();

(async function init() {
  try {
    await db();
    console.log('connected to the database');
    app.listen(process.env.PORT, () =>
      console.log(`The server is listening on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error.message);
  }
})();
