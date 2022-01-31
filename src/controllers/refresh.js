import { removeRefreshTokenFromDatabase, signJWT } from '../utils/jwt';

export async function generateNewTokenPair(req, res) {
  const { _id, refreshTokenFromClient } = res.locals;
  try {
    // invalidate refreshToken
    await removeRefreshTokenFromDatabase(refreshTokenFromClient);

    // create new pair of access and refresh token
    const { accessToken, refreshToken } = signJWT({ _id });
    res.status(200).json({
      message: { accessToken, refreshToken },
    });
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message: { error: message } });
  }
}
