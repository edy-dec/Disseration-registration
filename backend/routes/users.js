import express from "express";
import User from "../models/User.js";
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
    try {
      const students = await User.find(
        { userType: "student", profileComplete: true },
        "name email studentDetails.faculty studentDetails.year studentDetails.specialization createdAt"
      ).sort({
        "studentDetails.faculty": 1,
        "studentDetails.year": 1,
        name: 1,
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
    try {
      const professors = await User.find(
        { userType: "profesor", profileComplete: true },
        "name email professorDetails.department professorDetails.title professorDetails.researchAreas professorDetails.bio createdAt"
      ).sort({ "professorDetails.department": 1, name: 1 });

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
  async (req, res) => {
    try {
      const stats = await User.aggregate([
        {
          $group: {
            _id: "$userType",
            total: { $sum: 1 },
            profileComplete: {
              $sum: { $cond: ["$profileComplete", 1, 0] },
            },
          },
        },
      ]);

      const studentsCount = stats.find((s) => s._id === "student") || {
        total: 0,
        profileComplete: 0,
      };
      const professorsCount = stats.find((s) => s._id === "profesor") || {
        total: 0,
        profileComplete: 0,
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
