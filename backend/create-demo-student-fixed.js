import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Încarcă variabilele de mediu
dotenv.config();

// Conectează la MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectat la MongoDB');
  } catch (error) {
    console.error('❌ Eroare conectare MongoDB:', error);
    process.exit(1);
  }
}

// Creează cont demo student direct în baza de date (fără middleware)
async function createDemoStudent() {
  try {
    // Verifică dacă studentul demo există deja
    const existingStudent = await mongoose.connection.db.collection('users').findOne({ 
      email: 'ana.popescu@stud.ase.ro' 
    });
    
    if (existingStudent) {
      console.log('⚠️  Studentul demo există deja în baza de date');
      return;
    }

    // Hash parola
    const hashedPassword = await bcrypt.hash('demo123', 12);

    // Creează studentul demo direct în baza de date
    const demoStudentData = {
      email: 'ana.popescu@stud.ase.ro',
      password: hashedPassword,
      name: 'Ana Maria Popescu',
      provider: 'local',
      userType: 'student',
      isVerified: true,
      profileComplete: true,
      studentDetails: {
        universityId: 'STUD2024001',
        faculty: 'Facultatea de Informatică',
        year: 3,
        specialization: 'Informatică Aplicată'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Inserează direct în baza de date (ocolind middleware-ul Mongoose)
    const result = await mongoose.connection.db.collection('users').insertOne(demoStudentData);
    
    if (result.insertedId) {
      console.log('✅ Cont demo student creat cu succes!');
      console.log('📧 Email: ana.popescu@stud.ase.ro');
      console.log('🔐 Parolă: demo123');
      console.log('👤 Nume: Ana Maria Popescu');
      console.log('🎓 Specializarea: Informatică Aplicată, Anul 3');
      console.log('🆔 ID în baza de date:', result.insertedId.toString());
    }

  } catch (error) {
    console.error('❌ Eroare la crearea studentului demo:', error);
  }
}

// Funcția principală
async function main() {
  await connectToDatabase();
  await createDemoStudent();
  
  // Închide conexiunea
  await mongoose.connection.close();
  console.log('🔚 Conexiunea la baza de date a fost închisă');
  process.exit(0);
}

// Rulează scriptul
main().catch(error => {
  console.error('❌ Eroare în scriptul principal:', error);
  process.exit(1);
});
