import express from 'express';
import helmet from 'helmet';
import { signUp } from './controllers/user';

// initialize express server
const app = express();

app.use(helmet());

// ways to submit data to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
// might use 'Router' object from express
app.post('/signup', signUp);

export default app;
