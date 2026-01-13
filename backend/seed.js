/**
 * Seed Script - Date de test pentru baza de date
 * Rulează cu: node seed.js
 */
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { sequelize, User, RegistrationSession, DissertationRequest } = require("./models");

const seedDatabase = async () => {
  try {
    console.log("🌱 Începe popularea bazei de date...\n");

    // Sincronizează baza de date
    await sequelize.sync({ force: true }); // ATENȚIE: șterge toate datele existente!
    console.log("✓ Baza de date sincronizată\n");

    // Hash pentru parola (parola: "test123")
    const hashedPassword = await bcrypt.hash("test123", 10);

    // ==================== PROFESORI ====================
    console.log("📚 Creare profesori...");
    const professors = await User.bulkCreate([
      {
        email: "ion.popescu@ase.ro",
        password: hashedPassword,
        firstName: "Ion",
        lastName: "Popescu",
        role: "professor",
      },
      {
        email: "maria.ionescu@ase.ro",
        password: hashedPassword,
        firstName: "Maria",
        lastName: "Ionescu",
        role: "professor",
      },
      {
        email: "andrei.georgescu@ase.ro",
        password: hashedPassword,
        firstName: "Andrei",
        lastName: "Georgescu",
        role: "professor",
      },
    ]);
    console.log(`✓ ${professors.length} profesori creați\n`);

    // ==================== STUDENȚI ====================
    console.log("🎓 Creare studenți...");
    const students = await User.bulkCreate([
      {
        email: "alex.marin@student.ase.ro",
        password: hashedPassword,
        firstName: "Alexandru",
        lastName: "Marin",
        role: "student",
      },
      {
        email: "elena.stanescu@student.ase.ro",
        password: hashedPassword,
        firstName: "Elena",
        lastName: "Stănescu",
        role: "student",
      },
      {
        email: "mihai.dobre@student.ase.ro",
        password: hashedPassword,
        firstName: "Mihai",
        lastName: "Dobre",
        role: "student",
      },
      {
        email: "ana.popa@student.ase.ro",
        password: hashedPassword,
        firstName: "Ana",
        lastName: "Popa",
        role: "student",
      },
      {
        email: "cristian.rusu@student.ase.ro",
        password: hashedPassword,
        firstName: "Cristian",
        lastName: "Rusu",
        role: "student",
      },
    ]);
    console.log(`✓ ${students.length} studenți creați\n`);

    // ==================== SESIUNI DE ÎNREGISTRARE ====================
    console.log("📅 Creare sesiuni de înregistrare...");
    
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const sessions = await RegistrationSession.bulkCreate([
      {
        professorId: professors[0].id, // Ion Popescu
        title: "Disertații Inteligență Artificială 2026",
        description: "Caut studenți interesați de machine learning, deep learning și NLP. Proiecte practice cu aplicații reale.",
        startDate: today,
        endDate: nextMonth,
        maxStudents: 5,
        isActive: true,
      },
      {
        professorId: professors[0].id, // Ion Popescu - sesiune veche
        title: "Disertații Big Data 2025",
        description: "Sesiune închisă - doar pentru referință.",
        startDate: lastMonth,
        endDate: today,
        maxStudents: 3,
        isActive: false,
      },
      {
        professorId: professors[1].id, // Maria Ionescu
        title: "Cybersecurity & Blockchain 2026",
        description: "Teme disponibile: securitate aplicații web, smart contracts, criptografie aplicată.",
        startDate: today,
        endDate: nextMonth,
        maxStudents: 4,
        isActive: true,
      },
      {
        professorId: professors[2].id, // Andrei Georgescu
        title: "Cloud Computing & DevOps 2026",
        description: "Proiecte cu AWS, Azure, Kubernetes. Experiență practică în infrastructură cloud.",
        startDate: today,
        endDate: nextMonth,
        maxStudents: 6,
        isActive: true,
      },
    ]);
    console.log(`✓ ${sessions.length} sesiuni create\n`);

    // ==================== CERERI DE DISERTAȚIE ====================
    console.log("📝 Creare cereri de disertație...");
    
    const requests = await DissertationRequest.bulkCreate([
      {
        sessionId: sessions[0].id, // AI - Ion Popescu
        studentId: students[0].id, // Alexandru Marin
        professorId: professors[0].id,
        status: "approved",
        dissertationTitle: "Sistem de recomandare bazat pe deep learning",
      },
      {
        sessionId: sessions[0].id, // AI - Ion Popescu
        studentId: students[1].id, // Elena Stănescu
        professorId: professors[0].id,
        status: "pending",
        dissertationTitle: null,
      },
      {
        sessionId: sessions[2].id, // Cybersecurity - Maria Ionescu
        studentId: students[2].id, // Mihai Dobre
        professorId: professors[1].id,
        status: "approved",
        dissertationTitle: "Detectarea vulnerabilităților în aplicații web folosind ML",
      },
      {
        sessionId: sessions[2].id, // Cybersecurity - Maria Ionescu
        studentId: students[3].id, // Ana Popa
        professorId: professors[1].id,
        status: "rejected",
        rejectionReason: "Tema propusă nu corespunde domeniului meu de expertiză. Vă recomand să contactați prof. Georgescu pentru proiecte de infrastructură.",
      },
      {
        sessionId: sessions[3].id, // Cloud - Andrei Georgescu
        studentId: students[4].id, // Cristian Rusu
        professorId: professors[2].id,
        status: "pending",
        dissertationTitle: null,
      },
    ]);
    console.log(`✓ ${requests.length} cereri create\n`);

    // ==================== SUMAR ====================
    console.log("═".repeat(50));
    console.log("🎉 Baza de date a fost populată cu succes!\n");
    console.log("📊 SUMAR:");
    console.log(`   • Profesori: ${professors.length}`);
    console.log(`   • Studenți: ${students.length}`);
    console.log(`   • Sesiuni: ${sessions.length}`);
    console.log(`   • Cereri: ${requests.length}`);
    console.log("\n🔐 DATE DE AUTENTIFICARE (parola pentru toți: test123):");
    console.log("\n   PROFESORI:");
    professors.forEach(p => {
      console.log(`   • ${p.email}`);
    });
    console.log("\n   STUDENȚI:");
    students.forEach(s => {
      console.log(`   • ${s.email}`);
    });
    console.log("═".repeat(50));

  } catch (error) {
    console.error("❌ Eroare la popularea bazei de date:", error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

seedDatabase();
