import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail';

const userSchema = new Schema({
  email: String,
  password: String,
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
    const { message, name } = error;
    if (name === 'ValidationError') {
      const errorsOnly = message.split('users validation failed:')[1];
      const errorsArray = errorsOnly.split(',');
      const readableErrors = errorsArray.map((error) =>
        error.split(':')[1].trim()
      );
      returnValue.error = {
        reason: 'clientError',
        errorMessage: readableErrors,
      };
      return returnValue;
    }
    returnValue.error = { reason: 'serverError', errorMessage: message };
    return returnValue;
  }
}

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
