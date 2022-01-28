import { removeRefreshTokenFromDatabase, signJWT } from '../models/utils/jwt';

export async function generateNewTokenPair(req, res) {
  const { _id, refreshToken } = res.locals;
  console.log({ _id, refreshToken });
  try {
    // invalidate refreshToken
    await removeRefreshTokenFromDatabase(refreshToken);

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
