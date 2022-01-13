import Contact from './schema';
import errorHandler from '../utils/mongooseErrorHandler';

export async function create({ name, phone }) {
  // TODO: add photograph as well
  const returnValue = { error: null, message: null };
  try {
    const contact = new Contact({ name, phone });
    const { _id } = await contact.save();
    returnValue.message = { _id };
    return returnValue;
  } catch (error) {
    returnValue.error = errorHandler(error);
    return returnValue;
  }
}

export async function edit({ _id, name, phone }) {
  // TODO: add photograph as well
  const returnValue = { error: null, message: null };
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id },
      { name, phone },
      { new: true }
    );
    returnValue.message = { updatedContact };
    return returnValue;
  } catch (error) {
    returnValue.error = errorHandler(error);
    return returnValue;
  }
}
