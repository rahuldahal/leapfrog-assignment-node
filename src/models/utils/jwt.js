import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function signJWT(payload) {
  return {
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    }),
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET),
  };
}
