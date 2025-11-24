import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

console.log("⏳ Încerc conectarea la MongoDB...");

if (!uri) {
  console.error("❌ EROARE: Nu am găsit MONGO_URI în fișierul .env!");
  process.exit(1);
}

async function testConnection() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Conexiune REUȘITĂ!");

    const TestSchema = new mongoose.Schema({ message: String });
    // Verificăm dacă modelul există deja ca să nu dea eroare la re-rulare în unele medii
    const TestModel =
      mongoose.models.TestConnectivity ||
      mongoose.model("TestConnectivity", TestSchema);

    await TestModel.create({ message: "Salut din scriptul de test (ESM)!" });
    console.log("✅ Scriere în baza de date REUȘITĂ!");

    await mongoose.connection.dropCollection("testconnectivities");
    console.log("✅ Curățenie REUȘITĂ!");

    console.log("\n🎉 TOTUL FUNCȚIONEAZĂ PERFECT!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ EROARE CRITICĂ:");
    console.error(error);
    process.exit(1);
  }
}

testConnection();
