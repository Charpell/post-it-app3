import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.TOKEN_SECRET;


const jwtTokenValidation = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'] ||
   req.header('authorization');
  if (!token) {
    return res.status(403).json({ error: 'No valid token provided' });
  }
  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      if (error.message === 'jwt expired') {
        return res.status(401).json({ error: 'Token has expired' });
      }
      return res.status(401).send(error);
    }
    req.decoded = decoded;
    next();
  });
};

export default jwtTokenValidation;
