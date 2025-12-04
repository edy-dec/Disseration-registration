import express from "express";
import bcrypt from "bcryptjs";
import User, { validateEmailDomain } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { authenticate } from "../middleware/auth.js";
import {
  validateRegister,
  validateLogin,
  validateStudentProfile,
  validateProfessorProfile,
  checkValidation,
} from "../middleware/validation.js";

const router = express.Router();

// POST /api/auth/register
router.post(
  "/register",
  validateRegister,
  checkValidation,
  async (req, res) => {
    try {
      const { email, password, name } = req.body;      const existingUser = await User.findOne({ 
        where: { email: email.toLowerCase() } 
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Un cont cu acest email exista deja",
        });
      }

      // valideaza domeniul email si determina tipul de utilizator
      const emailValidation = validateEmailDomain(email);
      if (!emailValidation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Email-ul trebuie sa fie de la o universitate acceptata",        });
      }

      // Creează utilizatorul
      const user = await User.create({
        email: email.toLowerCase(),
        password, // Parola va fi hash-uita automat prin hook-ul beforeSave
        name,
        userType: emailValidation.userType,
        provider: "local",
      });

      // Genereaza token JWT
      const token = generateToken({
        id: user.id, // Sequelize folosește id în loc de _id
        email: user.email,
        userType: user.userType,
        profileComplete: user.profileComplete,
      });

      res.status(201).json({
        success: true,
        message: "Contul a fost creat cu succes",
        token,
        user: user.toSafeObject(),
        requiresProfileCompletion: !user.profileComplete,
      });
    } catch (error) {
      console.error("Eroare la inregistrare:", error);
      res.status(500).json({
        success: false,
        message: "Eroare interna de server",
      });
    }
  }
);

// POST /api/auth/login - Login clasic
router.post("/login", validateLogin, checkValidation, async (req, res) => {
  try {
    const { email, password } = req.body;    // Cauta utilizatorul
    const user = await User.findOne({ 
      where: { email: email.toLowerCase() } 
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email sau parola incorecta",
      });
    }

    if (user.provider !== "local") {
      return res.status(400).json({
        success: false,
        message:
          "Acest cont foloseste autentificare externa. Foloseste butonul de login corespunzator.",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email sau parola incorecta",
      });
    }    // Genereaza token JWT
    const token = generateToken({
      id: user.id, // Sequelize folosește id în loc de _id
      email: user.email,
      userType: user.userType,
      profileComplete: user.profileComplete,
    });

    res.json({
      success: true,
      message: "Login realizat cu succes",
      token,
      user: user.toSafeObject(),
      requiresProfileCompletion: !user.profileComplete,
    });
  } catch (error) {
    console.error("Eroare la login:", error);
    res.status(500).json({
      success: false,
      message: "Eroare interna de server",
    });
  }
});

// GET /api/auth/verify -  validitate token
router.get("/verify", authenticate, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user.toSafeObject(),
      requiresProfileCompletion: !req.user.profileComplete,
    });
  } catch (error) {
    console.error("Eroare la verificarea token-ului:", error);
    res.status(500).json({
      success: false,
      message: "Eroare interna de server",
    });
  }
});

// GET /api/auth/profile - Profil utilizator autentificat
router.get("/profile", authenticate, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user.toSafeObject(),
    });
  } catch (error) {
    console.error("Eroare la obtinerea profilului:", error);
    res.status(500).json({
      success: false,
      message: "Eroare interna de server",
    });
  }
});

// PUT /api/auth/complete-profile - Completare detalii profil
router.put("/complete-profile", authenticate, async (req, res) => {
  try {
    const user = req.user;

    if (user.userType === "student") {
      await Promise.all(
        validateStudentProfile.map((validation) => validation.run(req))
      );
      const errors = checkValidation(req, res, () => {});
      if (res.headersSent) return;

      const { universityId, faculty, year, specialization } = req.body;

      user.studentDetails = {
        universityId,
        faculty,
        year: parseInt(year),
        specialization,
      };
    } else if (user.userType === "profesor") {
      await Promise.all(
        validateProfessorProfile.map((validation) => validation.run(req))
      );
      const errors = checkValidation(req, res, () => {});
      if (res.headersSent) return;

      const { department, title, researchAreas, bio } = req.body;

      user.professorDetails = {
        department,
        title,
        researchAreas,
        bio: bio || "",
      };
    }    user.profileComplete = true;
    await user.save();

    const token = generateToken({
      id: user.id, // Sequelize folosește id în loc de _id
      email: user.email,
      userType: user.userType,
      profileComplete: user.profileComplete,
    });

    res.json({
      success: true,
      message: "Profilul a fost completat cu succes",
      token,
      user: user.toSafeObject(),
      requiresProfileCompletion: false,
    });
  } catch (error) {
    console.error("Eroare la completarea profilului:", error);
    res.status(500).json({
      success: false,
      message: "Eroare interna de server",
    });
  }
});

// POST /api/auth/logout (daca e sa fie, pentru invalidarea token-ului pe server)
router.post("/logout", authenticate, async (req, res) => {
  try {
    // În implementarea actuala, logout-ul se face pe frontend prin stergerea token-ului
    // Aici putem adauga logica pentru blacklist-ul token-urilor daca e necesar

    res.json({
      success: true,
      message: "Logout realizat cu succes",
    });
  } catch (error) {
    console.error("Eroare la logout:", error);
    res.status(500).json({
      success: false,
      message: "Eroare interna de server",
    });
  }
});

export default router;
