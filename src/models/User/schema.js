import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail';

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

export default User;