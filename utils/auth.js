import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const isUserLoggedIn = async (req, res, next) => {
  try {
    // check if the token is in the cookies
    const { token = false } = req.cookies
    if (token) {
      // verify token
      const payload = await jwt.verify(token, process.env.JWT_SECRET)
      // add payload to request
      req.payload = payload
      // move on
      next()
    } else {
      throw "Not Logged In"
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default { isUserLoggedIn, authenticateToken}