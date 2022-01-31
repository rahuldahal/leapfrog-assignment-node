import { removeRefreshTokenFromDatabase } from '../utils/jwt';

export async function removeRefreshToken(req, res, next) {
  const { refreshTokenFromClient } = res.locals;

  try {
    await removeRefreshTokenFromDatabase(refreshTokenFromClient);
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: { error: error.message } });
  }
}
