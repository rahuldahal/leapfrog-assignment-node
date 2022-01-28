import { model, Schema } from 'mongoose';

const refreshTokenSchema = new Schema({
  token: { type: String, required: true },
});

const RefreshToken = model('RefreshToken', refreshTokenSchema);

export default RefreshToken;
