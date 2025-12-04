import express from "express";
import User from "../models/User.js";
import sequelize from "../config/sequelize.js";
import { Op } from 'sequelize';
import { authenticate } from "../middleware/auth.js";
import {
  professorOnly,
  studentOnly,
  requireCompleteProfile,
} from "../middleware/roleCheck.js";

const router = express.Router();

// GET /api/users/students - Lista studenti (doar pentru profesori)
router.get(
  "/students",
  authenticate,
  professorOnly,
  requireCompleteProfile,
  async (req, res) => {
    try {      const students = await User.findAll({
        where: { 
          userType: "student", 
          profileComplete: true 
        },
        attributes: [
          'id', 'name', 'email', 'studentDetails', 'createdAt'
        ],        order: [
          [sequelize.literal("student_details->>'faculty'"), 'ASC'],
          [sequelize.literal("(student_details->>'year')::integer"), 'ASC'],
          ['name', 'ASC']
        ]
      });

      res.json({
        success: true,
        students: students.map((student) => student.toSafeObject()),
      });
    } catch (error) {
      console.error("Eroare la obtinerea listei de studenti:", error);
      res.status(500).json({
        success: false,
        message: "Eroare interna de server",
      });
    }
  }
);

// GET /api/users/professors - Lista profesori (pentru toți utilizatorii autentificați)
router.get(
  "/professors",
  authenticate,
  requireCompleteProfile,
  async (req, res) => {
    try {      const professors = await User.findAll({
        where: { 
          userType: "profesor", 
          profileComplete: true 
        },
        attributes: [
          'id', 'name', 'email', 'professorDetails', 'createdAt'
        ],
        order: [
          [sequelize.literal("professor_details->>'department'"), 'ASC'],
          ['name', 'ASC']
        ]
      });

      res.json({
        success: true,
        professors: professors.map((professor) => professor.toSafeObject()),
      });
    } catch (error) {
      console.error("Eroare la obtinerea listei de profesori:", error);
      res.status(500).json({
        success: false,
        message: "Eroare interna de server",
      });
    }
  }
);

// GET /api/users/me - Informatii despre utilizatorul curent
router.get("/me", authenticate, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user.toSafeObject(),
    });
  } catch (error) {
    console.error("Eroare la obtinerea informatiilor utilizatorului:", error);
    res.status(500).json({
      success: false,
      message: "Eroare interna de server",
    });
  }
});

// GET /api/users/stats - Statistici generale (pentru profesori)
router.get(
  "/stats",
  authenticate,
  professorOnly,
  requireCompleteProfile,
  async (req, res) => {    try {
      // Statistici pentru studenți
      const studentsStats = await User.findAll({
        where: { userType: 'student' },
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
          [sequelize.fn('SUM', sequelize.literal('CASE WHEN profile_complete = true THEN 1 ELSE 0 END')), 'profileComplete']
        ],
        raw: true
      });

      // Statistici pentru profesori
      const professorsStats = await User.findAll({
        where: { userType: 'profesor' },
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
          [sequelize.fn('SUM', sequelize.literal('CASE WHEN profile_complete = true THEN 1 ELSE 0 END')), 'profileComplete']
        ],
        raw: true
      });

      const studentsCount = {
        total: parseInt(studentsStats[0]?.total || 0),
        profileComplete: parseInt(studentsStats[0]?.profileComplete || 0),
      };

      const professorsCount = {
        total: parseInt(professorsStats[0]?.total || 0),
        profileComplete: parseInt(professorsStats[0]?.profileComplete || 0),
      };

      res.json({
        success: true,
        stats: {
          students: {
            total: studentsCount.total,
            profileComplete: studentsCount.profileComplete,
            profileIncomplete:
              studentsCount.total - studentsCount.profileComplete,
          },
          professors: {
            total: professorsCount.total,
            profileComplete: professorsCount.profileComplete,
            profileIncomplete:
              professorsCount.total - professorsCount.profileComplete,
          },
        },
      });
    } catch (error) {
      console.error("Eroare la obtinerea statisticilor:", error);
      res.status(500).json({
        success: false,
        message: "Eroare interna de server",
      });
    }
  }
);

export default router;
