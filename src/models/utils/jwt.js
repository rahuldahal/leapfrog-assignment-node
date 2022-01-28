import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

let dummyDB = [];

export function generateAccessToken(payload, expiresIn = '5m') {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn,
  });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
}

export async function findRefreshToken(token) {
  return dummyDB.includes(token);
}

async function addRefreshTokenToDatabase(token) {
  return dummyDB.push(token);
}

export async function removeRefreshTokenFromDatabase(token) {
  dummyDB = dummyDB.filter((refreshToken) => refreshToken !== token);
  console.log(dummyDB);
}

export function verifyJWT(token, type = 'access') {
  const SECRET =
    type === 'refresh'
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET;
  return jwt.verify(token, SECRET);
}

export async function signJWT(payload) {
  const accessToken = generateAccessToken(payload, '15s'); // TODO: increase expiration time
  const refreshToken = generateRefreshToken(payload);

  // store refresh token in the database
  await addRefreshTokenToDatabase(refreshToken);
  console.log(dummyDB);
  return {
    accessToken,
    refreshToken,
  };
}
