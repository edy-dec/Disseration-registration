# 🎓 Disseration Registration Single Page Application

O aplicație web completă pentru înregistrarea studenților și profesorilor, cu validarea domeniilor de email și panouri dedicate rolului utilizatorului. Dezvoltată cu React pe frontend și Node.js + PostgreSQL pe backend.

## ✅ Funcționalități principale

### 🔐 Autentificare & Autorizare
- Validarea domeniului de email cu detectarea automată a rolului (student/profesor)
- Înregistrare securizată cu criptarea parolelor (bcrypt)
- Autentificare bazată pe token JWT
- Dashboard-uri diferite pentru studenți și profesori
- Rute protejate, accesibile doar după autentificare

### 🗄️ Bază de Date & Backend
- Bază de date PostgreSQL (ORM: Sequelize)
- API RESTful complet
- Validarea inputului cu express-validator
- Gestionarea centralizată a erorilor
- Configurat pentru producție pe Microsoft Azure

### 💻 Frontend
- React 18 cu hooks și context
- Design responsive pentru mobil
- Validare în timp real în formulare
- Interfețe separate în funcție de rol
- Comunicare cu API folosind Axios

## 🚀 Pornire Rapidă

### Cerințe
- Node.js 18+
- PostgreSQL 15+
- npm sau yarn

### 1️⃣ Configurare Backend

```bash
cd backend
npm install
```

Creează fișierul `.env` cu configurarea bazei de date:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dissertation_registration_dev
DB_USERNAME=postgres
DB_PASSWORD=your-password
JWT_SECRET=your-super-secure-jwt-secret
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Pornește serverul:

```bash
npm start
```

### 2️⃣ Configurare Frontend

```bash
cd dissertation-registration
npm install
```

Creează fișierul `.env`:

```bash
echo "REACT_APP_API_URL=http://localhost:5000" > .env
```

Pornește aplicația:

```bash
npm start
```

### 3️⃣ Accesare Aplicație

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API Backend**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

## 📧 Validarea Domeniului de Email

### Domenii Studenți
- `@stud.ase.ro` / `@student.ase.ro` (ASE)
- `@student.upt.ro` (UPT)
- `@student.utcluj.ro` (UTC)
- `@stud.ubbcluj.ro` (UBB)
- `@student.upb.ro` (UPB)

### Domenii Profesori
- `@ase.ro` / `@ie.ase.ro` (ASE)
- `@upt.ro` (UPT)
- `@utcluj.ro` (UTC)
- `@ubbcluj.ro` (UBB)
- `@upb.ro` (UPB)

## 🔗 API Endpoints

### Autentificare
- `POST /api/auth/register` — Înregistrare utilizator
- `POST /api/auth/login` — Autentificare
- `GET /api/auth/verify` — Verificare token
- `GET /api/auth/profile` — Date utilizator autentificat
- `PUT /api/auth/complete-profile` — Finalizare profil

### Utilizatori (Protejat)
- `GET /api/users/students` — Listă studenți
- `GET /api/users/professors` — Listă profesori
- `GET /api/users/me` — Profil utilizator curent

## 🧩 Schema Bazei de Date PostgreSQL

### Tabelul Users

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| `id` | SERIAL | Cheie primară |
| `email` | VARCHAR | Unic, obligatoriu |
| `password` | VARCHAR | Parolă criptată |
| `name` | VARCHAR | Obligatoriu |
| `user_type` | ENUM | 'student' sau 'professor' |
| `student_details` | JSONB | Detalii suplimentare student |
| `professor_details` | JSONB | Detalii suplimentare profesor |
| `is_verified` | BOOLEAN | Implicit false |
| `profile_complete` | BOOLEAN | Implicit false |
| `created_at` | TIMESTAMP | Data creării |
| `updated_at` | TIMESTAMP | Data ultimei actualizări |

## ☁️ Deploy pe Microsoft Azure

### Componente folosite:
- **Azure Database for PostgreSQL**
- **Azure App Service** pentru backend
- **Azure Static Web Apps** pentru frontend



## 🧰 Stack Tehnologic

### Backend
- Node.js 18, Express.js
- PostgreSQL + Sequelize
- JWT + bcrypt
- express-validator

### Frontend
- React 18 + React Router v6
- Axios
- React Context
- CSS responsive

## 📌 Status Proiect

### ✅ Finalizat
- ✔️ Migrare completă PostgreSQL
- ✔️ Sistem de autentificare
- ✔️ Validarea domeniului email
- ✔️ Dashboard cu roluri
- ✔️ Configurație pentru Azure

### 🚧 În dezvoltare
- ⏳ Gestiune teme de disertație
- ⏳ Depunerea temelor
- ⏳ Upload fișiere
- ⏳ Notificări email

## 🧪 Testare

Poți testa înregistrarea cu email educațional:
- **Student**: `test@stud.ase.ro`
- **Profesor**: `prof@ase.ro`

**🚀 Gata de producție!** PostgreSQL ✔️ | JWT Auth ✔️ | Azure ✔️
