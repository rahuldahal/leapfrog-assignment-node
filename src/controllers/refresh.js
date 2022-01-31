import { signJWT } from '../utils/jwt';

export async function generateNewTokenPair(req, res) {
  const { _id } = res.locals;
  try {
    // create new pair of access and refresh token
    const { accessToken, refreshToken } = await signJWT({ _id });
    res.status(200).json({
      message: { accessToken, refreshToken },
    });
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message: { error: message } });
  }
}
