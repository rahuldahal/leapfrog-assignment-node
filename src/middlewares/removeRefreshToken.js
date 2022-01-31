import { removeRefreshTokenFromDatabase } from '../utils/jwt';

export async function removeRefreshToken(req, res, next) {
  const { refreshToken } = res.locals;

  try {
    await removeRefreshTokenFromDatabase(refreshToken);
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: { error: error.message } });
  }
}
