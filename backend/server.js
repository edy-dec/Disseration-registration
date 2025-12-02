import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./utils/dbManager.js";
import cors from "cors";

// Import rute
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Verifica variabilele de mediu
if (!MONGO_URI) {
  console.error("❌ EROARE: Nu am gasit MONGO_URI în fisierul .env!");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ EROARE: Nu am gasit JWT_SECRET în fisierul .env!");
  process.exit(1);
}

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Middleware pentru logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rute API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Rută de test
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server funcționează corect",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Middleware pentru rute inexistente
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta nu a fost găsită",
    path: req.originalUrl,
  });
});

// Middleware pentru gestionarea erorilor
app.use((error, req, res, next) => {
  console.error("Eroare neașteptată:", error);

  res.status(500).json({
    success: false,
    message: "Eroare internă de server",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

// Conectare la MongoDB si pornire server
async function startServer() {
  try {
    console.log("⏳ Încerc conectarea la MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("✅ Conexiune MongoDB REUȘITĂ!");

    // Porneste serverul
    app.listen(PORT, () => {
      console.log(`🚀 Serverul rulează pe portul ${PORT}`);
      console.log(`📍 API Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🔐 API Auth: http://localhost:${PORT}/api/auth`);
      console.log(`👥 API Users: http://localhost:${PORT}/api/users`);
      console.log("\n🎉 SERVERUL ESTE GATA DE FOLOSIRE!");
    });
  } catch (error) {
    console.error("\n❌ EROARE la pornirea serverului:");
    console.error(error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("\n⏳ Închid serverul...");

  try {
    await mongoose.connection.close();
    console.log("✅ Conexiunea MongoDB a fost inchisa");
    process.exit(0);
  } catch (error) {
    console.error("❌ Eroare la inchiderea conexiunii MongoDB:", error);
    process.exit(1);
  }
});

startServer();
