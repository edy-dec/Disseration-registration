import { body, validationResult } from 'express-validator';
import { validateEmailDomain } from '../models/User.js';


export const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Datele introduse nu sunt valide',
      errors: errors.array()
    });
  }
  
  next();
};


export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Format email invalid')
    .normalizeEmail()
    .custom((email) => {
      const validation = validateEmailDomain(email);
      if (!validation.isValid) {
        throw new Error('Email-ul trebuie sa fie de la o universitate acceptata');
      }
      return true;
    }),
    
  body('password')
    .isLength({ min: 6 })
    .withMessage('Parola trebuie sa aiba minimum 6 caractere')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Parola trebuie sa contina cel putin o litera mica, o litera mare si o cifra'),
    
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirmarea parolei nu se potriveste cu parola');
      }
      return true;
    }),
    
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Numele trebuie sa aiba intre 2 si 100 de caractere')
    .matches(/^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/)
    .withMessage('Numele poate contine doar litere, spatii si cratime')
];


export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Format email invalid')
    .normalizeEmail(),
    
  body('password')
    .notEmpty()
    .withMessage('Parola este obligatorie')
];


export const validateStudentProfile = [
  body('universityId')
    .trim()
    .notEmpty()
    .withMessage('ID-ul de student este obligatoriu')
    .isLength({ min: 3, max: 20 })
    .withMessage('ID-ul de student trebuie sa aiba intre 3 si 20 de caractere'),
    
  body('faculty')
    .trim()
    .notEmpty()
    .withMessage('Facultatea este obligatorie')
    .isLength({ max: 100 })
    .withMessage('Numele facultatii nu poate depasi 100 de caractere'),
    
  body('year')
    .isInt({ min: 1, max: 6 })
    .withMessage('Anul de studiu trebuie sa fie între 1 și 6'),
    
  body('specialization')
    .trim()
    .notEmpty()
    .withMessage('Specializarea este obligatorie')
    .isLength({ max: 100 })
    .withMessage('Numele specializarii nu poate depasi 100 de caractere')
];


export const validateProfessorProfile = [
  body('department')
    .trim()
    .notEmpty()
    .withMessage('Departamentul este obligatoriu')
    .isLength({ max: 100 })
    .withMessage('Numele departamentului nu poate depasi 100 de caractere'),
    
  body('title')
    .isIn(['Lect. Dr.', 'Conf. Dr.', 'Prof. Dr.', 'Asist. Dr.'])
    .withMessage('Titlul academic nu este valid'),
    
  body('researchAreas')
    .isArray({ min: 1 })
    .withMessage('Cel putin o zona de cercetare este obligatorie'),
    
  body('researchAreas.*')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Fiecare zona de cercetare trebuie sa aiba intre 2 si 100 de caractere'),
    
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Bio-ul nu poate depasi 1000 de caractere')
];
