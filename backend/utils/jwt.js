import jwt from 'jsonwebtoken';


export const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET nu este setat în .env');
  }
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};


export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET nu este setat în .env');
  }
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expirat');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Token invalid');
    }
    throw error;
  }
};


export const extractTokenFromHeader = (authHeader) => {
  if (!authHeader) {
    return null;
  }
  
 
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
};
