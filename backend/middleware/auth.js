import { verifyToken, extractTokenFromHeader } from '../utils/jwt.js';
import User from '../models/User.js';


export const authenticate = async (req, res, next) => {
  try {
    
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acces lipsă'
      });
    }
    
 
    const decoded = verifyToken(token);
    
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Utilizator nu a fost găsit'
      });
    }
    
    
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Token invalid'
    });
  }
};


export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);
      
      if (user) {
        req.user = user;
        req.token = token;
      }
    }
    
    next();
  } catch (error) {
    // in cazul optionalAuth, continuam chiar dacă token-ul e invalid
    next();
  }
};
