import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RefreshToken from '../models/RefreshToken/schema';

dotenv.config();

export function generateAccessToken(payload, expiresIn = '5m') {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn,
  });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
}

export async function findRefreshToken(token) {
  try {
    const refreshTokens = await RefreshToken.find();
    console.log(refreshTokens);
    return refreshTokens.some((refreshToken) => refreshToken.token === token);
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

async function addRefreshTokenToDatabase(token) {
  const refreshToken = new RefreshToken({ token });
  try {
    await refreshToken.save();
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

export async function removeRefreshTokenFromDatabase(token) {
  try {
    await RefreshToken.findOneAndRemove({ token });
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

export function verifyJWT(token, type = 'access') {
  const SECRET =
    type === 'refresh'
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET;
  return jwt.verify(token, SECRET);
}

export async function signJWT(payload) {
  const accessToken = generateAccessToken(payload); // TODO: increase expiration time
  const refreshToken = generateRefreshToken(payload);

  // store refresh token in the database
  await addRefreshTokenToDatabase(refreshToken);
  return {
    accessToken,
    refreshToken,
  };
}
