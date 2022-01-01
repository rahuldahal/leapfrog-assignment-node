import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default function db() {
  return mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
