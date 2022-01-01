import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { signUp } from './controllers/user';

// initialize dotenv to use variables defined on /.env
dotenv.config();

// initialize express server
const app = express();
const PORT = process.env.PORT;

app.use(helmet());

// ways to submit data to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
// might use 'Router' object from express
app.post('/signup', signUp);


app.listen(PORT, ()=>console.log(`The server is listining on port ${PORT}`));
