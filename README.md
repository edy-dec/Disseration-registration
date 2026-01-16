# Dissertation Registration Web Application

O aplicație web pentru managementul solicitărilor de înscriere la disertație între studenți și profesori.

## Deploy Live

- [Aplicația pe Render](https://disseration-registration-1.onrender.com)

## Funcționalități principale

### Pentru studenți
- Înregistrare/Autentificare
- Vizualizare sesiuni de înscriere disponibile
- Trimitere cereri de disertație către profesori
- Urmărire status cereri (aprobat/respins + motiv)
- Vizualizare motive de respingere

### Pentru profesori
- Înregistrare/Autentificare
- Creare și gestionare sesiuni de înscriere (perioade, nr. maxim studenți)
- Revizuire cereri ale studenților
- Aprobare cereri (în limita locurilor)
- Respingere cereri cu motiv

## Tehnologii folosite

- **Frontend**: React 19, Vite, React Router
- **Backend**: Express.js (Node.js)
- **Bază de date**: PostgreSQL (gestionat prin Sequelize ORM)
- **Autentificare**: JWT
- **API**: REST

> **Notă:** Începând cu 2026, aplicația folosește **PostgreSQL** ca stocare, nu SQLite!  
> Setările pentru conectare la Postgres se configurează în fișierul `.env` după modelul `backend/.env.example`.

---

## Structură proiect

```
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
```

---

## Instructiuni rapide de instalare locală

### 1. Backend (Express + PostgreSQL)

```bash
cd backend
npm install
cp .env.example .env
# Editați .env cu valorile PostgreSQL (vezi exemple mai jos)
npm run dev
```

#### Exemplu .env pentru Postgres local:

```
PORT=8080
NODE_ENV=development
JWT_SECRET=alege_un_secret
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dissertation_db
DB_USER=postgres
DB_PASS=postgres
```

Puteți folosi și o conexiune completă, de ex:
```
DATABASE_URL=postgres://user:password@localhost:5432/dissertation_db
DB_SSL=false
```

> **Atenție:** Baza de date trebuie creată deja în Postgres (`createdb dissertation_db`).

---

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
cp .env.example .env.local
# Optional: modificați adresa backendului în .env.local, ex:
# VITE_API_URL=http://localhost:8080/api
npm run dev
```

Acces: http://localhost:5173

---

### 3. Pornire rapidă cu script:
```bash
chmod +x start.sh
./start.sh
```
Acesta pornește automat backend + frontend (vedeți loguri în terminal).

---

## Workflow Demo

1. **Profesor**: creează o sesiune nouă (titlu, descriere, dată de început/sfârșit, nr. maxim studenți)
2. **Student**: se autentifică, vede sesiuni active și trimite cerere
3. **Profesor**: aprovă sau respinge cereri, oferă motiv la respingere
4. **Student**: verifică status cereri în tab-ul "My Requests"

### Conturi Demo (după creare):

**Profesor**
- Email: prof@university.edu
- Parolă: password123

**Student**
- Email: student@university.edu
- Parolă: password123

sau  
- prof@test.com / test123  
- student@test.com / test123

---

## Troubleshooting uzual

- **Port 8080 ocupat:**  
  `lsof -i :8080 | grep -v COMMAND | awk '{print $2}' | xargs kill -9`
- **Port 5173 ocupat:**  
  `lsof -i :5173 | grep -v COMMAND | awk '{print $2}' | xargs kill -9`
- **Migrare problemă sau reset DB:**  
  - Asigurați-vă că aveți un server PostgreSQL activ și creați DB dacă e nevoie
- **Dependențe:**  
  `rm -rf node_modules package-lock.json && npm install`

## Test cURL API

Exemple în README.md pentru `/api/auth/register` și `/api/auth/login`.

---

## Linkuri utile

- Repo pe GitHub: [edy-dec/Disseration-registration](https://github.com/edy-dec/Disseration-registration)
- Aplicație LIVE (Render): [https://disseration-registration-1.onrender.com](https://disseration-registration-1.onrender.com)

---

> Pentru detalii suplimentare, consultați documentația din repo (`README.md`, `PROJECT_STATUS.md`, `QUICK_START.md`).
