import express from 'express';
import helmet from 'helmet';
import { createContact, editContact } from './controllers/contact';
import { addContact, getContacts, signIn, signUp } from './controllers/user';
import isAuthenticated from './middlewares/isAuthenticated';
import isContactAssociated from './middlewares/isContactAssociated';

// initialize express server
const app = express();

app.use(helmet());

// ways to submit data to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
// might use 'Router' object from express
app.post('/signup', signUp);
app.post('/signin', signIn);
app.post('/contacts', isAuthenticated, createContact, addContact);
app.put('/contacts/:_id', isAuthenticated, isContactAssociated, editContact);
app.get('/contacts', isAuthenticated, getContacts);

export default app;
