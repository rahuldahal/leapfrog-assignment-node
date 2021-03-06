import {
  addNewContact,
  createUser,
  getAllContacts,
  removeOneContact,
  signInUser,
} from '../models/User';

export async function signUp(req, res) {
  const { email, password } = req.body;
  const { error, message } = await createUser({ email, password });
  if (error) {
    const { reason, errorMessage } = error;
    const statusCode = reason === 'clientError' ? 400 : 500;
    return res.status(statusCode).json({ message: { error: errorMessage } });
  }
  return res.status(201).json({ message });
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const { error, message } = await signInUser({ email, password });
  if (error) {
    const { reason, errorMessage } = error;
    const statusCode = reason === 'clientError' ? 400 : 500;
    return res.status(statusCode).json({ message: { error: errorMessage } });
  }
  return res.status(200).json({ message });
}

export async function addContact(req, res, next) {
  const { _id: userId, contactId } = req;
  const { error } = await addNewContact({ userId, contactId });
  if (error) {
    const { reason, errorMessage } = error;
    const statusCode = reason === 'clientError' ? 400 : 500;
    return res.status(statusCode).json({ message: { error: errorMessage } });
  }
  return next();
}

export async function removeContact(req, res, next) {
  const { _id: userId, contactId } = req;
  const { error } = await removeOneContact({ userId, contactId });
  if (error) {
    const { reason, errorMessage } = error;
    const statusCode = reason === 'clientError' ? 400 : 500;
    return res.status(statusCode).json({ message: { error: errorMessage } });
  }
  return next();
}

export async function getContacts(req, res) {
  const { _id: userId } = req;
  const { error, message } = await getAllContacts({ userId });
  if (error) {
    const { reason, errorMessage } = error;
    const statusCode = reason === 'clientError' ? 400 : 500;
    return res.status(statusCode).json({ message: { error: errorMessage } });
  }
  const sortedContacts = message.contacts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return res.status(200).json({ message: { contacts: sortedContacts } });
}
