import { getAllContacts } from '../models/User';

export default async function isContactAssociated(req, res, next) {
  const { _id: contactInQuestion } = req.params;
  const { _id: userId } = req;
  console.log({ contactInQuestion });

  try {
    const { error, message } = await getAllContacts({ userId, idOnly: true });
    const associatedContacts = message.contacts;
    const canEditContact = associatedContacts.some((contact) =>
      contact.equals(contactInQuestion)
    );

    if (canEditContact) {
      req.contactId = contactInQuestion; // will be used in next middleware
      return next();
    }
    return res
      .status(403)
      .json({ message: { error: 'Not authorized to edit this contact' } });
  } catch (error) {
    console.log(error);
  }
}
