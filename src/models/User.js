import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail';
import { signJWT } from './utils/jwt';
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

// methods
userSchema.methods.validatePassword = async function (
  password,
  hashedPassword
) {
  return await bcryptjs.compare(password, hashedPassword);
};
userSchema.methods.doesEmailExist = async function (email) {
  return await this.constructor.findOne({ email });
};

const User = model('users', userSchema);

export async function createUser(data) {
  const returnValue = { error: null, message: null };
  try {
    const user = new User(data);
    const { _id } = await user.save();
    returnValue.message = signJWT({ _id });
    return returnValue;
  } catch (error) {
    returnValue.error = errorHandler(error);
    return returnValue;
  }
}

export async function signInUser({ email, password }) {
  const returnValue = { error: null, message: null };
  if (
    typeof email === 'undefined' ||
    email === '' ||
    typeof password === 'undefined' ||
    password === ''
  ) {
    returnValue.error = {
      reason: 'clientError',
      errorMessage: 'You must provide both email and password',
    };
    return returnValue;
  }
  if (!isEmail(email)) {
    returnValue.error = {
      reason: 'clientError',
      errorMessage: 'The provided email is not of valid type',
    };
    return returnValue;
  }
  if (typeof password !== 'string') {
    returnValue.error = {
      reason: 'clientError',
      errorMessage: 'The provided password is not of valid type',
    };
    return returnValue;
  }

  // authenticate user
  const user = await User.prototype.doesEmailExist(email);
  if (!user) {
    returnValue.error = {
      reason: 'clientError',
      errorMessage: `The provided email '${email}' doesn't exist on our database`,
    };
    return returnValue;
  }
  const isPasswordValid = await User.prototype.validatePassword(
    password,
    user.password // hashed
  );
  if (!isPasswordValid) {
    returnValue.error = {
      reason: 'clientError',
      errorMessage: 'The provided password is incorrect',
    };
    return returnValue;
  }

  returnValue.message = 'Logged in!';
  return returnValue;
}
