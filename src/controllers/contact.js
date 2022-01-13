import { create, edit } from '../models/Contact';

export async function createContact(req, res, next) {
  const { name, phone } = req.body; // TODO: add photograph as well
  const { message, error } = await create({ name, phone });
  if (error) {
    const { reason, errorMessage } = error;
    const statusCode = reason === 'clientError' ? 400 : 500;
    return res.status(statusCode).json({ message: { error: errorMessage } });
  }
  const { _id } = message; // _id of new contact; will be referenced on user doc.
  req.contactId = _id;
  next();
}

export async function editContact(req, res) {
  const { name, phone } = req.body;
  const { contactId: _id } = req;
  const { message, error } = await edit({ _id, name, phone });
  if (error) {
    const { reason, errorMessage } = error;
    const statusCode = reason === 'clientError' ? 400 : 500;
    return res.status(statusCode).json({ message: { error: errorMessage } });
  }
  return res.status(201).json({ message });
}
