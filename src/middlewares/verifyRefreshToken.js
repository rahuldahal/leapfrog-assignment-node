import { verifyJWT } from '../utils/jwt';

export async function verifyRefreshToken(req, res, next) {
  const { refreshToken } = res.locals;
  try {
    const { _id } = verifyJWT(refreshToken, 'refresh'); // returns {_id(payload), iat}

    // add user's id in the response.locals object to use in the following middleware
    res.locals._id = _id;
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
