import { findRefreshToken } from '../utils/jwt';

export async function doesRefreshTokenExist(req, res, next) {
  const { refreshToken } = req.body;
  if (refreshToken === null || refreshToken === undefined) {
    return res
      .status(401)
      .json({ message: { error: 'The refresh token is not provided' } });
  }

  try {
    const exists = await findRefreshToken(refreshToken);
    if (!exists) {
      return res
        .status(401)
        .json({ message: { error: 'The refresh token is invalid' } });
    }
    // add refreshToken in the response.locals object to use in the following middleware
    res.locals.refreshToken = refreshToken;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: { error: error.message } });
  }
}
