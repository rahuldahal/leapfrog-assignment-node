import { verifyJWT } from '../utils/jwt';

export default async function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(' ')[1]; // Bearer GeneratedTokenString
  if (!token) {
    return res
      .status(403)
      .json({ message: { error: 'The authorization token is not provided' } });
  }
  try {
    const { _id } = await verifyJWT(token); // returns {_id(payload), iat, exp}
    req._id = _id; // will be accessed on next middleware/controller
    next();
  } catch (error) {
    const { message } = error;
    res.status(403);
    if (message === 'jwt malformed') {
      return res
        .status(403)
        .json({ message: { error: 'The authorization token is malformed' } });
    } else if (message === 'jwt expired') {
      return res
        .status(403)
        .json({ message: { error: 'The authorization token is expired' } });
    }
    return res.status(500).json({ message: { error: message } });
  }
}
