import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

// initialize dotenv to use variables defined on /.env
dotenv.config();

// initialize express server
const app = express();
const PORT = process.env.PORT;

app.use(helmet());

app.listen(PORT, ()=>console.log(`The server is listining on port ${PORT}`));
