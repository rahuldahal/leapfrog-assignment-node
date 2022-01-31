import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {
  createContact,
  deleteContact,
  editContact,
} from './controllers/contact';
import {
  addContact,
  getContacts,
  removeContact,
  signIn,
  signUp,
} from './controllers/user';
import isAuthenticated from './middlewares/isAuthenticated';
import isContactAssociated from './middlewares/isContactAssociated';
import { verifyRefreshToken } from './middlewares/verifyRefreshToken';
import { generateNewTokenPair } from './controllers/refresh';
import { removeRefreshToken } from './middlewares/removeRefreshToken';
import { doesRefreshTokenExist } from './middlewares/doesRefreshTokenExist';

// initialize express server
const app = express();

app.use(helmet());

// configure cors

const corsOptions = {
  origin: ['http://localhost:8888', 'https://leapfrog-react-node.netlify.app'],
};
app.use(cors(corsOptions));

// ways to submit data to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
// might use 'Router' object from express
app.post('/signup', signUp);
app.post('/signin', signIn);
app.post('/contacts', isAuthenticated, createContact, addContact, getContacts);
app.put(
  '/contacts/:_id',
  isAuthenticated,
  isContactAssociated,
  editContact,
  getContacts
);
app.delete(
  '/contacts/:_id',
  isAuthenticated,
  isContactAssociated,
  deleteContact,
  removeContact,
  getContacts
);
app.get('/contacts', isAuthenticated, getContacts);
app.post(
  '/refresh',
  doesRefreshTokenExist,
  verifyRefreshToken,
  removeRefreshToken,
  generateNewTokenPair
);

export default app;
