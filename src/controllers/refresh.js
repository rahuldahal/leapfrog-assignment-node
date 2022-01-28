import {
  generateAccessToken,
  generateRefreshToken,
  removeRefreshTokenFromDatabase,
} from '../models/utils/jwt';

export async function generateNewTokenPair(req, res) {
  const { _id, refreshToken } = req;
  try {
    // invalidate refreshToken
    await removeRefreshTokenFromDatabase(refreshToken);

    // create new pair of access and refresh token
    const newAccessToken = generateAccessToken({ _id });
    const newRefreshToken = generateRefreshToken({ _id });
    res.status(200).json({
      message: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    });
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message: { error: message } });
  }
}
