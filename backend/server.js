import "dotenv/config";
import express from "express";
import { sequelize, testConnection } from "./config/sequelize.js";
import User from "./models/User.js";
import cors from "cors";
// Import rute
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for production and development
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "https://dissertation-frontend.azurestaticapps.net",
  "http://localhost:3000",
];

// Verifica variabilele de mediu pentru baza de date
const requiredEnvVars = ["DB_HOST", "DB_NAME", "DB_USERNAME", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error(
    `❌ EROARE: Variabilele de mediu lipsesc: ${missingEnvVars.join(", ")}`
  );
  console.error("��� Adaugă aceste variabile în fișierul .env");
  process.exit(1);
}

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Dissertation Registration API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rute API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Ruta de test
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server funcționează corect",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: "PostgreSQL",
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

// Conectare la PostgreSQL și pornire server
async function startServer() {
  try {
    console.log("⏳ Încerc conectarea la PostgreSQL...");

    // Testează conexiunea la baza de date
    await testConnection();

    // Sincronizează modelele cu baza de date
    await sequelize.sync({
      force: false, // Nu șterge tabelele existente
      alter: process.env.NODE_ENV === "development", // Permite alterări în development
    });
    console.log("✅ Sincronizarea bazei de date completă!");

    // Pornește serverul
    app.listen(PORT, () => {
      console.log(`��� Serverul rulează pe portul ${PORT}`);
      console.log(`��� API Health Check: http://localhost:${PORT}/api/health`);
      console.log(`��� API Auth: http://localhost:${PORT}/api/auth`);
      console.log(`��� API Users: http://localhost:${PORT}/api/users`);
      console.log(`���️  Baza de date: PostgreSQL`);
      console.log(`��� Mediu: ${process.env.NODE_ENV || "development"}`);
      console.log(`��� CORS configurate pentru: ${allowedOrigins.join(", ")}`);
      console.log("\n��� SERVERUL ESTE GATA DE FOLOSIRE!");
    });
  } catch (error) {
    console.error("\n❌ EROARE la pornirea serverului:");
    console.error(error.message);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("\n⏳ Închid serverul...");
  try {
    await sequelize.close();
    console.log("✅ Conexiunea PostgreSQL a fost închisă");
    process.exit(0);
  } catch (error) {
    console.error("❌ Eroare la închiderea conexiunii PostgreSQL:", error);
    process.exit(1);
  }
});

startServer();
