import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: String,
  phone: Number,
  photograph: {
    type: String,
    default: 'https://ui-avatars.com/api/?background=random', // will append contact's name as query param with schema.pre.save()
  },
});

const Contact = model('Contact', contactSchema);

export default Contact;
