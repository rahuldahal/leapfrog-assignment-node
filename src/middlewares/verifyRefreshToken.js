import { findRefreshToken, verifyJWT } from '../utils/jwt';

export async function verifyRefreshToken(req, res, next) {
  const { refreshToken } = req.body;
  if (refreshToken === null || refreshToken === undefined) {
    return res
      .status(401)
      .json({ message: { error: 'The refresh token is not provided' } });
  }
  try {
    const doesRefreshTokenExist = await findRefreshToken(refreshToken);
    if (!doesRefreshTokenExist) {
      return res
        .status(401)
        .json({ message: { error: 'The refresh token is invalid' } });
    }
    const { _id } = verifyJWT(refreshToken, 'refresh'); // returns {_id(payload), iat}

    // add user's id and refreshToken in the request object to use in the following middleware
    res.locals._id = _id;
    res.locals.refreshToken = refreshToken;
    return next();
  } catch (error) {
    const { message } = error;
    if (message === 'jwt malformed') {
      return res
        .status(401)
        .json({ message: { error: 'The authorization token is malformed' } });
    }
    return res.status(500).json({ message: { error: message } });
  }
}
