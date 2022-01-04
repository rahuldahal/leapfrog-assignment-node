import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail';
import errorHandler from './utils/mongooseErrorHandler';

const userSchema = new Schema({
  email: String,
  password: String,
});

// basic validation
userSchema.path('email').validate(isEmail, 'You must provide a valid email');
userSchema
  .path('password')
  .validate(
    isAlphanumeric,
    'The password can only contain alphabets and numbers'
  );

// hash user password before writing to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcryptjs.hash(this.password, 10);
    return next();
  } catch (error) {
    next(error);
  }
});

const User = model('users', userSchema);

export async function createUser(data) {
  const returnValue = { error: null, message: null };
  try {
    const user = new User(data);
    const { _id } = await user.save();
    returnValue.message = _id;
    return returnValue;
  } catch (error) {
    returnValue.error = errorHandler(error);
    return returnValue;
  }
}
